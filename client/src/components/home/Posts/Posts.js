import React, { useEffect, useState } from 'react'
import CreatePostForm from './components/CreatePostSection'
import { PostStyled } from './Posts.styled'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../../features/posts/postSlice'
import PostsDisplay from './components/PostsDisplay'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { data } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    if ( data ) {
      setPosts(data.data.data)
    }
  }, [data])

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(fetchPosts(token))
  }, [])
  return (
    <>
      <PostStyled>
          <CreatePostForm />
          <PostsDisplay posts={posts}/>
      </PostStyled>
    </>
  )
}

export default Posts