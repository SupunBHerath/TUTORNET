import { Grid } from '@mui/material';
import Facebook from '../../../Components/LodingPost/LodingPost';
import Linear from '../../../Components/Progress/Linear';
import useCookie from '../../../Hook/UserAuth';
import Home from '../../CHP/Home';
import AdsHome from '../../Student/Componets/Ads/AdsHome';
import StudentPost from '../../Student/StudentPost';
import Navi_Bar from '../Components/Navi_Bar/Navi_Bar'

const TeacherWall = () => {
  const { isValidToken, userData } = useCookie();
  if (!isValidToken) {
    return <Linear />
  }
  if (userData.role !== 'Teacher') {
    return <Home />;
  }

  return (
    <div className='bg-body-tertiary '>
        <Navi_Bar />

      <Grid container spacing={3} padding={5} paddingY={0} marginTop={5}>

        <Grid item xs >
        <AdsHome />
        </Grid>
        <Grid item xs={4} >
        <StudentPost />
      
        </Grid>
        <Grid item xs>
        <AdsHome />
       
        </Grid>
      </Grid>
     

    </div>
  )
}

export default TeacherWall
