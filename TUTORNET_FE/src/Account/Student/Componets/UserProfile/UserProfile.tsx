import { useState } from 'react';
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
import LockRoundedIcon from '@mui/icons-material/LockRounded';

export default function MyProfile() {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handlePasswordEditClick = () => {
    setShowPasswordFields(true);
  };

  const handleFirstNameEditClick = () => {
    setIsEditingFirstName(true);
  };

  const handleLastNameEditClick = () => {
    setIsEditingLastName(true);
  };

  const handleNameSaveClick = () => {
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
  };

  const handlePasswordSaveClick = () => {
    setShowPasswordFields(false);
  };

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My profile
          </Typography>
        </Box>
      </Box>
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
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 100,
                  top: 170,
                  boxShadow: 'sm',
                }}
              >
                <EditRoundedIcon />
              </IconButton>
              
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>First Name</FormLabel>
                <FormControl
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <IconButton
                   
                    onClick={handleFirstNameEditClick}
                  >
                    
                    <EditRoundedIcon />
                  </IconButton>
                  <Input
                    size="sm"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditingFirstName}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <IconButton
                   
                    onClick={handleLastNameEditClick}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                  <Input
                    size="sm"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditingLastName}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              {(isEditingFirstName || isEditingLastName) && (
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={handleNameSaveClick}
                  sx={{ alignSelf: 'flex-start', mt: 1 }}
                >
                  Save
                </Button>
              )}
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    disabled
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Change Password</Typography>
                <IconButton
                 
                  onClick={handlePasswordEditClick}
                  sx={{ marginLeft: 1 }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              {showPasswordFields && (
                <>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Current Password</FormLabel>
                    <Input
                      size="sm"
                      type="password"
                      startDecorator={<LockRoundedIcon />}
                      placeholder="Current Password"
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      size="sm"
                      type="password"
                      startDecorator={<LockRoundedIcon />}
                      placeholder="New Password"
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      size="sm"
                      type="password"
                      startDecorator={<LockRoundedIcon />}
                      placeholder="Confirm Password"
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
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
              >
                Delete Account
              </Button>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
