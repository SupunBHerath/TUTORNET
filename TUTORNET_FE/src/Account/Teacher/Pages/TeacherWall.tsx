import React from 'react';
import { Box } from '@mui/material';
import StudentPost from '../../Student/StudentPost';
import AdsHome from '../../Student/Componets/Ads/AdsHome';
// import Navi_Bar from '../Components/Navi_Bar/Navi_Bar';
import ProfileCard from '../Components/ProfileCard/ProfileCard';


const TeachWall = () => {
  return (
    <div>
      {/* <Navi_Bar /> */}
      <Box display="flex" justifyContent="space-between" className="bg-body-tertiary" style={{ height: '100vh' }}>
        <Box component="aside" style={{ width: '30%', backgroundColor: '#f0f0f0', overflowY: 'auto',margin:'20px'}} >
            <br />
            <br /><br />
          <ProfileCard />
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

export default TeachWall;
