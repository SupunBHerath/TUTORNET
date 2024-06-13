import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RatingSize from '../../Components/Rating/Raating';
import { Color } from '../../Components/CSS/CSS';

export default function CHPCard(prop: any) {
  const cardStyles = {
    maxWidth: 370,
    borderRadius: 20,
    minHeight: 300,
    minWidth: 300,
    borderColor: Color.PrimaryColor,
    margin: 'auto',
    marginTop: '1rem',
    transition: 'transform 0.3s, box-shadow 0.3s', 
    '&:hover': {
      transform: 'scale(1.05)', 
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)', 
    }
  };

  const mediaStyles = {
    height: 250,
    backgroundPosition: 'top'
  };

  const ratingContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px'
  };

  return (
    <Card sx={cardStyles}>
      <CardMedia
        sx={mediaStyles}
        image={prop.image}
        title="Profile Picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='text-center'>
          {prop.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='text-center'>
          {prop.description}
          <div style={ratingContainerStyles}>
            <RatingSize rating={prop.rating} />
          </div>
        </Typography>
        <br />
      </CardContent>
      
    </Card>
  );
}
