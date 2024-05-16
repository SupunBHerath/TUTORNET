import React from 'react'
import Navi_Bar from '../Components/Navi_Bar/Navi_Bar'
import Profile from '../Components/Profile'
import ColorTabs from '../Components/Tabs/Tabs'
import Introduction from '../Components/Intro/Intro'


const TecherHome = () => {
  return (
    <div>
      <Navi_Bar />
      <Profile />
      <br /><br />

      <div className="container  mt-5" style={{ width: "1000px", justifyContent: "start" }}>
        <hr />

         <ColorTabs /> 
      </div>
    </div>
  )
}

export default TecherHome
