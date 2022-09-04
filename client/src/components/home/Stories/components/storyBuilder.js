import * as React from 'react'
import { 
   Button
  ,Dialog 
  ,DialogActions 
  
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { SpecificStoryStyled } from '../Story.styled'

export default function SpecificStory({specificStoryOpen, setSpecificStoryOpen, setStoryIndex, storyIndex, stories}) {
  
    const [user, setUser] = React.useState({})
    const [story, setStory] = React.useState({})
    const [timerRestart, setTimerRestart] = React.useState(false)
    const [date, setDate] = React.useState('0m')
    const [responsive, setResponsive] = React.useState(false)
    let timerTimeout
  
    function checkResponsive() {
      if ( window.innerWidth <= 767 ) setResponsive(true)
      else setResponsive(false) 
    }
  
    React.useEffect(() => {
      checkResponsive()
      window.addEventListener('resize', checkResponsive)
      return () => window.removeEventListener('resize', checkResponsive)
    }, [responsive])
  
    React.useEffect(() => {
      if ( stories?.length !== 0 && storyIndex?.length !== 0 ) {
        // console.log(storyIndex)
        setTimerRestart(false)
        setUser(stories?.at([storyIndex[0]])?.user)
        setStory(stories?.at([storyIndex[0]])?.stories[storyIndex[1]])
      }
    }, [stories, storyIndex])
  
    React.useEffect(() => {
      if ( story?.createdAt ) {
        setDate(getDifference(new Date(story.createdAt).getTime(), new Date().getTime()))
      }
    }, [story, user])
  
    function getDifference(date1, date2) {
      const diffInMs = Math.abs(date2 - date1)
      if ( (diffInMs / (1000 * 60)) < 60 ) {
        return `${Math.round(diffInMs / (1000 * 60))}m`
      }
      return `${Math.round(diffInMs / (1000 * 60 * 60))}h`
    }
  
   
    function nextStory() {
      if ( stories?.at(storyIndex[0])?.stories[storyIndex[1] + 1] !== undefined ? true : false ) {
        setStoryIndex([storyIndex[0], storyIndex[1] + 1])
        setTimerRestart(true)
      } else {
        clearTimeout(timerTimeout)
        setSpecificStoryOpen(false)
      }
    }
  
    React.useEffect(() => {
      if ( !specificStoryOpen ) return () => clearTimeout(timerTimeout)
      
      if ( stories?.length !== 0 && storyIndex?.length !== 0 ) {
        
        timerTimeout = setTimeout(nextStory, 5000)
        return () => clearTimeout(timerTimeout)
      }
    }, [timerRestart, stories, storyIndex, specificStoryOpen])
    
  
    return (
      <>
      <Dialog
      open={specificStoryOpen}
      maxWidth={'sm'}
      fullWidth
      fullScreen={responsive}
      >
        <SpecificStoryStyled storyIndex={storyIndex}>
          {story?.method === 'text' && <div className="bg" style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.3rem',backgroundColor: story?.story?.bgColor, color: story?.story?.textColor, display: 'flex', alignItems: story?.story?.alignment, justifyContent: story?.story?.justify, textAlign: story?.story?.justify }}>
            {story?.story?.text}
          </div>}
          {story?.method === 'image' && <div className="bg"><img src={story?.story} /></div>}
          <div className="bg_overlay">
            <DialogActions style={{ justifyContent: 'space-between' }}>
              <div className="user_info">
                <div className="avatar"><img src={user?.avatar} alt="avatar" /></div>
                <div><span>{user?.firstName + user?.surname}</span><span>{date}</span></div>
              </div>
              <Button className="close" onClick={() => setSpecificStoryOpen(false)}><CloseIcon /></Button>
            </DialogActions>
              <Button className="left_arrow" onClick={() => {setStoryIndex([storyIndex[0], storyIndex[1] - 1]); setTimerRestart(true)}} disabled={storyIndex[1] === 0}><ArrowBackIosIcon /></Button>
              <Button className="right_arrow" onClick={() => {setStoryIndex([storyIndex[0], storyIndex[1] + 1]); setTimerRestart(true) }} disabled={stories?.at(storyIndex[0])?.stories[storyIndex[1] + 1] === undefined ? true : false} ><ArrowForwardIosIcon /></Button>
              {!timerRestart && <div className="timer"><span></span></div>}
          </div>
        </SpecificStoryStyled>
      </Dialog>
      </>
    )
  }