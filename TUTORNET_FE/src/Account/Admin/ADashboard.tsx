import React from 'react'
import SideBar from './Sidebar/Sidebar'
import './css/Admin.css'
import Card2 from '../../Components/Card2/Card2'

const ADashboard = () => {
  return (
    <div className=''>
      <SideBar/>
      <div className="ADashboard">
        <h1>Admin Dashboark</h1>
        <Card2/>
      </div>
    </div>
  )
}

export default ADashboard
