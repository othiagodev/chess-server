import Player from './model/Player.js'
import Game from './model/Game.js'
import { Color } from './model/Pieace.js'

export default io => {
  const games = []
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
        const game = Game({ player1: player })
        unmatched = game
        socket.emit('begin.game', { waitingOpponent: true, match: null })
      } else {
        const game = unmatched
        games.join(game)
        unmatched = null

        game.player2 = player

        if (Math.round(Math.random())) {
          game.player1.playerColor = Color.WHITE
          game.player2.playerColor = Color.BLACK
        } else {
          game.player1.playerColor = Color.BLACK
          game.player2.playerColor = Color.WHITE
        }
        game.startGame()

        const gameFront = generaterGameForFront(game)

        //game.player1.game = game
        //game.player2.game = game

        players[game.player1.id].socket.emit('begin.game', gameFront)
        players[game.player2.id].socket.emit('begin.game', gameFront)
      }
    })
  })

  function generaterGameForFront(game) {
    return {
      waitingOpponent: false,
      match: {
        player1: {
          id: game.player1.id,
          name: game.player1.name,
          playerColor: game.player1.playerColor
        },
        player2: {
          id: game.player2.id,
          name: game.player2.name,
          playerColor: game.player2.playerColor
        },
        turn: game.turn,
        currentPlayer: game.turn,
        board: game.board,
        check: game.check,
        checkMate: game.checkMate,
        capturedPieces: game.capturedPieces
      }
    }

  }

}
