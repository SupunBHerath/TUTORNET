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
        navigate('/'); // Redirect to login page if token is not found
        return;
      }

      try {
        const response = await axios.get<UserData>('/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setIsValidToken(true); // Token is valid
        setUserData({
          userId: response.data.userId,
          email: response.data.email,
          role: response.data.role,
          username: response.data.username,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsValidToken(false); // Token is not valid
      }
    };

    validateToken();
  }, [navigate]); // Added 'navigate' as a dependency to avoid warning

  // Return isValidToken and userData
  return { isValidToken, userData };
};

export default useCookie;
