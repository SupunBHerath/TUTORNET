import React, { useState, useEffect } from 'react';
import AdCard from './AdCard';
import { Grid, Box } from '@mui/material';
import axios from 'axios';
import TimeDifference from '../../../../Components/TimeDifference/TimeDifference';

interface Ad {
  title: string;
  description: string;
  ads: string;
  link: string;
  location: string;
  uploadedDay: string;
  status2: string;
}

const AdsWall: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/ads/all'); 
        const filteredAds = response.data.filter((ad:Ad) => ad.status2 === 'Running').reverse();
        setAds(filteredAds);
        console.log(filteredAds);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
  
    fetchAds();
  }, []);
  

  return (
    <>
    <br /><br />
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="center">

        {ads.map((ad, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <AdCard
              title={ad.title}
              description={<TimeDifference time={ad.uploadedDay} />}
              imageUrl={ad.ads}
              link={ad.link}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default AdsWall;
