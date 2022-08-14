const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const mongoose = require('mongoose')
require('dotenv').config()

// default middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/uploads/avatars', express.static('uploads/avatars'))

// use routers
app.use('/usersAuth', require('./routers/usersAuth'))

mongoose.connect(process.env.MONGODB_URI, { dbName: 'facebook' }).then((e) => {
    console.log(`you running the ${e.connection.name} DB Successfuly`)
})

app.listen(port, console.log('server is running on port', port))
