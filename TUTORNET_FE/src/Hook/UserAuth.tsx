import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from './Logout';

interface UserData {
  userId: string;
  username: string;
  email: string;
  role: string;
  profile: string;
}

const useCookie = () => {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    userId: '',
    username: '',
    email: '',
    role: '',
    profile: '',
  });

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log("token not found");
        logout(navigate);
        return;
      }

      try {
        const response = await axios.get<UserData>('/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setIsValidToken(true);
          setUserData({
            userId: response.data.userId,
            email: response.data.email,
            role: response.data.role,
            username: response.data.username,
            profile: response.data.profile
          });
        } else {
          setIsValidToken(false);
          logout(navigate);
        }


      } catch (error) {
        console.error('Error fetching data:', error);
        setIsValidToken(false);
        logout(navigate);
      }
    };

    validateToken();
  }, [navigate]);


  return { isValidToken, userData };
};

export default useCookie;
