import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import TimeDifference from '../../../../Components/TimeDifference/TimeDifference';
import { Color, Font } from '../../../../Components/CSS/CSS';
import axios from 'axios'; // Import Axios
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';

// Define the user type
type User = {
  id: number;
  userName: string;
  teacherName: string;
  rating: number;
  comment: string;
  uploadedDay: string;
  _id: string;
  status: 'Invisible' | 'Visible';
};

export default function NotificationTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data from the backend when component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('/feedback');
        setUsers(response.data);
        setInitialUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/feedback/${id}`);
      setUsers(users.filter(user => user._id == id));
      console.log(users);
      
      setLoading(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = (user: User) => {
    setSelectedUser(user);
    setDialogType('status');
    setOpenConfirmationDialog(true);
  };

  const handleConfirmStatusChange = async () => {
    if (selectedUser) {
      const updatedUsers = users.map(user => {
        if (user._id === selectedUser._id) {
          return { ...user, status: user.status === 'Visible' ? 'Invisible' : 'Visible' as 'Visible' | 'Invisible' };
        }   
        return user;
      });

      setLoading(true);
      try {
        await axios.put(`/feedback/${selectedUser._id}`, {
          status: selectedUser.status === 'Visible' ? 'Invisible' : 'Visible'
        });
        setUsers(updatedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error updating status:', error);
        setLoading(false);
      }
      
      setSelectedUser(null);
      setOpenConfirmationDialog(false);
    }
  };

  const handleCancelStatusChange = () => {
    setSelectedUser(null);
    setOpenConfirmationDialog(false);
  };

  const handleDeleteConfirmation = (user: User) => {
    setSelectedUser(user);
    setDialogType('delete');
    setOpenConfirmationDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      await handleDelete(selectedUser._id);
      setSelectedUser(null);
      setOpenConfirmationDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setOpenConfirmationDialog(false);
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
      <div className="btnDiv " style={{ height: '70px' }}>
        {isEditing && (
          <Box sx={{ mt: 2, textAlign: 'end' }}>
            <Button variant="contained" onClick={handleSaveChanges} sx={{ mr: 2 }}>Save</Button>
            <Button variant="contained" onClick={handleCancelChanges}>Cancel</Button>
          </Box>
        )}
      </div>

      <Box sx={{ p: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, fontFamily: Font.PrimaryFont }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>No</TableCell>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>Time</TableCell>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>Name</TableCell>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>Teachers Name</TableCell>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>Feedback</TableCell>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>Rating</TableCell>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>Status</TableCell>
                <TableCell style={{ fontFamily: Font.PrimaryFont, fontSize: '18px', color: Color.PrimaryColor }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell style={{ fontFamily: Font.PrimaryFont }}>{startIndex + index + 1}</TableCell>
                  <TableCell>{<TimeDifference time={row.uploadedDay} />}</TableCell>
                  <TableCell style={{ fontFamily: Font.PrimaryFont }}>{row.userName}</TableCell>
                  <TableCell style={{ fontFamily: Font.PrimaryFont }}>{row.teacherName}</TableCell>
                  <TableCell style={{ fontFamily: Font.PrimaryFont }}>{row.comment}</TableCell>
                  <TableCell style={{ fontFamily: Font.PrimaryFont }}>{row.rating}</TableCell>
                  <TableCell onClick={() => handleStatusChange(row)} style={{ cursor: 'pointer', color: row.status === 'Visible' ? 'green' : 'red',fontStyle:'bold' ,fontWeight:'800'}} >{row.status}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleDeleteConfirmation(row)}>
                      <DeleteOutline />
                    </IconButton>
                    <Button variant="contained" size="small" onClick={() => handleStatusChange(row)} sx={{ ml: 2 }}>
                      Change Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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

        <Dialog open={openConfirmationDialog} onClose={dialogType === 'status' ? handleCancelStatusChange : handleCancelDelete}>
          {loading && <LinearProgress />}
          <DialogTitle>{dialogType === 'delete' ? 'Confirm Delete' : 'Confirm Status Change'}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {dialogType === 'delete' ? 'Are you sure you want to delete this Feedback?' : 'Are you sure you want to change the status of this Feedback?'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={dialogType === 'delete' ? handleConfirmDelete : handleConfirmStatusChange} color="primary">Yes</Button>
            <Button onClick={dialogType === 'delete' ? handleCancelDelete : handleCancelStatusChange} color="secondary">No</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
