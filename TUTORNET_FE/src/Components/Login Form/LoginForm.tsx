import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { Color, Font } from '../CSS/CSS';
import ForgotPassword from '../Modal/ForgotPassword';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="">
        TUTORNET
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState<'success' | 'error'>('success');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setEmailError(false);
    setPasswordError(false);
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      setAlertMessage('Please fill in all required fields.');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError(true);
      setError('Please enter a valid email address.');
      setAlertMessage('Please enter a valid email address.');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/login', { email, password });
      const data = await response.data;

      if (data.ok) {
        setSuccess(true);
        setAlertMessage('Login Successful');
        setAlertSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          localStorage.setItem('token', data.token);
          const userRole = data.role;
          switch (userRole) {
            case 'Teacher':
              navigate('/teacher');
              break;
            case 'Student':
              navigate('/student');
              break;
            case 'Admin':
              navigate('/admin');
              break;
            default:
              navigate('/');
              break;
          }
          setLoading(false);
        }, 1000);
      } else {
        setError(data.error);
        setAlertMessage(data.error);
        setAlertSeverity('error');
        setOpenSnackbar(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid Password');
      setAlertMessage('Connection error');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
    setSuccess(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar open={openSnackbar}  autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: 'block', sm: 'block' } }}
              style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}  >
              TUTOR<span style={{ color: Color.SecondaryColor }}>NET </span> Login
            </Typography>
            <br /><br />
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailError}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Login
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <ForgotPassword/>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
