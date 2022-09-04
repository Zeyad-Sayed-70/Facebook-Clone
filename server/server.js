const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer  = require('multer')
const methodOverride = require('method-override') 
const { GridFsStorage } = require('multer-gridfs-storage')
const crypto = require('crypto')
const path = require('path')
const Grid = require('gridfs-stream')
require('dotenv').config()


// default middlewares
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded( { extended: false } ))
app.use(cors())

// use uploads for images
app.use('/uploads/avatars', express.static('uploads/avatars'))
app.use('/uploads/stories', express.static('uploads/stories'))

// @ Procces: mongoose connection
// @ Database: MongoDB
mongoose.connect(process.env.MONGODB_URI, { dbName: 'facebook' }).then((e) => {
    console.log(`you running the ${e.connection.name} DB Successfuly`)
})


// Create mongo connection
const conn = mongoose.createConnection(process.env.MONGODB_URI, { dbName: 'test' })

// Init gfs
let gfs, gridfsBucket

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    })

    // Init stream
    gfs = Grid(conn.db, mongoose.mongo)  
    gfs.collection('uploads')
})

// create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err)
          }
          const filename = buf.toString('hex') + path.extname(file.originalname)
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          }
          resolve(fileInfo)
        })
      })
    }
  })
  
const upload = multer({ storage})

// handle upload router
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        res.json(files)
    }) 
})

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        try {
            // check if file exsist
            if ( !file )
                return res.json({ err: 'no file exsist' })
                const readStream = gridfsBucket.openDownloadStreamByName(file.filename)
                readStream.on('error', (err) => {
                    console.log('error')
                    console.log(err)
                })
                
                readStream.on('finish', (err) => {
                    console.log('finish')
                })
                readStream.pipe(res)

        } catch (error) {
            console.log(error)
        }
    })
})

app.delete('/files/:fileId', (req, res) => {
  try {
    console.log(req.params.fileId)
    gridfsBucket.delete(new mongoose.Types.ObjectId(req.params.fileId))
    res.json({ message: `File with id: ${req.params.fileId} was Deleted` })
  } catch (error) {
    console.log(error)
  }
})


module.exports = { multer, conn, app, upload}

// use routers
app.use('/usersAuth', require('./routers/usersAuth'))
app.use('/stories', require('./routers/story'))
app.use('/posts', require('./routers/post'))
app.use('/posts/comments', require('./routers/postComments'))

// Listen to Socket.io Server
// @ Default Port: 8000
require('./socket.io')

// App Listening
// @ Default Port: 5000
// app.listen(port, console.log('server is running on port', port))
