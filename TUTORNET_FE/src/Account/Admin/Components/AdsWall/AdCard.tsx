
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

interface AdCardProps {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  link: string;
}

const AdCard: React.FC<AdCardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <Card  sx={{ maxWidth: 400, margin: '16px', boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
      <CardActionArea href={link} target="_blank" className='p-3'>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardMedia component="img" height="300" image={imageUrl} alt={title} />

      </CardActionArea>
    </Card>
  );
};

export default AdCard;

