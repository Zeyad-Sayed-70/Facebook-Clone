import React, { useContext, useEffect, useState } from 'react'
import { PostContainer } from '../Posts.styled'
import PostOptMenu from './PostOptMenu'
import { Avatar, AvatarGroup, Button, IconButton, Tooltip } from '@mui/material'
import ReactPlayer from 'react-player'
import { GeneralContext } from '../../../../contextAPIs/GeneralContext'
import { addLike, updatePost } from '../../../../features/posts/postSlice'
import { useDispatch } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import { PostContext } from '../../../../contextAPIs/PostContext'
import PublicIcon from '@mui/icons-material/Public'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import GroupIcon from '@mui/icons-material/Group'
import { CommentSection } from './CommentSection'

const Post = ({ post }) => {
  const {
    setPostData,
    isDeleted,
    isEdit,
    editableRef,
    isComment,
    } = useContext(PostContext)


  useEffect(() => {
    if ( post?._id ) {
        setPostData(post)
    }
  }, [post])

  useEffect(() => {
    editableRef.current.el.current.focus()
  }, [isEdit])
  
  
  if ( isDeleted ) {
    return <></>
  }

  return (
    <>
    <PostContainer>
        <div className="user_info">
            <Avatar src={post.user_info.avatar_url} alt="avatar" />
            <div>
                <h6>{post.user_info.firstName + " " + post.user_info.surname }</h6>
                <span>12h</span>
                <Tooltip title={post.field}><span>{post.field === 'friends' ? <GroupIcon /> : post.field === 'private' ? <LockOpenIcon /> : <PublicIcon /> }</span></Tooltip>
            </div>
            <PostOptMenu />
        </div>
        {post.dataType === 'data/text' && <TextMethodDisplay />}
        {post.dataType === 'data/image' && <ImageMethodDisplay />}
        {post.dataType === 'data/video' && <VideoMethodDisplay />}
        <CountInterActions />
        <InterActions />
        {isComment && <CommentSection />}
    </PostContainer>
    </>
  )
}

const TextMethodDisplay = () => {
    const {
        isEdit,
        editableRef,
        editData,
        setEditData,
        } = useContext(PostContext)
    return (
        <>
        <ContentEditable ref={editableRef} html={editData.text_content} tagName="div" disabled={!isEdit} className="post_content text" onChange={(e) => {isEdit && setEditData({ ...editData, text_content: e.target.value }) }} />
            {/* {post.text_data.text_content} */}
        </>
    )
}

const ImageMethodDisplay = () => {
    const {
        post,
        isEdit,
        editableRef,
        editData,
        setEditData,
        } = useContext(PostContext)
    return (
        <>
        <div className="post_content image">
        <ContentEditable ref={editableRef} html={editData.captition} tagName="div" disabled={!isEdit} className="captition" onChange={(e) => {isEdit && setEditData({ ...editData, captition: e.target.value }) }} />
            {/* <div className="captition">{post.image_data.captition}</div> */}
            <div className="image_display">
                <img src={post.image_data.image_url} alt="image" />
            </div>
        </div>
        </>
    )
}

const VideoMethodDisplay = () => {
    const [loading, setLoading] = useState(true)
    const [isOverlay, setIsOverlay] = useState(true)
    const {
        post,
        isEdit,
        editableRef,
        editData,
        setEditData,
        } = useContext(PostContext)
    
    return (
        <>
        <div className="post_content video">
            <ContentEditable ref={editableRef} html={editData.captition} tagName="div" disabled={!isEdit} className="captition" onChange={(e) => {isEdit && setEditData({ ...editData, captition: e.target.value }) }} />
            {/* <div className="captition">{post.video_data.captition}</div> */}
            {isOverlay && <div className="videi_loading" style={{ background: !loading ? 'none' : ''  }}>
            <Button variant={loading ? 'contained' : 'outlined'} disabled={loading} onClick={() => setIsOverlay(false)} style={{ backgroundColor: !loading ? '#000000d1' : '', color: !loading ? '#2196F3' : '' }}>
                {loading ?  'Loading' : 'Play'}
                {loading && <div className="loading_animation">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>}
            </Button>
            </div>}
            <div className="video_display"> 
                <ReactPlayer playing={!isOverlay} width='100%'  controls url={post.video_data.video_url} onReady={() => setLoading(false)}/>
            </div>
        </div>
        </>
    )
}

const CountInterActions = () => {
    const [total, setTotal] = useState(0)
    const [emojisCount, setEmojisCount] = useState(0)
    const {postData: post} = useContext(PostContext)
    useEffect(() => {
        if ( post?._id === undefined ) return
        
        let count = 0
        let empty = 0
        Object.entries(post.emotes).map(([key, value]) => {
                count += value 
                if ( value === 0 ) empty += 1
            })
            setEmojisCount(count)
            setTotal(5 - empty)
    }, [post])

    return (
        <>
        <div className="count_interactions">
            <div>
                <AvatarGroup total={total}>
                    {post?.emotes?.like !== 0 && <Avatar alt="Agnes Walker" src="./emoji/like_emoji.png" />}
                    {post?.emotes?.laugh !== 0 && <Avatar alt="Trevor Henderson" src="./emoji/laugh_emoji.png" />}
                    {post?.emotes?.love !== 0 && <Avatar alt="Remy Sharp" src="./emoji/love_emoji.png" />}
                    {post?.emotes?.cry !== 0 && <Avatar alt="Travis Howard" src="./emoji/cry_emoji.png" />}
                    {post?.emotes?.angry !== 0 && <Avatar alt="Trevor Henderson" src="./emoji/angry_emoji.png" />}
                </AvatarGroup>
                <span>{emojisCount !== 0 && emojisCount } {emojisCount === 0 && 'Be First Fan'}</span>
            </div>
            <div>5 Comments</div>
        </div>
        </>
    )
}

const InterActions = () => {
    const { me } = useContext(GeneralContext)
    const [openEmotes, setOpenEmotes] = useState(false)
    const [isInteract, setIsInteract] = useState(false)
    const dispatch = useDispatch()
    const {
        post,
        postData, 
        setPostData,
        isEdit,
        setIsEdit,
        editData,
        isComment,
        setIsComment,
        } = useContext(PostContext)

    useEffect(() => {
        const isFind = post?.interactors?.find(interact => interact?.userId === me?._id )
        if ( isFind ) setIsInteract(true)
    }, [me, post])

    const handleOpenEmotes = () => {
        setOpenEmotes(true)
    }
    const handleCloseEmotes = () => {
        setOpenEmotes(false)
    }

    const onClickToEmoji = (key) => {
        const { _id } = me
        const token = localStorage.getItem('token')

        if ( isInteract ) {
            const update = postData.interactors.filter(interact => interact.userId === me._id )
            if ( key !== update[0].key ) {
                // @ Decrement an Incremeant
                // console.log('syncDAI')
                const ok = update[0].key
                try {
                    syncDAI(ok, key)
                } catch (error) {
                    const newInteractors = postData.interactors.filter(e => e.userId !== me._id)
                    newInteractors.push({ userId: me._id, key })
                    setPostData({...postData, emotes: { ...postData.emotes, [ok]: postData.emotes[ok] - 1, [key]: postData.emotes[key] + 1 }, interactors: newInteractors })
                }
                dispatch(addLike({ data: { newKey: key, update: {userId: update[0].userId, key: ok}, postId: post._id, type: 'dai' }, token }))
                return
            }

            // @ Decrement
            syncDEC(key)
            // console.log('syncDEC')
            dispatch(addLike({ data: { update: update[0], postId: post._id, type: 'dec' }, token }))
            return
        }

        // @ Incremeant
        syncINC(key)
        // console.log('syncINC')
        dispatch(addLike({ data: { update: key, userId: _id, postId: post._id, type: 'inc' }, token }))
    }

    const syncINC = (key) => {
        setPostData({...postData, emotes: { ...postData.emotes, [key]: postData.emotes[key] + 1 }, interactors: [...postData.interactors, { userId: me._id, key }]})
        setIsInteract(true)
    }

    const syncDEC = (key) => {
        const newInteractors = postData.interactors.filter(e => e.userId !== me._id)
        setPostData({...postData, emotes: { ...postData.emotes, [key]: postData.emotes[key] - 1 }, interactors: newInteractors})
        setIsInteract(false)
    }

    const syncDAI = (ok, nk) => {
        const newInteractors = postData.interactors.map(e => { 
            if ( e.userId === me._id ) {
                Object.defineProperties(e, {
                    key: {
                        value: nk,
                        configurable: false,
                        writable: true
                    }
                })
            }
            return e
        })
        setPostData({...postData, emotes: { ...postData.emotes, [ok]: postData.emotes[ok] - 1, [nk]: postData.emotes[nk] + 1 }, interactors: newInteractors})
    }

    const handleUpdatePost = () => {
        const token = localStorage.getItem('token')
        dispatch(updatePost({ update: {postId: post._id, dataType: editData.dataType, text_content: editData?.text_content, captition: editData?.captition}, token }))
        setIsEdit(false)
    }

    return (
        <>
        <div className="interaction_actions">
            <div className={`emotes ${openEmotes ? 'opened' : ''}`} onMouseEnter={handleOpenEmotes} onMouseLeave={handleCloseEmotes}>
                <IconButton onClick={() => onClickToEmoji('like')}><Avatar src="./emoji/like_emoji.png" /></IconButton>
                <IconButton onClick={() => onClickToEmoji('laugh')}><Avatar src="./emoji/laugh_emoji.png" /></IconButton>
                <IconButton onClick={() => onClickToEmoji('love')}><Avatar src="./emoji/love_emoji.png" /></IconButton>
                <IconButton onClick={() => onClickToEmoji('cry')}><Avatar src="./emoji/cry_emoji.png" /></IconButton>
                <IconButton onClick={() => onClickToEmoji('angry')}><Avatar src="./emoji/angry_emoji.png" /></IconButton>
            </div>
            {!isEdit && <Button variant={isInteract ? 'contained' : 'oulined'} style={{ backgroundColor: isInteract ? '#3a3a3a' : '' }} className="like_btn" onClick={() => onClickToEmoji('like')} onMouseEnter={handleOpenEmotes} onMouseLeave={handleCloseEmotes}>Like</Button>}
            {!isEdit && <Button style={{ backgroundColor: isComment ? '#3a3a3a' : '' }} onClick={() => setIsComment(!isComment)}>Comment</Button>}
            {isEdit && <Button onClick={handleUpdatePost}>Edit</Button>}
        </div>
        </>
    )
}

export default Post