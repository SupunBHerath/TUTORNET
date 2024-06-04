import { Alert, Box, Button, MenuItem, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const AddAdsForm = () => {
    type FileType = File | null;
    const [uploadedFile, setUploadedFile] = useState<FileType>(null);
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLocationFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationFilter(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadedFile(event.target.files && event.target.files[0]);
        setError(false);
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
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        try {
            if (!uploadedFile) {
                throw new Error('No file uploaded');
            }

            const formData = new FormData();
            formData.append('image', uploadedFile);
            formData.append('location', locationFilter);

            const response = await axios.post('/ads/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                    setSuccess(false);
                    setUploadedFile(null);
                }, 1000);
            } else {
                setError('Unexpected response status: ' + response.status);
            }
        } catch (error: any) {
            console.error('Error uploading image:', error);
            setError(error.message || 'Failed to upload image');
        }
    };

    return (
        <div className="container">
            <Box>
                {success && <Alert severity="success">Uploaded successfully.</Alert>}
                {error && <Alert severity="error">{typeof error === 'string' ? error : 'Failed to upload.'}</Alert>}
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
                    <MenuItem value="Landing Page">Landing Page</MenuItem>
                    <MenuItem value="Wall Page">Wall Page</MenuItem>
                    <MenuItem value="Search Page">Search Page</MenuItem>
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
                {!uploadedFile ? (
                    <>
                        <CloudUploadIcon style={{ fontSize: 48, marginBottom: '8px' }} />
                        <p>Click to upload photo</p>
                    </>
                ) : (
                    <img
                        src={URL.createObjectURL(uploadedFile)}
                        alt="Uploaded"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                )}
            </div>

            <VisuallyHiddenInput
                id="fileInput"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!uploadedFile || !locationFilter}
                style={{ marginTop: '16px' }}
            >
                Submit
            </Button>
        </div>
    );
};

export default AddAdsForm;
