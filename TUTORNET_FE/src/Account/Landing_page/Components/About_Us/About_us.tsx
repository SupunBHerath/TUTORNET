// src/App.tsx
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import leftImage from './HD-wallpaper-never-stop-learning-calm-positive-quotes-stay-word-thumbnail.jpg';
import rightImage from './HD-wallpaper-never-stop-learning-calm-positive-quotes-stay-word-thumbnail.jpg';

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Oswald', sans-serif;
    color: #333;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }
`;

// Styled components
const Container = styled.div`
  position: relative;
  width: 55%; /* Decreased page width */
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #004aad;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5em;
  color: #f6921e; /* Added color */
`;

const SectionBox = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SubTitle = styled.h2`
  color: #004aad;
  font-size: 2em;
  margin-bottom: 10px;
  text-align: center; /* Center the subtitle */
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin: 10px 0;
  font-size: 1.2em;
  line-height: 1.6;
`;

const JoinUsSection = styled(SectionBox)`
  background-color: #f6921e; /* Added color */
  color: #fff;
  text-align: center;
`;

const Strong = styled.strong`
  font-size: 1.5em;
`;

const LeftImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px; /* Adjust size as needed */
  height: auto;
`;

const RightImage = styled.img`
  position: fixed;
  top: 0;
  right: 0;
  width: 200px; /* Adjust size as needed */
  height: auto;
`;

const AboutUs: React.FC = () => {
  return (
    <Container>
      <GlobalStyle />
      <Header>
        <Title>About Us</Title>
      </Header>
      <LeftImage src={leftImage} alt="Left Image" />
      <RightImage src={rightImage} alt="Right Image" />
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
      <JoinUsSection>
        <SubTitle>Contact Us</SubTitle>
        <Paragraph>
          We invite you to join our growing community of students and educators. Whether you are a student looking for guidance or a teacher aiming to share your expertise, TUTORNET is here to support your educational journey.
        </Paragraph>
        <Paragraph>
          Stay connected with us through our social media channels, [Social Media Links], or reach out to us at [Contact Information] for any inquiries or support.
        </Paragraph>
        <Paragraph>
          <Strong>Get Started Today!</Strong> Sign up now and be part of an innovative platform designed to enhance education and foster a thriving learning community.
        </Paragraph>
      </JoinUsSection>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <AboutUs />
    </div>
  );
};

export default App;
