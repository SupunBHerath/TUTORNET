import useCookie from '../../Hook/UserAuth';
import Navi_Bar from '../../Account/Student/Componets/Nav_bar/Navi_Bar';
import SNavi_Bar from '../../Account/Student/Componets/Nav_bar/Navi_Bar';
import ViewProfile from './ViewProfile';

const TeacherProfile = () => {
  
    const{userData}=useCookie();
    if(userData.role=='Teacher'){
        return (
            <div>
              <Navi_Bar/>
              <h1>Teacher Profile</h1>
            </div>
          )
    }
    else if(userData.role=='Student'){
        return (
            <div>
              <SNavi_Bar/>
              <ViewProfile/>
              <h1>Student Profile</h1>
            </div>
          )
    }else{
        return (
            <div>
              <h1>Cant Load </h1>
            </div>
          )
    }

}

export default TeacherProfile
