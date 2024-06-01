import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { AccountCircle, LocationOn, School } from '@mui/icons-material';

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
    const [formValues, setFormValues] = useState({ name, job, location, education, mobile, landline, email });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginTop: '50px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', border: '2px solid #007bff' }}>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2>About</h2>
            </header>
            <Divider sx={{ borderBottom: '2px solid black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle />
                <h3 style={{ fontSize: '18px', marginLeft: '10px' }}>Name</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{formValues.name}</p>
            )}
            <Divider sx={{ borderBottom: '2px solid black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle />
                <h3 style={{ fontSize: '18px', marginLeft: '10px' }}>Job</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    name="job"
                    value={formValues.job}
                    onChange={handleInputChange}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{formValues.job}</p>
            )}
            <Divider sx={{ borderBottom: '2px solid black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LocationOn />
                <h3 style={{ fontSize: '18px', marginLeft: '10px' }}>Location</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    name="location"
                    value={formValues.location}
                    onChange={handleInputChange}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{formValues.location}</p>
            )}
            <Divider sx={{ borderBottom: '2px solid black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <School />
                <h3 style={{ fontSize: '18px', marginLeft: '10px' }}>Education</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    name="education"
                    value={formValues.education}
                    onChange={handleInputChange}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{formValues.education}</p>
            )}
            <Divider sx={{ borderBottom: '2px solid black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle />
                <h3 style={{ fontSize: '18px', marginLeft: '10px' }}>Mobile</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    name="mobile"
                    value={formValues.mobile}
                    onChange={handleInputChange}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{formValues.mobile}</p>
            )}
            <Divider sx={{ borderBottom: '2px solid black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle />
                <h3 style={{ fontSize: '18px', marginLeft: '10px' }}>Lan line</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    name="landline"
                    value={formValues.landline}
                    onChange={handleInputChange}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{formValues.landline}</p>
            )}
            <Divider sx={{ borderBottom: '2px solid black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <AccountCircle />
                <h3 style={{ fontSize: '18px', marginLeft: '10px' }}>Email</h3>
            </Box>
            {isEditing ? (
                <input
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    style={{ borderColor: 'transparent', outline: 'none', boxShadow: 'none' }}
                />
            ) : (
                <p>{formValues.email}</p>
            )}
            <Box sx={{ display: 'flex', justifyContent: isEditing ? 'space-between' : 'center', marginTop: '20px' }}>
                {isEditing ? (
                    <>
                        <button style={{ backgroundColor: '#004aad', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} onClick={() => setIsEditing(false)}>Cancel</button>
                        <button style={{ backgroundColor: '#004aad', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <button style={{ backgroundColor: '#004aad', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} onClick={() => setIsEditing(true)}>Edit Details</button>
                )}
            </Box>
        </Box>
    );
}

export default AboutPage;
