import  { useEffect } from 'react'
import AdminNavbar from '../Components/Sidebar/AdminNavbar'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const AdminMain = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const jwtToken = Cookies.get('token');
       
  
        if (!jwtToken) {
          // navigate('/');
          return;
        }
  
        // Make the request
        const response = await axios.post('http://localhost:8080/admin');
  
        if (response.status === 401) {
          navigate('/');
          console.log("ddd")
        }
      } catch (error) {
        console.error('Error:', error);
   
      }
    };
  
    checkAdminAccess();
  }, []);
  
  return (
    <div>
      {/* <AdminNavbar/> */}
    </div>
  )
}

export default AdminMain
