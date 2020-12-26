export default function (color, position) {
  this.symbol = 'B'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (targetPosition.i < sourcePosition.i && targetPosition.j > sourcePosition.j) {
      for (let i = sourcePosition.i; i >= targetPosition.i && i >= 0;) {
        for (let j = sourcePosition.j; j <= targetPosition.j && j < 8;) {
          if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
            return { status: true }

          if (board[i][j] && board[i][j].color !== this.color)
            return { status: true }

          if (board[i][j] && board[i][j].color === this.color && sourcePosition.i !== i && sourcePosition.j !== j)
            return { status: false }

          i--; j++
        }
      }
    }

    if (targetPosition.i > sourcePosition.i && targetPosition.j > sourcePosition.j) {
      for (let i = sourcePosition.i; i <= targetPosition.i && i < 8;) {
        for (let j = sourcePosition.j; j <= targetPosition.j && j < 8;) {
          if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
            return { status: true }

          if (board[i][j] && board[i][j].color !== this.color)
            return { status: true }

          if (board[i][j] && board[i][j].color === this.color && sourcePosition.i !== i && sourcePosition.j !== j)
            return { status: false }

          i++; j++
        }
      }
    }

    if (targetPosition.i > sourcePosition.i && targetPosition.j < sourcePosition.j) {
      for (let i = sourcePosition.i; i <= targetPosition.i && i < 8;) {
        for (let j = sourcePosition.j; j >= targetPosition.j && j >= 0;) {
          if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
            return { status: true }

          if (board[i][j] && board[i][j].color !== this.color)
            return { status: true }

          if (board[i][j] && board[i][j].color === this.color && sourcePosition.i !== i && sourcePosition.j !== j)
            return { status: false }

          i++; j--
        }
      }
    }

    if (targetPosition.i < sourcePosition.i && targetPosition.j < sourcePosition.j) {
      for (let i = sourcePosition.i; i >= targetPosition.i && i >= 0;) {
        for (let j = sourcePosition.j; j >= targetPosition.j && j >= 0;) {
          if (!board[i][j] && targetPosition.i === i && targetPosition.j === j)
            return { status: true }

          if (board[i][j] && board[i][j].color !== this.color)
            return { status: true }

          if (board[i][j] && board[i][j].color === this.color && sourcePosition.i !== i && sourcePosition.j !== j)
            return { status: false }

          i--; j--
        }
      }
    }

    return { status: false }
  }
}