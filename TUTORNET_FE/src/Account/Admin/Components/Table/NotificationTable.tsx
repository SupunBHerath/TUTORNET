import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Typography, Box, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

// Define the user type
type User = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read';
};

export default function NotificationTable() {
  // Sample user data
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Hello', status: 'unread' },
    { id: 2, name: 'John Doe', email: 'john@example.com', message: 'Hello', status: 'unread' },
    // Other user data...
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Initialize initialUsers state with a copy of users when component mounts
  useEffect(() => {
    setInitialUsers([...users]);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleStatusChange = (id: number) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'unread' ? 'read' : 'unread' as 'unread' | 'read' };
      }
      return user;
    });
    setUsers(updatedUsers);

    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    setUsers([...initialUsers]);
    setIsEditing(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <>
      <div className="btnDiv " style={{height:'70px'}}>
        {isEditing && (
          <Box sx={{ mt: 2, textAlign: 'end'}}>
            <Button variant="contained" onClick={handleSaveChanges} sx={{ mr: 2 }}>Save</Button>
            <Button variant="contained" onClick={handleCancelChanges}>Cancel</Button>
          </Box>
        )}

      </div>

      <Box sx={{ p: 3 }}>

        <TableContainer component={Paper}>

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.message}</TableCell>
                  <TableCell onClick={() => handleStatusChange(row.id)} style={{ cursor: 'pointer', color: row.status === 'read' ? '#004aad' : 'red' }}>{row.status}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Save and Cancel buttons */}


        {/* Pagination */}
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              onClick={() => handlePageChange(index + 1)}
              sx={{ mx: 1 }}
            >
              {index + 1}
            </Button>
          ))}
        </Grid>
      </Box>
    </>
  );
}
