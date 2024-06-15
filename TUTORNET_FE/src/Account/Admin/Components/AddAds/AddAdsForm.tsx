import { Alert, Box, LinearProgress, MenuItem, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import useCookie from '../../../../Hook/UserAuth';
import LoadingButton from '@mui/lab/LoadingButton';

const AddAdsForm = () => {
    type FileType = File | null;
    const [uploadedFile, setUploadedFile] = useState<FileType>(null);
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
    const [prosses, setProgress] = useState(false);
    const { userData } = useCookie();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [ads, setAds] = useState<any[]>([]);
    const [filteredAds, setFilteredAds] = useState<any[]>([]);

    useEffect(() => {
        fetchAds();
    }, []);

    useEffect(() => {
        filterAds();
    }, [locationFilter, ads]);

    const fetchAds = async () => {
        try {
            const response = await axios.get('/ads/all');
            if (response.status === 200) {
                setAds(response.data);
            }
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };

    const filterAds = () => {
        if (locationFilter) {
            const filtered = ads.filter(ad => ad.location === locationFilter);
            setFilteredAds(filtered);
        } else {
            setFilteredAds(ads);
        }
    };

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
            setProgress(true);
            const formData = new FormData();
            formData.append('ads', uploadedFile);
            formData.append('location', locationFilter);
            formData.append('userId', userData.userId);

            const response = await axios.post('/ads/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setProgress(false);
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                    setSuccess(false);
                    setUploadedFile(null);
                }, 1000);
                fetchAds(); 
            } else {
                setError('Unexpected response status: ' + response.status);
            }
        } catch (error: any) {
            console.error('Error uploading image:', error);
            setError(error.message || 'Failed to upload image');
        } finally {
            setProgress(false);
        }
    };

    return (
        <div className="container">
            <Box>
                {success && <Alert severity="success">Uploaded successfully.</Alert>}
                {error && <Alert severity="error">{typeof error === 'string' ? error : 'Failed to upload.'}</Alert>}
                {prosses && <LinearProgress />}
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
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!uploadedFile || !locationFilter}
                loading={prosses}
                style={{ marginTop: '16px' }}
            >
                Submit
            </LoadingButton>

            <div className="ads-list">
                {filteredAds.map(ad => (
                    <Box key={ad._id} mb={2} p={2} border={1} borderColor="grey.400" borderRadius={4}>
                        <p>Location: {ad.location}</p>
                        <img src={ad.ads} alt="Ad" style={{ maxWidth: '100%' }} />
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default AddAdsForm;
