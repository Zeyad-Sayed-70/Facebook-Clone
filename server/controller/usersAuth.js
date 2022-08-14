const UsersAuth = require('../models/usersAuth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getAllUsersAuth = async (req, res) => {
    const auths = await UsersAuth.find()
    res.status(200).json({ status: 200, message: 'fetch users auth is success', data: auths })
}
const getUserAuth = async (req, res) => {
    try {
        const method = req.query.method
        const user = JSON.parse(req.query.user)
        
        var auth
        switch (method) {
            case 'name':
                auth = await UsersAuth.findOne({ firstName: user.firstName, surname: user.surname })
                break;
            case 'email':
                auth = await UsersAuth.findOne({ email: user.email })
                break;
            case 'phone':
                auth = await UsersAuth.findOne({  phoneNumber: user.phone })
                break;
            case 'id':
                const {_id} = jwt.verify(user.hashedId, process.env.JWT_SECRET)
                auth = await UsersAuth.findOne({ _id })
                break;
        
            default:
                break;
        }
    
        if ( !auth ) {
            res.status(200).json({ status: 404, message: `this ${method} is not exsist in database`})
            return
        }
    
        const { firstName, surname, email, phoneNumber, gender, birth, date, avatar, _id } = auth
        const resAuth = {
            firstName,
            surname,
            email,
            phoneNumber,
            gender,
            birth,
            date,
            avatar,
            _id,
        }
    
        res.status(200).json({ status: 200, message: 'fetch user auth is success', data: resAuth })    
    } catch (error) {
        console.log('#### Get Error ####')
        console.log(error)
        res.status(200).json({ status: 400, message: error.message, code: error.code})
    }
}
const postUserAuth = async (req, res) => {
    try {
        const { firstName, surname, email, phoneNumber, password, day, month, year, gender } = req.body

        const emailValidate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const phoneNumberValidate = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g

        var checkAuth

        if ( email ) {
            checkAuth = await UsersAuth.findOne({ email })
            if ( !email.match(emailValidate) ) {
                res.status(200).json({ status: 500, message: 'your email is not valid'})
                return
            }
        }

        if ( phoneNumber ) {
            checkAuth = await UsersAuth.findOne({ phoneNumber })
            if ( !phoneNumber.match(phoneNumberValidate) ) {
                res.status(200).json({ status: 500, message: 'your phone number is not valid'})
                return
            }
        }

        // check if email or phone is already exsist
        if ( checkAuth?._id ) {
            res.status(200).json({ status: 500, message: 'this email or phone number already exsist'})
            return
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        
        const schema = {
            firstName,
            surname,
            email,
            phoneNumber,
            password: hash,
            birth: `${month}/${parseInt(day) < 10 ? '0' + day : day}/${year}`,
            gender,
        }
        const auth = await UsersAuth.create(schema)

        // jwb
        const token = jwt.sign({ _id: auth._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.status(200).json({ status: 200, message: 'post user auth is success', token })
    } catch (error) {
        console.log('#### Post Error ####')
        console.log(error)
        res.status(200).json({ status: 400, message: error.message, code: error.code})
    }
}
const deleteUserAuth = async (req, res) => {
    try {
        const userId = req.params.userId
        const auth = await UsersAuth.findByIdAndDelete(userId)
        
        if ( auth === null ) {
            res.status(200).json({ status: 404, message: `user id ${userId} not exsist in database`})
            return
        }

        const { firstName, surname, email, phoneNumber } = auth

        const schema = {
            firstName,
            surname,
            email,
            phoneNumber,
        }
        
        res.status(200).json({ status: 200, message: 'delete user auth is success', data: schema })
    } catch (error) {
        console.log('#### Delete Error ####')
        console.log(error)
        res.status(200).json({ status: 400, message: error.message, code: error.code})
    }
}
const updateUserAuth = async (req, res) => {
    try {
        const userId = req.params.userId
        const auth = await UsersAuth.findByIdAndUpdate(userId, req.body, { new: true })
        
        if ( auth === null ) {
            res.status(200).json({ status: 404, message: `user id ${userId} not exsist in database`})
            return
        }
    
        res.status(200).json({ status: 200, message: 'update user auth is success', data: auth })
    } catch (error) {
        console.log('#### Update Error ####')
        console.log(error)
        res.status(200).json({ status: 400, message: error.message, code: error.code})
    }
}
const login = async (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body

        let auth

        if ( email ) {
            auth = await UsersAuth.findOne({ email })
            if ( !auth?._id || !bcrypt.compareSync(password, auth.password) ) {
                res.status(200).json({ status: 404, message: "Invalid Email or password" })
                return
            }
        }

        if ( phoneNumber ) {
            auth = await UsersAuth.findOne({ phoneNumber, password })
            if ( !auth?._id || !bcrypt.compare(password, auth.password) ) {
                res.status(200).json({ status: 404, message: "Invalid Phone Number or password" })
                return
            }
        }

        const token = jwt.sign({ _id: auth._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        const { firstName, surname, gender, birth } = auth

        const authSchema = {
            firstName,
            surname,
            email,
            phoneNumber,
            gender,
            birth,
        }

        res.status(200).json({ status: 200, message: "login successfuly", data: authSchema, token })

    } catch (error) {
        console.log("### Login Error ###")
        console.log(error)
        res.status(200).json({ status: 400, message: "Login Error"})
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const _id = req.params.userId
        
        const path = `http://localhost:5000/${req.file.destination}/${req.file.filename}`
        // console.log(path)
        const auth = await UsersAuth.findOneAndUpdate({ _id }, { avatar: path })
        console.log(auth)
        const { firstName, surname, email, phoneNumber, gender, birth, avatar } = auth

        const authSchema = {
            _id,
            firstName,
            surname,
            email,
            phoneNumber,
            gender,
            birth,
            avatar,
        }

        res.status(200).json({ status: 200, message: 'uploaded is successfuly', data: authSchema })
    } catch (error) {
        console.log('### Upload Avatar Error ###')
        console.log(error)
    }
}

module.exports = { getAllUsersAuth, getUserAuth, postUserAuth, deleteUserAuth, updateUserAuth, login, uploadAvatar }