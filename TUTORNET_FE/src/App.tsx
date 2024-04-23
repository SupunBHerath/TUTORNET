import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';
// import Signup from './Login_Signup/Signup';
import Check from './Account/Admin/Sidebar/Sidebar';
import Home from './Account/CHP/Home';
import RegistrationForm from './Components/Registration Form/RegistrationForm';
import StudentPost from './Account/Student/StudentPost';
import LoginForm from './Components/Login Form/LoginForm';
import ADashboard from './Account/Admin/ADashboard';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* ----------student  route -------------------------*/}
        <Route path="/student/home" element={<StudentHome />} />

        {/* ----------admin  route -------------------------*/}
        <Route path="/admin" element={<ADashboard />} />
      </Routes>
           {/* <Home/> */}

      {/* <StudentHome/> */}
      {/* <ADashboard /> */}

    </div>

  );
};

export default App;
