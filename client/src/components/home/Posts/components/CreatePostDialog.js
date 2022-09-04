import { useContext, useState } from 'react'
import { FileUploader } from "react-drag-drop-files"
import Zoom from '@mui/material/Zoom'
import Picker from 'emoji-picker-react'
import { FormDialogStyled } from '../Posts.styled'
import { useDispatch } from 'react-redux'
import { createPost } from '../../../../features/posts/postSlice'
import { GeneralContext } from '../../../../contextAPIs/GeneralContext'

import { Avatar, Divider, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'
import TitleIcon from '@mui/icons-material/Title'
import CloseIcon from '@mui/icons-material/Close'
import TagFacesIcon from '@mui/icons-material/TagFaces'

export default function FormDialog({ open, setOpen, methodIndex, setMethodIndex }) {
  const { me } = useContext(GeneralContext)
  const [file, setFile] = useState(null)
  const [captition, setCaptition] = useState('')
  const [text, setText] = useState('')
  const [postField, setPostField] = useState('global')
  const [pickerOpen, setPickerOpen] = useState(false)
  const dispatch = useDispatch()

  const handleShare = () => {
    let formData
    const token = localStorage.getItem('token')
    switch (methodIndex) {
        case 0:
            if ( !text ) return
            formData = new FormData()
            formData.append('text', text)
            formData.append('dataType', 'data/text')
            break
        case 1:
            if ( !file || !captition ) return
            formData = new FormData()
            formData.append('file', file)
            formData.append('captition', captition)
            formData.append('dataType', 'data/image')
            break
        case 2:
            if ( !file || !captition ) return
            formData = new FormData()
            formData.append('file', file)
            formData.append('captition', captition)
            formData.append('dataType', 'data/video')
            break
    }
    formData.append('firstName', me?.firstName)
    formData.append('surname', me?.surname)
    formData.append('avatar_url', me?.avatar)
    formData.append('userId', me?._id)
    formData.append('field', postField)

    dispatch(createPost({ formData, token }))
    setOpen(false)
  }

  const handleChangeMethodIndex = (index) => {
    setMethodIndex(index)
    setFile(null)
  }

  const onEmojiClick = (event, emojiObject) => {
    if ( methodIndex === 0 ) setText(text + emojiObject.emoji)
    else setCaptition(captition + emojiObject.emoji)
  }

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="xs">
        <FormDialogStyled>
            {pickerOpen && <div className="picker_overlay" onClick={() => setPickerOpen(false)}></div>}
            <DialogActions>
            <DialogTitle style={{ flex: 1 }}>Create Post</DialogTitle>
            <IconButton className="close" onClick={() => setOpen(false)}><CloseIcon /></IconButton>
            </DialogActions>
            <Divider />
            <DialogContent>
                <div className="user_info">
                <Avatar src={me?.avatar} alt="avatar" />
                <div>
                    <span>{me?.firstName + " " + me?.surname}</span>
                    <select onChange={(e) => setPostField(e.target.value)}>
                        <option value="global">Global</option>
                        <option value="friends">Friends</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                </div>
                {methodIndex === 0 && <TextMethod setPickerOpen={setPickerOpen} pickerOpen={pickerOpen} setText={setText} text={text}/>}
                {methodIndex === 1 && <ImageMethod setFile={setFile} file={file} setCaptition={setCaptition} captition={captition} setPickerOpen={setPickerOpen} pickerOpen={pickerOpen} />}
                {methodIndex === 2 && <VideoMethod setFile={setFile} file={file} setCaptition={setCaptition} captition={captition} setPickerOpen={setPickerOpen} pickerOpen={pickerOpen} />}
                <div className="data_types">
                    <h6>Choose Your Method:</h6>
                    <Tooltip title="Text"><IconButton style={{ backgroundColor: methodIndex === 0 ? '#ffeb3b1f' : '' }} onClick={() => handleChangeMethodIndex(0)}><TitleIcon /></IconButton></Tooltip>
                    <Tooltip title="Image"><IconButton style={{ backgroundColor: methodIndex === 1 ? '#4caf501f' : '' }} onClick={() => handleChangeMethodIndex(1)}><ImageIcon /></IconButton></Tooltip>
                    <Tooltip title="Video"><IconButton style={{ backgroundColor: methodIndex === 2 ? '#f443361f' : '' }} onClick={() => handleChangeMethodIndex(2)}><SmartDisplayIcon /></IconButton></Tooltip>
                </div>
            </DialogContent>
            <DialogActions>
            <Button className="share" onClick={handleShare} fullWidth>Share</Button>
            </DialogActions>
            {pickerOpen && <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '230px', top: methodIndex == 1 || methodIndex == 2 ? '10px' : '', right: methodIndex == 1 || methodIndex == 2 ? '65px' : '' }} />}
        </FormDialogStyled>
      </Dialog>
    </>
  )
}

const TextMethod = ({ setPickerOpen, pickerOpen, setText, text }) => {

    return (
        <>
        <div className="textarea">
            <textarea placeholder="what are you thinking about Ziad?" value={text} onChange={(e) => setText(e.target.value)} />
            
            <Tooltip title="Emoji"><IconButton className="picker_btn" onClick={() => setPickerOpen(!pickerOpen)}><TagFacesIcon /></IconButton></Tooltip>
        </div>
        </>
    )
}

const imageType = ["JPG", "PNG", "GIF", 'WEBP', 'JPEG']

const ImageMethod = ({ setFile, file, captition, setCaptition, setPickerOpen, pickerOpen }) => {
    const [base64, setBase64] = useState('')
    const handleChange = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            setBase64(reader.result)
        }
        setFile(file)
    }

    return (
        <>
        <div className="image_upload">
            <div>
                <Tooltip title="Image Captition" placement="left" TransitionComponent={Zoom} >
                    <input type="text" placeholder="captition" value={captition} onChange={(e) => setCaptition(e.target.value)} />
                </Tooltip>
                <Tooltip title="Emoji"><IconButton className="picker_btn" onClick={() => setPickerOpen(!pickerOpen)}><TagFacesIcon /></IconButton></Tooltip>
            </div>
            <h5>Please Upload or Drag your Image here:</h5>
            <FileUploader handleChange={handleChange} name="file" types={imageType} hoverTitle="Drop here"/>
            {file?.name && <h6>File name: {file.name}</h6>}
            {base64 && <div className="preview">
                <h6>Preview:</h6>
                <div><img src={base64} alt="preview_image" /></div>
            </div>}
        </div>
        </>
    )
}


const videoType = ["MP4", 'MKV']

const VideoMethod = ({ setFile, file, captition, setCaptition, setPickerOpen, pickerOpen }) => {
    const [videoURL, setVideoURL] = useState(null)
    const handleChange = (file) => {
        setVideoURL( URL.createObjectURL(file) )
        setFile(file)
    }
    return (
        <>
        <div className="video_upload">
            <div>
                <Tooltip title="Video Captition" placement="left" TransitionComponent={Zoom} >
                    <input type="text" placeholder="captition" value={captition} onChange={(e) => setCaptition(e.target.value)} />
                </Tooltip>
                <Tooltip title="Emoji"><IconButton className="picker_btn" onClick={() => setPickerOpen(!pickerOpen)}><TagFacesIcon /></IconButton></Tooltip>
            </div>
            <h5>Please Upload or Drag your Video here:</h5>
            <FileUploader handleChange={handleChange} name="file" types={videoType} hoverTitle="Drop here"/>
            {file && <h6>File name: {file.name}</h6>}
            {file && <div className="preview">
                <h6>Preview:</h6>
                <div>
                    <video src={videoURL} controls poster='./facebook-video-ads.webp'></video>
                </div>
            </div>}
        </div>
        </>
    )
}


