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

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', maxWidth: '400px', marginRight: 'auto' }}>
            <header>
                <h2>Intro</h2>
            </header>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle /> {/* Icon */}
                <h3>Bio</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={bio} />
            ) : (
                <p>{bio}</p>
            )}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Home /> {/* Icon */}
                <h3>Lives in</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={livesIn} />
            ) : (
                <p>{livesIn}</p>
            )}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LocationOn /> {/* Icon */}
                <h3>From</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={from} />
            ) : (
                <p>{from}</p>
            )}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LocationOn /> {/* Icon */}
                <h3>Location</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={location} />
            ) : (
                <p>{location}</p>
            )}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <School /> {/* Icon */}
                <h3>Education</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={education} />
            ) : (
                <p>{education}</p>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {isEditing ? <button>Save</button> : <button onClick={() => setIsEditing(true)}>Edit Details</button>}
            </Box>
        </Box>
    );
}

export default Introduction;
