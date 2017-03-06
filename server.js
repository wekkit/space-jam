require('colors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('views', path.join(__dirname,'build'))
app.use(express.static(path.join(__dirname,'build')))
app.engine('html', require('ejs').renderFile)

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.render('index.html')
})

io.on('connect', (socket) => {
  socket.emit('testing', 'client connected!')
  socket.on('testing', (msg) => console.log(msg.blue))
})

const port = process.env.PORT || 8080
http.listen(port)

console.log('SERVER UP ON PORT:'.blue, port)