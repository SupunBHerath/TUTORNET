import useCookie from '../../Hook/UserAuth';
// import SNavi_Bar from '../../Account/Student/Componets/Nav_bar/Navi_Bar';
import ViewProfile from './ViewProfile';
import MainTab from './Tabs/mainTab';
import { LinearProgress } from '@mui/material';
// import Navi_Bar from '../../Account/Teacher/Components/Navi_Bar/Navi_Bar';

const TeacherProfile = () => {
  
    const{userData}=useCookie();
    if(userData.role=='Teacher'){
        return (
          <div>
          <ViewProfile/>
          <div className="container mt-5" style={{ width: "1000px", justifyContent: "start" }}>
          <MainTab/>
          </div>
        </div>
          )
    }
    else if(userData.role=='Student'){
        return (
            <div>
              <ViewProfile/>
              <div className="container mt-5" style={{ width: "1000px", justifyContent: "start" }}>
              <MainTab/>
              </div>
            </div>
          )
    }else{
        return (
            <div>
              <LinearProgress/>
            </div>
          )
    }

}

export default TeacherProfile
