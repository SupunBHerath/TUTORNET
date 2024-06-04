import React, { useEffect, useState } from 'react';
import Introduction from '../Intro/Intro';
import PostPage from '../Post/Postpage';
import './Tabs1.css'; 
import axios from 'axios';
import Linear from '../../../../Components/Progress/Linear';
import useCookie from '../../../../Hook/UserAuth';
import { Home } from '@mui/icons-material';

type Data = {
  bio: string;
  livesIn: string;
  from: string;
  location: string;
  education: string;
};

const Tabs1: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const { isValidToken, userData } = useCookie();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`teacher/${userData.userId}`);
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    if (isValidToken && userData.role === 'Teacher') {
      getData();
    }
  }, [isValidToken, userData]);

  if (!isValidToken) {
    return <Linear />;
  }

  if (userData.role !== 'Teacher') {
    return <Home />;
  }

  if (!data) {
    return <Linear />;
  }

  return (
    <div className="tabs-container">
      <div className="intro-container">
        <Introduction/>
      </div>
      <div className="post-container bg-body-tertiary">
        <PostPage />
      </div>
    </div>
  );
}

export default Tabs1;
