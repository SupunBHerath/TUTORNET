import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingSize(prop:any) {
  return (
    <Stack spacing={1}>
      <Rating name="size-medium" defaultValue={prop.rating} readOnly  />
    </Stack>
  );
}
