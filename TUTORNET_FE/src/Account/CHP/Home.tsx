import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import CHPNaviBar from './CHPNaviBar'
import CHPCard from './CHPCard'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'aos/dist/aos.js'
import './CHP.css'
import Supun from '../../../public/i.jpg'
import HederImg1 from '../../../public/Lanading/image 5.png'
import { Color, Font } from '../../Components/CSS/CSS'
import Counter from './Count'
import { CHPAboutUS } from './CHPAboutUS'
import UserCommentCard from './Components/UserCommentCard'
import Slideshow from './Slideshow'
import Footer from './Components/Footer'
import { Feedback } from './Components/Feedback'

// CHP  common home page 


const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        })
    })
    const [rows, setRows] = useState([]);
    fetch('http://localhost:8080/teacher/user')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the API response is an array of user objects
            setRows(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    return (
        <div className=''>
            <CHPNaviBar />
            <div className="container-fluid  ">
                <div className="headerSesion bg-dark w-100 text-center  " style={{ height: "100vh", backgroundImage: `url(${HederImg1})` }}>
                    <div className="sapces h-25"></div>
                    <div className="header-text">
                        <h1 className="display-1 p-4" style={{ fontFamily: Font.PrimaryFont, color: "white" }}> Welcome to TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span></h1>
                        <h3 className="display-5 p-4" style={{ fontFamily: Font.PrimaryFont, color: "white" }}>SPACE TO CHOOSE YOUR TEACHER</h3>

                        <section className="about-counter text-center " style={{ marginTop: "180px" }}>
                            <div className="container">
                                <div className="row justify-content-around display-4 " style={{ fontFamily: Font.PrimaryFont }} >
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-0">
                                        <div className="">
                                            <div>
                                                <span style={{ color: Color.PrimaryColor }}>[ </span  >
                                                <span style={{ color: Color.SecondaryColor }} className="num" data-to="500000" data-time="2000">   <Counter maxCount={rows.length} /></span>
                                                <span style={{ color: Color.PrimaryColor }}>+ ]</span>
                                            </div>
                                            <h2 className='text-white mt-3'>Students</h2>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-0">
                                        <div className="">
                                            <div>
                                                <span style={{ color: Color.PrimaryColor }}>[ </span  >
                                                <span style={{ color: Color.SecondaryColor }} className="num" data-to="500000" data-time="2000">   <Counter maxCount={rows.length} /></span>
                                                <span style={{ color: Color.PrimaryColor }}>+ ]</span>
                                            </div>
                                            <h2 className='text-white mt-3'>Teachers</h2>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="space" style={{ height: "150px" }}></div>

                <CHPAboutUS />
                <div className="space" style={{ height: "150px" }}></div>

                <div className="text-center mt-5  " data-aos="zoom-in-down">
                    <h1 id='PT' className='display-2 '> [ Popular Teachers ]</h1>
                </div>
                <div className='row mt-5  justify-content-center ' data-aos="zoom-in-down">
                    <CHPCard image={Supun} name=" Supun " description="---description ---" rating={5} />
                    <CHPCard image={Supun} name=" Bandara " description="---description ---" rating={4.5} />
                    <CHPCard image={Supun} name=" Supun " description="---description ---" rating={4} />
                    <CHPCard image={Supun} name=" Supun " description="---description ---" rating={4} />
                </div>

                <div className="space" style={{ height: "150px" }}></div>

                <div className="text-center mt-5  " data-aos="zoom-in-down">
                    <h1 id='PT' className='display-2 '>[ User Comment ]</h1>
                </div>
                {/* <Slideshow/> */}

                <br /><br />


                <div className="commentSession" data-aos="flip-right">
                    <div id="carouselExampleInterval" className="carousel slide  " data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">

                                <div className="UserComment justify-content-evenly  d-flex ">
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />

                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">

                                <div className="UserComment justify-content-evenly  d-flex ">
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="UserComment justify-content-evenly  d-flex ">
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                    <UserCommentCard userName="Supun" comment="good" rating={4} />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="space" style={{ height: "150px" }}></div>
                <div className="text-center mt-5  " data-aos="zoom-in-down">
                    <h1 id='PT' className='display-2 '> [ Feedback session ]</h1>
                </div>
                <br /><br />

                <Feedback />

            </div>
            <div className="space" style={{ height: "150px" }}></div>
            <Footer />
        </div>
    )
}

export default Home
