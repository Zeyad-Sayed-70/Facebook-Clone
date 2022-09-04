import { Avatar, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'
import TitleIcon from '@mui/icons-material/Title'
import CreatePostDialog from './CreatePostDialog'
import { GeneralContext } from '../../../../contextAPIs/GeneralContext'

const CreatePostForm = () => {
  const {me} = useContext(GeneralContext)
  const [open, setOpen] = useState(false)
  const [methodIndex, setMethodIndex] = useState(0)

  const handleClick = (index) => {
    setMethodIndex(index)
    setOpen(true)
  }

  return (
    <>
      <div className="create_container">
        <CreatePostDialog open={open} setOpen={setOpen} methodIndex={methodIndex} setMethodIndex={setMethodIndex}/>
        <div className='create_post_dialog'>
          <Avatar src={me?.avatar} alt="avatar" />
          <div className="create_btn" onClick={() => handleClick(0)}>what are you thinking about, {me?.firstName}?</div>
        </div>
        <hr />
        <div className="controllers">
          <Button onClick={() => handleClick(0)}><TitleIcon /> <span>Text</span></Button>
          <Button onClick={() => handleClick(1)}><ImageIcon /> <span>Image</span></Button>
          <Button onClick={() => handleClick(2)}><SmartDisplayIcon /> <span>Video</span></Button>
        </div>
      </div>
    </>
  )
}

export default CreatePostForm