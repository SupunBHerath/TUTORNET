// Import necessary modules and icons
import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import 'jspdf-autotable' to add the autoTable functionality
import Logo from '../../../../../public/logo/Tutor logo _ t.png'
import DownloadIcon from '@mui/icons-material/Download';
import AddUser from '../Add User/AddUser';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
const style = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  bgcolor: 'background.paper',
  border: '4px solid #f6921e',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};


type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const rows: User[] = [];
fetch('http://localhost:8080/teacher/user')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Assuming the API response is an array of user objects
    rows.push(...data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
// Extend the jsPDF interface to include the autoTable method
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

export default function UserTable() {
  const [filteredRows, setFilteredRows] = useState<User[]>(rows);
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
              <Grid item xs={3}>
                <Button onClick={() => handleFilter('all')} variant="outlined" startIcon={<FilterListIcon />} >All</Button>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={() => handleFilter('Teacher')} variant="outlined" startIcon={<FilterListIcon />} >Teachers</Button>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={() => handleFilter('Student')} variant="outlined" startIcon={<FilterListIcon />}>Students</Button>
              </Grid>
              {/* Add more filter buttons if needed */}
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
    const doc = new jsPDF() as jsPDFWithAutoTable; // Cast jsPDF to jsPDFWithAutoTable to use autoTable

    // Add company name at the top
    doc.setFontSize(20);
    doc.text('TUTORNET User Details', 50, 20);

    // Add company logo
    doc.addImage(Logo, 'JPEG', 14, 30, 10, 10); // Adjust dimensions as needed

    // Ensure the table does not overlap with the logo by adjusting the startY position
    var count = 1;
    doc.autoTable({
      head: [['No', 'Name', 'Email', 'Role']],
      body: filteredRows.map(row => [count++, row.name, row.email, row.role]),
      startY: 50,
      
    }
    );
   
    doc.save('Tutornet_User_Details.pdf');
  };

  // Function to filter users by role
  const handleFilter = (role: string) => {
    const filteredUsers = role === 'all' ? rows : rows.filter(user => user.role === role);
    setFilteredRows(filteredUsers);
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredRows.slice(startIndex, endIndex);



  var countData = 1;
  return (
    <>
      <AddUser />

      <div className="Tablebtn mb-2 mt-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {BasicModal()}
        <Button
          onClick={downloadPdf}

          startIcon={<DownloadIcon />}
        >
          PDF
        </Button>
      </div>
      {/* filter function  */}


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {currentItems.map((row) => (
             
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{countData++}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
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

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            style={{ marginRight: '5px' }}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <br /><br />
      </div>
    </>
  );
}
