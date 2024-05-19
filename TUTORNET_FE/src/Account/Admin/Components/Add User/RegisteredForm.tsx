import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../../../../Components/CSS/CSS';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function RegisteredForm(prop: any) {
    const navigate = useNavigate();
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [showReEnterPassword, setShowReEnterPassword] = useState(false);
    const [hide, setHide] = useState(true);
    const [reEnteredPassword, setReEnteredPassword] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '12345678',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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

    const handleReEnterPasswordChange = (e: any) => {
        setReEnteredPassword(e.target.value);
    };

    const registerAdmin = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/admin/register', { ...formData });

            if (response.status === 200) {
                navigate('/admin/user');
                { prop.function() }
                console.log('Registration successful');
                alert('Registration successful');
            } else if (response.status === 400) {
                setEmailError(true);
            } else {
                setEmailError(true);
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
            alert('error');
            setEmailError(true);
        }
    }

    const handleSubmit = () => {
        setShowReEnterPassword(true)
        setHide(false);
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
                {hide ? (
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                        style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}  >
                        Admin's Register <span style={{ color: Color.SecondaryColor }}>Form</span>
                    </Typography>
                ) : (
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                        style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}  >
                        Enter <span style={{ color: 'red' }}>Your</span>  password

                    </Typography>
                )}
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {hide && (
                            <>
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
                                        helperText={emailError ? "Please enter a valid & unique email" : ""}
                                        inputProps={{
                                            type: "email",
                                        }}
                                    />
                                </Grid>
                            </>
                        )}
                        {showReEnterPassword && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Re-enter Password"
                                    name="reEnteredPassword"
                                    value={reEnteredPassword}
                                    type="password"
                                    onChange={handleReEnterPasswordChange}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} style={{ display: 'block' }}>

                            {hide ? (
                                <Button
                                    id="registerButton"
                                    type="submit"
                                    variant="contained"
                                    className='w-100'
                                    startIcon={<HowToRegIcon />}
                                    style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }}

                                >
                                    Register
                                </Button>
                            ) : (
                                <Button
                                    id="registerButton"
                                    type="submit"
                                    variant="contained"
                                    className='w-100'
                                    startIcon={<CheckIcon />}
                                    style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }}
                                >
                                    Confirm
                                </Button>

                            )}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
