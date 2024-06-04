import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Card sx={{ maxWidth: 345, m: 2 ,minWidth:460 }}>
      <CardHeader animation="wave"
        avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
         
        }
        subheader={
            <Skeleton animation="wave" height={10} width="40%" />
        }
      />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
      </CardContent>
    </Card>
  );
}

export default function Facebook() {
  return (
    <div>
        <br /><br /><br /><br />
      <Media loading />
    </div>
  );
}
