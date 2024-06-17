import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, LinearProgress, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Logo from '../../../../../public/logo/Tutor logo _ t.png';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MuiAlert from "@mui/material/Alert";
import axios from 'axios';
import { Cancel } from '@mui/icons-material';
import { Color, Font } from '../../../../Components/CSS/CSS';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  autoHideDuration: number;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  autoHideDuration,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MuiAlert elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

function AlertDialogSlide(prop: any) {
  const [open, setOpen] = React.useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = async () => {
    try {
      const response = await axios.delete(`/ads/delete/${prop.id}`);

      if (response.status === 200) {
        setOpen(false);
        setDeleteAlert(true);

        setTimeout(() => {
          { prop.fun(prop.id) }
          setDeleteAlert(false);

        }, 1000);
      } else {
        console.error('Failed to delete advertisement');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
      <React.Fragment>

        <IconButton onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Are you sure delete  ? '}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {prop.id}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree}>Agree</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <SnackbarAlert
        open={deleteAlert}
        message={"Delete  succefully...."}
        autoHideDuration={1000}
      />
    </>

  );
}


var i = 0;
const Transition = React.forwardRef(function Transition(


  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const style = {
  position: 'absolute' as 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  bgcolor: 'background.paper',
  border: '4px solid #f6921e',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};
type UserId = {
  profilePicture: string;
  name: string;
}
type User = {
  id: number;
  userId: UserId;
  _id: string;
  email: string;
  payDay: string;
  uploadedDay: string;
  location: string;
  payment: number;
  rec: string;
  ads: string;
  status: string;


};
type update = {
  userId: string;
  status: string;
};

const PaymentTable: React.FC = () => {
  const [rows, setRows] = useState<User[]>([]);
  const [tem, setTem] = useState<User[]>([]);
  const [dbdata, setDbdata] = useState<User[]>([]);
  const [location, setLocation] = useState<string>('');
  const [update, setUpdate] = useState<User[]>([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/ads/all');

        if (!response) {
          throw new Error('Network response was not ok');
        }

        const data = response.data.reverse();

        setRows(data);
        setTem(data);
        setDbdata(data)
        setTimeout(() => {
          setLoading(true);
        }, 800)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleSaveChanges = () => {
    const postData = async () => {
      try {
        const updateData = rows.filter(row => {
          const correspondingDBData = dbdata.find(item => item._id === row._id);
          return correspondingDBData && row.status !== correspondingDBData.status;
        });
        const response = await axios.put('/ads/update', updateData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response) {
          throw new Error('Network response was not ok');
        }
        const data = response.data;
        setIsChange(false);
        setConfirmationOpen(false);
        setOpenSnackbar(true);
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    postData();
  };


  const handleChange = (event: any) => {
    setLocation(event.target.value as string);
    handleFilter(event.target.value as string);
  };

  const locationBtn = () => (
    <FormControl fullWidth style={{ width: '250px' }}>
      <InputLabel id="location-select-label">Location</InputLabel>
      <Select
        labelId="location-select-label"
        id="location-select"
        value={location}
        label="Location"
        onChange={handleChange}
      >
        <MenuItem value={'all'}>All Locations</MenuItem>
        <MenuItem value={'landing-1'}>Landing 1</MenuItem>
        <MenuItem value={'landing-2'}>Landing 2</MenuItem>
        <MenuItem value={'student-1'}>Student 1</MenuItem>
      </Select>
    </FormControl>
  );
  const BasicModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <Button onClick={handleOpen} startIcon={<FilterListIcon />}>Filter</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {locationBtn()}
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  };

  const handleDelete = (_id: string) => {
    const updatedRows = rows.filter(row => row._id !== _id);
    setRows(updatedRows);
  };

  const downloadPdf = () => {
    const doc = new jsPDF() as any;

    doc.setFontSize(20);
    doc.setFont('Oswald');
    doc.setTextColor('#004aad');
    doc.text('TUTORNET Payment Details', 60, 30);
    doc.addImage(Logo, 'JPEG', 0, 0, 50, 50);

    doc.autoTable({
      head: [['No', 'UserId', 'Email', 'Payment Day', 'Location', 'Payment']],
      body: rows.map(row => [row.id, row.userId, row.email, row.payDay, row.location, row.payment]),
      startY: 50,
    });

    doc.save('Tutornet_Payment_Details.pdf');
  };

  const handleFilter = (location: string) => {
    const filteredLocation = location === 'all' ? rows : rows.filter(payment => payment.location === location);
    setRows(filteredLocation);
  };


  const handleImageZoom = (imageUrl: string) => {
    setOpenImageModal(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };


  const toggleStatus = (_id: string) => {
    setIsChange(true)
    const updatedRows = rows.map(row => {
      if (row._id === _id) {
        if (row.status === 'Pending') {
          return { ...row, status: 'Done' };
        } else if (row.status === 'Done') {
          return { ...row, status: 'Reject' };
        } else {
          return { ...row, status: 'Done' };
        }
      }

      return row;
    });
    setRows(updatedRows);
    setUpdate(updatedRows);
  };

  const [change, setIsChange] = useState<boolean>(false);
  const handleCancelChanges = () => {

    setRows(tem)
    setIsChange(false)
  };

  const handleDownload = () => {
    fetch(selectedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);

      });
  };
  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };
  const handleSave = () => {
    setConfirmationOpen(true);
  };

  return (
    <>
      <Modal
        open={openImageModal}
        onClose={handleCloseImageModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80vw',
            maxHeight: '80vh',
            backgroundColor: '#ffffff',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            textAlign: 'center',
          }}
        >     <div className="d-flex justify-content-between mt-3 mb-3">
            <div>
              <IconButton
                onClick={handleDownload}
                aria-label="download"
                style={{ position: 'absolute', top: '10px', left: '10px', color: Color.PrimaryColor }}
              >
                <DownloadIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                onClick={handleCloseImageModal}
                aria-label="cancel"
                style={{ position: 'absolute', top: '10px', right: '10px', color: 'red' }}
              >
                <Cancel />
              </IconButton>
            </div>
          </div>
          <img
            src={selectedImage}
            alt="Zoomed Image"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
              margin: 'auto',
            }}
          />

        </Box>
      </Modal>


      <div className="Tablebtn mb-2 mt-3   " style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {BasicModal()}
        <Button
          onClick={downloadPdf}
          startIcon={<DownloadIcon />}
        >
          PDF
        </Button>

        <div className="btnDiv  d-flex  justify-content-end w-100" style={{ height: '70px' }}>
          <Box sx={{ mt: 2, textAlign: 'end' }}>
            <Button variant="outlined" onClick={handleSave} sx={{ mr: 2 }} disabled={!change}>Save</Button>
            <Button
              variant="outlined"
              style={{
                borderColor: change ? 'red' : undefined,
                color: change ? 'red' : undefined
              }}
              disabled={!change}
              onClick={handleCancelChanges}
            >
              Cancel
            </Button>
          </Box>
        </div>
      </div>

      {loading ? (<TableContainer component={Paper} style={{ overflowX: 'auto', maxWidth: '100%' }} className='  '>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontFamily: Font.PrimaryFont }}>No</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Profile Image </TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Name</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Payment Day</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Upload Day</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Location</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Payment</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Recipet</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Ads</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Status</TableCell>
              <TableCell style={{ fontFamily: Font.PrimaryFont }} >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className='text-center'>{i++}</TableCell>
                <TableCell>
                  <Avatar alt={row.userId.name} src={row.userId.profilePicture} sx={{ width: 50, height: 50 }} className='border border-dark' />
                </TableCell>
                <TableCell>{row.userId.name}</TableCell>
                <TableCell>{row.payDay}</TableCell>
                <TableCell>{new Date(row.uploadedDay).toISOString().split('T')[0]}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.payment}</TableCell>
                <TableCell>
                  <img src={row.rec} alt="Payment" onClick={() => handleImageZoom(row.rec)} style={{ cursor: 'pointer', maxWidth: '70px' }} />
                </TableCell>
                <TableCell>
                  <img src={row.ads} alt="Payment" onClick={() => handleImageZoom(row.ads)} style={{ cursor: 'pointer', maxWidth: '70px' }} />
                </TableCell>
                <TableCell style={{ cursor: 'pointer', color: row.status === 'Pending' ? 'blue' : row.status === 'Done' ? 'green' : 'red' }}>{row.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleStatus(row._id)}>
                    <EditIcon />
                  </IconButton>
                  <AlertDialogSlide id={row._id} fun={handleDelete} />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={confirmationOpen}
          onClose={handleCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to proceed with this action?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveChanges} color="primary" autoFocus>
              Yes
            </Button>
            <Button onClick={handleCloseConfirmation} color="primary">
              Cancel
            </Button>



          </DialogActions>
        </Dialog>
      </TableContainer>) : (<LinearProgress />)}
      <SnackbarAlert
        open={openSnackbar}
        message={"update succefully...."}
        autoHideDuration={1000}
      />

    </>
  );
}

export default PaymentTable;
