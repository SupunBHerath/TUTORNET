import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Post from '../../Components/Post/Post';
import Logo from '../../../public/logo/Logo_t.png';
import axios from 'axios';
import Facebook from '../../Components/LodingPost/LodingPost';
import TimeDifference from '../../Components/TimeDifference/TimeDifference';

interface Teacher {
  username: string;
  profileImage: string;
}

interface PostData {
  userId: string;
  _id: string;
  title: string;
  body: string;
  image: string;
  username: string;
  description: string;
  uploadedDay: string;
  profileImage: string;
  teacher: Teacher;
}

const StudentPost: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PostData[]>('/post/all');
        const reversedData = response.data.reverse();
        setPostData(reversedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Facebook />
      ) : (
        <Grid container spacing={2} className='shadow-lg'>
          {postData.map((post) => (
            <Grid item xs={12} sm={12} key={post._id}>
              <Post 
                pp={post.teacher.profileImage}
                img={post.image}
                title={post.teacher.username}
                date={<TimeDifference time={post.uploadedDay} />}
                description={post.description}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default StudentPost;
