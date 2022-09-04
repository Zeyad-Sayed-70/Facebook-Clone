import * as React from 'react'
import { 
   ToggleButton
  ,ToggleButtonGroup
} from '@mui/material'

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter'

export default function ToggleButtons({ setFormData, formData }) {

    const handleJsutify = (event, newJustify) => {
      setFormData({...formData, justify: newJustify})
    };
  
    const handleAlignment = (event, newAlignment) => {
      setFormData({...formData, alignment: newAlignment})
    };
  
    return (
      <>
      <ToggleButtonGroup
        value={formData.jsutify}
        exclusive
        onChange={handleJsutify}
        aria-label="text jsutify"
      >
        <ToggleButton value="left" selected={formData.justify === 'left'} aria-label="left jsutify">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center" selected={formData.justify === 'center'} aria-label="centered">
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value="right" selected={formData.justify === 'right'} aria-label="right jsutify">
          <FormatAlignRightIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      
      <ToggleButtonGroup
        value={formData.alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="start" aria-label="start aligned">
          <VerticalAlignTopIcon />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          <VerticalAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value="end" aria-label="end aligned">
          <VerticalAlignBottomIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      </>
    );
  }
  