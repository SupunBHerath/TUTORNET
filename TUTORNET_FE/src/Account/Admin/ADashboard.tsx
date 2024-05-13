import './css/Admin.css'
import Sidebar from './Components/Sidebar/Sidebar'
import HeaderCard from './Components/Card/HeaderCard'
import teacherIcon from '../../../public/Icon/teacher.png'
import studentIcon from '../../../public/Icon/students.png'
import postIcon from '../../../public/Icon/social.png'
import { useState } from 'react'

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
    <div className=''>
      <Sidebar />
      <div className="ADashboard" >
      <div className="d-flex justify-content-evenly " >
        <HeaderCard icon={teacherIcon} title="Teachers" count={rows.length} />
        <HeaderCard icon={studentIcon} title="Students" count="5000" />
        <HeaderCard icon={postIcon} title="Post" count="1500" />
      </div>

      </div>

    </div>
  )
}

export default ADashboard
