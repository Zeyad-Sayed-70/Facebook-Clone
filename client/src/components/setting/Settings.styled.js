import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '5px 6px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))

export function GenderSelect({ generalData, setGeneralData }) {
  const [gender, setGender] = React.useState('');

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel style={{ color: '#888' }} id="demo-simple-select-label">Gender</InputLabel>
        <Select
        style={{ color: '#fcfcfb' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={generalData.gender}
          label="Gender"
          onChange={(e) => setGeneralData({...generalData, gender: e.target.value})}
        >
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>female</MenuItem>
          <MenuItem value='Custom'>Custom</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )}