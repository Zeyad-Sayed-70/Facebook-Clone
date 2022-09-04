import * as React from 'react'
import { Block } from '@uiw/react-color'
import { 
   Checkbox
  ,FormControlLabel
  ,FormGroup
  ,Button
  ,TextField 
  ,Dialog 
  ,DialogActions 
  ,DialogContent 
  ,DialogContentText 
  ,DialogTitle
} from '@mui/material'

import ToggleButtons from './editPreviewToggles'

export default function FormDialog({open, setOpen, method, setMethod, formData, setFormData, handleCreateStory}) {
    const [image64, setImage64] = React.useState('')
    
    const handleClose = () => {
        setOpen(false);
    }
  
    React.useEffect(() => {
        if ( formData.image ) {
          let reader = new FileReader()
          reader.readAsDataURL(formData.image)
          
          reader.onload = function () {
              setImage64(reader.result)
          }
        }
    }, [formData.image])
    
  
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Your Story</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ textTransform: 'lowerCase' }}>
              To Create Your Own Story You Should Uplaod Image or Type Text for Your Story,
              You Can Do This From The Form Below.
            </DialogContentText>
              <h6 style={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>Choose Your Method:</h6>
              <FormGroup>
                  <FormControlLabel style={{userSelect: 'none'}} disabled={method.image} control={<Checkbox defaultChecked={method.text} />} label="Text Story" onChange={(e) => setMethod({...method, text: e.target.checked})}/>
                  <FormControlLabel style={{userSelect: 'none'}} disabled={method.text} control={<Checkbox defaultChecked={method.image} />} label="Image Story" onChange={(e) => setMethod({...method, image: e.target.checked})}/>
              </FormGroup>
              {method.text && 
              <div>
              <h6 style={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>Text Content:</h6>
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Story Content (Text)"
              type="text"
              fullWidth
              variant="standard"
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              />
              <h6 style={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>Text & Backgound Color:</h6>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem', flexWrap: 'wrap', gap: '1.5rem' }} >
                  <div>
                      <div style={{ textAlign: 'center', fontWeight: 'bold', color: formData.textColor, backgroundColor: formData.bgColor, padding: '.5rem 1rem', borderRadius: '50px' }}>Background</div>
                      <Block
                          style={{ marginTop: '1rem' }}
                          color={formData.bgColor}
                          onChange={(color) => setFormData({...formData, bgColor: color.hex})}
                      />
                      <div style={{ background: formData.bgColor, marginTop: 30, padding: 10 }}>
                          {formData.bgColor}
                      </div>
                  </div>
                  <div>
                  <div style={{ textAlign: 'center', fontWeight: 'bold', color: formData.textColor, backgroundColor: formData.bgColor, padding: '.5rem 1rem', borderRadius: '50px' }}>Text</div>
                      <Block
                          style={{ marginTop: '1rem' }}
                          color={formData.textColor}
                          onChange={(color) => setFormData({...formData, textColor: color.hex})}
                      />
                      <div style={{ background: formData.textColor, marginTop: 30, padding: 10 }}>
                          {formData.textColor}
                      </div>
                  </div>
              </div>
              <div className="m-0 mx-md-5">
                  <h6 style={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>Edit Preview:</h6>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} className="justify-content-center justify-content-md-between"><ToggleButtons formData={formData} setFormData={setFormData} /></div>
                  <div style={{ padding: '1rem 0', }}>
                      <div style={{ minHeight: '450px', padding: '2rem', backgroundColor: formData.bgColor, color: formData.textColor, display: 'flex', justifyContent: formData.justify, textAlign: formData.justify, alignItems: formData.alignment, }}>
                          <h6 style={{ margin: '0', fontSize: '1.3rem' }}>{formData.text}</h6>
                      </div>
                  </div>
              </div>
              </div>}
              {method.image && 
              <div>
                  <h6 style={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>Upload Image:</h6>
                  <input type="file" name="story" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
                  <h6 style={{ marginTop: '1rem', color: 'rgba(0, 0, 0, 0.87)' }}>Preview Image:</h6>
                  {image64 ? <img style={{ width: '100%', maxHeight: '600px', marginTop: '1rem' }} src={image64} /> : <p style={{ fontSize: '12px' }}>'please Select Image'</p>}
              </div>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateStory}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  