export default function (color, position) {
  this.symbol = 'K'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
  this.possibleMove = (board, sourcePosition, targetPosition) => {

    console.log(sourcePosition, targetPosition);
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
    return { status: false }
  }
}