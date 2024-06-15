import React from 'react';
import { Box, Container, Grid, Typography, Link, Grow, Fade, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Font } from '../../../Components/CSS/CSS';

const contactDetails = {
    address: 'Meth bo sewana , Thiththagalla ,Galle ',
    email: 'info@tutornet.com',
    facebook: 'https://www.facebook.com/tutornet',
    whatsapp: '+94782503387',
};

const ContactUsPage = () => {
    const theme = useTheme();

    React.useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <Container
            maxWidth="lg"
            style={{
                backgroundColor: '#f0f4f8',
                padding: '2rem 1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                fontFamily: Font.PrimaryFont,
                marginTop: '2rem',
                marginBottom: '2rem',
            }}
        >
            <Grid container spacing={4} alignItems="center">
                <Fade in={true} style={{ transitionDelay: '500ms' }}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            style={{ fontFamily: Font.PrimaryFont, color: theme.palette.primary.dark }}
                            data-aos="fade-up"
                        >
                            Contact Us
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{ marginBottom: '1.5rem', fontFamily: Font.PrimaryFont }}
                            data-aos="fade-up"
                        >
                            We're here to help. Get in touch with us using the details below.
                        </Typography>
                        <Grow in={true} timeout={1000}>
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                                data-aos="fade-up"
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <LocationOnIcon color="primary" />
                                <Typography
                                    variant="body1"
                                    component="span"
                                    ml={1}
                                    style={{ fontFamily: Font.PrimaryFont }}
                                >
                                    {contactDetails.address}
                                </Typography>
                            </Box>
                        </Grow>
                        <Grow in={true} timeout={1000}>
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                                data-aos="fade-up"
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <EmailIcon color="primary" />
                                <Link
                                    href={`mailto:${contactDetails.email}`}
                                    underline="none"
                                    style={{
                                        fontFamily: Font.PrimaryFont,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        marginLeft: '0.5rem',
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                                >
                                    {contactDetails.email}
                                </Link>
                            </Box>
                        </Grow>
                        <Grow in={true} timeout={1000}>
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                                data-aos="fade-up"
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <FacebookIcon color="primary" />
                                <Link
                                    href={contactDetails.facebook}
                                    underline="none"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        fontFamily: Font.PrimaryFont,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        marginLeft: '0.5rem',
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                                >
                                    Facebook
                                </Link>
                            </Box>
                        </Grow>
                        <Grow in={true} timeout={1000}>
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                                data-aos="fade-up"
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <WhatsAppIcon color="primary" />
                                <Link
                                    href={`https://wa.me/${contactDetails.whatsapp}`}
                                    underline="none"
                                    style={{
                                        fontFamily: Font.PrimaryFont,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        marginLeft: '0.5rem',
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                                >
                                    WhatsApp ({contactDetails.whatsapp})
                                </Link>
                            </Box>
                        </Grow>
                    </Grid>
                </Fade>
                <Fade in={true} style={{ transitionDelay: '1000ms' }}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                boxShadow: 3,
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transform: 'scale(1)',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                            data-aos="fade-left"
                        >
                            <iframe
                                width="100%"
                                height="450"
                                frameBorder="0"
                                style={{ border: 'none' }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126771.0682550976!2d80.2172033!3d6.0535198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1736a2e2e8e71%3A0x9c5f7f79a8b58a9!2sGalle%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1597747883964!5m2!1sen!2slk"
                                allowFullScreen
                                aria-hidden="false"
                            />
                        </Box>
                    </Grid>
                </Fade>
            </Grid>
        </Container>
    );
};

export default ContactUsPage;
