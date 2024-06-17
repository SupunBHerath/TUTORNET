import  { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../CSS/CSS';

import { ToastContainer} from 'react-toastify';


export default function RegistrationStudent(prop: any) {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setCPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const blockNumericInput = (e: any) => {
    const charCode = e.which ? e.which : e.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)) {
      e.preventDefault();
    }
  };
  const [formData, setFormData] = useState({

    username: '',
    email: '',
    password: '',

  });

  const handleInputChange = (event: any) => {
    setFail(false)

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  // error handling for text inputs

  const handleNameChange = (e: any) => {
    setFail(false)

    handleInputChange(e)
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };


  const handleEmailChange = (e: any) => {
    setFail(false)

    handleInputChange(e)
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e: any) => {
    setFail(false)


    handleInputChange(e)
    if (e.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  const handleConfPasswordChange = (e: any) => {
    handleInputChange(e);
    setFail(false)

    const password = formData.password; 
    const cpassword = e.target.value; 
    if (e.target.validity.valid && password === cpassword) {
      setCPasswordError(false);
    } else {
      setCPasswordError(true);
    }
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setFail(false)
  
    try {
      const response = await axios.post('/student/register', { ...formData });
      if (response.status === 200) {
        setSuccess(true);
        
        setTimeout(() => {
          navigate('/');
        }, 2000);

      } else if (response.status === 400) {
        setEmailError(true)
      } else {
        setEmailError(true)
      }
    } catch (error) {
      setFail(true)
      setEmailError(true)



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
                onKeyDown={blockNumericInput}
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

