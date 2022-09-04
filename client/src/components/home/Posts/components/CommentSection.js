import { Avatar, Button, Divider } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { PostContext } from "../../../../contextAPIs/PostContext"
import { GeneralContext } from '../../../../contextAPIs/GeneralContext'
import SendIcon from '@mui/icons-material/Send'
import socket from '../../../socket.io'
import { useDispatch, useSelector } from "react-redux"
import { createComment, fetchComments, reset } from "../../../../features/postComments/postCommentSlice"

export const CommentSection = () => {
    const { me } = useContext(GeneralContext)
    const { isComment, post } = useContext(PostContext)
    const [comment, setComment] = useState('')
    const [resComments, setResComments] = useState([])
    const [commentData, setCommentData] = useState([])
    const [render, setRender] = useState('')
    const dispatch = useDispatch()
    const { comments, isLoading, isSuccess } = useSelector(state => state.pcom)
    const scrollOn = useRef()
    const scrollFrom = useRef()

    useEffect(() => {
        // Auto Scrolling to bottom
        scrollFrom.current.scrollTo({
            top: 99999,
            left: 0,
            behavior: 'smooth',
        })
    }, [scrollOn, scrollFrom, resComments, render])

    useEffect(() => {
        // Fetch Comments
        reset()
        setResComments([])
        const token = localStorage.getItem('token')
        dispatch(fetchComments({ token, postId: post._id }))
    }, [])
    
    useEffect(() => {
        if ( isSuccess ) {
            // Store Response after fetching
            setResComments(comments.data?.response)
        }
    }, [isSuccess])

    useEffect(() => {
        // Join Comment Room
        socket.emit('joinCommentRoom', {roomId: post._id})
    }, [isComment])
    
    useEffect(() => {
        // Recive Comment from socket server and post it to backend
        socket.on('reciveComment', ({comment, roomId, socketId, commentId}) => {
            if ( roomId !== post._id ) return

            // check if it's exsist
            const isFind = comments.data?.response.some(e => e.id === commentId) || commentData.some(e => e.id === commentId)
            console.log(comments.data?.response.some(e => e.id === commentId), commentData.some(e => e.id === commentId), 'hhhhhhhhh')
            if ( isFind ) return

            const com = {
                id: commentId,
                firstName: me.firstName,
                surname: me.surname,
                avatar: me.avatar,
                userId: me._id,
                comment_content: comment,
                postId: post?._id,
                i_sender: socketId === socket.id,
            }

            // Post Comment to backend & seve it to DB
            const token = localStorage.getItem('token')
            dispatch(createComment({ token, cData: com }))

            // for render each comment you should do that below
            const coms = commentData
            coms.push(com)
            setCommentData(coms)
            setComment('')
            setRender(commentId)
        })
    }, [])
    
    const handleComment = () => {
        // send your comment to socket server
        socket.emit('sendComment', {comment, roomId: post._id})
    }
    
    return (
        <>
        <div>
            <div className="display_comments" ref={scrollFrom}>
                {/* Display Response Comments that came from DB */}
                {!isLoading && resComments?.map(e => (          
                <div key={e.id} className={`comment ${e.i_sender ? 'comment_right' : 'comment_left'}`}>
                    <div>
                        <div className="user_info">
                            <Avatar src={e.user_info.avatar_url} alt="avatar" />
                            <span>{e.user_info.firstName + ' ' + e.user_info.surname}</span>
                        </div>
                        <hr />
                        <div className="content">{e.comment_content}</div>
                    </div>
                </div>
                ))}
                {/* Display realtime Comments ( any comment after fetch ) */}
                {!isLoading && commentData?.map(e => (
                <div key={e.id} className={`comment ${e.i_sender ? 'comment_right' : 'comment_left'}`}>
                    <div>
                        <div className="user_info">
                            <Avatar src={e.avatar} alt="avatar" />
                            <span>{e.firstName + ' ' + e.surname}</span>
                        </div>
                        <hr />
                        <div className="content">{e.comment_content}</div>
                    </div>
                </div>
                ))}

                {/* show loading while fetching comments */}
                {isLoading && <h3 style={{ textAlign: 'center' }}>Loading...</h3>}
                <div ref={scrollOn}></div>
            </div>
            <div className="input_comments">
                <input type="text" name="send_comment" placeholder="your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button onClick={handleComment}><SendIcon /></Button>
            </div>
        </div>
        </>
    )
}