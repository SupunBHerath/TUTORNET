// Import necessary modules and icons
import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Logo from '../../../../../public/logo/Tutor logo _ t.png';
import DownloadIcon from '@mui/icons-material/Download';
import AddUser from '../Add User/AddUser';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';

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
  name: string;
  email: string;
  day: string;
  location: string;
  payment: number;
  paymentImage: string;
  status: string;
};

// Sample data for the table
const rows: User[] = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', day: '2024/06/13', location: 'landing-1', payment: 1500, paymentImage: '../../../../../public/Ads/ads2.jpg', status: 'Pending' },
  // Add more sample data here
];

export default function PaymentTable() {
  const [filteredRows, setFilteredRows] = useState<User[]>(rows);
  const [location, setLocation] = React.useState('');

  const handleChange = (event: any) => {
    setLocation(event.target.value as string);
    handleFilter(event.target.value as string);
  };

  const locationBtn = () => {
    return (
      <FormControl fullWidth style={{ width: '250px' }}>
        <InputLabel id="demo-simple-select-label">Landing</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          label="Location"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>All Location</MenuItem>
          <MenuItem value={'landing-1'}>Landing 1</MenuItem>
          <MenuItem value={'landing-2'}>Landing 2</MenuItem>
          <MenuItem value={'student-1'}>Student 1</MenuItem>
        </Select>
      </FormControl>)
  }

  const BasicModal = () => {
    const [open, setOpen] = React.useState(false);
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
  }

  // Function to handle the delete action
  const handleDelete = (id: number) => {
    console.log('Delete user with id:', id);
    // Add your delete logic here
  };

  // Function to download the table as a PDF
  const downloadPdf = () => {
    const doc = new jsPDF() as any;

    doc.setFontSize(20);
    doc.setFont('Oswald');
    doc.setTextColor('#004aad')
    doc.text('TUTORNET Payment Details', 60, 30);
    doc.addImage(Logo, 'JPEG', 0, 0, 50, 50);

    doc.autoTable({
      head: [['No', 'Name', 'Email', 'Day ', 'Location', 'Payment']],
      body: filteredRows.map(row => [row.id, row.name, row.email, row.day, row.location, row.payment]),
      startY: 50,
    });

    doc.save('Tutornet_Payment_Details.pdf');
  };

  // Function to filter payment by location
  const handleFilter = (location: string) => {
    const filteredLocation = location === 'all' ? rows : rows.filter(payment => payment.location === location);
    setFilteredRows(filteredLocation);
  };

  // Function to handle zooming of payment image
  const handleImageZoom = (imageUrl: string) => {
    console.log('Zooming image:', imageUrl);
    // Implement image zoom logic here
  };

  // Function to toggle status from Pending to Done or Reject
  const toggleStatus = (id: number) => {
    const updatedRows = filteredRows.map(row => {
      if (row.id === id) {
        // Toggle the status
        if (row.status === 'Pending') {
          return { ...row, status: 'Done' };
        } else if (row.status === 'Done') {
          return { ...row, status: 'Reject' };
        } else {
          return { ...row, status: 'Pending' };
        }
      }
      return row;
    });
    setFilteredRows(updatedRows);
  };

  return (
    <>

      <div className="Tablebtn mb-2 mt-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {BasicModal()}
        <Button
          onClick={downloadPdf}

          startIcon={<DownloadIcon />}
        >
          PDF
        </Button>
      </div>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Payment Day</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Payment Image</TableCell>
              <TableCell>Ads</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.day}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.payment}</TableCell>
                <TableCell>
                  <img src={row.paymentImage} alt="Payment" onClick={() => handleImageZoom(row.paymentImage)} style={{ cursor: 'pointer', maxWidth: '100px' }} />
                </TableCell>
                <TableCell>
                  <img src={row.paymentImage} alt="Payment" onClick={() => handleImageZoom(row.paymentImage)} style={{ cursor: 'pointer', maxWidth: '100px' }} />
                </TableCell>
                <TableCell onClick={() => toggleStatus(row.id)} style={{ cursor: 'pointer', color: row.status === 'Pending' ? 'blue' : row.status === 'Done' ? 'green' : 'red' }}>{row.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
