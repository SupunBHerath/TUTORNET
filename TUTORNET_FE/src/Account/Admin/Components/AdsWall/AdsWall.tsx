import React, { useState, useEffect } from 'react';
import AdCard from './AdCard';
import { Grid, Box } from '@mui/material';
import axios from 'axios';
import TimeDifference from '../../../../Components/TimeDifference/TimeDifference';
import Facebook from '../../../../Components/LodingPost/LodingPost';

interface Ad {
  title: string;
  description: string;
  image: string;
  link: string;
  location: string;
  uploadedDay: string;
}

const AdsWall: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/ads/all'); 
        const filteredAds = response.data.reverse();
        setAds(filteredAds);
        console.log(filteredAds);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="center">

        {ads.map((ad, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <AdCard
              title={ad.title}
              description={<TimeDifference time={ad.uploadedDay} />}
              imageUrl={ad.image}
              link={ad.link}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdsWall;
