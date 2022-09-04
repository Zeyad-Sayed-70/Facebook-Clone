import React, { useRef, useState } from 'react'

export const PostContext = React.createContext()


const PostProvider = ({children, post}) => {
    const [postData, setPostData] = useState({})
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isComment, setIsComment] = useState(false)
    const editableRef = useRef()
    const [editData, setEditData] = useState({
        dataType: post?.dataType,
        text_content: post?.text_data?.text_content,
        captition: post?.image_data?.captition || post?.video_data?.captition,
    })
    return (
    <PostContext.Provider value={{ 
        post,
        postData,
        setPostData,
        isDeleted,
        setIsDeleted,
        isEdit,
        setIsEdit,
        editableRef,
        editData,
        setEditData,
        isComment,
        setIsComment,
        }}>
        {children}
    </PostContext.Provider>
    )
}

export default PostProvider