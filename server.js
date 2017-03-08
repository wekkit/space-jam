require('colors')
const express = require('express')
const db = require('./models')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let mockStudios = [
  { name: 'studio1', id: 1},
  { name: 'studio2', id: 2},
  { name: 'studio3', id: 3},
]

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs');


app.get('/*', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  console.log('NEW CONNECTION:'.blue, socket.id);

  db.user.create({
    socketId: socket.id
  }).then((user) => {
    console.log('anonymous user created:'.blue, user.socketId)
  })
  socket.on('updateUser', (data) => {
    console.log('user has created profile:'.blue, data.name)
    db.user.update(data, {
      where: { socketId: socket.id },
      returning: true,
      plain: true
    })
  })

  socket.on('playEvent', (data) => {
    db.user.findOne({
      where: { socketId: socket.id }
    }).then((user) => {
      console.log(`${data.msg} at room ${user.jammingRoomId} by ${user.name}`.blue)
      io.to(user.jammingRoomId).emit(data.payload, `${data.msg} at room ${user.jammingRoomId} by ${user.name}`)
    })
  })

  socket.on('getStudios', () => {
    console.log('user is browsing studios'.blue)
    db.jamming_room.findAll().then(rooms => {
      io.emit('getStudios', rooms)
    })
  })

  socket.on('createRoom', (data) => {
    db.jamming_room.create(data).then(() => {
      db.jamming_room.findAll().then(rooms => {
        io.emit('getStudios', rooms)
      })
    })
  })

  socket.on('joinRoom', (room) => {
    socket.join(room.id)
    db.user.update({
      jammingRoomId: room.id
    }, {
      where: { socketId: socket.id },
      returning: true,
      plain: true
    })
    .then(() => {
      db.user.findOne({
        where: { socketId: socket.id }
      }).then((user) => {
        db.jamming_room.findOne({
          where: { id: user.jammingRoomId }
        }).then((studio) => {
          console.log(user.name, 'joined room'.blue, room.id, ':'.blue, room.name)
          io.to(studio.id).emit('getStudioById', studio)
        })
      })
    })
  })

  socket.once('disconnect', () => {
    db.user.findOne({
      where: { socketId: socket.id }
    }).then((user) => {
      return user.destroy()
    }).then(() => {
      console.log('user disconnected/destroyed:'.red, socket.id)
    })
    socket.disconnect()
  })
})

const port = process.env.PORT || 8080
http.listen(port)

console.log('SERVER UP ON PORT:'.blue, port)