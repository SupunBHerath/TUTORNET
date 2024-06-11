import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Alert } from '@mui/material';

const NotificationForm = () => {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRoleChange = (event:any) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (!role || !message || !subject) {
      setShowAlert(true);
      setShowSuccess(false);
      return;
    }
    setShowAlert(false);
    setShowSuccess(true);
    console.log('Role:', role);
    console.log('Subject:', subject);
    console.log('Message:', message);
    // Add your form submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {showAlert && (
        <Alert severity="error" sx={{ mb: 2 }}>
          All fields are required.
        </Alert>
      )}
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Message sent successfully.
        </Alert>
      )}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={role}
          label="Role"
          onChange={handleRoleChange}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="subject"
        label="Subject"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        id="message"
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Send Notification
      </Button>
    </Box>
  );
};

export default NotificationForm;
