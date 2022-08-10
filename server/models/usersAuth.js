const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { v4 } = require('uuid')

const userAuthSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: v4(),
    },
    phoneNumber: {
        type: String,
        default: v4(),
    },
    password: {
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})


module.exports = mongoose.model('usersAuths', userAuthSchema)