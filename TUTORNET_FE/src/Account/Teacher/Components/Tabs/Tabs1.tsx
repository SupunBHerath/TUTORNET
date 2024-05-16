import React from 'react';
import Introduction from '../Intro/Intro';
import PostPage from '../Post/Postpage';
import './Tabs1.css'; // Import CSS file for styling

const Tabs1: React.FC = () => {
    return (
        <div className="tabs-container">
            <div className="intro-container">
                <Introduction bio='h' livesIn='bjkjjjj' from='kkk' location='nnn' education='hbbjnb' />
            </div>
            <div className="post-container">
                <PostPage />
            </div>
        </div>
    );
}

export default Tabs1;
