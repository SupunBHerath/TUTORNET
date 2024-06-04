import {  Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';

import Home from './Account/CHP/Home';
import LoginForm from './Components/Login Form/LoginForm';
import UserManage from './Account/Admin/Pages/UserManage';
import Landing from './Account/Landing_page/Landing';
import PaymentManage from './Account/Admin/Pages/PaymentManage';
import axios from 'axios';
import TeacherRegister from './Pages/TeacherRegister';
import StudentRegister from './Pages/StudentRegister';
import TecherHome from './Account/Teacher/Pages/TecherHome';
import Ads from './Account/Teacher/Pages/Ads';
import SearchPage from './Account/Student/SearchPage';
import AdminMain from './Account/Admin/Pages/AdminMain';
import PostPage from './Account/Teacher/Pages/PostPage';
import TeacherWall from './Account/Teacher/Pages/TeacherWall';
import TeacherProfile from './Components/Tempale/TeacherProfile';
import FrogetPassword from './Components/Login Form/FrogetPassword';




const App = () => {
  axios.defaults.baseURL ='http://localhost:8080'
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/fp" element={<FrogetPassword/>} />
        {/* <Route path="/register" element={<RegistrationForm />} /> */}
        <Route path="/Landing" element={<Landing />} />
        <Route path="/reg/teacher" element={<TeacherRegister />} />
        <Route path="/reg/student" element={<StudentRegister />} />
        <Route path="/teacher/:id/:name" element={<TeacherProfile />} />
    

        {/* ----------student  route -------------------------*/}

     

        <Route path="/student" element={<StudentHome />} />
        <Route path="/search" element={<SearchPage/>} />


        {/* ----------teacher  route -------------------------*/}
        <Route path="/teacher" element={<TeacherWall />} />
        <Route path="/teacher/ads" element={<Ads/>} />
        <Route path="/teacher/post" element={<PostPage/>} />
        <Route path="/teacher/profile" element={<TecherHome/>} />

       

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
