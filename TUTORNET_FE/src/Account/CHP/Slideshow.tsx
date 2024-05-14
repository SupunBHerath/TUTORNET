import React, { useState, useEffect } from 'react';
import UserCommentCard from './Components/UserCommentCard';
import './CHP.css'; // Import CSS for styling

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const comments: JSX.Element[] = [
    <UserCommentCard key={1} />,
    <UserCommentCard key={2} />,
    <UserCommentCard key={3} />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [comments.length]);

  return (
    <div className="slideshow">
      {comments.map((comment, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          {comment}
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
