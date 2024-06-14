import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Divider, useMediaQuery, CircularProgress, Alert, Box, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import useCookie from '../../../Hook/UserAuth';
import axios from 'axios';
import { Font } from '../../../Components/CSS/CSS';

const Profile: React.FC = () => {
  const { userData } = useCookie();

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [newOccupation, setNewOccupation] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState<File | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [ratingLoading, setRatingLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`teacher/${userData.userId}`);
        const ratingResponse = await axios.get(`feedback/rating/${userData.userId}`);
        setCurrentRating(ratingResponse.data.userTotalRatings);
        const data = response.data;
        setName(data.name);
        setOccupation(data.subject);
        setProfilePicture(data.profilePicture);
        setCoverPhoto(data.coverPhoto);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userData.userId]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', newName || name);
      formData.append('subject', newOccupation || occupation);
      if (newProfilePicture) {
        formData.append('profilePicture', newProfilePicture);
      }
      if (newCoverPhoto) {
        formData.append('coverPhoto', newCoverPhoto);
      }

      const response = await axios.put(`teacher/up-bio/${userData.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('Data updated successfully');
        setName(newName || name);
        setOccupation(newOccupation || occupation);
        if (newProfilePicture) {
          const updatedProfilePictureUrl = response.data.profilePicture;
          setProfilePicture(updatedProfilePictureUrl);
        }
        if (newCoverPhoto) {
          const updatedCoverPhotoUrl = response.data.coverPhoto;
          setCoverPhoto(updatedCoverPhotoUrl);
        }
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setOpen(false);
          setNewName("");
          setNewOccupation("");
          setNewProfilePicture(null);
          setNewCoverPhoto(null);
        }, 2000);
      } else {
        console.error('Error updating data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfilePicture(event.target.files[0]);
    }
  };

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewCoverPhoto(event.target.files[0]);
    }
  };

  const blockNumericInput = (e: any) => {
    const charCode = e.which ? e.which : e.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" className="container" >
        <Grid item xs={12} style={{ position: 'relative', width: isSmallScreen ? '100%' : '85%', marginTop: 40 }}>
          <img src={coverPhoto || ''} alt="Cover" style={{ minWidth: '100%', maxHeight: '350px', minHeight: '350px', overflow: 'hidden', backgroundColor: 'rgb(98, 100, 102)', borderRadius: 20 }} />
          <Avatar
            alt="Profile Picture"
            src={profilePicture || ''}
            sx={{
              width: isSmallScreen ? 200 : 250,
              height: isSmallScreen ? 200 : 250,
              position: 'absolute',
              bottom: isSmallScreen ? -100 : -180,
              left: isSmallScreen ? 'calc(50% - 100px)' : 60,
              border: '2px solid #fff',
            }}
          />
        
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            style={{ position: 'absolute', right: 0, bottom: isSmallScreen ? -50 : -80, width: 180, height: 40, fontSize: '0.875rem' }}
            onClick={handleClickOpen}
          >
            Edit Profile
          </Button>
        </Grid>
        <Grid item xs={12} alignItems="center" style={{ textAlign: 'center', marginTop: isSmallScreen ? 70 : 30, marginLeft: isSmallScreen ? 0 : 130 }}>
          <Typography variant="h3" style={{fontFamily:Font.PrimaryFont}}>{name}</Typography>
          <Typography variant="h4" style={{fontFamily:Font.PrimaryFont,color:'#0019'}}>{occupation}</Typography>
          {currentRating !== null && (
            <Box sx={{ marginTop: 2 }}>
              <Rating name="read-only" value={currentRating} readOnly />
            </Box>
          )}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        {success && (
          <Alert severity="success">
            Update Success
          </Alert>
        )}
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
              <Avatar src={newProfilePicture ? URL.createObjectURL(newProfilePicture) : profilePicture || ''} alt="Profile" sx={{ width: 100, height: 100 }} />
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
              <img src={newCoverPhoto ? URL.createObjectURL(newCoverPhoto) : coverPhoto || ''} style={{ minWidth: '100%', maxHeight: '200px', minHeight: '200px', overflow: 'hidden', backgroundColor: 'rgb(98, 100, 102)', borderRadius: 20 }} />
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
                onKeyDown={blockNumericInput}
                placeholder={name}
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
                onKeyDown={blockNumericInput}
                variant="outlined"
                value={newOccupation}
                placeholder={occupation}
                onChange={(e) => setNewOccupation(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
