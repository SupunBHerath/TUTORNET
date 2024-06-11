import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import axios from 'axios';

interface Ad {
  image: string;
  location: string;
  uploadedDay: string;
  _id: string;
  __v: number;
}

function AdsHome() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [ads, setAds] = React.useState<Ad[]>([]);
  const maxSteps = ads.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  React.useEffect(() => {
    const interval = setInterval(handleNext, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [ads]);

  React.useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/ads/all'); 
        console.log(response.data);
        
        const filteredAds = response.data.filter((ad:Ad) => ad.location === 'Wall Page');
        console.log(filteredAds);
        setAds(filteredAds);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  React.useEffect(() => {
    if (ads.length > 0) {
      setLoading(true);
      const img = new Image();
      img.src = ads[activeStep]?.image;
      img.onload = () => setLoading(false);
    }
  }, [activeStep, ads]);

  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Box component="span" sx={{ flex: '1 1 auto' }} />
      </Paper>
      <Box
        sx={{
          position: 'relative',
          height: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {loading && <CircularProgress />}
        <Fade in={!loading} timeout={500}>
          <Box
            component="img"
            sx={{
              height: '100%',
              width: '100%',
              maxHeight: 400,
              maxWidth: 600,
              objectFit: 'cover',
              display: loading ? 'none' : 'block',
            }}
            src={ads[activeStep]?.image}
            alt={`Advertisement ${activeStep + 1}`}
          />
        </Fade>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={maxSteps === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={maxSteps === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    </Box>
  );
}

export default AdsHome;
