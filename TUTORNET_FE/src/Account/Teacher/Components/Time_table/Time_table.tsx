import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, Menu, MenuItem, Modal } from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
import axios from 'axios';
import useCookie from '../../../../Hook/UserAuth';

interface TimeTableEntry {
    _id: string; 
    description: string;
    image: string;
}

const TimeTablePage: React.FC = () => {
    const [timeTableEntries, setTimeTableEntries] = useState<TimeTableEntry[]>([]);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isAddingEntry, setIsAddingEntry] = useState(false);
    const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
    const {userData,isValidToken} =useCookie()
    const userId=userData.userId
    useEffect(() => {
        fetchTimeTableEntries();
    }, [isValidToken]);

    const fetchTimeTableEntries = async () => {
        try {
            const response = await axios.get(`teacher/timeTable/${userId}`);  
            setTimeTableEntries(response.data.data);
        } catch (error) {
            console.error('Error fetching time table entries:', error);
        }
    };

    const handleAddEntry = () => {
        setIsAddingEntry(true);
    };

    const handleCancelEntry = () => {
        setDescription('');
        setImage(null);
        setIsAddingEntry(false);
        setEditingEntryId(null);
    };

    const handleSubmitEntry = async () => {
        if (description.trim() === '' && !image && editingEntryId === null) {
            alert('Please enter a description or upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {

            let response;
            if (editingEntryId) {
                response = await axios.put(`/teacher/timeTable/${userId}/${editingEntryId}`, formData); 
                setTimeTableEntries([...timeTableEntries]);
            } else {
                response = await axios.post(`/teacher/timeTable/${userId}`, formData); 
                setTimeTableEntries([...timeTableEntries, response.data.data]);
            }
           
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error('Error submitting time table entry:', error);
        }

        setIsAddingEntry(false);
    };

    const handleEditEntry = (entryId: string) => {
        const entryToEdit = timeTableEntries.find(entry => entry._id === entryId);
        if (entryToEdit) {
            setDescription(entryToEdit.description);
            setEditingEntryId(entryId);
            setIsAddingEntry(true);
        }
        setAnchorEl(null);
    };

    const handleDeleteEntry = async (entryId: string) => {
        try {
            await axios.delete(`/teacher/timeTable/${userId}/${entryId}`);
            const updatedEntries = timeTableEntries.filter(entry => entry._id !== entryId);
            setTimeTableEntries(updatedEntries);
        } catch (error) {
            console.error('Error deleting time table entry:', error);
        }
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, entryId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedEntryId(entryId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ padding: '20px', position: 'relative' }}>
            <Typography variant="h4" gutterBottom>TIME TABLE</Typography>
            <Button 
                variant="contained" 
                startIcon={<Add />} 
                onClick={handleAddEntry} 
                sx={{ position: 'absolute', top: 0, right: 0, marginTop: '10px', marginRight: '10px' }}
            >
                Add
            </Button>
            <Modal
                open={isAddingEntry}
                onClose={handleCancelEntry}
                aria-labelledby="add-entry-modal-title"
                aria-describedby="add-entry-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="add-entry-modal-title" variant="h6" component="h2">
                        {editingEntryId ? 'Edit Entry' : 'Add New Entry'}
                    </Typography>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: '10px', marginTop: '10px' }}
                    />
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <Button variant="outlined" onClick={handleCancelEntry}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmitEntry}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
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
                        <Box sx={{ position: 'absolute', top: '5px', right: '5px' }}>
                            <IconButton onClick={(e) => handleMenuOpen(e, entry._id)}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && selectedEntryId === entry._id}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => handleEditEntry(entry._id)}>Edit</MenuItem>
                                <MenuItem onClick={() => handleDeleteEntry(entry._id)}>Delete</MenuItem>
                            </Menu>
                        </Box>
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

export default TimeTablePage;
