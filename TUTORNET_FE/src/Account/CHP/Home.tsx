import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import CHPCard from './CHPCard'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'aos/dist/aos.js'
import './CHP.css'
import HederImg1 from '../../../public/Lanading/image 5.png'
import { Color, Font } from '../../Components/CSS/CSS'
import Counter from './Count'
import { CHPAboutUS } from './CHPAboutUS'
import UserCommentCard from './Components/UserCommentCard'
import Footer from './Components/Footer'
import { Feedback } from './Components/Feedback'
import t1 from '../../../public/Teacher/t1.jpg'
import t2 from '../../../public/Teacher/t2.jpg'
import t3 from '../../../public/Teacher/t3.jpg'
import t4 from '../../../public/Teacher/t4.jpg'
import u1 from '../../../public/Users/u1.jpg'
import u2 from '../../../public/Users/u2.jpg'
import u4 from '../../../public/Users/u4.jpg'
import u5 from '../../../public/Users/u5.jpg'
import { AdsCarousel } from './Components/AdsCarousel'
import STNavi_Bar from '../Landing_page/Components/Navi_Bar/STNavi_Bar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useCookie from '../../Hook/UserAuth'
import { logout } from '../../Hook/Logout'
interface UserData {
    userId: string;
    username: string;
    email: string;
    role: string;
    profile: string;
}

const Home = () => {
    const [teacher, setTeacher] = useState(0)
    const [student, setStudent] = useState(0)
    const navigate = useNavigate();
   
    useEffect(() => {
        AOS.init({
            duration: 2000,
        })
    }, [])
     
 
    




    return (
        <div className=''>
            <STNavi_Bar />
            <div className="container-fluid  ">

                <div className="headerSesion bg-dark w-100 text-center  " style={{ minHeight: "100vh", backgroundImage: `url(${HederImg1})` }} data-aos="zoom-in-down">
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
                                                <span style={{ color: Color.SecondaryColor }} className="num" data-to="500000" data-time="2000">   <Counter maxCount={200} /></span>
                                                <span style={{ color: Color.PrimaryColor }}>+ ]</span>
                                            </div>
                                            <h2 className='text-white mt-3'>Students</h2>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-0">
                                        <div className="">
                                            <div>
                                                <span style={{ color: Color.PrimaryColor }}>[ </span  >
                                                <span style={{ color: Color.SecondaryColor }} className="num" data-to="500000" data-time="2000">   <Counter maxCount={50} /></span>
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
                    <CHPCard image={t1} name=" Amith Pussella  " description="Physics Lecturer in Sri Lanka" rating={5} />
                    <CHPCard image={t2} name=" Tissa Jananayake " description="Biology Lecturer in Sri Lanka" rating={4.5} />
                    <CHPCard image={t3} name=" Dinesh Muthugala " description="Biology Lecturer in Sri Lanka" rating={4} />
                    <CHPCard image={t4} name=" Herath Abeysinghe " description="Maths Lecturer in Sri Lanka" rating={4} />
                </div>

                <div className="space" style={{ height: "150px" }}></div>
                <AdsCarousel />
                <div className="Comment_session d-md-none  d-lg-block">
                    <div className="space" style={{ height: "150px" }}></div>

                    <div className="text-center mt-5  " data-aos="zoom-in-down">
                        <h1 id='PT' className='display-2 '>[ User Comment ]</h1>
                    </div>
                    <br /><br />
                    <div className="commentSession" data-aos="">
                        <div id="carouselExampleInterval" className="carousel slide  " data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="8000">

                                    <div className="UserComment justify-content-evenly  d-flex ">
                                        <UserCommentCard img={t1} userName="Amith Pussella " comment="good" rating={5} />
                                        <UserCommentCard img={u2} userName="Sandaru Sadishan " comment="good" rating={5} />
                                        <UserCommentCard img={u4} userName="Kalasi Marambage" comment="good" rating={5} />

                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="8000">

                                    <div className="UserComment justify-content-evenly  d-flex ">
                                        <UserCommentCard img={t2} userName="Tissa Jananayake  " comment="good" rating={4} />
                                        <UserCommentCard img={u5} userName="Suraj Prasanna " comment="good" rating={5} />
                                        <UserCommentCard img={u1} userName="Shiwantha Prasad " comment="good" rating={5} />
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
