import Navi_Bar from '../Components/Navi_Bar/Navi_Bar'

import ColorTabs from '../Components/Tabs/Tabs'
import Profile from '../Components/Profile'
import useCookie from '../../../Hook/UserAuth';
import Linear from '../../../Components/Progress/Linear';
import Home from '../../CHP/Home';


const TecherHome = () => {
  const { isValidToken, userData } = useCookie();
  if (!isValidToken) {
   return <Linear/>
 }
 if (userData.role !== 'Teacher') {
  return <Home />;
}

  return (
    <div className='bg-body-tertiary '>
      <Navi_Bar />
      <div className="headerP  container shadow-sm  " style={{height:'600px'}}>
      <Profile/>
      </div>
      <div className="container  mt-5" style={{ width: "1000px", justifyContent: "start" }}>
        <hr />
         <ColorTabs /> 
      </div>
    </div>
  )
}

export default TecherHome
