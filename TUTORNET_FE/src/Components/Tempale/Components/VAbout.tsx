import React, { useEffect, useState } from 'react';
import { Box, Divider,  Typography } from '@mui/material';
import { AccountCircle, LocationOn, School, Home, Facebook, WhatsApp, Language, Telegram } from '@mui/icons-material';
import axios from 'axios';
import useCookie from '../../../Hook/UserAuth';
import { useParams } from 'react-router-dom';
import { Font } from '../../CSS/CSS';

interface FormValues {
  name: string;
  subject: string;
  location: string;
  education: string;
  bio: string;
  livesIn: string;
  fbLink: string;
  whatsappLink: string;
  websiteLink: string;
  telegramLink: string;
}

const fieldOrder = [
  { key: 'name', label: 'Name', icon: <AccountCircle /> },
  { key: 'bio', label: 'Bio', icon: <AccountCircle /> },
  { key: 'livesIn', label: 'Lives in', icon: <Home /> },
  { key: 'education', label: 'Education', icon: <School /> },
  { key: 'subject', label: 'Subject', icon: <AccountCircle /> },
  { key: 'location', label: 'Class locations', icon: <LocationOn /> },
  { key: 'fbLink', label: 'Facebook', icon: <Facebook /> },
  { key: 'whatsappLink', label: 'WhatsApp', icon: <WhatsApp /> },
  { key: 'websiteLink', label: 'Website', icon: <Language /> },
  { key: 'telegramLink', label: 'Telegram', icon: <Telegram /> },
];

const AboutPage: React.FC = () => {
   useCookie();
  const [loading, setLoading] = useState(true);
  const { id, name } = useParams<{ id: string; name?: string }>();

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    subject: '',
    location: '',
    education: '',
    bio: '',
    livesIn: '',
    fbLink: '',
    whatsappLink: '',
    websiteLink: '',
    telegramLink: ''
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
          bio: data.bio,
          livesIn: data.livesIn,
          fbLink: data.fbLink,
          whatsappLink: data.whatsappLink,
          websiteLink: data.websiteLink,
          telegramLink: data.telegramLink
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

      fetchData();
  }, [id]);



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

      {fieldOrder.map((field) => (
        <Box key={field.key} sx={{ marginTop: '10px' }}  >
          <Box sx={{ display: 'flex', alignItems: 'center' }} style={{fontFamily:Font.PrimaryFont,   cursor: "pointer" }} className='px-2' >
            <span style={{color:'#004aad'}}> {field.icon} </span>  
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: '10px' }}style={{fontFamily:Font.PrimaryFont}}>
              {field.label}:
            </Typography>
          </Box>
       
            <Typography variant="body1" sx={{ marginLeft: '35px', marginTop: '5px' }} style={{fontFamily:Font.PrimaryFont,cursor: "pointer"}} className='px-3 text-black-50'>
              {formValues[field.key as keyof FormValues]}
            </Typography>
          <Divider sx={{ borderBottom: '2px solid black', marginTop: '10px' }} />
        </Box>
      ))}
    </Box>
  );
};

export default AboutPage;
