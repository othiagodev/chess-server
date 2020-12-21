import Player from './model/Player.js'
import Game from './model/Game.js'
import { Color } from './model/Game.js'

export default io => {
  const players = {}
  let unmatched = null

  io.on('connection', socket => {
    console.log(`a user connected: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`${players[socket.id].name} disconnected`)
      delete players[socket.id]
    })

    socket.on('begin.game', data => {
      const player = new Player(socket.id, socket, data.name)
      players[player.id] = player

      if (!unmatched) {
        const game = new Game(player)
        unmatched = game
        socket.emit('begin.game', { waitingOpponent: true, match: null })
      } else {
        const game = unmatched
        unmatched = null

        game.player2 = player

        if (Math.round(Math.random())) {
          game.player1.playerColor = Color.WHITE
          game.player2.playerColor = Color.BLACK
        } else {
          game.player1.playerColor = Color.BLACK
          game.player2.playerColor = Color.WHITE
        }
        
        game.player1.game = game
        game.player2.game = game

        game.startGame()
        const data = game.generatorData()

        players[game.player1.id].socket.emit('begin.game', data)
        players[game.player2.id].socket.emit('begin.game', data)
      }
    })

    socket.on('move.game', data => {
      const player = players[socket.id]
      console.log(data);
    })

  })

}