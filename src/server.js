import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import events from './events.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN.split(','),
    methods: process.env.METHODS.split(',')
  }
})

events(io)

server.listen(process.env.PORT || 3003, () => {
  console.log('server running...')
})
