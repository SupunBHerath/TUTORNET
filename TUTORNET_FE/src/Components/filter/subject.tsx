import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function SubjectFilter() {
  return (
    <Stack spacing={2} sx={{ width: 350 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={subjects.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Subject"
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

const subjects = [
  { title: 'Accounting' },
  { title: 'Advanced Level General English' },
  { title: 'Agriculture' },
  { title: 'Biology' },
  { title: 'Business Studies' },
  { title: 'Chemistry' },
  { title: 'Combined Mathematics' },
  { title: 'Economics' },
  { title: 'English' },
  { title: 'Geography' },
  { title: 'History' },
  { title: 'ICT' },
  { title: 'Logic and Scientific Method' },
  { title: 'Mathematics' },
  { title: 'Physics' },
  { title: 'Political Science' },
  { title: 'Sinhala' },
  { title: 'Tamil' }
];
