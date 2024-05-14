import HeaderCard from '../Components/Card/HeaderCard'
import Sidebar from '../Components/Sidebar/Sidebar'
import UserTable from '../Components/Table/Table'
import '../css/Admin.css'
import teacherIcon from '../../../../public/Icon/teacher.png'
import studentIcon from '../../../../public/Icon/students.png'
import PaymentTable from '../Components/Table/PaymentTable'

const PaymentManage = () => {
  return (
    <div>
      <Sidebar/>
      <div className="UserManage" >
      <br /><br />
          <PaymentTable/>
      </div>
    </div>
  )
}

export default PaymentManage
