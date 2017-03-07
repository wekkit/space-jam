require('colors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('views', path.join(__dirname,'dist'))
app.use(express.static(path.join(__dirname,'dist')))
app.engine('html', require('ejs').renderFile)

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.render('index.html')
})

io.on('connect', (socket) => {
  socket.on('playEvent', (data) => {
    io.emit(data.payload, data.msg)
    console.log(data.msg.blue)
  })
})

const port = process.env.PORT || 8080
http.listen(port)

console.log('SERVER UP ON PORT:'.blue, port)