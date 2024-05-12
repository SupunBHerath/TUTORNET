import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../../../../Components/CSS/CSS';

export default function RegisteredForm() {
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState({ districts: '' });
    const [formData, setFormData] = useState({

        username: '',
        email: '',
        password: '12345678',
        nickname: '',
        subject: '',

    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDistrictChange = (value: any) => {
        setSelectedDistrict({
            ...selectedDistrict,
            districts: value
        });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/teacher/add', { ...formData, ...selectedDistrict });
            if (response.status === 200) {
                console.log('Registration successful');
                navigate('/student/home');
            } else {
                console.error('Registration failed');
                console.log(response.data);

            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <>
            <Container maxWidth="xs" className=' border  p-3 '>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'block', sm: 'block' } }}
                    style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}  >
                    TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name* "
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nick Name "
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email*"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={districts.map((option) => option.title)}
                                onChange={handleDistrictChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="District"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} style={{ display: 'block' }}>
                            <Button id="registerButton" type="submit" variant="contained" color="primary" className='w-100'>
                                Register
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>



    );
}

const districts = [
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
