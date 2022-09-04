const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')
const crypto = require('crypto')
const path = require('path')
const Grid = require('gridfs-stream')
const { multer, conn, app } = require('../server')

// Init gfs
let gfs, gridfsBucket

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'Uploads'
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
            
            if(file.contentType === 'image/jpeg' || file.contentType ==='image/png') {
                const readStream = gridfsBucket.openDownloadStreamByName(file.filename)
                readStream.on('error', (err) => {
                    console.log('error')
                    console.log(err)
                })
                
                readStream.on('finish', (err) => {
                    console.log('finish')
                })
                readStream.pipe(res)

            }
        } catch (error) {
            console.log(error)
        }
    })
})

module.exports = { upload }