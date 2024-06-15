import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider } from '@mui/material';
import { AccountCircle, LocationOn, Home, School, Facebook, WhatsApp, Language, Telegram } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import useCookie from '../../../Hook/UserAuth';

const ViewIntroduction = () => {
    const { userData } = useCookie();
    const { id } = useParams<{ id: string; name?: string }>();

    const [bioText, setBioText] = useState("");
    const [livesInText, setLivesInText] = useState("");
    const [fromText, setFromText] = useState("");
    const [classLocations, setClassLocations] = useState("");
    const [educationText, setEducationText] = useState("");
    const [fbLink, setFbLink] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [telegramLink, setTelegramLink] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/teacher/${id}`);
                const fetchedData = response.data;
                console.log(fetchedData);
                
                // Check the data structure
                if (fetchedData) {
                    setBioText(fetchedData.bio || "No bio available");
                    setLivesInText(fetchedData.livesIn || "No location available");
                    setFromText(fetchedData.from || "No origin available");
                    setClassLocations(fetchedData.classlocations || "No class locations available");
                    setEducationText(fetchedData.education || "No education info available");
                    setFbLink(fetchedData.fbLink || "No Facebook link available");
                    setWhatsappLink(fetchedData.whatsappLink || "No WhatsApp link available");
                    setWebsiteLink(fetchedData.websiteLink || "No website link available");
                    setTelegramLink(fetchedData.telegramLink || "No Telegram link available");
                } else {
                    console.error('Data structure is not as expected:', fetchedData);
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };
        getData();
    }, [id]);

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
            style={{cursor: "pointer"}}
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
            <p className='px-5 text-black-50'>{classLocations}</p>
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

export default ViewIntroduction;
