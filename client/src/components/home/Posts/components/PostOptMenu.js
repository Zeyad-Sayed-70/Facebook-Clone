import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import ArchiveIcon from '@mui/icons-material/Archive'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../../../features/posts/postSlice'
import { GeneralContext } from '../../../../contextAPIs/GeneralContext'
import { PostContext } from '../../../../contextAPIs/PostContext'

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      backgroundColor: '#333',
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'dark' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.grey[300],
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  
  export default function CustomizedMenus() {
    const { me } = React.useContext(GeneralContext)
    const [mine, setMine] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const {
      post,
      setIsDeleted,
      setIsEdit,
      } = React.useContext(PostContext)
    
    React.useEffect(() => {
      if ( me !== undefined ) {
        me._id == post.user_info.userId && setMine(true)
      }
    }, [me])
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleDeletePost = () => {
      const token = localStorage.getItem('token')

      let fileId
      if ( post.dataType === 'data/image' ) {
        fileId = post.image_data._id
      }
      
      if ( post.dataType === 'data/video' ) {
        fileId = post.video_data._id
      }

      dispatch(deletePost({ dataType: post.dataType, postId: post._id, fileId, token }))

      setIsDeleted(true)
      handleClose()
    }

    const handleEditPost = () => {
      setIsEdit(true)
      handleClose()
    }
  
    return (
      <div>
        <IconButton
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {mine && <MenuItem onClick={handleEditPost} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>}
          {mine && <MenuItem onClick={handleDeletePost} disableRipple>
            <DeleteIcon />
            Delete
          </MenuItem>}
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            <ArchiveIcon />
            Archive
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <MoreHorizIcon />
            More
          </MenuItem>
        </StyledMenu>
      </div>
    );
  }
  