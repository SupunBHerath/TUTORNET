import React, { useEffect, useState } from 'react';
import { Box, Divider, CircularProgress, Button, TextField, Typography } from '@mui/material';
import { AccountCircle, LocationOn, School, Home } from '@mui/icons-material';
import axios from 'axios';
import useCookie from '../../../../Hook/UserAuth';

interface FormValues {
  name: string;
  subject: string;
  location: string;
  education: string;
  mobile: string;
  landline: string;
  bio: string;
  livesIn: string;
 
}

const fieldOrder = [
  { key: 'name', label: 'Name', icon: <AccountCircle /> },
  { key: 'bio', label: 'Bio', icon: <AccountCircle /> },
  { key: 'livesIn', label: 'Lives in', icon: <Home /> },
  { key: 'education', label: 'Education', icon: <School /> },
  { key: 'subject', label: 'subject', icon: <AccountCircle /> },
  { key: 'location', label: 'Class locations ', icon: <LocationOn /> },
  { key: 'mobile', label: 'Mobile', icon: <AccountCircle /> },
  { key: 'landline', label: 'Landline', icon: <AccountCircle /> },

];

const AboutPage: React.FC = () => {
  const { userData, isValidToken } = useCookie();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    subject: '',
    location: '',
    education: '',
    mobile: '',
    landline: '',
    bio: '',
    livesIn: ''
   
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`teacher/${userData.userId}`);
        const data = response.data;
        setFormValues({
          name: data.name,
          subject: data.subject,
          location: data.classlocations,
          education: data.education,
          mobile: data.mobile,
          landline: data.landline,
          bio: data.bio,
          livesIn: data.livesIn
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (isValidToken) {
      fetchData();
    }
  }, [userData, isValidToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    console.log(formValues);
    
    try {
      await axios.put(`teacher/up-bio/${userData.userId}`, formValues);
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '50px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        border: '2px solid #007bff'
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>About</h2>
      </header>
      <Divider sx={{ borderBottom: '2px solid black' }} />

   

      {fieldOrder.map((field, index) => (
        <Box key={field.key} sx={{ marginTop: '10px' }}>
        
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {field.icon}
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
              {field.label}:
            </Typography>
          </Box>
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              name={field.key}
              value={formValues[field.key as keyof FormValues]}
              onChange={handleInputChange}
              sx={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none', marginTop: '5px' }}
            />
          ) : (
            <Typography variant="body1" sx={{ marginLeft: '35px', marginTop: '5px' }}>
              {formValues[field.key as keyof FormValues]}
            </Typography>
          )}
          <Divider sx={{ borderBottom: '2px solid black', marginTop: '10px' }} />
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: isEditing ? 'space-between' : 'center', marginTop: '20px' }}>
        {isEditing ? (
          <>
            <Button variant="contained" color="primary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Edit Details
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AboutPage;
