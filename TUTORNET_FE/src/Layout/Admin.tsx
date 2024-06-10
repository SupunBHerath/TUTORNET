import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../Account/Admin/Components/Sidebar/AdminNavbar';


const AdminLayout: React.FC = () => {
  return (
    <div>
      <AdminNavbar/>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default AdminLayout;
