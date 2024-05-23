import { Alert, Box, Button, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const AddAdsForm = () => {
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const handleLocationFilterChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocationFilter(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setError(false);
        if (file) {
            setUploadedFile(file);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(60%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleClick = () => {
        const fileInput = document.getElementById('fileInput');
        setError(false);
        fileInput?.click();
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('image', uploadedFile!);
            formData.append('location', locationFilter); // Add location to form data
            const response = await fetch('http://localhost:8080/ads/upload', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                console.log(response)
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                  
                }, 1000);
                console.log('Image uploaded successfully.');
                // Handle success response here, such as displaying a success message
            } else {
                console.error('Failed to upload image.');
                // Handle failure response here, such as displaying an error message
                setError(true);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle network or other errors
            setError(true);

        }
    };

    return (
        <div className='container '>
            <Box>
                {success && <Alert severity="success">uploaded successfully.</Alert>}
                {error && <Alert severity="error">Failed to upload </Alert>}
                <br />
                <TextField
                    required
                    select
                    label="Select Location"
                    value={locationFilter}
                    onChange={handleLocationFilterChange}
                    variant="outlined"
                    sx={{ width: '200px', height: '10px' }}
                >
                    <MenuItem value="Landing Page">Landing page</MenuItem>
                    <MenuItem value="Wall Page">Wall Page</MenuItem>
                    <MenuItem value="Search Page">Search Page</MenuItem>
                    {/* Add more locations if needed */}
                </TextField>
            </Box>
            <br /><br />
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
                {uploadedFile ? (
                    <img
                        src={URL.createObjectURL(uploadedFile)}
                        alt="Uploaded"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                ) : (
                    <>
                        <CloudUploadIcon
                            style={{ fontSize: 48, marginBottom: '8px' }}
                        />
                        <p>Click to upload photo</p>
                    </>
                )}
            </div>

            <VisuallyHiddenInput
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!uploadedFile  || !locationFilter}
                style={{ marginTop: '16px' }}
            >
                Submit
            </Button>
        </div>
    );
};

export default AddAdsForm;
