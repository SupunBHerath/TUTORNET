import  { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { TextField, Button, Container, Grid, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../../../../Components/CSS/CSS';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import useCookie from '../../../../Hook/UserAuth';
var count = 0;
interface type {
    username: string;
    email: string;
    password: string;
}
export default function RegisteredForm() {
    const navigate = useNavigate();
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [confPasswordError, setConfPasswordError] = useState(false);
    const [hide, setHide] = useState(true);
    const [confPassword, setConfPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const{ userData} = useCookie()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: 'admin',
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
        handleInputChange(e);
        setNameError(!e.target.validity.valid);
    };

    const handleEmailChange = (e: any) => {
        handleInputChange(e);
        setEmailError(!e.target.validity.valid);
    };

    const handleConfPasswordChange = (e: any) => {
        setConfPassword(e.target.value);
    };

    const handleSubmitDetails = (e: any) => {
        e.preventDefault();
        if (!nameError && !emailError) {
            setHide(false);
        }
    };

    const handleSubmitPassword = async (e: any) => {
        e.preventDefault();
        count++;
        const email = userData.email;
        const password = confPassword;
        if (count < 3) {
            try {
                const response = await axios.post('/api/login',{email,password})
                const data = await response.data

                if (data.ok) {
                    try {
                        const response = await axios.post('/admin/register', { ...formData });
                        if (response.status === 200) {
                            setSuccess(true);
                            setTimeout(() => {
                                window.location.href
                                navigate('/admin');
                            }, 2000);

                        } else {
                            console.log(response.data);
                        }
                    } catch (error) {
                        console.log(error)
                        setFail(true)
                    }
                } else {
                    setConfPasswordError(true)
                }
            } catch (error) {
                console.error('Error:', error);

            }
        } else {
            navigate('/');
        }
    }


    return (
        <Container maxWidth="xs" className="border p-3 rounded-4">
            {success && <Alert severity="success">Registration successful</Alert>} {/* Render error if exists */}
            {fail && <Alert severity="error">Registration fail</Alert>} {/* Render error if exists */}
            {confPasswordError && <Alert severity="error"> password Incorrect  *{count}/3</Alert>} {/* Render error if exists */}
            <Typography
                variant="h4"
                component="div"
                style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}
            >
                TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span>
            </Typography>
            {hide ? (
                <>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}
                    >
                        Admin's Register <span style={{ color: Color.SecondaryColor }}>Form</span>

                    </Typography>

                    <form onSubmit={handleSubmitDetails}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="username"
                                    onKeyDown={blockNumericInput}
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
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<HowToRegIcon />}
                                    style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>
            ) : (
                <>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}
                    >
                        Re-enter <span style={{ color: 'red' }}>Your</span> password
                    </Typography>
                    <br />
                    <form onSubmit={handleSubmitPassword}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Enter your Password"
                                    name="confPassword"
                                    value={confPassword}
                                    type="password"
                                    required
                                    onChange={handleConfPasswordChange}
                                    error={confPasswordError}
                                    helperText={confPasswordError ? "Please enter your password" : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<CheckIcon />}
                                    style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }}
                                >
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </Container>
    );
}
