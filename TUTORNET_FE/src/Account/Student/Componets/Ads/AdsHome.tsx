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

const images = [
  {
    imgPath: '../../../../public/Ads/OIP.jpeg',
  },
  {
    imgPath: '../../../../public/Ads/ads3.jpg',
  },
  {
    imgPath: '../../../../public/Ads/ads2.jpg',
  },
];

function AdsHome() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  React.useEffect(() => {
    const interval = setInterval(handleNext, 30000); // Change slide every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = images[activeStep].imgPath;
    img.onload = () => setLoading(false);
  }, [activeStep]);

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
              maxHeight: 400, // Set a max height
              maxWidth: 600, // Set a max width
              objectFit: 'cover', // Ensure image covers the area
              display: loading ? 'none' : 'block',
            }}
            src={images[activeStep].imgPath}
            alt={`Advertisement ${activeStep + 1}`}
          />
        </Fade>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    </Box>
  );
}

export default AdsHome;
