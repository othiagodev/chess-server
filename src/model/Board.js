import { chessPositionToPosition } from './Game.js'

export default function() {
  this.board = new Array(8).fill(null).map(() => new Array(8).fill(null))

  this.placaNewPiece = piece => {
    const position = chessPositionToPosition(piece.chessPosition)
    this.board[position.i][position.j] = piece
  }
}
