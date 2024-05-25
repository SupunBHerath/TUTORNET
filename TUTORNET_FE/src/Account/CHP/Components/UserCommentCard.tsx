
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import CardMedia from '@mui/material/CardMedia';
  import Typography from '@mui/material/Typography';
  import { CardActionArea } from '@mui/material';
  import '../../../../public/i.jpg'
import RatingSize from '../../../Components/Rating/Raating';
  
  export default function UserCommentCard(prop:any) {
    return (
      <Card sx={{ maxWidth: 345, borderRadius:10 }} className='border-3 border border-dark-subtle   '>
        <CardActionArea className='justify-content-center text-center d-sm-inline-flex  '>
          <CardMedia
            component="img"
            height="150px"
            image={prop.img}
            alt="green iguana"
            style={{borderRadius:"100%",width:"150px"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {prop.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {prop.comment}
            </Typography>
            <Typography variant="body2" color="text.secondary">
         <RatingSize rating={prop.rating}/>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  