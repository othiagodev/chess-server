import Piece from '../../models/Piece.js'

export default function (color, position) {
  const piece = Piece(color, position, 'B')

  this.chessPosition = piece.chessPosition
  this.color = piece.color
  this.moveCount = piece.moveCount
  this.symbol = piece.symbol

  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (targetPosition.i < sourcePosition.i && targetPosition.j > sourcePosition.j) {
      for (let i = sourcePosition.i, j = sourcePosition.j; i >= targetPosition.i && j <= targetPosition.j; i--, j++) {
        if (board[i][j] && sourcePosition.i !== i && sourcePosition.j !== j && i !== targetPosition.i && j !== targetPosition.j)
          return { status: false }

        if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
          return { status: true }

        if (board[i][j] && board[i][j].color !== this.color && i === targetPosition.i && j === targetPosition.j)
          return { status: true }
      }
    }

    if (targetPosition.i > sourcePosition.i && targetPosition.j > sourcePosition.j) {
      for (let i = sourcePosition.i, j = sourcePosition.j; i <= targetPosition.i && j <= targetPosition.j; i++, j++) {
        if (board[i][j] && sourcePosition.i !== i && sourcePosition.j !== j && i !== targetPosition.i && j !== targetPosition.j)
          return { status: false }

        if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
          return { status: true }

        if (board[i][j] && board[i][j].color !== this.color && i === targetPosition.i && j === targetPosition.j)
          return { status: true }
      }
    }

    if (targetPosition.i > sourcePosition.i && targetPosition.j < sourcePosition.j) {
      for (let i = sourcePosition.i, j = sourcePosition.j; i <= targetPosition.i && j >= targetPosition.j; i++, j--) {
        if (board[i][j] && sourcePosition.i !== i && sourcePosition.j !== j && i !== targetPosition.i && j !== targetPosition.j)
          return { status: false }

        if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
          return { status: true }

        if (board[i][j] && board[i][j].color !== this.color && i === targetPosition.i && j === targetPosition.j)
          return { status: true }
      }
    }

    if (targetPosition.i < sourcePosition.i && targetPosition.j < sourcePosition.j) {
      for (let i = sourcePosition.i, j = sourcePosition.j; i >= targetPosition.i && j >= targetPosition.j; i--, j--) {
        if (board[i][j] && sourcePosition.i !== i && sourcePosition.j !== j && i !== targetPosition.i && j !== targetPosition.j)
          return { status: false }

        if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
          return { status: true }

        if (board[i][j] && board[i][j].color !== this.color && i === targetPosition.i && j === targetPosition.j)
          return { status: true }
      }
    }

    return { status: false }
  }
}