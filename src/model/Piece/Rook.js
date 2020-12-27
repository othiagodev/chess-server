export default function (color, position) {
  this.symbol = 'R'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (targetPosition.i < sourcePosition.i) {
      for (let i = sourcePosition.i; i >= targetPosition.i && i >= 0;) {
        if (board[i][sourcePosition.j] && i !== targetPosition.i && sourcePosition.j === targetPosition.j && i !== sourcePosition.i) 
          return { status: false }

        if (board[i][sourcePosition.j] && board[i][sourcePosition.j].color !== this.color && i === targetPosition.i && sourcePosition.j === targetPosition.j) 
          return { status: true }

        if (!board[i][sourcePosition.j] && sourcePosition.j === targetPosition.j && sourcePosition.i !== targetPosition.i && i === targetPosition.i) 
          return { status: true }
        
        i--
      }
    }

    if (targetPosition.i > sourcePosition.i) {
      for (let i = sourcePosition.i; i <= targetPosition.i && i < 8;) {
        if (board[i][sourcePosition.j] && i !== targetPosition.i && sourcePosition.j === targetPosition.j && i !== sourcePosition.i) 
          return { status: false }

        if (board[i][sourcePosition.j] && board[i][sourcePosition.j].color !== this.color && i === targetPosition.i && sourcePosition.j === targetPosition.j) 
          return { status: true }

        if (!board[i][sourcePosition.j] && sourcePosition.j === targetPosition.j && sourcePosition.i !== targetPosition.i && i === targetPosition.i)
          return { status: true }
        
        i++
      }
    }

    if (targetPosition.j > sourcePosition.j) {
      for (let j = sourcePosition.j; j <= targetPosition.j && j < 8;) {
        if (board[sourcePosition.i][j] && sourcePosition.i === targetPosition.i && j !== targetPosition.j && j !== sourcePosition.j ) 
          return { status: false }

        if (board[sourcePosition.i][j] && board[sourcePosition.i][j].color !== this.color && sourcePosition.i === targetPosition.i && j === targetPosition.j) 
          return { status: true }

        if (!board[sourcePosition.i][j] && sourcePosition.j !== targetPosition.j && sourcePosition.i === targetPosition.i && j === targetPosition.j) 
          return { status: true }
        
        j++
      }
    }

    if (targetPosition.j < sourcePosition.j) {
      for (let j = sourcePosition.j; j >= targetPosition.j && j >= 0;) {
        if (board[sourcePosition.i][j] && sourcePosition.i === targetPosition.i && j !== targetPosition.j && j !== sourcePosition.j ) 
          return { status: false }
        
        if (board[sourcePosition.i][j] && board[sourcePosition.i][j].color !== this.color && sourcePosition.i === targetPosition.i && j === targetPosition.j) 
          return { status: true }

        if (!board[sourcePosition.i][j] && sourcePosition.j !== targetPosition.j && sourcePosition.i === targetPosition.i && j === targetPosition.j) 
          return { status: true }
        
        j--
      }
    }

    return { status: false }
  }
}