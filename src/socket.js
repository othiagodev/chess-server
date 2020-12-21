import Player from './model/player.js'
import Game from './model/game.js'

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
      const player = Player({ name: data.name, id: socket.id, socket })
      players[player.id] = player

      if (!unmatched) {
        const game = Game({player1: player})
        unmatched = game
        socket.emit('begin.game', { waitingOpponent: true, match: null })
      } else {
        const game = unmatched
        unmatched = null
        game.player2 = player
        
        //game.player1.game = game
        //game.player2.game = game
        
        players[game.player1.id].socket.emit('begin.game', { waitingOpponent: false, match: {board: 10} })
        players[game.player2.id].socket.emit('begin.game', { waitingOpponent: false, match: {board: 10} })
        console.log(game);
      }
    })
  })

}
