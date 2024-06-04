import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';

interface Ad {
  image: string;
  location: string;
}

function Ads() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [ads, setAds] = React.useState<Ad[]>([]);
  const intervalRef = React.useRef<number | null>(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % ads.length);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + ads.length) % ads.length);
  };

  const startAutoLoop = () => {
    intervalRef.current = window.setInterval(() => {
      handleNext();
    }, 8000); 
  };

  const stopAutoLoop = () => {
    intervalRef.current = null;
  };

  React.useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/ads/all');
        const landingAds = response.data.filter((ad: Ad) => ad.location === 'Landing Page');
        setAds(landingAds);
        console.log(landingAds);
        
        startAutoLoop(); 
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
  
    fetchAds();

    return () => {
      stopAutoLoop(); 
    };
  }, []);

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      />
      {ads.length > 0 && (
        <>
          <Box
            component="img"
            sx={{
              height: 400,
              display: 'block',
              maxWidth: 400,
              overflow: 'hidden',
              width: '100%',
            }}
            src="/"
            alt="ad"
          />
          <MobileStepper
            steps={ads.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={ads.length === 0 || activeStep === ads.length - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </>
      )}
    </Box>
  );
}

export default Ads;
