import '../css/Admin.css'
import HeaderCard from '../Components/Card/HeaderCard'
import teacherIcon from '../../../../public/Icon/teacher.png'
import studentIcon from '../../../../public/Icon/students.png'
import postIcon from '../../../../public/Icon/social.png'
import AdsIcon from '../../../../public/Icon/ads.png'
import { useEffect, useState } from 'react'
import UserChart from '../Components/Charts/UserChart'
import PostChart from '../Components/Charts/PostChart'
import { Color } from '../../../Components/CSS/CSS'

const ADashboard = () => {
  const [row, setRow] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8080/teacher/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
    
        setRow(data.length)
       
        console.log(row)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },[row])

  return (
    <div className='pt-1'>
      <div className="d-flex row justify-content-evenly " >
        <HeaderCard icon={teacherIcon} title="Teachers" count={row}  />
        <HeaderCard icon={studentIcon} title="Students" count="5000" />
        <HeaderCard icon={postIcon} title="Post" count="1500" />
        <HeaderCard icon={AdsIcon} title="Ads" count="10" />
      </div>
      <br /><br />
      <br /><br />


      <div className="" >
        <div className="row text-center ">
          <div className="col-md-4 ">
            <UserChart />
            <br />
            <h3>New <span style={{ color: Color.SecondaryColor }}>Account</span>  creations in the last 3 days</h3>

          </div>
          <div className="col-md-4 ">
            <PostChart />
            <br />
            <h3>New <span style={{ color: Color.SecondaryColor }}>Post</span>  creations in the last 3 days</h3>
          </div>
          <div className="col-md-4 ">
            <PostChart />
            <br />
            <h3>New <span style={{ color: Color.SecondaryColor }}>ADS</span>  creations in the last 3 days</h3>
          </div>
        </div>
      </div>
   
    </div>
  )
}

export default ADashboard
