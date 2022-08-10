import axios from 'axios'
import { BACKEND_URL } from '../../components/constant'

const fetchAllUsersAuth = async (token) => {
    return await axios.get(BACKEND_URL + "usersAuth", {
        headers: {
            authorization: token
        }
    })
}

const fetchUserAuth = async (method, user, token) => {
    return await axios.get(`${BACKEND_URL}usersAuth?method=${method}&user=${JSON.stringify(user)}`, {
        headers: {
            authorization: token
        }
    })
}

const postUserAuth = async (userData) => {
    return await axios.post(BACKEND_URL + "usersAuth", userData)
}

const deleteUserAuth = async (userId, token) => {
    return await axios.delete(`${BACKEND_URL}usersAuth/${userId}`, {
        headers: {
            authorization: token
        }
    })}

const updateUserAuth = async (userId, userData, token) => {
    return await axios.patch(`${BACKEND_URL}usersAuth/${userId}`, userData, {
        headers: {
            authorization: token
        }
    })}

const loginAuth = async ( userData ) => {
    return await axios.post(`${BACKEND_URL}usersAuth/login`, userData)}



export default { fetchAllUsersAuth, fetchUserAuth, postUserAuth, deleteUserAuth, updateUserAuth, loginAuth }