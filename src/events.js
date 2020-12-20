import socketController from './socketController.js'

export default function events(io) {
  const client = {}

  io.on('connection', socket => {
  
    const sc = new socketController({client, socket})
    
    socket.on('connected', sc.connected)
    socket.on('disconnect', sc.disconnect)
    socket.on('message.name', sc.message)
  })
}