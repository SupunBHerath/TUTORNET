import React, { useState } from 'react';
import PostTeacher from './PostTeacher';
import AddPostBtn from './AddPostForm';
const PostPage: React.FC = () => {


  return (
    <><div className="">
      <AddPostBtn />
    </div>
      <div style={{ position: 'relative', padding: '20px' }}>
        <PostTeacher />
      </div>
    </>

  );
};

export default PostPage;
