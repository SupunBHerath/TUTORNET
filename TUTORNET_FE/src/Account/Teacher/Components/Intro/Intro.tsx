import React, { useState } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

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
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', width: '300px', marginRight: 'auto' }}>
            <header>
                <h2>Intro</h2>
            </header>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <h3>Bio</h3>
                <p>{isEditing ? <input type="text" defaultValue={bio} /> : bio}</p>
                <IconButton onClick={() => setIsEditing(!isEditing)}>
                    <Edit />
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <h3>Lives in</h3>
                <p>{isEditing ? <input type="text" defaultValue={livesIn} /> : livesIn}</p>
                <IconButton onClick={() => setIsEditing(!isEditing)}>
                    <Edit />
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <h3>From</h3>
                <p>{isEditing ? <input type="text" defaultValue={from} /> : from}</p>
                <IconButton onClick={() => setIsEditing(!isEditing)}>
                    <Edit />
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <h3>Location</h3>
                <p>{isEditing ? <input type="text" defaultValue={location} /> : location}</p>
                <IconButton onClick={() => setIsEditing(!isEditing)}>
                    <Edit />
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <h3>Education</h3>
                <p>{isEditing ? <input type="text" defaultValue={education} /> : education}</p>
                <IconButton onClick={() => setIsEditing(!isEditing)}>
                    <Edit />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button>Edit Details</button>
            </Box>
        </Box>
    );
}

export default Introduction;
