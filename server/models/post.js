const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema({
    dataType: { type: String, required: true },
    field: { type: String, default: 'global' },
    user_info: {
        firstName: {type: String, required: true},
        surname: {type: String, required: true},
        avatar_url: {type: String, required: true},
        userId: {type: String, required: true},
    },
    text_data: {
        text_content: {type: String},
    },
    image_data: {
        captition: {type:  String},
        image_url: {type: Array, default: undefined},
        _id: {type: String}
    },
    video_data: {
        captition: {type:  String},
        video_url: {type: String},
        _id: {type: String}
    },
    emotes: {
        like: {type: Number, default: 0},
        love: {type: Number, default: 0},
        laugh: {type: Number, default: 0},
        cry: {type: Number, default: 0},
        angry: {type: Number, default: 0},
    },
    interactors: {type: Array, default: []},
    date: {type: Number, required: true},
})

module.exports = mongoose.model('Post', PostSchema)