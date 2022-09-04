import axios from 'axios'
import { BACKEND_URL } from '../../components/constant'


const createPost = ({ formData, token }) => axios.post(`${BACKEND_URL}posts`, formData, {
    headers: {
        authorization: 'Bearer ' + token
    }
})

const fetchPosts = (token) => axios.get(`${BACKEND_URL}posts`, {
    headers: {
        authorization: 'Bearer ' + token
    }
})

const updatePost = ({ update, token }) => axios.patch(`${BACKEND_URL}posts/${update.postId}`, update, {
    headers: {
        authorization: 'Bearer ' + token
    }
})

const addLike = ({ data, token }) => axios.patch(`${BACKEND_URL}posts/emotes/${data.postId}`, data, {
    headers: {
        authorization: 'Bearer ' + token
    }
})

const deletePost = ({ postId, token }) => axios.delete(`${BACKEND_URL}posts/${postId}`, {
    headers: {
        authorization: 'Bearer ' + token
    }
})

const deleteFileBucket = ({ fileId, token }) => axios.delete(`${BACKEND_URL}files/${fileId}`, {
    headers: {
        authorization: 'Bearer ' + token
    }
})


const postApi = { createPost, fetchPosts, updatePost, addLike, deletePost, deleteFileBucket }
export default postApi