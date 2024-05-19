import HeaderCard from '../Components/Card/HeaderCard'
import Sidebar from '../Components/Sidebar/Sidebar'
import UserTable from '../Components/Table/Table'
import '../css/Admin.css'
import teacherIcon from '../../../../public/Icon/teacher.png'
import studentIcon from '../../../../public/Icon/students.png'
import Admin from '../../../../public/Icon/admin.png'
import { useState } from 'react'

const UserManage = () => {
  const [rows, setRows] = useState([]);
  // teachers count
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
    <div>
      <div className="UserManage" >
      <div className="d-flex justify-content-evenly " >
        <HeaderCard icon={teacherIcon} title="Teachers" count={rows.length} />
        <HeaderCard icon={studentIcon} title="Students" count="5000" />
        <HeaderCard icon={Admin} title="Admin" count="2" />
      </div>
          <UserTable/>
      </div>
    </div>
  )
}

export default UserManage
