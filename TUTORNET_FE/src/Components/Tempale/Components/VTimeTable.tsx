import React, { useState, useEffect } from 'react';
import { Box, Typography} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface TimeTableEntry {
    _id: string; 
    description: string;
    image: string;
}

const VTimeTable: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [timeTableEntries, setTimeTableEntries] = useState<TimeTableEntry[]>([]);
    useEffect(() => {
        fetchTimeTableEntries();
    }, []);

    const fetchTimeTableEntries = async () => {
        try {
            const response = await axios.get(`teacher/timeTable/${id}`);  
            setTimeTableEntries(response.data.data);
        } catch (error) {
            console.error('Error fetching time table entries:', error);
        }
    };

    return (
        <Box sx={{ padding: '20px', position: 'relative' }}>
            <Typography variant="h4" gutterBottom>TIME TABLE</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {timeTableEntries.map((entry, _index) => (
                    <Box 
                        key={entry._id} 
                        sx={{ 
                            backgroundColor: '#ffffff', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            width: 'calc(33.333% - 20px)', 
                            boxSizing: 'border-box',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                            border: '1px solid #e0e0e0', 
                            transition: 'transform 0.2s', 
                            '&:hover': { 
                                transform: 'scale(1.02)',
                            },
                            position: 'relative'
                        }}
                    >
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                marginTop: '5px', 
                                fontSize: '0.8rem', 
                                wordWrap: 'break-word' 
                            }}
                        >
                            {entry.description}
                        </Typography>
                        <img 
                            src={entry.image} 
                            alt="Time Table Entry" 
                            style={{ 
                                maxWidth: '100%', 
                                height: 'auto', 
                                borderRadius: '5px',
                                marginTop: '10px'
                            }} 
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default VTimeTable;
