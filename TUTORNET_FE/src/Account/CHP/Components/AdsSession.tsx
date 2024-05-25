import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import amith from '../../../../public/Ads/ads3.jpg'; // Unused import?

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

function Ads() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    // Check if the current active step is the last one
    if (activeStep === maxSteps - 1) {
      // If it's the last step, do not change the activeStep
      return;
    }
    // If it's not the last step, proceed with changing the activeStep
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    // Check if the current active step is the first one
    if (activeStep === 0) {
      // If it's the first step, do not change the activeStep
      return;
    }
    // If it's not the first step, proceed with changing the activeStep
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [activeStep]);

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
      >
       
      </Paper>
      <Box
        component="img"
        sx={{
          height: 400,
          display: 'block',
          maxWidth: 400,
          overflow: 'hidden',
          width: '100%',
        }}
        src={images[activeStep].imgPath}
        alt='loading'
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
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
    </Box>
  );
}

export default Ads;
