import React from 'react';
import { Outlet } from 'react-router-dom';
import Navi_Bar from '../Account/Teacher/Components/Navi_Bar/Navi_Bar';


const TeacherLayout: React.FC = () => {
  return (
    <div>
      <Navi_Bar/>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default TeacherLayout;
