import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';
// import Signup from './Login_Signup/Signup';
import Check from './Account/Admin/Components/Sidebar/Sidebar';
import Home from './Account/CHP/Home';
import RegistrationForm from './Components/Registration Form/RegistrationForm';
import LoginForm from './Components/Login Form/LoginForm';
import ADashboard from './Account/Admin/ADashboard';
import UserManage from './Account/Admin/Pages/UserManage';
import Landing from './Account/Landing_page/Landing';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/Landing" element={<Landing />} />

        {/* ----------student  route -------------------------*/}
        <Route path="/sudent" element={<StudentHome />} />

        {/* ----------admin  route -------------------------*/}
        <Route path="/admin" element={<ADashboard />} />
        <Route path="/admin/user" element={<UserManage />} />
      </Routes>
           {/* <Home/> */}

      {/* <StudentHome/> */}
      {/* <ADashboard /> */}

    </div>

  );
};

export default App;
