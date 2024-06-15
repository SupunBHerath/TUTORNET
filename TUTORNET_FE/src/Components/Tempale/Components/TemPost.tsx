import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Facebook from '../../LodingPost/LodingPost';
import Post from '../../Post/Post';
import { useParams } from 'react-router-dom';
import TimeDifference from '../../TimeDifference/TimeDifference';
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import { Font } from '../../CSS/CSS';

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

const TemPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PostData[]>(`/post/${id}`);
        setPostData(response.data.reverse());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Facebook />
      ) : (
        postData.map((post) => (
          <Post 
            key={post._id}
            pp={post.teacher.profileImage}
            img={post.image}
            title={post.teacher.username}
            date={<TimeDifference time={post.uploadedDay} />}
            description={post.description}
          />
        ))
      )}
    </div>
  );
};

export default TemPost;
