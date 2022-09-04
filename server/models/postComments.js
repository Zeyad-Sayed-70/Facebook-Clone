const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postCommentsSchema = Schema({
    user_info: {
        firstName: {type: String, required: true},
        surname: {type: String, required: true},
        avatar_url: {type: String, required: true},
        userId: {type: String, required: true},
    },
    id: {type: String, required: true, unique: true},
    postId: {type: String, required: true},
    comment_content: {type: String, required: true},
    i_sender: {type: Boolean, required: true},
    date: {type: Number, required: true},
}, { collection: 'PostComments' })

module.exports = mongoose.model('PostComments', postCommentsSchema)