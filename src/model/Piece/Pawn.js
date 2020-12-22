import { Color } from "../Game.js"

export default function (color, position) {
  this.symbol = 'P'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
  this.possibleMove = (board, sourcePosition, targetPosition) => {

    console.log(sourcePosition, targetPosition);

    if (this.color === Color.WHITE) {
      //pawn white move
      if (
        (!board[sourcePosition.i][sourcePosition.j + 1] && sourcePosition.i === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
        (!board[sourcePosition.i][sourcePosition.j + 2] && sourcePosition.i === targetPosition.i && sourcePosition.j + 2 === targetPosition.j) ||
        (board[sourcePosition.i][sourcePosition.j] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
        (board[sourcePosition.i][sourcePosition.j] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j)
      ) {
        return true
      }
    } else {
      //pawn black move
      if (
        (!board[sourcePosition.i][sourcePosition.j + 1] && sourcePosition.i === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (!board[sourcePosition.i][sourcePosition.j + 2] && sourcePosition.i === targetPosition.i && sourcePosition.j - 2 === targetPosition.j) ||
        (board[sourcePosition.i][sourcePosition.j] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (board[sourcePosition.i][sourcePosition.j] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j)
      ) {
        return true
      }
    }

    //en passant
    if ('') {
      return true
    }
    return false
  }

}