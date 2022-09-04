const express = require('express')
const router = express.Router()
const { createStory, fetchStory, deleteStory } = require('../controller/story')
const protect = require("../middleware/protectAuth")
const { multer } = require('../server')
const { v4 } = require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/stories')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = v4()
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

router.route('/').post(protect, upload.single('story'), createStory)
router.route('/:userId').get(protect, fetchStory)
router.route('/:storyId').delete(protect, deleteStory)

module.exports = router