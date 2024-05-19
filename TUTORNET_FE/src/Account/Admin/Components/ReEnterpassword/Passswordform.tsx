import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Color, Font } from '../../../../Components/CSS/CSS';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function RegisteredForm( prop:any) {
    const navigate = useNavigate();
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);



    const [formData, setFormData] = useState({ password: '12345678'
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   

    // error handling for text inputs

    const handlePasswordChange = (e: any) => {
        handleInputChange(e)
        if (e.target.validity.valid) {
            setNameError(false);
        } else {
            setNameError(true);
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
            
            }else {
         
                console.log(response.data);
            }
        } catch (error) {
            // console.error('Error during registration:', error);
            console.log(error)
    


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
           
              
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                value={formData.password}
                                required
                                onChange={handlePasswordChange}
                                error={nameError}
                                helperText={
                                    passwordError ? "Please enter your password " : ""
                                }
                             
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'block' }}>
                            <Button id="registerButton" type="submit" variant="contained" className='w-100' startIcon={<HowToRegIcon />} style={{ backgroundColor: Color.PrimaryColor, padding: '10px' }} >
                            confirm
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>



    );
}
