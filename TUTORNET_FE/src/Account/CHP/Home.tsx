import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import SideShow from './SideShow'
import CHPNaviBar from './CHPNaviBar'
import CHPCard from './CHPCard'
import Logo from '../../../public/logo/Logo_t.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'aos/dist/aos.js'
import './CHP.css'
import Supun from '../../../public/i.jpg'
import Conterner from './Conterner'
import Login from '../../Login_Signup/Login'
// CHP  common home page 

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        })
    })
    return (
        <div className=''>
            <CHPNaviBar />
            <div className="container ">
                <div className="text-center mt-5 ">
                    <h1 id='PT'>Popular Teachers</h1>
                </div>
                <div className='row mt-5  justify-content-center ' data-aos="zoom-in-down">
                    <CHPCard image={Supun} name=" Supun " description="---description ---" />
                    <CHPCard image={Supun} name=" Bandara " description="---description ---" />
                    <CHPCard image={Supun} name=" Supun " description="---description ---" />
                    <CHPCard image={Supun} name=" Supun " description="---description ---" />
                </div>
                {/* <div className="n">
                    <Conterner title='WELCOME TUTORNET ' description="-----DESCRIPTION-----  1 " img={Logo} aos1="fade-right" aos2="fade-left" aos3="fade-up" />

                </div>
                <div className="n">
                    <Conterner title='WELCOME TUTORNET ' description="-----DESCRIPTION-----  1 " img={Logo} aos1="fade-right" aos2="fade-left" aos3="fade-up" />

                </div>
                <div className="n">
                    <Conterner title='WELCOME TUTORNET ' description="-----DESCRIPTION-----  1 " img={Logo} aos1="fade-right" aos2="fade-left" aos3="fade-up" />

                </div> */}
            </div>
        </div>
    )
}

export default Home
