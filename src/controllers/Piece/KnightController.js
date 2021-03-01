import Piece from '../../models/Piece.js'

export default function (color, position) {
  const piece = Piece(color, position, 'N')

  this.chessPosition = piece.chessPosition
  this.color = piece.color
  this.moveCount = piece.moveCount
  this.symbol = piece.symbol

  this.possibleMove = (board, sourcePosition, targetPosition) => {

    //up
    if (sourcePosition.j + 2 === targetPosition.j) {
      if (sourcePosition.i + 1 === targetPosition.i && sourcePosition.i + 1 < 8) {
        if (
          ((!board[sourcePosition.i + 1][sourcePosition.j + 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j) ||
            (board[sourcePosition.i + 1][sourcePosition.j + 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j &&
              board[sourcePosition.i + 1][sourcePosition.j + 2].color !== this.color))
        ) {
          return { status: true }
        }
      }

      if (sourcePosition.i - 1 === targetPosition.i && sourcePosition.i - 1 >= 0) {
        if (
          ((!board[sourcePosition.i - 1][sourcePosition.j + 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j) ||
            (board[sourcePosition.i - 1][sourcePosition.j + 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j &&
              board[sourcePosition.i - 1][sourcePosition.j + 2].color !== this.color))
        ) {
          return { status: true }
        }
      }
    }

    //right
    if (sourcePosition.i + 2 === targetPosition.i) {
      if (sourcePosition.j + 1 === targetPosition.j && sourcePosition.j + 1 < 8) {
        if (
          ((!board[sourcePosition.i + 2][sourcePosition.j + 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
            (board[sourcePosition.i + 2][sourcePosition.j + 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j &&
              board[sourcePosition.i + 2][sourcePosition.j + 1].color !== this.color))
        ) {
          return { status: true }
        }
      }

      if (sourcePosition.j - 1 === targetPosition.j && sourcePosition.j - 1 >= 0) {
        if (
          ((!board[sourcePosition.i + 2][sourcePosition.j - 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
            (board[sourcePosition.i + 2][sourcePosition.j - 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j &&
              board[sourcePosition.i + 2][sourcePosition.j - 1].color !== this.color))
        ) {
          return { status: true }
        }
      }
    }

    //down
    if (sourcePosition.j - 2 === targetPosition.j) {
      if (sourcePosition.i + 1 === targetPosition.i && sourcePosition.i + 1 < 8) {
        if (
          ((!board[sourcePosition.i + 1][sourcePosition.j - 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j) ||
            (board[sourcePosition.i + 1][sourcePosition.j - 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j &&
              board[sourcePosition.i + 1][sourcePosition.j - 2].color !== this.color))
        ) {
          return { status: true }
        }
      }

      if (sourcePosition.i - 1 === targetPosition.i && sourcePosition.i - 1 >= 0) {
        if (
          ((!board[sourcePosition.i - 1][sourcePosition.j - 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j) ||
            (board[sourcePosition.i - 1][sourcePosition.j - 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j &&
              board[sourcePosition.i - 1][sourcePosition.j - 2].color !== this.color))
        ) {
          return { status: true }
        }
      }
    }

    //left
    if (sourcePosition.i - 2 === targetPosition.i) {
      if (sourcePosition.j + 1 === targetPosition.j && sourcePosition.j + 1 < 8) {
        if (
          ((!board[sourcePosition.i - 2][sourcePosition.j + 1] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
            (board[sourcePosition.i - 2][sourcePosition.j + 1] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j &&
              board[sourcePosition.i - 2][sourcePosition.j + 1].color !== this.color))
        ) {
          return { status: true }
        }
      }

      if (sourcePosition.j - 1 === targetPosition.j && sourcePosition.j - 1 >= 0) {
        if (
          ((!board[sourcePosition.i - 2][sourcePosition.j - 1] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
            (board[sourcePosition.i - 2][sourcePosition.j - 1] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j &&
              board[sourcePosition.i - 2][sourcePosition.j - 1].color !== this.color))
        ) {
          return { status: true }
        }
      }
    }

    return { status: false }
  }
}