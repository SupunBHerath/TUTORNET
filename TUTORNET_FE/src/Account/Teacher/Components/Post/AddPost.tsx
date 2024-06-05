import { Alert, Box, Button, LinearProgress, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import useCookie from '../../../../Hook/UserAuth';
import axios from 'axios';

const AddPost = () => {
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const {userData} = useCookie();
    const [progress , setProgress] =useState(false);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setError(false);
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleTitleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
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
        setProgress(true);
        formData.append('image', uploadedFile!);
        formData.append('username', userData.username);
        formData.append('userId', userData.userId);
        formData.append('title', title);
        formData.append('description', description);
    
        const response = await axios.post('/post/upload', formData);
         console.log(response.data);
         const message = response.data.message;
        if (message === 'Successfully uploaded post') {
          setProgress(false);
          setSuccess(true);
          setError(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log('Image uploaded successfully.');
        } else {
          console.error('Failed to upload image.');
          setError(true);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setError(true);
        setProgress(false);
      }
    };
    

    return (
        <div className='container w-100 '>
            <Box >
                {progress && (<LinearProgress />)}
                {success && <Alert severity="success">uploaded successfully.</Alert>}
                {error && <Alert severity="error">Failed to upload </Alert>}
                <br />
                {/* <TextField
                    id="title"
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '16px' }}
                /> */}
                <TextField
                    id="description"
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    style={{ marginBottom: '16px',width:'400px' }}
                />
               
            </Box>
        
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
                disabled={!uploadedFile   || !description }
                style={{ marginTop: '16px',width: '100%'  }}
            >
                Submit
            </Button>
        </div>
    );
};

export default AddPost;
