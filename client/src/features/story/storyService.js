import axios from "axios"
import { BACKEND_URL } from "../../components/constant"

const fetchStory = ({userId, token}) => axios.get(`${BACKEND_URL}stories/${userId}`, {
    headers: {
        authorization: 'Bearer ' + token
    }
})
const createStory = ({ story, token }) => axios.post(`${BACKEND_URL}stories`, story, {
    headers: {
        authorization: 'Bearer ' + token
    }
})
const deleteStory = ({storyId, token}) => axios.delete(`${BACKEND_URL}stories/${storyId}`, {
    headers: {
        authorization: 'Bearer ' + token
    }
})

const combineAPIs = { fetchStory, createStory, deleteStory }
export default combineAPIs