import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../../../../Components/CSS/CSS';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function RegisteredForm( prop:any) {
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nicknameError, setNickNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
   ; // State to hold the selected district value

    const handleDistrictChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
        if (newValue !== null) {
            setSelectedDistrict(newValue)
            setFormData(prevState => ({
                ...prevState,
                district: newValue
            }));     
        }
    };
    const [formData, setFormData] = useState({

        username: '',
        email: '',
        password: '12345678',
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

   

    // error handling for text inputs

    const handleNameChange = (e: any) => {
        handleInputChange(e)
        if (e.target.validity.valid) {
            setNameError(false);
        } else {
            setNameError(true);
        }
    };

    const handleNickNameChange = (e: any) => {
        handleInputChange(e)
        if (e.target.validity.valid) {
            setNickNameError(false);
        } else {
            setNickNameError(true);
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
    const handleSubjectChange = (e: any) => {
        handleInputChange(e)
        if (e.target.validity.valid) {
            setSubjectError(false);
        } else {
            setSubjectError(true);
        }
    };
  


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:8080/teacher/register', { ...formData });
            if (response.status === 200) {
                navigate('/admin/user');
               {prop.function()}
                console.log('Registration successful');
                alert('Registration successful');
            }else if(response.status === 400){
                setEmailError(true)
            }else {
                // alert('Registration failed');
                setEmailError(true)
                console.log(response.data);
            }
        } catch (error) {
            // console.error('Error during registration:', error);
            console.log(error)
            alert('error');
            setEmailError(true)


        }
    };

    return (
        <>
            <Container maxWidth="xs" className=' border  p-3 rounded-4 '>
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
                    Teacher's Register <span style={{ color: Color.SecondaryColor }}>Form</span>

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
                                label="Nick Name "
                                name="nickname"
                                value={formData.nickname}
                                required
                                onChange={handleNickNameChange}
                                error={nicknameError}
                                helperText={
                                    nicknameError ? "Please enter your name (letters and spaces only)" : ""
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
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleSubjectChange}
                                required
                                error={subjectError}
                                helperText={
                                    subjectError ? "Please enter subject (letters and spaces only)" : ""
                                }
                                inputProps={{
                                    pattern: "[A-Za-z ]+",
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={district.map((option) => option.title)}
                                value={selectedDistrict} // Set the value prop to the selectedDistrict state
                                onChange={handleDistrictChange} // Call handleInputChange when a value is selected
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="District"
                                        name="district"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'block' }}>
                            <Button id="registerButton" type="submit" variant="contained" className='w-100' startIcon={<HowToRegIcon />} style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }} >
                                Register
                            </Button>

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
