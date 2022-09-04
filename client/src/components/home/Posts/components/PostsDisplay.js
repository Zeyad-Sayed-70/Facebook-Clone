import React, { useEffect, useState } from 'react'
import Post from './Post'
import PostProvider from '../../../../contextAPIs/PostContext'
import socket from '../../../socket.io'
const PostsDisplay = ({ posts }) => {
  return (
    <>
    <div className="display_container">
        {posts?.map((post, ind) => {
            return <PostProvider key={ind} post={post}><Post post={post} /></PostProvider>
        })}
    </div>
    </>
  )
}

export default PostsDisplay