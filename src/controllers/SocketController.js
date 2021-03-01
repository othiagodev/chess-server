import Player from '../models/Player.js'
import Game from '../models/Game.js'
import { Color } from "../controllers/GameController.js"
import GameController from '../controllers/GameController.js'

const players = {}
let unmatched = null

export default function (socket) {
  this.socket = socket

  this.disconnect = () => {
    if (players[this.socket.id] && players[this.socket.id].game) {
      players[this.socket.id].game.emitToPlayers('opponent.disconnect')
    }

    console.log(`a user disconnected: ${this.socket.id}`)
    delete players[this.socket.id]
  }

  this.beginGame = data => {
    if (data.name) {
      const player = Player(this.socket.id, this.socket, data.name)
      players[player.id] = player

      if (!unmatched) {
        const game = new GameController(Game(player))
        unmatched = game
        this.socket.emit('begin.game', { waitingOpponent: true, match: null })
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
    }
  }

  this.moveGame = data => {
    if (players[this.socket.id]) {
      if (data.sourcePosition && data.targetPosition) {
        const game = players[this.socket.id].game
        const completeMove = game.doMovePiece(data.sourcePosition, data.targetPosition)
        if (completeMove) {
          game.emitToPlayers('next.turn', game.generatorData())
        } else {
          this.socket.emit('invalid.move')
        }
      } else {
        console.log('invalid chess move data')
      }
    } else {
      console.log('player not found')
    }
  }

  this.promotion = data => {
    if (players[this.socket.id]) {
      const game = players[this.socket.id].game
      game.promotion(data)
      game.emitToPlayers('next.turn', game.generatorData())
    }
  }

}
