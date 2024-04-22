import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';
// import Signup from './Login_Signup/Signup';
import AdminHome from './Account/Admin/AdminHome';
import Check from './Account/Admin/Check';
import Home from './Account/CHP/Home';
import RegistrationForm from './Components/Registration Form/RegistrationForm';
import StudentPost from './Account/Student/StudentPost';
import LoginForm from './Components/Login Form/LoginForm';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path="/student/home" element={<StudentHome/>} />
      </Routes>
      
    {/* <StudentHome/> */}
      

    </div>

  );
};

export default App;
