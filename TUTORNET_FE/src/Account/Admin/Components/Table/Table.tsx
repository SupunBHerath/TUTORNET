import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Icon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { jsPDF } from 'jspdf';
import { UserOptions } from 'jspdf-autotable';
import Logo from '../../../../../public/logo/Tutor logo _ t.png'
import { Color } from '../../../../Components/CSS/CSS';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadIcon from '@mui/icons-material/Download';
import AddUser from '../Add User/AddUser';


// Define the user type
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

// Sample data for the table
const rows: User[] = [
  { id: 1, name: 'John Doe',role:'Teacher', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith',role:'Student', email: 'janesmith@example.com' },
  // Add more users here
];

export default function UserTable() {
  // Function to handle the delete action
  const handleDelete = (id: number) => {
    console.log('Delete user with id:', id);
    // Add your delete logic here
  };
  interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: UserOptions) => void;
  }
  // Function to download the table as a PDF
  const downloadPdf = () => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
  
    // Add company name at the top
    doc.setFontSize(15);
    doc.text('TUTORNET USer Details', 14, 22);
  
    // Add company logo
    doc.addImage(Logo, 'JPEG', 14, 30, 10, 10); // Adjust dimensions as needed
  
    // Ensure the table does not overlap with the logo by adjusting the startY position
    doc.autoTable({
      head: [['No', 'Name', 'Email']],
      body: rows.map(row => [row.id, row.name, row.email]),
      startY: 90, // Adjust this value based on the height of your logo
    });
  
    doc.save('Tutornet_User_Details.pdf');
  };

  
  return (
    <>

<div className="Tablebtn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <AddUser/>
  <Button
    variant="contained"
    onClick={downloadPdf}
    style={{ marginBottom: '10px' }}
    startIcon={<DownloadIcon />}
  >
    PDF
  </Button>
</div>

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
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
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
    </>
  );
}
