import axios from 'axios'
import { BACKEND_URL } from '../../components/constant'

const fetchComments = ({ postId, token }) => axios.get(`${BACKEND_URL}posts/comments/${postId}`, '', {
    headers: {
        authorization: 'Bearer ' + token,
    }
})

const createComment = ({ cData, token }) => axios.post(`${BACKEND_URL}posts/comments`, cData, {
    headers: {
        authorization: 'Bearer ' + token,
    }
})

const postCommentsAPI = { fetchComments, createComment } 
export default postCommentsAPI