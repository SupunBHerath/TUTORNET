import '../css/Admin.css'
import HeaderCard from '../Components/Card/HeaderCard'
import profit from '../../../../public/Icon/profits.png'
import PaymentTable from '../Components/Table/PaymentTable'
import { useEffect, useState } from 'react'
import axios from 'axios'



const PaymentManage = () => {
 
  const [row, setRow] = useState(null);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('reqads/Done');
        if (response.status === 200) {
          const data = response.data;
          let totalRevenue = 0; 
          for (let i = 0; i < data.length; i++) {
            totalRevenue += data[i].payment;
          }
          setRevenue(totalRevenue);
          console.log(totalRevenue);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <div className="UserManage" >
        <div className="payment d-flex justify-content-center  ">

            <HeaderCard icon={profit} title="Revenue" count={revenue} />

         
        </div>
        <br />
        <PaymentTable />
      </div>
    </div>
  )
}

export default PaymentManage
