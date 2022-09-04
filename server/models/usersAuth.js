const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { v4 } = require('uuid')
const path = require('path')

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
    },
    avatar: {
        type: String,
        default: `${path.join(__dirname, '../uploads')}/avatars/userDefault.webp`
    },
    friends: {
        type: [String],
        default: [],
    }
})


module.exports = mongoose.model('usersAuths', userAuthSchema)