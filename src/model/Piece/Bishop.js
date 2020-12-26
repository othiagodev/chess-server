export default function (color, position) {
  this.symbol = 'B'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
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