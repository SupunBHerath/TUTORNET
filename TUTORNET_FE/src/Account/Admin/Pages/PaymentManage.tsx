import '../css/Admin.css'
import HeaderCard from '../Components/Card/HeaderCard'
import profit from '../../../../public/Icon/profits.png'
import PaymentTable from '../Components/Table/PaymentTable'
import { useEffect, useState } from 'react'



const PaymentManage = () => {
 
  const [row, setRow] = useState(null);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    fetch('http://localhost:8080/reqads/Done')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let totalRevenue = 0; // Initialize total revenue
        setRow(data.length);
        for (let i = 0; i < data.length; i++) {
          totalRevenue += data[i].payment; // Add each payment to total revenue
        }
        setRevenue(totalRevenue); // Set total revenue
  
        console.log(totalRevenue);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <div>
      <div className="UserManage" >
        <div className="payment d-flex justify-content-center row ">

            <HeaderCard icon={profit} title="Revenue" count={revenue} />

         
        </div>
        <br />
        <PaymentTable />
      </div>
    </div>
  )
}

export default PaymentManage
