import React, { useContext, useEffect, useState } from 'react'
import { ListItemButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FormDialog from './createStoryDialog'
import SpecificStory from './storyBuilder'
import { useDispatch, useSelector } from 'react-redux'
import { createStory, fetchStory } from '../../../../features/story/storySlice'
import { GeneralContext } from '../../../../contextAPIs/GeneralContext'

const ListofStories = () => {
  const { me } = useContext(GeneralContext)
  const [method, setMethod] = useState({ text: false, image: false })
  const [formData, setFormData] = useState({ text: 'Default Story Content Text', bgColor: '#555555', textColor: '#D9E3F0', justify: 'center', alignment: 'center', image: undefined })
  const [open, setOpen] = useState(false)
  const { data } = useSelector(state => state.story)
  const [stories, setStories] = useState([])
  const [storyIndex, setStoryIndex] = useState([])
  const [specificStoryOpen, setSpecificStoryOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if ( data?.data?.length !== 0 ) {
        // console.log(data?.data?.data)
        setStories(data?.data?.data)
    }
  }, [data])

  useEffect(() => {
    if (me?._id)
        dispatch(fetchStory({ userId: me?._id, token: localStorage.getItem('token') }))
  }, [me])
  
  useEffect(() => {
      if ( storyIndex.length !== 0 ) {
          setSpecificStoryOpen(true)
      }
  }, [storyIndex])

  const handleCreateStory = async () => {
      if ( method.text ) {
          const { text, bgColor, textColor, alignment, justify } = formData
          if( text && bgColor && textColor && alignment && justify ) {
            const textData = { text, bgColor, textColor, alignment, justify }
            const textStoryData = new FormData()
            textStoryData.append('text', JSON.stringify(textData))
            textStoryData.append('creatorId', me?._id)
            dispatch(createStory({ story: textStoryData, token: localStorage.getItem('token') }))
        }
      }
    
    if ( method.image ) {
        const imageStoryData = new FormData()
        imageStoryData.append('story', formData.image)
        imageStoryData.append('creatorId', me?._id)
        dispatch(createStory({ story: imageStoryData, token: localStorage.getItem('token') }))
      }

      setOpen(false)
    }

    const handleOpenStory = (e) => {
        setStoryIndex(e)
    }
    

  return (
    <>
    {<SpecificStory setSpecificStoryOpen={setSpecificStoryOpen} specificStoryOpen={specificStoryOpen} setStoryIndex={setStoryIndex} storyIndex={storyIndex} stories={stories} />}
    <FormDialog open={open} setOpen={setOpen} formData={formData} setFormData={setFormData} method={method} setMethod={setMethod} handleCreateStory={handleCreateStory}/>
    <div className="list create">
        <ListItemButton className="list_btn" onClick={() => setOpen(true)}>
            <img src={me?.avatar} />
            <div className="addicon"><div><AddIcon /></div></div>
            <p>Create Story</p>
        </ListItemButton>
    </div>
    {stories?.map((e, ind1) => {
        const story = e.stories[0]
        if ( story.method === 'image' ) {
            return (
            <div className="list" key={ind1}>
                <ListItemButton className="list_btn" onClick={() => handleOpenStory([ind1, 0])}>
                    <img src={story.story}/>
                </ListItemButton>
                <div className="avatar"><img src={e.user.avatar} /></div>
            </div>
            )
        }

        if ( story.method === 'text' ) {
            return (
            <div className="list" key={ind1}>
                <ListItemButton className="list_btn" onClick={() => handleOpenStory([ind1, 0])}>
                    <div
                    className="text_prev"
                    style={{ 
                        backgroundColor: story.story.bgColor, 
                        color: story.story.textColor, 
                        display: 'flex', 
                        alignItems: story.story.alignment, 
                        justifyContent: story.story.justify, 
                        textAlign: story.story.justify, 
                        fontWeight: 'bold',
                        fontSize: '10px',
                        padding: '.5rem',
                        }}>
                        {story.story.text}
                    </div>
                </ListItemButton>
                <div className="avatar"><img src={e.user.avatar} /></div>
            </div>
            )
        }
    })}
    </>
  )
}

export default ListofStories