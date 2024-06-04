import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { Toaster } from 'react-hot-toast';
import { Alert } from '@mui/material';
import { Color, Font } from '../CSS/CSS';
import axios from 'axios';

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
function isValidEmail(email: string): boolean {
  // Regular expression to validate email format
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError(true);
      setError('Please enter a valid email address.');
      return;
    }
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      const data = await response.data
      console.log(data);
      
      if (data.ok) {
        setSuccess(true);
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


        }, 1000);
      } else {

        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError("connection error");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
    setSuccess(false)
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        {success && <Alert severity="success">Login Successful</Alert>}
        {error && <Alert severity="error">{error}</Alert>} {/* Render error if exists */}

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
              <Toaster position='top-center' reverseOrder={false}></Toaster>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="">
                    {"Don't have an account? Sign Up"}

                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
