import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Avatar, Rating, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import useCookie from '../../../../Hook/UserAuth';
import TimeDifference from '../../../../Components/TimeDifference/TimeDifference';

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
    const id = userData.userId;
    const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/feedback/${id}`);
                setFeedbackData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
                setError('Error fetching feedback data');
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', height: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Oswald', color: '#333' }}>
                User Feedback
            </Typography>

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
        </Box>
    );
};

export default Feedback;
