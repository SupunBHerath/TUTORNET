import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import HeaderCard from '../Components/Card/HeaderCard'
import '../css/Admin.css'
import landingIcon from '../../../../public/Icon/landing-page.png'
import Wall from '../../../../public/Icon/wallpage.png'
import search from '../../../../public/Icon/search.png'
import AdsTable from '../Components/Table/AdsTable'


const AdsManage = () => {
  return (
    <div>
      <Sidebar />
      <div className="AdsManage">
        <div className="d-flex AdsCountCard justify-content-evenly ">
          <HeaderCard icon={landingIcon} title="Landing " count="1" />
          <HeaderCard icon={Wall} title="Wall" count="2" />
          <HeaderCard icon={search} title="Seacher" count="0" />
        </div>
        <br /><br />
        <div className="container ">
        <AdsTable/>

        </div>
      </div>
    </div>
  )
}

export default AdsManage
