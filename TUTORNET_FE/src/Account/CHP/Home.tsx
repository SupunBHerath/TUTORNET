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
import t1 from '../../../public/Teacher/t1.jpg'
import t2 from '../../../public/Teacher/t2.jpg'
import u1 from '../../../public/Users/u1.jpg'
import u2 from '../../../public/Users/u2.jpg'
import u4 from '../../../public/Users/u4.jpg'
import u5 from '../../../public/Users/u5.jpg'
import { AdsCarousel } from './Components/AdsCarousel'
import axios from 'axios'
import ContactUsPage from './Components/ContactUs'

interface UserData {
    _id: string;
    userId: string;
    name: string;
    subject: string;
    role: string;
    profilePicture: string;
    rating: number;
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
        const fetchData = async () => {
            try {
                const teacherResponse = await axios.get('/teacher/all');
                const teachers = teacherResponse.data;

                const teacherRatings = await Promise.all(
                    teachers.map(async (teacher:UserData) => {
                        const ratingResponse = await axios.get(`feedback/rating/${teacher._id}`);
                        return { ...teacher, rating: ratingResponse.data.userTotalRatings };  
                    })
                );
                teacherRatings.sort((a, b) => b.rating - a.rating);
                setTeacherData(teacherRatings);
                setTeacher(teachers.length);
               console.log(teacherData);
               
                const studentResponse = await axios.get('/student/all');
                setStudent(studentResponse.data.length);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);
    return (
        <div className=''>
            <div className="container-fluid ">
                <div
                    className="headerSesion bg-dark w-100"
                    style={{
                        minHeight: "100vh",
                        backgroundImage: `url(${l3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    data-aos="zoom-in-down"
                >
                    <div className="header-text">

                        <h1 data-aos="zoom-in-down"
                            className="display-1 p-5 mt-2"
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
                        <div
                            className='col-12 col-sm-6 col-md-4 col-lg-3 mt-5'
                            data-aos="zoom-in-down"
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <CHPCard
                                image={teacher.profilePicture}
                                name={teacher.name}
                                description={teacher.subject}
                                rating={teacher.rating}
                            />
                        </div>
                    ))}
                </div>


                <div className="space" style={{ height: "150px" }}></div>
                <AdsCarousel />
                <div className="Comment_session d-none d-lg-block">
                    <div className="space" style={{ height: "150px" }}></div>

                    <div className="text-center mt-5" data-aos="zoom-in-down">
                        <h1 id="PT" className="display-2">
                            [ User Comment ]
                        </h1>
                    </div>
                    <br />
                    <br />
                    <div className="commentSession">
                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="8000">
                                    <div className="UserComment justify-content-evenly d-flex">
                                        <UserCommentCard img={t1} userName="Amith Pussella " comment="good" rating={5} />
                                        <UserCommentCard img={u2} userName="Sandaru Sadishan " comment="good" rating={5} />
                                        <UserCommentCard img={u4} userName="Kalasi Marambage" comment="good" rating={5} />
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="8000">
                                    <div className="UserComment justify-content-evenly d-flex">
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
                <div className="text-center mt-5  " data-aos="zoom-in-down" id='cu'>
                    <h1 id='PT' className='display-2 '> [ Contact Us ]</h1>
                    <br /><br /><br />
                </div>
                <br /><br />

                <ContactUsPage />

            </div>
            <div className="space" style={{ height: "150px" }}></div>
        </div>
    )
}

export default Home
