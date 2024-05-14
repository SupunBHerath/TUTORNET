import React from 'react'
import { Color } from '../../../Components/CSS/CSS'
import { Link } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <div>

            <div className="container-fluid text-white  mt-5" style={{ backgroundColor: Color.PrimaryColor }}>
                <footer className="py-5 p-5">
                    <div className="row">


                        <div className=" col-md-6 mb-3  text-center ">
                            <h2>Section</h2>
                            <ul className="nav flex-column h5 ">
                                <br />
                                <Link to='/' className='text-white text-decoration-none'>
                                    <IconButton style={{ color: Color.SecondaryColor }}>
                                        <HomeIcon />
                                    </IconButton>
                                    <span style={{ color: Color.SecondaryColor }}>Home</span>
                                </Link>
                                <br />
                                <Link to='/' className='text-white text-decoration-none'>
                                    <IconButton style={{ color: Color.SecondaryColor }}>
                                        <InfoIcon />
                                    </IconButton>
                                    <span style={{ color: Color.SecondaryColor }}>About Us</span>
                                </Link>
                                <br />
                                <Link to='/' className='text-white text-decoration-none'>
                                    <IconButton style={{ color: Color.SecondaryColor }}>
                                        <FeedbackIcon />
                                    </IconButton>
                                    <span style={{ color: Color.SecondaryColor }}>Feedback</span>
                                </Link>



                            </ul>
                        </div>



                        <div className="col-md-6  mb-3 text-center ">
                            <h2> Contact Us</h2>
                            <div className="icon  " >
                                <IconButton style={{ color: Color.SecondaryColor }}>
                                    <FacebookIcon />
                                </IconButton>

                                <IconButton style={{ color: Color.SecondaryColor }}>
                                    <WhatsAppIcon />
                                </IconButton>
                                <IconButton style={{ color: Color.SecondaryColor }}>
                                    <EmailIcon />
                                </IconButton>
                            </div>

                        </div>
                    </div>

                    <div className="lex-sm-row justify-content-between py-4 my-4 border-top text-center w-100 h4">
                        <p>&copy; 2024 Company, Inc. All rights reserved.</p>

                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer
