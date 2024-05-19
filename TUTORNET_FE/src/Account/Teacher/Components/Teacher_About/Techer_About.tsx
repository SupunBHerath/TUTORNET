import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { AccountCircle, LocationOn, School } from '@mui/icons-material'; // Import icons

interface AboutProps {
    name: string;
    job: string;
    location: string;
    education: string;
    mobile: string;
    landline: string;
    email: string;
}

const AboutPage: React.FC<AboutProps> = ({ name, job, location, education, mobile, landline, email }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
            <header>
                <h2>About</h2>
            </header>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle /> {/* Icon */}
                <h3>Name</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={name} />
            ) : (
                <p>{name}</p>
            )}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle /> {/* Icon */}
                <h3>Job</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={job} />
            ) : (
                <p>{job}</p>
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
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle /> {/* Icon */}
                <h3>Mobile</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={mobile} />
            ) : (
                <p>{mobile}</p>
            )}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle /> {/* Icon */}
                <h3>Landline</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={landline} />
            ) : (
                <p>{landline}</p>
            )}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle /> {/* Icon */}
                <h3>Email</h3>
            </Box>
            {isEditing ? (
                <input type="text" defaultValue={email} />
            ) : (
                <p>{email}</p>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {isEditing ? <button>Save</button> : <button onClick={() => setIsEditing(true)}>Edit Details</button>}
            </Box>
        </Box>
    );
}

export default AboutPage;
