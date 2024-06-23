import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Account/CHP/Components/Footer';
import LNavi_Bar from '../Account/CHP/Components/Navi_Bar/STNavi_Bar';
import BasicSpeedDial from '../Account/Admin/ChatBot/SpeedDial';

const LandingLayout: React.FC = () => {
  return (
    <div>
      <div className="position-fixed top-0 w-100" style={{ zIndex: 1000 }}>
        <LNavi_Bar />
      </div>
      <main style={{ paddingTop: '60px' }}>
        <BasicSpeedDial />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LandingLayout;
