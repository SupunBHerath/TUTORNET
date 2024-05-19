import React from 'react';
import { Grid, Typography, Button, Avatar } from '@mui/material';
import coverphoto from '../../../../public/Teacher/image_22690a2b8a.jpg';
import ProfilePicture from '../../../../public/Teacher/WhatsApp Image 2024-03-23 at 10.01.09_126679a9.jpg';
import ColorTabs from './Tabs/Tabs';

const Profile: React.FC = () => {
  return (
    <>
    <Grid container direction="column" alignItems="center" className='container'>
      {/* Cover Photo */}
      <Grid item xs={12} style={{ position: 'relative', width: '85%', marginTop: 40 }}>
        <img src={coverphoto} alt="Cover" style={{ width: '100%', maxHeight: '350px', overflow: 'hidden',borderRadius:20}} />

        {/* Profile Picture */}
        <Avatar
          alt="Profile Picture"
          src={ProfilePicture}
          sx={{
            width: 320,
            height: 320,
            position: 'absolute',
            bottom: -180,
            left: 60,
            border: '2px solid #fff',
          }}
        />

        {/* Edit Profile Button */}
        <Button variant="contained" color="primary" style={{ position: 'absolute', right: 0, bottom: -80, width: 150, height: 20 }}>
          Edit Profile
        </Button>
      </Grid>

      {/* User Info */}
      <Grid item xs={12} alignItems="center" style={{ textAlign: 'center', marginTop: 30, marginLeft: 130 }}>
        <Typography variant="h4">Dr. Amith Pussella</Typography>
        <Typography variant="subtitle1">(Physics Teacher)</Typography>
        
      </Grid>
    </Grid>

    </>
  );
};

export default Profile;
