import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const mock = [
  { title: 'mock' },
  { title: 'mock2' }
]

export default function ActionsHeader() {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        resetHighlightOnMouseLeave
        sx={{ width: 400 }}
        options={mock.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="Search Images" />}
      />
      <Button variant="contained">
        Upload
      </Button>
    </Stack>
  )
}