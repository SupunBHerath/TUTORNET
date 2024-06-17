import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider, TextField, IconButton } from '@mui/material';
import { AccountCircle, LocationOn, Home, School, Facebook, WhatsApp, Language, Telegram } from '@mui/icons-material';
import useCookie from '../../../../Hook/UserAuth';

const Introduction = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState("bio");
    const [livesInText, setLivesInText] = useState("livesIn");
    const [fromText, setFromText] = useState("from");
    const [Classlocations, setClasslocations] = useState("location");
    const [educationText, setEducationText] = useState("education");
    const [fbLink, setFbLink] = useState("facebook");
    const [whatsappLink, setWhatsappLink] = useState("whatsapp");
    const [websiteLink, setWebsiteLink] = useState("website");
    const [telegramLink, setTelegramLink] = useState("telegram");

    const { isValidToken, userData } = useCookie();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`teacher/${userData.userId}`);
                const fetchedData = response.data;
                setBioText(fetchedData.bio);
                setLivesInText(fetchedData.livesIn);
                setFromText(fetchedData.from);
                setClasslocations(fetchedData.classlocations);
                setEducationText(fetchedData.education);
                setFbLink(fetchedData.fbLink);
                setWhatsappLink(fetchedData.whatsappLink);
                setWebsiteLink(fetchedData.websiteLink);
                setTelegramLink(fetchedData.telegramLink);
            } catch (error) {
                console.log(error);
            }
        };

        if (isValidToken && userData.role === 'Teacher') {
            getData();
        }
    }, [isValidToken, userData]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`/teacher/up-bio/${userData.userId}`, {
                bio: bioText,
                livesIn: livesInText,
                location: Classlocations,
                education: educationText,
                fbLink: fbLink,
                whatsappLink: whatsappLink,
                websiteLink: websiteLink,
                telegramLink: telegramLink,
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

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
                <p className='px-5 text-black-50'>{bioText}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Home sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Lives in</h3>
            </Box>
                <p className='px-5 text-black-50'>{livesInText}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <School sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Education</h3>
            </Box>
                <p className='px-5 text-black-50'>{educationText}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LocationOn sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Class locations</h3>
            </Box>
                <p className='px-5 text-black-50'>{Classlocations}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />

            {/* Social Media Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Facebook sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Facebook</h3>
            </Box>
                <p className='px-5 text-black-50'>{fbLink}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <WhatsApp sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>WhatsApp</h3>
            </Box>
                <p className='px-5 text-black-50'>{whatsappLink}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Language sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Website</h3>
            </Box>
                <p className='px-5 text-black-50'>{websiteLink}</p>
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Telegram sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Telegram</h3>
            </Box>
                <p className='px-5 text-black-50'>{telegramLink}</p>
        </Box>
    );
};

export default Introduction;
