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
    console.log('start setup')

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

  this.movePiece = () => {

  }

}