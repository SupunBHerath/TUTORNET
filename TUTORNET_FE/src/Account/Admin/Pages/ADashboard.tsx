import '../css/Admin.css'
import HeaderCard from '../Components/Card/HeaderCard'
import teacherIcon from '../../../../public/Icon/teacher.png'
import studentIcon from '../../../../public/Icon/students.png'
import postIcon from '../../../../public/Icon/social.png'
import { useState } from 'react'
import UserChart from '../Components/Charts/UserChart'
import { Podcasts } from '@mui/icons-material'
import PostChart from '../Components/Charts/PostChart'
import { Color } from '../../../Components/CSS/CSS'

const ADashboard = () => {
  const [rows, setRows] = useState([]);
  fetch('http://localhost:8080/teacher/user')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Assuming the API response is an array of user objects
      setRows(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  return (
    <div className='p-4 pt-1'>
      <div className="d-flex justify-content-evenly " >
        <HeaderCard icon={teacherIcon} title="Teachers" count={rows.length} />
        <HeaderCard icon={studentIcon} title="Students" count="5000" />
        <HeaderCard icon={postIcon} title="Post" count="1500" />
      </div>
      <br /><br />
      <br /><br />


      <div className="" >
        <div className="row text-center ">
          <div className="col-4">
            <UserChart />
            <br />
            <h3>New <span style={{color:Color.SecondaryColor}}>Account</span>  creations in the last 3 days</h3>

          </div>
          <div className="col-4">
            <PostChart />
            <br />
            <h3>New <span style={{color:Color.SecondaryColor}}>Post</span>  creations in the last 3 days</h3>
          </div>
          <div className="col-4">
            <PostChart />
            <br />
            <h3>New <span style={{color:Color.SecondaryColor}}>ADS</span>  creations in the last 3 days</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ADashboard
