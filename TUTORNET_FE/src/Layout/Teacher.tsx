import React from 'react';
import { Outlet } from 'react-router-dom';
import Navi_Bar from '../Account/Teacher/Components/Navi_Bar/Navi_Bar';
import BasicSpeedDial from '../Account/Admin/ChatBot/SpeedDial';


const TeacherLayout: React.FC = () => {
  return (
    <div>
      <Navi_Bar />
      <main>
        <BasicSpeedDial />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default TeacherLayout;
