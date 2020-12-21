import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import socket from './socket.js'

const config = {
  cors: {
    origin: process.env.ORIGIN.split(','),
    methods: process.env.METHODS.split(',')
  }
}
const app = express()
const server = http.createServer(app)
socket(new Server(server, config))

server.listen(process.env.PORT || 3003, () => {
  console.log('server running...')
})
