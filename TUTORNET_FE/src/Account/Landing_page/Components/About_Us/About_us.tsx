// src/App.tsx
import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import logo from '../../../../../public/logo/Tutor logo.png'; // Import the logo image

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Oswald', sans-serif;
    color: #333;
    background-color: #fafafa;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components
const Container = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 1s ease-in;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  padding: 40px 0;
  text-align: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1.5s ease-in;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px; /* Adjust the width as needed */
  height: auto;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3em;
  color: #fff;
`;

const SectionBox = styled.div`
  background-color: #fff;
  padding: 30px;
  margin: 20px 0;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 2s ease-in;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SubTitle = styled.h2`
  color: #333;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 2.5s ease-in;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  line-height: 1.8;
  color: #555;
  animation: ${fadeIn} 3s ease-in;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  animation: ${fadeIn} 3.5s ease-in;
`;

const ListItem = styled.li`
  margin: 10px 0;
  font-size: 1.2em;
  line-height: 1.8;
  color: #555;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;

const JoinUsSection = styled(SectionBox)`
  background: linear-gradient(135deg, #f6921e, #f8b500);
  color: #fff;
  text-align: center;
`;

const Strong = styled.strong`
  font-size: 1.5em;
  color: #333;
`;

const AboutUs: React.FC = () => {
  return (
    <Container>
      <GlobalStyle />
      <Header>
        <Logo src={logo} alt="TUTORNET Logo" /> {/* Add the logo here */}
        <Title>About Us</Title>
      </Header>

      <SectionBox>
        <SubTitle>Our Mission</SubTitle>
        <Paragraph>
          "At TUTORNET, we aim to bridge the gap between students and educators, creating a seamless platform for learning, interaction, and growth. Our mission is to empower students by providing them easy access to teachers and educational resources, while enabling teachers to share their knowledge and gain visibility."
        </Paragraph>
      </SectionBox>
      <SectionBox>
        <SubTitle>Our Story</SubTitle>
        <Paragraph>
          "Founded in [Year], TUTORNET was born out of the desire to enhance the educational experience for both students and teachers. Recognizing the need for a centralized platform where students can effortlessly find and connect with teachers, our founders set out to create a user-friendly, feature-rich website. Since our inception, we have been dedicated to continuously improving and expanding our services to meet the needs of our growing community."
        </Paragraph>
      </SectionBox>
      <SectionBox>
        <SubTitle>What We Offer</SubTitle>
        <List>
          <ListItem>
            <Strong>Find and Connect with Teachers:</Strong> Students can search for teachers based on various criteria, view their profiles, and explore their posts.
          </ListItem>
          <ListItem>
            <Strong>View Posts:</Strong> Teachers regularly post educational content, which students can like and comment on, fostering an interactive learning environment.
          </ListItem>
          <ListItem>
            <Strong>Check Previous Years' Results:</Strong> Students can access a repository of previous years' results to help them gauge performance trends and prepare effectively.
          </ListItem>
          <ListItem>
            <Strong>Timetables:</Strong> Up-to-date timetables are available for students to stay organized and informed about their classes and activities.
          </ListItem>
          <ListItem>
            <Strong>Feedback and Interaction:</Strong> Students can provide feedback on teachers’ posts, contributing to a dynamic and responsive educational community.
          </ListItem>
        </List>
      </SectionBox>
      <SectionBox>
        <SubTitle>For Teachers</SubTitle>
        <Paragraph>
          Teachers can easily register and create a comprehensive profile, including:
        </Paragraph>
        <List>
          <ListItem>
            <Strong>Profile Customization:</Strong> Upload a profile picture, cover photo, and provide details such as name and occupation.
          </ListItem>
          <ListItem>
            <Strong>Manage Posts:</Strong> Add, edit, and delete educational posts to share valuable content with students.
          </ListItem>
          <ListItem>
            <Strong>Results Management:</Strong> Upload and manage previous years' results to keep students informed.
          </ListItem>
          <ListItem>
            <Strong>Timetable Management:</Strong> Post and update timetables to ensure students have access to the latest schedule information.
          </ListItem>
        </List>
      </SectionBox>
      <SectionBox>
        <SubTitle>Meet the Team</SubTitle>
        <Paragraph>
          "Our team comprises dedicated professionals passionate about education and technology. Together, we work tirelessly to ensure our platform remains intuitive, reliable, and beneficial for all users."
        </Paragraph>
      </SectionBox>
      <SectionBox>
        <SubTitle>Why Choose Us?</SubTitle>
        <List>
          <ListItem>
            <Strong>User-Friendly Interface:</Strong> Our website is designed with simplicity and ease of use in mind, ensuring a smooth experience for both students and teachers.
          </ListItem>
          <ListItem>
            <Strong>Interactive Features:</Strong> From liking posts to providing feedback, our platform encourages active participation and engagement.
          </ListItem>
          <ListItem>
            <Strong>Comprehensive Resources:</Strong> Access a wide range of educational materials, results, and timetables, all in one place.
          </ListItem>
        </List>
      </SectionBox>
    </Container>
  );
};

const About: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <AboutUs />
    </div>
  );
};

export default About;
