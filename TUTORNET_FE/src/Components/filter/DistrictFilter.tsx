import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function DistrictFilter() {
  return (
    <Stack spacing={2} sx={{ width: 350 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={districts.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Districts"
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

const districts = [
  { title: 'Ampara' },
  { title: 'Anuradhapura' },
  { title: 'Badulla' },
  { title: 'Batticaloa' },
  { title: 'Colombo' },
  { title: 'Galle' },
  { title: 'Gampaha' },
  { title: 'Hambantota' },
  { title: 'Jaffna' },
  { title: 'Kalutara' },
  { title: 'Kandy' },
  { title: 'Kegalle' },
  { title: 'Kilinochchi' },
  { title: 'Kurunegala' },
  { title: 'Mannar' },
  { title: 'Matale' },
  { title: 'Matara' },
  { title: 'Monaragala' },
  { title: 'Mullaitivu' },
  { title: 'Nuwara Eliya' },
  { title: 'Polonnaruwa' },
  { title: 'Puttalam' },
  { title: 'Ratnapura' },
  { title: 'Trincomalee' },
  { title: 'Vavuniya' }
];

