export default function (color, position) {
  this.symbol = 'N'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (
      //up
      ((!board[sourcePosition.i - 1][sourcePosition.j + 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j) ||
        (board[sourcePosition.i - 1][sourcePosition.j + 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j &&
          board[sourcePosition.i - 1][sourcePosition.j + 2].color !== this.color)) ||

      ((!board[sourcePosition.i + 1][sourcePosition.j + 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j) ||
        (board[sourcePosition.i + 1][sourcePosition.j + 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j &&
          board[sourcePosition.i + 1][sourcePosition.j + 2].color !== this.color)) ||

      //right
      ((!board[sourcePosition.i + 2][sourcePosition.j + 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
        (board[sourcePosition.i + 2][sourcePosition.j + 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j &&
          board[sourcePosition.i + 2][sourcePosition.j + 1].color !== this.color)) ||

      ((!board[sourcePosition.i + 2][sourcePosition.j - 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (board[sourcePosition.i + 2][sourcePosition.j - 1] && sourcePosition.i + 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j &&
          board[sourcePosition.i + 2][sourcePosition.j - 1].color !== this.color)) ||
      //down
      ((!board[sourcePosition.i + 1][sourcePosition.j - 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j) ||
        (board[sourcePosition.i + 1][sourcePosition.j - 2] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j &&
          board[sourcePosition.i + 1][sourcePosition.j - 2].color !== this.color)) ||

      ((!board[sourcePosition.i - 1][sourcePosition.j - 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j) ||
        (board[sourcePosition.i - 1][sourcePosition.j - 2] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 2 === targetPosition.j &&
          board[sourcePosition.i - 1][sourcePosition.j - 2].color !== this.color)) ||

      //left
      ((!board[sourcePosition.i - 2][sourcePosition.j - 1] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (board[sourcePosition.i - 2][sourcePosition.j - 1] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j &&
          board[sourcePosition.i - 2][sourcePosition.j - 1].color !== this.color)) ||

      ((!board[sourcePosition.i - 2][sourcePosition.j + 2] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j) ||
        (board[sourcePosition.i - 2][sourcePosition.j + 2] && sourcePosition.i - 2 === targetPosition.i && sourcePosition.j + 2 === targetPosition.j &&
          board[sourcePosition.i - 2][sourcePosition.j + 2].color !== this.color))

    ) {
      return { status: true }
    }
    return { status: false }
  }
}