import {  Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';

import Home from './Account/CHP/Home';
import LoginForm from './Components/Login Form/LoginForm';
import RegistrationForm from './Components/Registration Form/RegistrationStudent';
import UserManage from './Account/Admin/Pages/UserManage';
import Landing from './Account/Landing_page/Pages/Landing';
import PaymentManage from './Account/Admin/Pages/PaymentManage';
import axios from 'axios';
import TeacherRegister from './Pages/TeacherRegister';
import StudentRegister from './Pages/StudentRegister';
import Login from './Pages/Login';
import AdsManage from './Account/Admin/Pages/AdsManage';

import TecherHome from './Account/Teacher/Pages/TecherHome';
import Ads from './Account/Teacher/Pages/Ads';
import SearchPage from './Account/Student/SearchPage';
import AdminMain from './Account/Admin/Pages/AdminMain';
import PostPage from './Account/Teacher/Pages/PostPage';




const App = () => {
  axios.defaults.baseURL ='http://localhost:8080'
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Landing" element={<Landing />} />
    

        {/* ----------student  route -------------------------*/}

     

        <Route path="/student" element={<StudentHome />} />
        <Route path="/search" element={<SearchPage/>} />


        {/* ----------teacher  route -------------------------*/}
        <Route path="/teacher" element={<TecherHome />} />
        <Route path="/ads" element={<Ads/>} />
        <Route path="/post" element={<PostPage/>} />

       

        {/* ----------admin  route -------------------------*/}

       

        
        <Route path="admin" element={<AdminMain/>} />
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
