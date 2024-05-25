import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar } from '@mui/material';
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

function AlertDialogSlide(prop:any) {
  const [open, setOpen] = React.useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = async () => {
    try {
      fetch(`http://localhost:8080/reqads/delete/${prop.id}`, {
        method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
          console.log('Advertisement deleted successfully');
          setOpen(false);
          setTimeout(() => {
            setDeleteAlert(true);
          }, 2000);
          {prop.fun(prop.id)}
      } else {
          console.error('Failed to delete advertisement');
      }
  })
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

// Define the user type
type User = {
  id: number;
  userId: string;
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
  const [update, setUpdate] = useState<update[]>([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/reqads/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();

        setRows(data);
        setTem(data);
        setDbdata(data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  // Function to handle the delete action
  const handleDelete = (_id: string) => {
    const updatedRows = rows.filter(row => row._id !== _id);
    setRows(updatedRows);
  };

  // Function to download the table as a PDF
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

  // Function to filter payment by location
  const handleFilter = (location: string) => {
    const filteredLocation = location === 'all' ? rows : rows.filter(payment => payment.location === location);
    setRows(filteredLocation);
  };


  const handleImageZoom = (imageUrl: string) => {
    console.log('Zooming image:', imageUrl);

  };




  // Function to toggle status from Pending to Done or Reject
  const toggleStatus = (_id: string) => {
    setIsChange(true)
    const updatedRows = rows.map(row => {
      if (row._id === _id) {
        // Toggle the status
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

  const handleSaveChanges = () => {
    const postData = async () => {
      try {
        // Filter rows to get the updates that need to be sent
        const updateData = rows.filter(row => {
          const correspondingDBData = dbdata.find(item => item._id === row._id);
          return correspondingDBData && row.status !== correspondingDBData.status;
        });

        console.log('Update Data:', updateData);

        // Make the PUT request to update the documents
        const response = await fetch('http://localhost:8080/reqads/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });

        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();
        setIsChange(false)
        console.log('Received Data:', data);
        setOpenSnackbar(true)
        setTimeout(() => {
          setOpenSnackbar(false)
        }, 2000);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the postData function
    postData();
  };

  function constructFullURL(imagePath: any) {
    // Fix the path format
    imagePath = imagePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    imagePath = imagePath.replace('uploads/', ''); // Remove the 'uploads/' part

    // Construct the full URL
    const fullURL = 'http://localhost:8080/uploads/' + imagePath;
    console.log(fullURL);
    
    return fullURL;
  }

  return (
    <>
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
            <Button variant="outlined" onClick={handleSaveChanges} sx={{ mr: 2 }} disabled={!change}>Save</Button>
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

      <TableContainer component={Paper} style={{ overflowX: 'auto', maxWidth: '100%' }} className='  '>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Payment Day</TableCell>
              <TableCell>Upload Day</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Recipet</TableCell>
              <TableCell>Ads</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className='text-center'>{++i}</TableCell>
                <TableCell>{row.email}</TableCell>
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
                  <AlertDialogSlide id={row._id} fun ={handleDelete}/>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackbarAlert
        open={openSnackbar}
        message={"update succefully...."}
        autoHideDuration={1000}
      />
    
    </>
  );
}

export default PaymentTable;
