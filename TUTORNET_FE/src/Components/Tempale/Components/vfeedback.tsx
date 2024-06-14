import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, Typography, Grid, Paper, Avatar, Rating, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import useCookie from '../../../Hook/UserAuth';
import { useParams } from 'react-router-dom';
import TimeDifference from '../../TimeDifference/TimeDifference';

interface FeedbackData {
    userName: string;
    comment: string;
    rating: number;
    avatarUrl: string;
    teacherId: string;
    uploadedDay: string;
    teacherName: string;
}

const Feedback: React.FC = () => {
    const { userData } = useCookie();
    const username = userData.username;
    const { id, name } = useParams<{ id: string; name?: string }>();

    const cleanedName: string = name ? decodeURIComponent(name).replace('&', '') : '';

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
    const [open, setOpen] = useState(false);
    const [newFeedback, setNewFeedback] = useState<FeedbackData>({
        userName: '',
        comment: '',
        rating: 0,
        avatarUrl: '',
        teacherId: '',
        uploadedDay: '',
        teacherName: ''
    });

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`/feedback/${id}`);
                setFeedbackData(response.data);
            } catch (error) {
                setError(true); // Handle error state
            }
        };

        fetchFeedback();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const { name, value } = e.target;
        setNewFeedback({ ...newFeedback, [name]: value });
    };

    const handleRatingChange = (e: React.SyntheticEvent, newValue: number | null) => {
        setError(false);
        if (newValue !== null) {
            setNewFeedback({ ...newFeedback, rating: newValue });
        }
    };

    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    const handleAddFeedback = async () => {
        try {
            setLoading(true); 
            setNewFeedback({ ...newFeedback, userName: username, teacherId: `${id}`, uploadedDay: timestamp, teacherName: cleanedName });

         

            setError(false);

            await axios.post('feedback/', newFeedback);
            setFeedbackData([...feedbackData, newFeedback]);
        
            setLoading(false); 
            handleClose();
        } catch (error) {
            console.error('Error adding feedback:', error);
            // setError(true); 
            setLoading(false); 
        }
    };

    return (
        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', height: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Oswald', color: '#333' }}>
                User Feedback
            </Typography>

            <Box sx={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px' }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Feedback'}
                </Button>
            </Box>
            
            {/* Feedback list */}
            <Grid container spacing={4}>
                {feedbackData.map((feedback, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ padding: '20px', display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                            <Avatar src={feedback.avatarUrl} alt={feedback.userName} sx={{ width: 60, height: 60, marginRight: '20px', border: '2px solid #004aad' }} />
                            <Box>
                                <Typography variant="h5" sx={{ fontFamily: 'Oswald', color: '#004aad' }}>{feedback.userName}</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'Oswald', color: '#059ead' }}>{<TimeDifference time={feedback.uploadedDay} />}</Typography>
                                <Typography variant="body1" sx={{ marginBottom: '10px', color: '#555' }}>{feedback.comment}</Typography>
                                <Rating name="read-only" value={feedback.rating} readOnly sx={{ color: '#ff9800' }} />
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Add Feedback dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Feedback</DialogTitle>
                {error && <Alert severity="error">All fields are required</Alert>}

                <DialogContent>
                    <TextField
                        margin="dense"
                        name="comment"
                        label="Comment"
                        type="text"
                        required
                        fullWidth
                        value={newFeedback.comment}
                        onChange={handleInputChange}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography sx={{ marginRight: '10px' }}>Rating:</Typography>
                        <Rating
                            name="rating"
                            value={newFeedback.rating}
                            onChange={handleRatingChange}
                            sx={{ color: '#ff9800' }}
                            aria-required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddFeedback} color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Feedback;
