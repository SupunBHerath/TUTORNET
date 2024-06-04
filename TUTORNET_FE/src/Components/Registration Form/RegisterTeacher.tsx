import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button, Container, Grid, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../CSS/CSS';
interface subject {
  title: any;
}
export default function RegisteredForm(prop: any) {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubject, setselectedSubject] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nicknameError, setNickNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setCPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [Subjects, setSubjects] = useState<subject[]>([]);
  
  useEffect(()=>{
    const subjectData =async ()=>{
      const res = await axios.get('/subject/v');
      setSubjects(res.data);
    } 
    subjectData();
  },[])
  const handleDistrictChange = (event: any, newValue: string | null) => {
    if (newValue !== null) {
      setSelectedDistrict(newValue);
      setFormData(prevState => ({
        ...prevState,
        district: newValue
      }));
    }
  };
  const handleSubjectChange = (event: any, newValue: string | null) => {
    if (newValue !== null) {
      setselectedSubject(newValue);
      setFormData(prevState => ({
        ...prevState,
        subject: newValue
      }));
    }
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nickname: '',
    subject: '',
    district: '',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const blockNumericInput = (e: any) => {
    const charCode = e.which ? e.which : e.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)) {
      e.preventDefault();
    }
  };

  const handleNameChange = (e: any) => {
    setFail(false);

    handleInputChange(e);
    const pattern = /^[A-Za-z ]+$/;
    setNameError(!pattern.test(e.target.value));
  };

  const handleNickNameChange = (e: any) => {
    setFail(false);

    handleInputChange(e);
    const pattern = /^[A-Za-z ]+$/;
    setNickNameError(!pattern.test(e.target.value));
  };

  const handleEmailChange = (e: any) => {
    setFail(false);

    handleInputChange(e);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!pattern.test(e.target.value));
  };

 
  const handlePasswordChange = (e: any) => {
    handleInputChange(e);
    setPasswordError(e.target.value.length < 6);
  };

  const handleConfPasswordChange = (e: any) => {
    handleInputChange(e);
    setCPasswordError(formData.password !== e.target.value);
  };

  const handleSubmit = async (event: any) => {
    setFail(false);

    event.preventDefault();
    try {
      const response = await axios.post('/teacher/register', { ...formData });
      if (response.status === 200) {
        setSuccess(true);
      setEmailError(false);
        setTimeout(() => {
          navigate('/');
        }, 2200);
      } else if (response.status === 400) {
        setEmailError(true);
      } else {
        setEmailError(true);
      }
    } catch (error) {
      setFail(true);
      setEmailError(true);

    }
  };

  const filterOptions = (options: string[], { inputValue }: { inputValue: string }) => {
    return options.filter(option => option.toLowerCase().startsWith(inputValue.toLowerCase())).slice(0, 6); 
  };



  return (
    <>
      <Container maxWidth="xs" className='border p-3 rounded-4'>
        {success && <Alert severity="success">Registration successful</Alert>}
        {fail && <Alert severity="error">Registration failed , Check your email </Alert>}
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{ display: { xs: 'block', sm: 'block' } }}
          style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}>
          TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span>
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'block', sm: 'block' } }}
          style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}>
          Teacher's Register <span style={{ color: Color.SecondaryColor }}>Form</span>
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                helperText={nameError ? "Please enter your name (letters and spaces only)" : ""}
                inputProps={{ pattern: "[A-Za-z ]+" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nick Name"
                name="nickname"
                value={formData.nickname}
                onChange={handleNickNameChange}
                onKeyDown={blockNumericInput}
                error={nicknameError}
                helperText={nicknameError ? "Please enter your nickname (letters and spaces only)" : ""}
                inputProps={{ pattern: "[A-Za-z ]+" }}
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
                helperText={emailError ? "Please enter a valid & unique email" : ""}
                inputProps={{ type: "email" }}
              />
            </Grid>
           
            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                id="subject-autocomplete"
                disableClearable
                options={Subjects.map(option => option.title)}
                value={selectedSubject}
                onChange={handleSubjectChange}
               filterOptions={filterOptions}
               onKeyDown={blockNumericInput}
               
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subject"
                    name="subject"
                    required
                    
                    InputProps={{ ...params.InputProps, type: 'search'   }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                id="district-autocomplete"
                disableClearable
                options={district.map(option => option.title)}
                value={selectedDistrict}
                onChange={handleDistrictChange}
               filterOptions={filterOptions}
               onKeyDown={blockNumericInput}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="District"
                    name="district"
                    required
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
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
                helperText={passwordError ? "Please enter a password (minimum 6 characters)" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="cpassword"
                onChange={handleConfPasswordChange}
                required
                type='password'
                error={cpasswordError}
                helperText={cpasswordError ? "Passwords do not match" : ""}
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'block' }}>
              <Button id="registerButton" type="submit" variant="contained" className='w-100' style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }}>
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <br />
                  Already have an account? <Link to="/login">Login</Link>
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

