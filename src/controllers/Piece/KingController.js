import Piece from '../../models/Piece.js'

export default function (color, position) {
  const piece = Piece(color, position, 'K')

  this.chessPosition = piece.chessPosition
  this.color = piece.color
  this.moveCount = piece.moveCount
  this.symbol = piece.symbol
  this.isCheck = false
  this.checkmate = false

  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (
      ((!board[sourcePosition.i - 1][sourcePosition.j + 1] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j ||
        board[sourcePosition.i - 1][sourcePosition.j + 1] && board[sourcePosition.i - 1][sourcePosition.j + 1].color !== this.color
        && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j)) ||

      ((!board[sourcePosition.i][sourcePosition.j + 1] && sourcePosition.i === targetPosition.i && sourcePosition.j + 1 === targetPosition.j ||
        board[sourcePosition.i][sourcePosition.j + 1] && board[sourcePosition.i][sourcePosition.j + 1].color !== this.color
        && sourcePosition.i === targetPosition.i && sourcePosition.j + 1 === targetPosition.j)) ||

      ((!board[sourcePosition.i + 1][sourcePosition.j + 1] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j ||
        board[sourcePosition.i + 1][sourcePosition.j + 1] && board[sourcePosition.i + 1][sourcePosition.j + 1].color !== this.color
        && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j)) ||

      ((!board[sourcePosition.i + 1][sourcePosition.j] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j === targetPosition.j ||
        board[sourcePosition.i + 1][sourcePosition.j] && board[sourcePosition.i + 1][sourcePosition.j].color !== this.color
        && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j === targetPosition.j)) ||

      ((!board[sourcePosition.i + 1][sourcePosition.j - 1] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j ||
        board[sourcePosition.i + 1][sourcePosition.j - 1] && board[sourcePosition.i + 1][sourcePosition.j - 1].color !== this.color
        && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j)) ||

      ((!board[sourcePosition.i][sourcePosition.j - 1] && sourcePosition.i === targetPosition.i && sourcePosition.j - 1 === targetPosition.j ||
        board[sourcePosition.i][sourcePosition.j - 1] && board[sourcePosition.i][sourcePosition.j - 1].color !== this.color
        && sourcePosition.i === targetPosition.i && sourcePosition.j - 1 === targetPosition.j)) ||

      ((!board[sourcePosition.i - 1][sourcePosition.j - 1] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j ||
        board[sourcePosition.i - 1][sourcePosition.j - 1] && board[sourcePosition.i - 1][sourcePosition.j - 1].color !== this.color
        && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j)) ||

      ((!board[sourcePosition.i - 1][sourcePosition.j] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j === targetPosition.j ||
        board[sourcePosition.i - 1][sourcePosition.j] && board[sourcePosition.i - 1][sourcePosition.j].color !== this.color
        && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j === targetPosition.j))
    ) {
      return { status: true }
    }

    //castling
    if (sourcePosition.j === targetPosition.j && !this.isCheck) {

      //queenside
      if (targetPosition.i < sourcePosition.i - 1 && board[0][sourcePosition.j] &&
        board[0][sourcePosition.j].color === this.color && board[0][sourcePosition.j].symbol === 'R') {
        if (board[0][sourcePosition.j].moveCount === 0 && board[sourcePosition.i][sourcePosition.j].moveCount === 0) {
          for (let i = sourcePosition.i - 1; i > 0; i--) {
            if (board[i][sourcePosition.j]) {
              return { status: false }
            } else {
              return { status: true, specialMove: 'castling' }
            }
          }
        }
      }

      //kingside
      if (targetPosition.i > sourcePosition.i + 1 && board[7][sourcePosition.j] &&
        board[7][sourcePosition.j].color === this.color && board[7][sourcePosition.j].symbol === 'R') {
        if (board[7][sourcePosition.j].moveCount === 0 && board[sourcePosition.i][sourcePosition.j].moveCount === 0) {
          for (let i = sourcePosition.i + 1; i < 7; i++) {
            if (board[i][sourcePosition.j]) {
              return { status: false }
            } else {
              return { status: true, specialMove: 'castling' }
            }
          }
        }
      }
    }

    return { status: false }
  }
}