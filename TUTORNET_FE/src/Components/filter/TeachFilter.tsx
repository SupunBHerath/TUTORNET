import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function TeachFilter() {
  return (
    <Stack spacing={2} sx={{ width: 350 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={teacher.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Teacher"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

const teacher =[{title:''}];