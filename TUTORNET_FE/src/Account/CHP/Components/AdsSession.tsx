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
import { Color, Font } from '../../../Components/CSS/CSS';
import { useNavigate } from 'react-router-dom';

interface Ad {
  ads: string;
  location: string;
  status2: string;
  uploadedDay: string;
  _id: string;
  __v: number;
}

function Ads() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [ads, setAds] = React.useState<Ad[]>([]);
  const maxSteps = ads.length;
  const navigate = useNavigate()

  const next = () =>{
    navigate('/Ads')
  }
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
        const filteredAds = response.data.filter((ad: Ad) => ad.status2 === 'Running' && ad.location === 'Landing Page').reverse();
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
      img.src = ads[activeStep]?.ads;
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
              objectFit: 'content',
              display: loading ? 'none' : 'block',
            }}
            src={ads[activeStep]?.ads}
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
      <div className="d-flex justify-content-center">
        <Button variant='outlined' style={{ color: Color.PrimaryColor, fontFamily: Font.PrimaryFont }} onClick={next}>More Advertise </Button>

      </div>
    </Box>
  );
}

export default Ads;
