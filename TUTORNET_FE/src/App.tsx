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
import PaymentManage from './Account/Admin/Pages/PaymentManage';
import axios from 'axios';
import TeacherRegister from './Pages/TeacherRegister';
import StudentRegister from './Pages/StudentRegister';
import Login from './Pages/Login';
import CHPNaviBar from './Account/CHP/CHPNaviBar';


const App = () => {
  axios.defaults.baseURL ='http://localhost:8080'
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/Landing" element={<Landing />} />

        {/* ----------student  route -------------------------*/}
        <Route path="/student" element={<StudentHome />} />

        {/* ----------admin  route -------------------------*/}
     
        <Route path="admin" element={<ADashboard />} />
        <Route path="admin/user" element={<UserManage />} />
        <Route path="admin/payment" element={<PaymentManage />} />
      </Routes>
           {/* <Home/> */}

      {/* <StudentHome/> */}
      {/* <ADashboard /> */}

    </div>

  );
};

export default App;
