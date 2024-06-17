import React, { useEffect, useState } from 'react';
import { Grid, Typography, Avatar, CircularProgress, Alert, LinearProgress, Rating, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Font } from '../CSS/CSS';

interface Teacher {
  _id: string;
  name: string;
  subject: string;
  profilePicture: string;
  coverPhoto: string;
  userTotalRatings: number;
}

const ViewProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [ratingLoading, setRatingLoading] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        // Fetch teacher details
        const response = await axios.get(`teacher/${id}`);
        setTeacher(response.data);

        // Fetch rating details
        const ratingResponse = await axios.get(`feedback/rating/${id}`);
        setCurrentRating(ratingResponse.data.userTotalRatings);
           
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
        setError('Error fetching teacher profile');
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (loading) {
    return (
      <>
        <br /><br /><br />
        <LinearProgress />
      </>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Grid container direction="column" alignItems="center" className="container">
      <Grid item xs={12} style={{ position: 'relative', width: isSmallScreen ? '100%' : '85%', marginTop: 40 }}>
        <img
          src={teacher?.coverPhoto || ''}
          alt="Cover"
          style={{
            minWidth: '100%',
            maxHeight: '350px',
            minHeight: '350px',
            overflow: 'hidden',
            backgroundColor: 'rgb(98, 100, 102)',
            borderRadius: 20,
          }}
        />
        <Avatar
          alt="Profile Picture"
          src={teacher?.profilePicture || ''}
          sx={{
            width: isSmallScreen ? 200 : 250,
            height: isSmallScreen ? 200 : 250,
            position: 'absolute',
            bottom: isSmallScreen ? -100 : -180,
            left: isSmallScreen ? 'calc(50% - 100px)' : 60,
            border: '2px solid #fff',
          }}
        />
      </Grid>
      <Grid item xs={12} alignItems="center" style={{ textAlign: 'center', marginTop: isSmallScreen ? 70 : 30, marginLeft: isSmallScreen ? 0 : 130 }}>
        <Typography variant="h3" style={{fontFamily:Font.PrimaryFont}}>{teacher?.name}</Typography>
        <Typography variant="h4" style={{fontFamily:Font.PrimaryFont}} className='text-black-50'>{teacher?.subject}</Typography>

        {currentRating !== null && (
          <Box sx={{ marginTop: 2 }}>
            <Rating name="read-only" value={currentRating} readOnly />
          </Box>
        )}

        {ratingLoading && <CircularProgress size={24} />}
      </Grid>
    </Grid>
  );
};

export default ViewProfile;
