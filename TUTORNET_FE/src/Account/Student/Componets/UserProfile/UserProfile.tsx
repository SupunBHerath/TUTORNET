import React, { useState } from 'react';
import { Avatar, Button, Box, TextField, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserProfile.css';

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
  onUpdate: (updatedData: { name: string; password: string; confirmPassword: string; avatarUrl: string }) => void;
  onDeleteAccount: (currentPassword: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, avatarUrl, onUpdate, onDeleteAccount }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatarUrl);
  const [newName, setNewName] = useState<string>(name);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deletePassword, setDeletePassword] = useState<string>('');

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateClick = () => {
    onUpdate({ name: newName, password: newPassword, confirmPassword, avatarUrl: selectedAvatar });
  };

  const handleDeleteAccount = () => {
    onDeleteAccount(deletePassword);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Box className="user-profile">
      <Box className="profile-header">
        <Box position="relative" className="avatar-container">
          <Avatar src={selectedAvatar} className="profile-avatar animated-avatar" />
          <IconButton color="primary" component="label" className="avatar-button">
            <EditIcon />
            <input type="file" hidden onChange={handleAvatarChange} />
          </IconButton>
        </Box>
      </Box>
      <Box className="profile-actions">
        <Box className="editable-field">
          <Typography variant="h6" component="div" className="field-label">
            Name
          </Typography>
          {isEditingName ? (
            <TextField
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          ) : (
            <Typography variant="body1" className="field-value">
              {newName}
            </Typography>
          )}
          <Button variant="outlined" onClick={() => setIsEditingName(!isEditingName)}>
            {isEditingName ? 'Save' : <EditIcon />}
          </Button>
        </Box>
        <Box className="editable-field">
          <Typography variant="h6" component="div" className="field-label">
            Email
          </Typography>
          <Typography variant="body1" className="field-value">
            {email}
          </Typography>
        </Box>
        <Box className="editable-field">
          <Typography variant="h6" component="div" className="field-label">
            Change Password
          </Typography>
          <Button variant="outlined" onClick={() => setIsEditingPassword(!isEditingPassword)}>
            {isEditingPassword ? 'Save' : <EditIcon />}
          </Button>
        </Box>
        {isEditingPassword && (
          <Box className="password-fields">
            <TextField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={handleUpdateClick} className="button">
          Update
        </Button>
      </Box>
      <Button variant="outlined" color="secondary" onClick={() => setIsDeleteDialogOpen(true)} className="delete-button">
        <DeleteIcon /> Delete Account
      </Button>
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete your account, please enter your current password to confirm.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
