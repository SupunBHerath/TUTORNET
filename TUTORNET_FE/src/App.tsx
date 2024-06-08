import {  Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';
import Home from './Account/CHP/Home';
import LoginForm from './Components/Login Form/LoginForm';
import UserManage from './Account/Admin/Pages/UserManage';
import Landing from './Account/Landing_page/Pages/Landing';
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
import Profile from './Account/Student/Profile';
import SearchPageT from './Account/Teacher/Pages/search';




const App = () => {
  axios.defaults.baseURL ='https://tutornet-5v7a-supunbheraths-projects.vercel.app/'
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/fp" element={<FrogetPassword/>} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/reg/teacher" element={<TeacherRegister />} />
        <Route path="/reg/student" element={<StudentRegister />} />
        <Route path="/teacher/:id/:name" element={<TeacherProfile />} />
    

        {/* ----------student  route -------------------------*/}
        <Route path="/student" element={<StudentHome />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/student/profile" element={<Profile/>} />


        {/* ----------teacher  route -------------------------*/}
        <Route path="/teacher" element={<TeacherWall />} />
        <Route path="/teacher/ads" element={<Ads/>} />
        <Route path="/teacher/post" element={<PostPage/>} />
        <Route path="/teacher/profile" element={<TecherHome/>} />
        <Route path="/teacher/search" element={<SearchPageT/>} />

       

        {/* ----------admin  route -------------------------*/}
        <Route path="/admin" element={<AdminMain/>} />
        <Route path="/admin/user" element={<UserManage />} />
        <Route path="/admin/payment" element={<PaymentManage />} />
       

      </Routes>
      

    </div>

  );
};

export default App;
