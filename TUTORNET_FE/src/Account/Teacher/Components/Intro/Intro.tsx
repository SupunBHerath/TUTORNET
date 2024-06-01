import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { AccountCircle, LocationOn, Home, School } from '@mui/icons-material'; // Import icons

interface IntroductionProps {
    bio: string;
    livesIn: string;
    from: string;
    location: string;
    education: string;
}

const Introduction: React.FC<IntroductionProps> = ({ bio, livesIn, from, location, education }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState(bio);
    const [livesInText, setLivesInText] = useState(livesIn);
    const [fromText, setFromText] = useState(from);
    const [locationText, setLocationText] = useState(location);
    const [educationText, setEducationText] = useState(education);

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff', // Change background color to white
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '400px',
                margin: 'auto', // Center the box horizontally
                fontFamily: 'Oswald', // Applying "Oswald" font family
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)', // Increase shadow intensity
                border: '2px solid rgba(0, 0, 0, 0.1)', // Add border
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <h2>Intro</h2>
                <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle sx={{ color: '#004aad', marginRight: '10px' }} /> {/* Icon */}
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
                <Home sx={{ color: '#004aad', marginRight: '10px' }} /> {/* Icon */}
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
                <LocationOn sx={{ color: '#004aad', marginRight: '10px' }} /> {/* Icon */}
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>From</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    value={fromText}
                    onChange={(e) => setFromText(e.target.value)}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{fromText}</p>
            )}
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LocationOn sx={{ color: '#004aad', marginRight: '10px' }} /> {/* Icon */}
                <h3 style={{ fontSize: '18px', marginBottom: '0' }}>Location</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{locationText}</p>
            )}
            <Divider sx={{ margin: '10px 0', borderTopWidth: '2px', borderTopStyle: 'solid' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <School sx={{ color: '#004aad', marginRight: '10px' }} /> {/* Icon */}
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
            <Box sx={{ display: 'flex', justifyContent: isEditing ? 'space-between' : 'center', marginTop: '20px' }}>
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
                                fontWeight: 'normal', // Remove bold
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
                                fontWeight: 'normal', // Remove bold
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
                            fontWeight: 'normal', // Remove bold
                        }}
                    >
                        Edit Details


                    </button>
                )}
            </Box>
        </Box>
    );
}

export default Introduction;
