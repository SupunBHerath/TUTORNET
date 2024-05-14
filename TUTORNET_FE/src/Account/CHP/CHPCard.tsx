import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.css'
import { Color } from '../../Components/CSS/CSS';
import RatingSize from '../../Components/Rating/Raating';

export default function CHPCard(prop: any) {
  return (
    <div className="col-md-3   ">
      <Card sx={{ maxWidth: 345 , borderRadius:20 }} className='CHPCard mt-4 mx-auto  ' style={{borderColor:Color.PrimaryColor}}>
        <CardMedia
          sx={{ height: 270 }}
          image={prop.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='text-center '>
           {prop.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='text-center  '>
           {prop.description}
           
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"10px"}}> {/* Inline styles to center the RatingSize component */}
          <RatingSize rating={prop.rating} />
        </div>
          </Typography>
        </CardContent>
        <CardActions className='justify-content-center '>
     
          <Button size="small" variant='outlined'>View</Button>
        </CardActions>
      </Card>
    </div>

  );
}
