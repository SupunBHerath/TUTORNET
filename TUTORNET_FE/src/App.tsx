import { Route, Routes } from 'react-router-dom';
import StudentHome from './Account/Student/StudentHome';
import Home from './Account/CHP/Home';
import LoginForm from './Components/Login Form/LoginForm';
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
import AdsWall from './Account/Admin/Components/AdsWall/AdsWall';
import LandingLayout from './Layout/Landing';
import StudentLayout from './Layout/Student';
import TeacherLayout from './Layout/Teacher';
import AdminLayout from './Layout/Admin';
import About from './Account/Landing_page/Components/About_Us/About_us';
import FeedbackPage from './Pages/FeedbackPage';
import Ai from './Pages/Ai';

const App = () => {
  // axios.defaults.baseURL = 'http://localhost:8080/'
  axios.defaults.baseURL = 'https://tutornet-5v7a-supunbheraths-projects.vercel.app/'

  return (
    <div>
      <Routes>

        {/* ----------Landing  route -------------------------*/}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="fp" element={<FrogetPassword />} />
          <Route path="reg/teacher" element={<TeacherRegister />} />
          <Route path="reg/student" element={<StudentRegister />} />
          <Route path="Ads" element={<AdsWall />} />
          <Route path="about" element={<About />} />
        </Route>


        {/* ----------Student  route -------------------------*/}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentHome />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Ads" element={<AdsWall />} />
          <Route path="ai" element={<Ai />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="search/teacher/:id/:name" element={<TeacherProfile />} />
        </Route>


        {/* ----------Teacher  route -------------------------*/}
        <Route path="/teacher" element={< TeacherLayout/>}>
          <Route index element={<TeacherWall />} />
          <Route path="Ads" element={<Ads />} />
          <Route path="about" element={<About />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="post" element={<PostPage />} />
          <Route path="search/teacher/:id/:name" element={<TeacherProfile />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="profile" element={<TecherHome />} />
          {/* <Route path="Ads" element={<AdsWall />} /> */}
          <Route path="ai" element={<Ai />} />

          <Route path="search" element={<SearchPageT />} />
        </Route>



        {/* ----------Admin  route -------------------------*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route  index element={<AdminMain />} />
        </Route>


      </Routes>


    </div>

  );
};

export default App;
