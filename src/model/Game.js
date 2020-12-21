import Pawn from './Piece/Pawn.js'
import Board from './Board.js'

export const Color = {
  BLACK: 'BLACK',
  WHITE: 'WHITE'
}

export default function(player) {
  this.player1 = player
  this.player2 = null
  this.turn = null
  this.currentPlayer = null
  this.board = null
  this.check = false
  this.checkMate = false
  this.capturedPieces = []

  this.inicitialSetup = () => {
    const pieces = []
    this.board = new Board()

    pieces.push(new Pawn(Color.WHITE, 'b5'))
    pieces.push(new Pawn(Color.BLACK, 'g4'))

    pieces.forEach(piece => this.board.placaNewPiece(piece))
  }

  this.startGame = () => {
    this.inicitialSetup()
    this.turn = 1
    this.currentPlayer = Color.WHITE
    console.log('start game')
  }

  this.movePiece = (currentPossition, targetPosition) => {

  }

  this.generatorData = () => {
    return {
      waitingOpponent: false,
      match: {
        player1: {
          id: this.player1.id,
          name: this.player1.name,
          playerColor: this.player1.playerColor
        },
        player2: {
          id: this.player2.id,
          name: this.player2.name,
          playerColor: this.player2.playerColor
        },
        turn: this.turn,
        currentPlayer: this.turn,
        board: this.board,
        check: this.check,
        checkMate: this.checkMate,
        capturedPieces: this.capturedPieces
      }
    }
  }

}