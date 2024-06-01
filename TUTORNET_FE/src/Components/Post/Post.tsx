import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post(props:any) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card sx={{ minWidth: 345}} style={{margin:' auto' ,marginBottom:"40px",height:'auto'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[100] }} aria-label="recipe">
            <img src={props.pp} alt="0" style={{backgroundPositionX:'center', backgroundSize:'cover',width:'55px'}}/>
          </Avatar>
        }
        action={
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
        <MoreVertIcon />
          </ExpandMore>
           }
        
        title={props.title}
        subheader={props.date}
      />
      <CardMedia
        component="img"
        height="auto"
        image={props.img}
      
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <AddCommentRoundedIcon />
        </IconButton>
       
      </CardActions>
      
    </Card>
  );
}
