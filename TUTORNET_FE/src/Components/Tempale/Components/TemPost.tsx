import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Facebook from '../../LodingPost/LodingPost';
import Post from '../../Post/Post';
import { useParams } from 'react-router-dom';
import TimeDifference from '../../TimeDifference/TimeDifference';

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

}

const TemPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PostData[]>(`/post/${id}`);
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
        
          <Facebook />
        </>

      ) : (
        postData.map((post, index) => (
          <Post
            key={index}
            pp={post.profileImage}
            img={post.image}
            title={post.username}
            date={<TimeDifference time={post.uploadedDay}/>}
            description={post.description}
          />
        ))
      )}
    </div>
  );
};

export default TemPost;
