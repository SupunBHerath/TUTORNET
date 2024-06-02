import React from 'react';
import { Container, Typography } from '@mui/material';
import UserProfile from './UserProfile';

const ProfilePage: React.FC = () => {
  const handleUpdate = (updatedData: { name: string; password: string; confirmPassword: string; avatarUrl: string }) => {
    if (updatedData.password !== updatedData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Update account', updatedData);
  };

  const handleDeleteAccount = (currentPassword: string) => {
    console.log('Delete account with current password:', currentPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <UserProfile
        name="   Nilantha Jayasooriya"
        email="   nilantha@example.com"
        avatarUrl="https://via.placeholder.com/150"
        onUpdate={handleUpdate}
        onDeleteAccount={handleDeleteAccount}
      />
    </Container>
  );
};

export default ProfilePage;
