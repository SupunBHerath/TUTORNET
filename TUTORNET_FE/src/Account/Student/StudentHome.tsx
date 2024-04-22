import React from 'react'
import NaviBar from '../../Components/NaviBar/NaviBar'
import Post from '../../Components/Post/Post'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentPost from './StudentPost'


const StudentHome = () => {
    return (
        <div>
                <NaviBar />
                <StudentPost/> 
        </div>
    )
}

export default StudentHome;
