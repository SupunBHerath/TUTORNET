import * as React from 'react';
import { Card, CardContent, Avatar, Typography, Box, CircularProgress, Grid, Button, LinearProgress } from '@mui/material';
import axios from 'axios';
import useCookie from '../../../Hook/UserAuth';
import { useNavigate } from 'react-router-dom';

const ProfileCard: React.FC = () => {
  const [studentData, setStudentData] = React.useState<any | null>(null);
  const [teacherCount, setTeacherCount] = React.useState<number | null>(null);
  const [postCount, setPostCount] = React.useState<number | null>(null);
  const [adsCount, setAdsCount] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { userData } = useCookie();
  const studentId = userData.userId;
 const naviget = useNavigate();
 const navigetProfile =  ()=>{
    naviget('/student/profile');

 }  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`/student/${studentId}`);
        setStudentData(studentResponse.data);

        const teacherCountResponse = await axios.get('/teacher/all');
        setTeacherCount(teacherCountResponse.data.length);

        const postCountResponse = await axios.get('/post/all');
        setPostCount(postCountResponse.data.length);

        const adsCountResponse = await axios.get('/ads/all');
        setAdsCount(adsCountResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!studentData) {
    return <LinearProgress/>
  }

  const { name, email } = studentData;

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
              {name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5">{name}</Typography>
            <Typography color="textSecondary">{email}</Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Total Teachers:</span> {teacherCount}
          </Typography>
          <br />
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Total Posts:</span> {postCount}
          </Typography>
          <br />
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Total Ads:</span> {adsCount}
          </Typography>
          <br />
        </Box>
        <Box mt={3} className="justify-content-center d-flex" >
          <Button variant="contained" color="primary" onClick={navigetProfile}>
            View Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
