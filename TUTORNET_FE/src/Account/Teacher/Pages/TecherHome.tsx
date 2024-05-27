import React from 'react'
import Navi_Bar from '../Components/Navi_Bar/Navi_Bar'

import ColorTabs from '../Components/Tabs/Tabs'
import Introduction from '../Components/Intro/Intro'
import Profile from '../Components/Profile'


const TecherHome = () => {
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
