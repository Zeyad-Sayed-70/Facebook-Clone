const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000

// default middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.listen(port, console.log('server is running on port', port))