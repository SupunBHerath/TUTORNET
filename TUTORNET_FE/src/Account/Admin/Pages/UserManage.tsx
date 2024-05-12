import HeaderCard from '../Components/Card/HeaderCard'
import Sidebar from '../Components/Sidebar/Sidebar'
import UserTable from '../Components/Table/Table'
import '../css/Admin.css'
import teacherIcon from '../../../../public/Icon/teacher.png'
import studentIcon from '../../../../public/Icon/students.png'

const UserManage = () => {
  return (
    <div>
      <Sidebar/>
      <div className="UserManage" >
      <div className="d-flex justify-content-evenly " >
        <HeaderCard icon={teacherIcon} title="Teachers" count="1500" />
        <HeaderCard icon={studentIcon} title="Students" count="5000" />
      </div>
      <br /><br />
          <UserTable/>
      </div>
    </div>
  )
}

export default UserManage
