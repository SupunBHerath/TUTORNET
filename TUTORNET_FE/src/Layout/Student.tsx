import React from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from '../Account/CHP/Components/Footer';
import SNavi_Bar from '../Account/Student/Componets/Nav_bar/Navi_Bar';


const StudentLayout: React.FC = () => {
  return (
    <div>
      <SNavi_Bar/>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default StudentLayout;
