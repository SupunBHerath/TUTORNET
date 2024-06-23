import { Box } from '@mui/material';
import StudentPost from './StudentPost';
import ProfileCard from './Componets/ProfileCard';
import AdsHome from './Componets/Ads/AdsHome';


const StudentHome = () => {
  return (
    <>
      <br /><br /><br /> 
       <Box
 
        display="flex"
        justifyContent="space-between"
        sx={{ height: '100vh', flexDirection: { xs: 'column', md: 'row' }, padding: '20px', backgroundColor: '#f0f0f5' }}
      >
        <Box
          component="aside"
          sx={{
            width: { xs: '100%', md: '30%' },

            overflowY: 'auto',
            display: { xs: 'none', md: 'block' },
            margin: { md: '20px' }
          }}
        >
          <ProfileCard />
        </Box>

        <Box
          component="main"
          sx={{
            width: { xs: '100%', md: '35%' },
            overflowY: 'auto',
            height: '100%',
            margin: { xs: '0', md: '0 20px' }
          }}
        >
          <StudentPost />
        </Box>
        <Box
          component="aside"
          sx={{
            width: { xs: '100%', md: '30%' },
            overflowY: 'auto',
            display: { xs: 'none', md: 'block' },
            margin: { md: '20px' }
          }}
        >
          <AdsHome />
        </Box>
      </Box>
    </>

  );
};

export default StudentHome;
