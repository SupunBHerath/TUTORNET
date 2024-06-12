import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link, Grow, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import Fade from '@mui/material/Fade';
import '../CHP.css'
import { Font } from '../../../Components/CSS/CSS';
const contactDetails = {
    address: 'Meth bo sewana , Thiththagalla ,Galle ',
    email: 'info@tutornet.com',
    facebook: 'https://www.facebook.com/tutornet',
    whatsapp: '+94782503387',
};

const ContactUsPage = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" className="ContainerBackground " >
          
            <Grid container spacing={8}>
                <Fade in={true} style={{ transitionDelay: '500ms' }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom style={{fontFamily:Font.PrimaryFont}}>
                            Get in touch with us using the information below, or fill out our contact form
                        </Typography>
                        <br />
                        <Grow in={true} style={{ transformOrigin: '0 0 0',fontFamily:Font.PrimaryFont }} timeout={1000} >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon color="primary" />
                                <Typography variant="body1" component="span" ml={1} style={{fontFamily:Font.PrimaryFont}}>
                                    {contactDetails.address}
                                </Typography>
                            </Box>
                        </Grow>
                        <br />
                        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <EmailIcon color="primary" />
                                <Link href={`mailto:${contactDetails.email}`} underline="none" style={{fontFamily:Font.PrimaryFont}}>
                                    <Typography variant="body1" component="span" ml={1} style={{fontFamily:Font.PrimaryFont}}>
                                        {contactDetails.email}
                                    </Typography>
                                </Link>
                            </Box>
                        </Grow>
                        <br />
                        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <FacebookIcon color="primary" />
                                <Link href={contactDetails.facebook} underline="none" target="_blank" rel="noreferrer" style={{fontFamily:Font.PrimaryFont}}>
                                    <Typography variant="body1" component="span" ml={1} style={{fontFamily:Font.PrimaryFont}}>
                                        Facebook
                                    </Typography>
                                </Link>
                            </Box>
                        </Grow>
                        <br />

                        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WhatsAppIcon color="primary" />
                                <Link href={`https://wa.me/${contactDetails.whatsapp}`} underline="none">
                                    <Typography variant="body1" component="span" ml={1} style={{fontFamily:Font.PrimaryFont}}>
                                        WhatsApp ({contactDetails.whatsapp})
                                    </Typography>
                                </Link>
                            </Box>
                        </Grow>
                    </Grid>
                </Fade>
                <Fade in={true} style={{ transitionDelay: '1000ms' }}>
                    <Grid item xs={12} md={6}>
                        <iframe
                            width="100%"
                            height="450"
                            frameBorder="0"
                            style={{ border: 'none' }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126771.0682550976!2d80.2172033!3d6.0535198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1736a2e2e8e71%3A0x9c5f7f79a8b58a9!2sGalle%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1597747883964!5m2!1sen!2slk"
                            allowFullScreen
                            aria-hidden="false"
                        />
                    </Grid>
                </Fade>
            </Grid>
        </Container>
    );
};

export default ContactUsPage;

// Add these styles to your CSS

