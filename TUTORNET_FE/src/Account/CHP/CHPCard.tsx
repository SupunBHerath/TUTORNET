import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.css'
import { ColorCode } from '../../Components/CSS/CSS';

export default function CHPCard(prop: any) {
  return (
    <div className="col-md-3   ">
      <Card sx={{ maxWidth: 345 }} className='CHPCard mt-4 mx-auto ' style={{borderColor:ColorCode.SecondaryColor}}>
        <CardMedia
          sx={{ height: 240 }}
          image={prop.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='text-center '>
           {prop.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {prop.description}
          </Typography>
        </CardContent>
        <CardActions className='justify-content-center '>
     
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </div>

  );
}
