import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider } from '@mui/material';
import { AccountCircle, LocationOn, Home, School } from '@mui/icons-material';
import useCookie from '../../../../Hook/UserAuth';



const Introduction = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState("bio");
    const [livesInText, setLivesInText] = useState("livesIn");
    const [fromText, setFromText] = useState("from");
    const [Classlocations, setClasslocations] = useState("location");
    const [educationText, setEducationText] = useState("education");


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
            });
            console.log('Data updated successfully:', response.data);
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
            {isEditing ? (
                <input
                    type="text"
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{bioText}</p>
            )}
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Home sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Lives in</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    value={livesInText}
                    onChange={(e) => setLivesInText(e.target.value)}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{livesInText}</p>
            )}
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <School sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Education</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    value={educationText}
                    onChange={(e) => setEducationText(e.target.value)}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{educationText}</p>
            )}
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LocationOn sx={{ color: '#004aad', marginRight: '10px' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Class locations</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    value={Classlocations}
                    onChange={(e) => setClasslocations(e.target.value)}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{Classlocations}</p>
            )}

            {/* <Box sx={{ display: 'flex', justifyContent: isEditing ? 'space-between' : 'center', marginTop: '20px' }}>
                {isEditing ? (
                    <>
                        <button
                            onClick={() => setIsEditing(false)}
                            style={{
                                backgroundColor: '#004aad',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'normal',
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: '#004aad',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'normal',
                            }}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{
                            backgroundColor: '#004aad',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'normal',
                        }}
                    >
                        Edit Details
                    </button>
                )}
            </Box> */}
        </Box>
    );
};

export default Introduction;
