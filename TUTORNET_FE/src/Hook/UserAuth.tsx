import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define a type for the user data
interface UserData {
  userId: string;
  username: string;
  email: string;
  role: string;
}

const useCookie = () => {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    userId: '',
    username: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      console.log('User token:', token);
      if (!token) {
        navigate('/'); 
        return;
      }

      try {
        const response = await axios.get<UserData>('/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setIsValidToken(true); 
        setUserData({
          userId: response.data.userId,
          email: response.data.email,
          role: response.data.role,
          username: response.data.username,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsValidToken(false); 
        navigate('/');
      }
    };

    validateToken();
  }, [navigate]); 

 
  return { isValidToken, userData };
};

export default useCookie;
