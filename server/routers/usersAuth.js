const express = require('express')
const router = express.Router()
const { getAllUsersAuth, getUserAuth, postUserAuth, deleteUserAuth, updateUserAuth, login } = require('../controller/usersAuth')
const protectAuth = require('../middleware/protectAuth') 

router.route('/').get(protectAuth, getAllUsersAuth).post(postUserAuth)
router.route('/:userId').patch(protectAuth, updateUserAuth).delete(protectAuth, deleteUserAuth)
router.route('/user').get(protectAuth, getUserAuth)
router.route('/login').post(login)

module.exports = router

