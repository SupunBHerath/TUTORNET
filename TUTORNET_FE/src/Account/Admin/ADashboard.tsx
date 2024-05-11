import './css/Admin.css'
import Sidebar from './Components/Sidebar/Sidebar'
import HeaderCard from './Components/Card/HeaderCard'
import teacherIcon from '../../../public/Icon/teacher.png'
import studentIcon from '../../../public/Icon/students.png'
import postIcon from '../../../public/Icon/social.png'

const ADashboard = () => {
  return (
    <div className=''>
      <Sidebar />
      <div className="ADashboard" >
      <div className="d-flex justify-content-evenly " >
        <HeaderCard icon={teacherIcon} title="Teachers" count="1500" />
        <HeaderCard icon={studentIcon} title="Students" count="5000" />
        <HeaderCard icon={postIcon} title="Post" count="1500" />
      </div>

      </div>

    </div>
  )
}

export default ADashboard
