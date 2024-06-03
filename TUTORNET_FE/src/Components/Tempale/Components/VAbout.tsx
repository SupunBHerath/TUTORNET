import React, { useEffect, useState } from 'react';
import { Box, Divider, CircularProgress, Button, TextField, Typography, LinearProgress } from '@mui/material';
import { AccountCircle, LocationOn, School, Home } from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const VAbout: React.FC = () => {
    const { id } = useParams<{ id: string }>();

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
        const response = await axios.get(`teacher/${id}`);
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

   fetchData()
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };



  if (loading) {
    return <> <br /><LinearProgress/>
    </>;
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
        border: '2px solid #007bff',
        marginBottom:'35px'
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
            <Typography variant="body1" sx={{ marginLeft: '35px', marginTop: '5px' }}>
              {formValues[field.key as keyof FormValues]}
            </Typography>
          <Divider sx={{ borderBottom: '2px solid black', marginTop: '10px' }} />
        </Box>
      ))}
    </Box>

  )
};

export default VAbout;
