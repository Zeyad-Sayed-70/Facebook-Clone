const mongoose = require('mongoose')
const { Schema } = mongoose

const StorySchema = Schema({
    creatorId: {
        type: String,
        required: true,
    },
    story: {
        type: Object,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: '1d',
        default: Date.now(),
    },
})

module.exports = mongoose.model('Story', StorySchema)