import Linear from '../../../Components/Progress/Linear';
import useCookie from '../../../Hook/UserAuth';
import Home from '../../CHP/Home';
import Navi_Bar from '../Components/Navi_Bar/Navi_Bar'

const TeacherWall = () => {
  const { isValidToken, userData } = useCookie();
   if (isValidToken) {
    return <Linear/>
  }
  if (userData.role !== 'Teacher') {
    return <Home />;
  }

  return (
    <div>
      <Navi_Bar />
      
    </div>
  )
}

export default TeacherWall
