import '../css/Admin.css'
import PaymentTable from '../Components/Table/PaymentTable'
import HeaderCard from '../Components/Card/HeaderCard'
import profit from '../../../../public/Icon/profits.png'
const PaymentManage = () => {
  return (
    <div>
      <div className="UserManage" >
        <div className="payment d-flex justify-content-center  ">
          <HeaderCard icon={profit} title="Revenue" count="1500" />

        </div>
        <br />
        <PaymentTable />
      </div>
    </div>
  )
}

export default PaymentManage
