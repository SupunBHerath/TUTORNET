import React from 'react';
import { Box, Grid } from '@mui/material';
import StudentPost from './StudentPost';
import AdsHome from './Componets/Ads/AdsHome';
import SNavi_Bar from './Componets/Nav_bar/Navi_Bar';


const AppLayout = () => {
  return (
    <div>
      <SNavi_Bar />
      <Box display="flex" justifyContent="space-between" className="bg-body-tertiary" style={{ height: '100vh' }}>
        <Box component="aside" style={{ width: '30%', backgroundColor: '#f0f0f0', overflowY: 'auto',margin:'20px'}} >
            <br />
            <br />
          <AdsHome />
        </Box>
        <Box component="main" style={{ width: '35%', overflowY: 'auto', height: '100%' }}>
            <br /><br /><br /><br />
          <StudentPost />
        </Box>
        <Box component="aside" style={{ width: '30%', backgroundColor: '#f0f0f0', overflowY: 'auto',margin:'20px' }}>
            <br />
            <br />
          <AdsHome />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
