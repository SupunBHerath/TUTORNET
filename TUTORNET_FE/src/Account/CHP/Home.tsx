import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import CHPCard from './CHPCard'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'aos/dist/aos.js'
import './CHP.css'
import l3 from '../../../public/Lanading/w.jpg'
import { Color, Font } from '../../Components/CSS/CSS'
import Counter from './Count'
import { CHPAboutUS } from './CHPAboutUS'
import UserCommentCard from './Components/UserCommentCard'
import { Feedback } from './Components/Feedback'
import t1 from '../../../public/Teacher/t1.jpg'
import t2 from '../../../public/Teacher/t2.jpg'
import u1 from '../../../public/Users/u1.jpg'
import u2 from '../../../public/Users/u2.jpg'
import u4 from '../../../public/Users/u4.jpg'
import u5 from '../../../public/Users/u5.jpg'
import { AdsCarousel } from './Components/AdsCarousel'
import axios from 'axios'

interface UserData {
    userId: string;
    name: string;
    subject: string;
    role: string;
    profilePicture: string;
}

const Home = () => {
    const [teacher, setTeacher] = useState(0)
    const [student, setStudent] = useState(0)
    const [teacherData, setTeacherData] = useState<UserData[]>([])

    useEffect(() => {
        AOS.init({
            duration: 2000,
        })
    }, [])
    useEffect(() => {
        const feachData = async () => {
            try {
                const res = await axios.get('/teacher/all')
                    .then((res => {
                        setTeacher(res.data.length)
                        console.log(res.data.length);
                        setTeacherData(res.data)
                        console.log(res.data)

                    }))
                const res2 = await axios.get('/student/all')
                    .then((res2 => {
                        setStudent(res2.data.length)
                    }))
            } catch (err) {
                console.log(err)
            }
        }
        feachData()
    }, [])
    return (
        <div className=''>
            <div className="container-fluid ">
                <div className="headerSesion bg-dark w-100   " style={{ minHeight: "100vh", backgroundImage: `url(${l3})` }} data-aos="zoom-in-down">
                    <div className="sapces h-25"></div>
                    <div className="header-text">
                        <div className="space" style={{ height: "50px" }}></div>

                        <h1 data-aos="zoom-in-down"
                            className="display-1 p-4"
                            style={{
                                fontFamily: Font.PrimaryFont,
                                color: "white",
                                textShadow: "5px 8px 4px " + Color.PrimaryColor,
                                WebkitTextStroke: "1px black"
                            }}
                        >
                            Welcome To <br />
                            TUTOR<span style={{ color: Color.SecondaryColor }}> NET</span>
                        </h1>



                    </div>
                </div>
                <section className="about-counter text-center " style={{ marginTop: "70px" }}>
                    <div className="container">
                        <div className="row justify-content-around display-4 " style={{ fontFamily: Font.PrimaryFont }} >
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-0">
                                <div className="">
                                    <div>
                                        <span style={{ color: Color.PrimaryColor }}>[ </span  >
                                        <span style={{ color: Color.SecondaryColor }} className="num" data-to="500000" data-time="2000">   <Counter maxCount={student} /></span>
                                        <span style={{ color: Color.PrimaryColor }}>+ ]</span>
                                    </div>
                                    <h2 className=' mt-3'>Students</h2>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-0">
                                <div className="">
                                    <div>
                                        <span style={{ color: Color.PrimaryColor }}>[ </span  >
                                        <span style={{ color: Color.SecondaryColor }} className="num" data-to="500000" data-time="2000">   <Counter maxCount={teacher} /></span>
                                        <span style={{ color: Color.PrimaryColor }}>+ ]</span>
                                    </div>
                                    <h2 className=' mt-3'>Teachers</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <div className="space" style={{ height: "70px" }}></div>

                <CHPAboutUS />
                <div className="space" style={{ height: "150px" }}></div>

                <div className="text-center mt-5  " data-aos="zoom-in-down">
                    <h1 id='PT' className='display-2 '> [ Popular Teachers ]</h1>
                </div>

                <div className='row d-flex justify-content-center'>
                    {teacherData.slice(0, 4).map((teacher, index) => (
                        <div className='col-md-3  mt-5    ' data-aos="zoom-in-down" key={index}>
                            <CHPCard
                                image={teacher.profilePicture}
                                name={teacher.name}
                                description={teacher.subject}
                                rating={5}
                            />
                        </div>
                    ))}
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
        </div>
    )
}

export default Home
