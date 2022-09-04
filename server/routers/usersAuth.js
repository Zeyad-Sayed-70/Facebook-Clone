const express = require('express')
const router = express.Router()
const { getAllUsersAuth, getUserAuth, postUserAuth, deleteUserAuth, updateUserAuth, login, uploadAvatar } = require('../controller/usersAuth')
const protectAuth = require('../middleware/protectAuth')
const { multer } = require('../server')
const { v4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatars')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = v4()
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

router.route('/').get(protectAuth, getAllUsersAuth).post(postUserAuth)
router.route('/:userId').patch(protectAuth, updateUserAuth).delete(protectAuth, deleteUserAuth)
router.route('/user').get(protectAuth, getUserAuth)
router.route('/login').post(login)
router.route('/upload/avatar/:userId').patch(protectAuth, upload.single('avatar'), uploadAvatar)

module.exports = router

