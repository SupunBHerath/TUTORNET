import React, { useEffect, useState } from 'react';
import Post from '../../Components/Post/Post';
import Logo from '../../../public/logo/Logo_t.png';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Facebook from '../../Components/LodingPost/LodingPost';

interface PostData {
  userId: string;
  _id: string;
  title: string;
  body: string;
  image: string;
  username: string;
  description: string;
  uploadedDay: string;
}

const StudentPost: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PostData[]>('/post/all');
        console.log(response.data);
        setPostData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <>
          <CircularProgress />
          <Facebook />
        </>

      ) : (
        postData.map((post, index) => (
          <Post
            key={index}
            pp={Logo}
            img={post.image}
            title={post.title}
            date={post.uploadedDay}
            description={post.description}
          />
        ))
      )}
    </div>
  );
};

export default StudentPost;
