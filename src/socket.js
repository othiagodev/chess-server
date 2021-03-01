import SocketController from './controllers/SocketController.js'

export default io => {
  
  io.on('connection', socket => {
    console.log(`a user connected: ${socket.id}`)

    const socketController = new SocketController(socket)

    socket.on('disconnect', socketController.disconnect)
    socket.on('begin.game', socketController.beginGame)
    socket.on('move.game', socketController.moveGame)
    socket.on('promotion', socketController.promotion)

  })

  return io
}
