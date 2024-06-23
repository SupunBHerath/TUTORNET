import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../Account/Admin/Components/Sidebar/AdminNavbar';
import BasicSpeedDial from '../Account/Admin/ChatBot/SpeedDial';


const AdminLayout: React.FC = () => {
  return (
    <div>
      <AdminNavbar />
      <main>
        <BasicSpeedDial />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default AdminLayout;
