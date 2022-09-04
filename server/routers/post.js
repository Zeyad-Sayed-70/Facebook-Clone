const express = require('express')
const router = express.Router()
const { createPost, updatePost, deletePost, getPosts, addLike } = require('../controller/post')
const protect = require('../middleware/protectAuth')
const { upload } = require('../server')


router.route('/').get(protect, getPosts).post(protect, upload.single('file'), createPost)
router.route('/:postId').patch(protect, updatePost).delete(protect, deletePost)
router.route('/emotes/:postId').patch(protect, addLike)
module.exports = router