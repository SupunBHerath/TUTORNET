import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';
// import Signup from './Login_Signup/Signup';
import Check from './Account/Admin/Components/Sidebar/Sidebar';
import Home from './Account/CHP/Home';
import RegistrationForm from './Components/Registration Form/RegistrationStudent';
import ADashboard from './Account/Admin/Pages/ADashboard';
import UserManage from './Account/Admin/Pages/UserManage';
import Landing from './Account/Landing_page/Landing';
import PaymentManage from './Account/Admin/Pages/PaymentManage';
import axios from 'axios';
import TeacherRegister from './Pages/TeacherRegister';
import StudentRegister from './Pages/StudentRegister';
import Login from './Pages/Login';
import CHPNaviBar from './Account/CHP/CHPNaviBar';
import AdsManage from './Account/Admin/Pages/AdsManage';
import TecherHome from './Account/Teacher/Pages/TecherHome';
import AdminNavbar from './Account/Admin/Components/Sidebar/AdminNavbar';
import Ads from './Account/Teacher/Pages/Ads';
import SearchPage from './Account/Student/SearchPage';



const App = () => {
  axios.defaults.baseURL ='http://localhost:8080'
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/reg/teacher" element={<TeacherRegister />} />
        <Route path="/reg/student" element={<StudentRegister />} />
      
        {/* ----------student  route -------------------------*/}
        <Route path="/student" element={<StudentHome />} />
        <Route path="/search" element={<SearchPage/>} />

        {/* ----------teacher  route -------------------------*/}
        <Route path="/teacher" element={<TecherHome />} />
        <Route path="/ads" element={<Ads/>} />

        {/* ----------admin  route -------------------------*/}
        
        <Route path="admin" element={<AdminNavbar />} />
        <Route path="admin/user" element={<UserManage />} />
        <Route path="admin/payment" element={<PaymentManage />} />
        <Route path="admin/ads" element={<AdsManage />} />
      </Routes>
           {/* <Home/> */}

      {/* <StudentHome/> */}
      {/* <ADashboard /> */}

    </div>

  );
};

export default App;
