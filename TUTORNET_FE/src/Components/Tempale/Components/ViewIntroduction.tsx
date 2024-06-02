import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider } from '@mui/material';
import { AccountCircle, LocationOn, Home, School } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const ViewIntroduction = () => {
    const [bioText, setBioText] = useState("bio");
    const [livesInText, setLivesInText] = useState("livesIn");
    const [fromText, setFromText] = useState("from");
    const [Classlocations, setClasslocations] = useState("location");
    const [educationText, setEducationText] = useState("education");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`teacher/${id}`);
                const fetchedData = response.data;
                console.log(fetchedData);
                
                setBioText(fetchedData.bio);
                setLivesInText(fetchedData.livesIn);
                setFromText(fetchedData.from);
                setClasslocations(fetchedData.classlocations);
                setEducationText(fetchedData.education);
            } catch (error) {
                console.log(error);
            }
        };

        getData()
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '400px',
                margin: 'auto',
                fontFamily: 'Oswald',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)',
                border: '2px solid rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <h2>Intro</h2>
                <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Bio</h3>
            </Box>
            <p>{bioText}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Home sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Lives in</h3>
            </Box>
            <p>{livesInText}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <School sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Education</h3>
            </Box>
            <p>{educationText}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LocationOn sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Class locations</h3>
            </Box>
            <p>{Classlocations}</p>
        </Box>
    );
};

export default ViewIntroduction;
