import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button, Container, Grid, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../CSS/CSS';
import { ToastContainer, toast } from 'react-toastify';

export default function RegistrationStudent(prop: any) {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setCPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);


  const [formData, setFormData] = useState({

    username: '',
    email: '',
    password: '',

  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  // error handling for text inputs

  const handleNameChange = (e: any) => {
    handleInputChange(e)
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };


  const handleEmailChange = (e: any) => {
    handleInputChange(e)
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e: any) => {


    handleInputChange(e)
    if (e.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  const handleConfPasswordChange = (e: any) => {
    handleInputChange(e);

    const password = formData.password; // Get the value of the password field
    const cpassword = e.target.value; // Get the value of the confirm password field
    console.log(password, cpassword)
    if (e.target.validity.valid && password === cpassword) {
      setCPasswordError(false);
    } else {
      setCPasswordError(true);
    }
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:8080/student/register', { ...formData });
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);

      } else if (response.status === 400) {
        setEmailError(true)
      } else {
        setEmailError(true)
        console.log(response.data);
      }
    } catch (error) {
      console.log(error)
      setFail(true)


    }
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="xs" className=' border  p-3 rounded-4 '>
        {success && <Alert severity="success">Registration successful</Alert>} {/* Render error if exists */}
        {fail && <Alert severity="error">Registration fail</Alert>} {/* Render error if exists */}
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{ display: { xs: 'block', sm: 'block' } }}
          style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}  >
          TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span>

        </Typography>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'block', sm: 'block' } }}
          style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}  >
          Student's Register <span style={{ color: Color.SecondaryColor }}>Form</span>

        </Typography>

        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="username"
                value={formData.username}
                required
                onChange={handleNameChange}
                error={nameError}
                helperText={
                  nameError ? "Please enter your name (letters and spaces only)" : ""
                }
                inputProps={{
                  pattern: "[A-Za-z ]+",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email*"
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? "Please enter a valid & uniqe email" : ""}
                inputProps={{
                  type: "email",
                }}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                type='password'
                error={passwordError}
                helperText={
                  passwordError ? "Please enter password " : ""
                }

              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} style={{ display: 'block' }}>
              <Button id="registerButton" type="submit" variant="contained" className='w-100' style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }} >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <br />
                  Already have an account?  <Link to="/login" >Sign in </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>



  );
}


const district = [
  { title: 'Ampara' },
  { title: 'Anuradhapura' },
  { title: 'Badulla' },
  { title: 'Batticaloa' },
  { title: 'Colombo' },
  { title: 'Galle' },
  { title: 'Gampaha' },
  { title: 'Hambantota' },
  { title: 'Jaffna' },
  { title: 'Kalutara' },
  { title: 'Kandy' },
  { title: 'Kegalle' },
  { title: 'Kilinochchi' },
  { title: 'Kurunegala' },
  { title: 'Mannar' },
  { title: 'Matale' },
  { title: 'Matara' },
  { title: 'Monaragala' },
  { title: 'Mullaitivu' },
  { title: 'Nuwara Eliya' },
  { title: 'Polonnaruwa' },
  { title: 'Puttalam' },
  { title: 'Ratnapura' },
  { title: 'Trincomalee' },
  { title: 'Vavuniya' }
];
