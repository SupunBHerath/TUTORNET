import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Logo from '../../../../../public/logo/Tutor logo _ t.png'
import DownloadIcon from '@mui/icons-material/Download';
import AddUser from '../Add User/AddUser';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios'; // Import Axios

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

type RoleDetails = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function UserTable() {
  const [roleDetails, setRoleDetails] = useState<RoleDetails[]>([]);
  const [filteredRoleDetails, setFilteredRoleDetails] = useState<RoleDetails[]>([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchRoleDetails();
  }, []);

  const fetchRoleDetails = async () => {
    try {
      const adminResponse = await axios.get('admin/all');
      const teacherResponse = await axios.get('teacher/all');
      const studentResponse = await axios.get('student/all');

      // Check if all responses are successful
      if (adminResponse.status === 200 && teacherResponse.status === 200 && studentResponse.status === 200) {

        const adminData: RoleDetails[] = adminResponse.data;
        const teacherData: RoleDetails[] = teacherResponse.data;
        const studentData: RoleDetails[] = studentResponse.data;

        // Merge data from all responses
        const allRoleDetails = [...adminData, ...teacherData, ...studentData];
        setRoleDetails(allRoleDetails);
        setFilteredRoleDetails(allRoleDetails);
        setTimeout(()=>{
          setLoading(true)
        },1000)
      } else {
        throw new Error('One or more network responses were not ok');
      }
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };

  const handleDelete = (id: number) => {
    console.log('Delete user with id:', id);
    // Add your delete logic here
  };

  const downloadPdf = () => {
    const doc = new jsPDF() as any; // Cast jsPDF to any to avoid TypeScript error

    doc.setFontSize(20);
    doc.text('TUTORNET User Details', 50, 20);
    doc.addImage(Logo, 'JPEG', 14, 30, 10, 10);

    var count = 1;
    doc.autoTable({
      head: [['No', 'Name', 'Email', 'Role']],
      body: filteredRoleDetails.map(row => [count++, row.name, row.email, row.role]),
      startY: 50,
    });

    doc.save('Tutornet_User_Details.pdf');
  };

  const handleFilter = (role: string) => {
    const filteredRoles = role === 'all' ? roleDetails : roleDetails.filter(roleDetail => roleDetail.role === role);
    setFilteredRoleDetails(filteredRoles);
    setOpenFilterModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredRoleDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredRoleDetails.slice(startIndex, endIndex);

  return (
    <>
      <AddUser />

      <div className="Tablebtn mb-2 mt-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button onClick={() => setOpenFilterModal(true)} startIcon={<FilterListIcon />}>Filter</Button>
        <Button onClick={downloadPdf} startIcon={<DownloadIcon />}>PDF</Button>
      </div>

      <Modal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Button onClick={() => handleFilter('all')} variant="outlined" startIcon={<FilterListIcon />}>All</Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleFilter('Admin')} variant="outlined" startIcon={<FilterListIcon />}>Admins</Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleFilter('Teacher')} variant="outlined" startIcon={<FilterListIcon />}>Teachers</Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleFilter('Student')} variant="outlined" startIcon={<FilterListIcon />}>Students</Button>
            </Grid>
            {/* Add more filter buttons if needed */}
          </Grid>
        </Box>
      </Modal>

      {loading ? (<TableContainer component={Paper}>
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
            {currentItems.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{startIndex + index + 1}</TableCell>
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
      ) : (<LinearProgress />)}
     {loading &&  <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
      </div> }
    </>
  );
}


