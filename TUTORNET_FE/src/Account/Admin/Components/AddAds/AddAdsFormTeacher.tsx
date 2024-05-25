import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Card, CardContent, Grid, MenuItem, TextField, Typography, InputAdornment } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Color, Font } from '../../../../Components/CSS/CSS';
import useCookie from '../../../../Hook/UserAuth';

const AddAdsFormTeacher = () => {
    const { userData } = useCookie();
    const userId = userData.userId;
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [uploadedRec, setUploadedRec] = useState<File | null>(null);
    const [uploadedAds, setUploadeAds] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [payDay, setPayDay] = useState<string>('');
    const [payment, setPayment] = useState<number | ''>('');
   


    const getCurrentDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate);
        maxDate.setDate(currentDate.getDate()-14 ); 
        return maxDate.toISOString().split('T')[0]; 
    };
    
    const getMaxDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate);
        maxDate.setDate(currentDate.getDate() ); 
        return maxDate.toISOString().split('T')[0];   
    };

    useEffect(() => {
        switch (locationFilter) {
            case 'Landing Page':
                setPayment(3000);
                break;
            case 'Wall Page':
                setPayment(2000);
                break;
            case 'Search Page':
                setPayment(1500);
                break;
            default:
                setPayment(0);
        }
    }, [locationFilter]);

    const handleLocationFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationFilter(event.target.value);
    };

    const handleAds = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setError(false);
        if (file) {
            setUploadeAds(file);
        }
    };
    const handleReceipt= (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setError(false);
        if (file) {
            setUploadedRec(file);
        }
    };

   

    const handlePayDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Set maximum date to 15 days in the futur
            setPayDay(event.target.value);
        
    };

    const handleClick = () => {
        const fileInput = document.getElementById('fileInput');
        setError(false);
        fileInput?.click();
    };
    const handleClickAds = () => {
        const fileInput = document.getElementById('fileInputAds');
        setError(false);
        fileInput?.click();
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('ads', uploadedAds!);
            formData.append('rec', uploadedRec!);
            formData.append('location', locationFilter);
            formData.append('userId', userId);
            formData.append('payDay', payDay);
            formData.append('payment', payment.toString());

            const response = await fetch('https://tutornet-5v7a-supunbheraths-projects.vercel.app/reqads', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const mail = await fetch('http://localhost:8080/mail/submit', { method: 'POST' ,body:formData});
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                console.log('Form submitted successfully.');
            } else {
                console.error('Failed to submit form.');
                setError(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(true);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box className='' sx={{ display: 'flex', justifyContent: 'center',  width: 'max-content ' }} >
            <Card sx={{ width: 'max-content ', maxWidth: 400, height: 'auto' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom style={{ fontFamily: Font.PrimaryFont }} className='text-center '>
                        Add New Advertisement
                        
                    </Typography>
                    <div className="alet " style={{height:'58px'}}>
                    {success && <Alert severity="success">Form submitted successfully.</Alert>}
                    {error && <Alert severity="error">Failed to submit form.</Alert>}
                    </div>
                  

                    <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    select
                                    label="Select Location"
                                    value={locationFilter}
                                    onChange={handleLocationFilterChange}
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem value="Landing Page">Landing Page</MenuItem>
                                    <MenuItem value="Wall Page">Wall Page</MenuItem>
                                    <MenuItem value="Search Page">Search Page</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    label="Price"
                                    type="number"
                                    value={payment}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Payment Day"
                                    type="date"
                                    value={payDay}
                                    onChange={handlePayDayChange}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        min: getCurrentDate(), // Call a function to get the current date
                                        max: getMaxDate(),     // Call a function to get the maximum allowed date
                                    }}
                                />
                            </Grid>
                          
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '16px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleClick}
                                >
                                    {uploadedRec ? (
                                        <img
                                            src={URL.createObjectURL(uploadedRec)}
                                            alt="Uploaded"
                                            style={{ maxWidth: '100%', maxHeight: '70px' }}
                                        />
                                    ) : (
                                        <>
                                            <CloudUploadIcon
                                                style={{ fontSize: 48, marginBottom: '8px' }}
                                            />
                                            <p>Upload <span style={{color:Color.PrimaryColor}}>Receipt</span></p>
                                        </>
                                    )}
                                </div>
                                <VisuallyHiddenInput
                                    id="fileInput"
                                    type="file"
                                    onChange={handleReceipt}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '16px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleClickAds}
                                >
                                    {uploadedAds ? (
                                        <img
                                            src={URL.createObjectURL(uploadedAds)}
                                            alt="Uploaded"
                                            style={{ maxWidth: '100%', maxHeight: '70px' }}
                                        />
                                    ) : (
                                        <>
                                            <CloudUploadIcon
                                                style={{ fontSize: 48, marginBottom: '8px' }}
                                            />
                                                <p>Upload <span style={{color:Color.PrimaryColor}}>Ads</span></p>
                                        </>
                                    )}
                                </div>
                                <VisuallyHiddenInput
                                    id="fileInputAds"
                                    type="file"
                                    onChange={handleAds}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={!uploadedRec ||!uploadedAds || !locationFilter || !payDay || payment === ''}
                            sx={{ mt: 3 }}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddAdsFormTeacher;
