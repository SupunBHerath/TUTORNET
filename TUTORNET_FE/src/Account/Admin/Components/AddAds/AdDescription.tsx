import React from 'react';
import styled from 'styled-components';
import { Color, Font } from '../../../../Components/CSS/CSS';
import { Button } from '@mui/material';
import AddAdsFormTeacher from './AddAdsFormTeacher';
import AdsBtnTeacher from './AdsBtnTeacher';

interface AdPlacement {
  location: string;
  price: number;
  description: string;
}

const adPlacements: AdPlacement[] = [
  { location: 'Landing Page', price: 3000, description: 'Maximize visibility with a prominent ad on our landing page, the first thing users see when they visit TutorNet.' },
  { location: 'Home Page', price: 2000, description: 'Reach a wide audience with an ad on our home page, a central hub for all users.' },
  { location: 'Search Page', price: 1500, description: 'Target your audience effectively by placing your ad on the search page, where users actively look for tutoring services.' }
];

const Container = styled.div`
  padding: 40px;
  font-family: ${Font.PrimaryFont};
  max-width: 900px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: ${Color.SecondaryColor};
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.1em;
  color: #606060;
  margin-bottom: 40px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const GridItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  color
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Location = styled.h2`
  margin-bottom: 10px;
  color: ${Color.PrimaryColor};
`;

const Price = styled.p`
  margin-bottom: 15px;
  font-size: 1.2em;
  
  color: ${Color.SecondaryColor};
`;

const AdDescription: React.FC = () => {
  return (
    <Container className='shadow-lg mt-3'>
      <Title>
        Advertise with <span style={{color:Color.PrimaryColor}}>TUTOR</span><Highlight>NET</Highlight>
      </Title>
      <Description>
        Welcome to TutorNet's advertising page. Here, you can place your ads in three strategic locations on our website. Each option is designed to maximize your visibility and reach within our community of learners and educators. Choose the best fit for your advertising needs:
      </Description>
      <GridContainer>
        {adPlacements.map((placement, index) => (
          <GridItem key={index}>
            <Location>{placement.location}</Location>
            <Price>${placement.price} for 7 days</Price>
            <p>{placement.description}</p>
          </GridItem>
        ))}
      </GridContainer>
      <br />
      <Description>Get started today and connect with thousands of users looking for tutoring services!</Description>
      <AdsBtnTeacher />
    </Container>
  );
};

export default AdDescription;
