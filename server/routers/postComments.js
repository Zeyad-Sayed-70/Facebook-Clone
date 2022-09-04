const express = require('express')
const router = express.Router()
const protect = require('../middleware/protectAuth')
const { fetchComments, createComment } = require('../controller/postComments')

router.route('/').post(createComment)
router.route('/:postId').get(fetchComments)

module.exports = router