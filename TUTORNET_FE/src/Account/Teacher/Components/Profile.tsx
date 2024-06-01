import React, { useState } from 'react';
import { Grid, Typography, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import coverphoto from '../../../../public/Teacher/image_22690a2b8a.jpg';
import ProfilePicture from '../../../../public/Teacher/WhatsApp Image 2024-03-23 at 10.01.09_126679a9.jpg';

const Profile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(ProfilePicture);
  const [coverPhoto, setCoverPhoto] = useState(coverphoto);
  const [name, setName] = useState("Dr. Amith Pussella");
  const [occupation, setOccupation] = useState("Physics Teacher");

  const [newProfilePicture, setNewProfilePicture] = useState(ProfilePicture);
  const [newCoverPhoto, setNewCoverPhoto] = useState(coverphoto);
  const [newName, setNewName] = useState("Dr. Amith Pussella");
  const [newOccupation, setNewOccupation] = useState("Physics Teacher");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setProfilePicture(newProfilePicture);
    setCoverPhoto(newCoverPhoto);
    setName(newName);
    setOccupation(newOccupation);
    setOpen(false);
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewCoverPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" className='container  '>
        {/* Cover Photo */}
        <Grid item xs={12} style={{ position: 'relative', width: isSmallScreen ? '100%' : '85%', marginTop: 40 }}>
          <img src={coverPhoto} alt="Cover" style={{ width: '100%', maxHeight: '350px', overflow: 'hidden', borderRadius: 20 }} />

          {/* Profile Picture */}
          <Avatar
            alt="Profile Picture"
            src={profilePicture}
            sx={{
              width: isSmallScreen ? 200 : 250,
              height: isSmallScreen ? 200 : 250,
              position: 'absolute',
              bottom: isSmallScreen ? -100 : -180,
              left: isSmallScreen ? 'calc(50% - 100px)' : 60,
              border: '2px solid #fff',
            }}
          />

          {/* Edit Profile Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            style={{ position: 'absolute', right: 0, bottom: isSmallScreen ? -50 : -80, width: 150, height: 40, fontSize: '0.875rem' }}
            onClick={handleClickOpen}
          >
            Edit Profile
          </Button>
        </Grid>

        {/* User Info */}
        <Grid item xs={12} alignItems="center" style={{ textAlign: 'center', marginTop: isSmallScreen ? 70 : 30, marginLeft: isSmallScreen ? 0 : 130 }}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="subtitle1">({occupation})</Typography>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Divider />
          <Grid container spacing={2} alignItems="center" style={{ marginTop: 16 }}>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" style={{ flexGrow: 1 }}>Edit Profile Picture</Typography>
              <IconButton component="label">
                <EditIcon />
                <input type="file" accept="image/*" hidden onChange={handleProfilePictureChange} />
              </IconButton>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={newProfilePicture} alt="Profile" sx={{ width: 100, height: 100 }} />
            </Grid>
            <Divider style={{ width: '100%', margin: '16px 0' }} />
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" style={{ flexGrow: 1 }}>Change Cover Photo</Typography>
              <IconButton component="label">
                <EditIcon />
                <input type="file" accept="image/*" hidden onChange={handleCoverPhotoChange} />
              </IconButton>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={newCoverPhoto} alt="Cover" style={{ width: '100%', maxHeight: '200px', borderRadius: 8 }} />
            </Grid>
            <Divider style={{ width: '100%', margin: '16px 0' }} />
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" style={{ flexGrow: 1 }}>Name</Typography>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Grid>
            <Divider style={{ width: '100%', margin: '16px 0' }} />
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" style={{ flexGrow: 1 }}>Occupation</Typography>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                value={newOccupation}
                onChange={(e) => setNewOccupation(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
