import React from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from '../Account/CHP/Components/Footer';
import SNavi_Bar from '../Account/Student/Componets/Nav_bar/Navi_Bar';
import BasicSpeedDial from '../Account/Admin/ChatBot/SpeedDial';


const StudentLayout: React.FC = () => {
  return (
    <div>
      <SNavi_Bar />
      <main>
        <BasicSpeedDial />

        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default StudentLayout;
