const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const routes = require('./routes')

app.use(express.json())
app.use(routes)

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3003, () => {
  console.log('server running...')
})
