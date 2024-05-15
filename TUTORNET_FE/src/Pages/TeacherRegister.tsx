import React from 'react'
import RegisterTeacher from '../Components/Registration Form/RegisterTeacher'
import CHPNaviBar from '../Account/CHP/CHPNaviBar'
import image from '../../public/Lanading/Group 4.png'
import logo from '../../public/logo/Tutor logo.png'
import './RegisterForm.css'
const TeacherRegister = () => {
    return (
        <div>
            <CHPNaviBar />
            <br />
            <div className="container rounded-4  p-3 shadow-lg ">
                <div className="row">
                    <div className="col-md-6   d-sm-none d-md-block " >
                        <div className="imageDiv w-100 h-100 " style={{backgroundImage:`url(${logo})`}}></div>
                    </div>
                    <div className="col-md-6">
                    <RegisterTeacher />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default TeacherRegister
