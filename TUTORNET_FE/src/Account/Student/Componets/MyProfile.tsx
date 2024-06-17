import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import useCookie from '../../../Hook/UserAuth';
import axios from 'axios';
import { Alert, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from '@mui/material';
import { Color } from '../../../Components/CSS/CSS';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const navigate = useNavigate();
  const { userData } = useCookie()
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cpasswordError, setCPasswordError] = useState(false);
  const [oldpassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setpasswordError] = useState(false);
  const [showBtn, setshowBtn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: '',
    name: '',


  });

  const id = userData.userId

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`/student/${id}`);
        const user = response.data;
        setUserProfile(user);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userData]);

  const handlePasswordEditClick = () => {
    setShowPasswordFields(true);
  };

  const handleFirstNameEditClick = () => {
    setshowBtn(true)
    setIsEditingFirstName(true);
  };
  const handleNameEditDouble = () => {
    setshowBtn(false)
    setIsEditingFirstName(true);
  };
  const cancel = () => {
    setshowBtn(false)
    setIsEditingFirstName(false);

  }
  const handleSaveClick = async () => {
    try {
      await axios.put(`/student/${id}`, { name: firstName });
      setIsEditingFirstName(false);
    } catch (error) {
      console.error('Error updating first name:', error);
    }
  };
  const handleConfPasswordChange = (e: any) => {
    const password = newPassword;
    const cpassword = e.target.value;
    if (password === cpassword) {
      setCPasswordError(false);
    } else {
      setCPasswordError(true);
    }
  };

  const handlePasswordSaveClick = async () => {
    const email = userProfile.email
    const password = oldpassword
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      const data = await response.data
      if (data.ok) {
        setIsLoading(true)
        const response = await axios.put(`/student/${id}`, { password: newPassword });
        const user = response.data;
        setUserProfile(user);
        setIsLoading(false)
        setShowPasswordFields(false);


      } else {
        setpasswordError(true)
      }
    } catch (error) {
      setpasswordError(true)

    }


  };
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const [close, setClose] = useState(false);
  const [deleteFail , setDeleteFail] = useState(false);

  const openAlert = async () => {
    setOpenConfirmationDialog(true)
  };
  const closeDialog = async () => {
    setOpenConfirmationDialog(false)
  };
  const handleConfirmDelete = async () => {
    setpasswordError(false)
    setDeleteFail(false);

    const email = userProfile.email
    const password = oldpassword
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      const data = await response.data
      
      if (data.ok) {
        const response = await axios.delete(`/student/${id}`)
          if(response) {
            navigate('/')
          }else{
            setDeleteFail(true);
          }

      } else {
        setpasswordError(true)
      }
    } catch (error) {
    setDeleteFail(true);


    }

  };

  const handleCancelDelete = () => {
    setOpenConfirmationDialog(false)
      setpasswordError(false)
      setDeleteFail(false);

  };

  const firstChar = userProfile.name.charAt(0)
  const [firstName, setFirstName] = useState(userProfile.name);

  return (
    <Box sx={{ flex: 1, width: '100%', marginTop: '150px' }}>
      {!isLoading ? (
        <Stack
          spacing={4}
          sx={{
            display: 'flex',
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Card sx={{ border: '2px solid blue', borderRadius: 2 }}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
            </Box>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
            >
              <Stack direction="column" spacing={2}>

                <Avatar style={{ minHeight: '100px', width: '100px', fontSize: '70px', color: Color.SecondaryColor }}>{firstChar}</Avatar>
              </Stack>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={0}>
                  <FormLabel>Name</FormLabel>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Input
                        size="sm"
                        placeholder={userProfile.name}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!isEditingFirstName}
                        sx={{ flexGrow: 1 }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        size="sm"
                        onClick={handleFirstNameEditClick}
                        onDoubleClick={handleNameEditDouble}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>

                </Stack>

                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      disabled
                      size="sm"
                      type="email"
                      startDecorator={<EmailRoundedIcon />}
                      placeholder={userProfile.email}
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography>Change Password</Typography>
                  <IconButton
                    size="sm"
                    onClick={handlePasswordEditClick}
                    sx={{ marginLeft: 1 }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Stack>
                {showPasswordFields && (
                  <>
                    <FormLabel>Current Password</FormLabel>
                    <TextField
                      fullWidth
                      label="Current password"
                      name="oldPassword"
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                      type='password'
                      error={passwordError}
                      helperText={
                        passwordError ? "Please enter your  Current Password" : ""
                      }

                    />
                    <FormLabel>New Password</FormLabel>
                    <TextField
                      fullWidth
                      label="New password"
                      name="newpassword"
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      type='password'


                    />
                    <FormLabel>Confirm Password</FormLabel>
                    <TextField
                      fullWidth
                      label="Confirm password"
                      name="cpassword"
                      onChange={handleConfPasswordChange}
                      required
                      type='password'
                      error={cpasswordError}
                      helperText={
                        cpasswordError ? "password does not match" : ""
                      }

                    />
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={handlePasswordSaveClick}
                      sx={{ alignSelf: 'flex-start', mt: 1 }}
                    >
                      Save Password
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                <Button
                  size="sm"
                  variant="outlined"
                  sx={{
                    color: 'red',
                    borderColor: 'red',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      borderColor: 'darkred',
                    },
                  }}
                  onClick={openAlert}
                >
                  Delete Account
                </Button>
                {showBtn && (
                  <Button size="sm" variant="outlined" color="neutral" onClick={cancel}>
                    Cancel
                  </Button>)}

                {showBtn && (<Button size="sm"
                  variant="solid"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>)}
              </CardActions>
            </CardOverflow>
          </Card>
        </Stack>
      ) : (
        <LinearProgress />
      )
      }
      <Dialog open={openConfirmationDialog} onClose={closeDialog}>
        {/* {loading && <LinearProgress />} */}
        <DialogTitle>{deleteFail && <Alert severity="warning" > Try Agin ..</Alert>}</DialogTitle>
        <DialogContent>
          <br />
          <TextField
            fullWidth
            label="Confirm password"
            name="oldPassword"
            onChange={(e) => setOldPassword(e.target.value)}
            required
            type='password'
            error={passwordError}
            helperText={
              passwordError ? "Please enter your  Current Password" : ""
            }

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary" style={{backgroundColor:'red'}} >Yes</Button>
          <Button onClick={handleCancelDelete}  >No</Button>
        </DialogActions>
      </Dialog>
    </Box>


  );
}
