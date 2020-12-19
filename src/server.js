import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN.split(','),
    methods: process.env.METHODS.split(',')
  }
})

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(process.env.PORT || 3003, () => {
  console.log('server running...')
})
