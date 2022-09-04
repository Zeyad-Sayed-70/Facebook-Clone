const { app } = require('./server')
const {v4} = require('uuid')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const port = 5000
require('dotenv').config()

io.on('connection', socket => {
    socket.on('joinCommentRoom', ({roomId}) => {
        if ( socket.room ) {
            // Leave From Comment Room
            socket.leave(socket.room)
        }

        // Join To Comment Room
        socket.join(roomId)
        socket.room = roomId
        // console.log(socket.id, 'join room id: ' + roomId)
    })
    socket.on('sendComment', ({comment, roomId}) => {
        // console.log(comment, roomId)
        socket.emit('reciveComment', { comment, roomId, socketId: socket.id, commentId: v4() })
        socket.to(roomId).emit('reciveComment', { comment, roomId, socketId: socket.id, commentId: v4() })
    })
})

server.listen(port, () => console.log('server is running on port', port))