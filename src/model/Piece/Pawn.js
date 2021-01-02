import { Color } from "../Game.js"

export default function (color, position) {
  this.symbol = 'P'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (this.color === Color.WHITE) {
      //pawn white move
      if (
        (!board[sourcePosition.i][sourcePosition.j + 1] && sourcePosition.i === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
        (!board[sourcePosition.i][sourcePosition.j + 2] && sourcePosition.i === targetPosition.i && sourcePosition.j + 2 === targetPosition.j && !this.moveCount) ||
        (board[targetPosition.i][targetPosition.j] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
        (board[targetPosition.i][targetPosition.j] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j)
      ) {
        //promotion
        if (sourcePosition.j + 1 === targetPosition.j && targetPosition.j === 7) {
          return { status: true, specialMove: 'promotion' }
        }
        return { status: true }
      }
    } else {
      //pawn black move
      if (
        (!board[sourcePosition.i][sourcePosition.j + 1] && sourcePosition.i === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (!board[sourcePosition.i][sourcePosition.j + 2] && sourcePosition.i === targetPosition.i && sourcePosition.j - 2 === targetPosition.j && !this.moveCount) ||
        (board[targetPosition.i][targetPosition.j] && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (board[targetPosition.i][targetPosition.j] && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j)
      ) {
        //promotion
        if (sourcePosition.j - 1 === targetPosition.j  && targetPosition.j === 0) {
          return { status: true, specialMove: 'promotion' }
        }
        return { status: true }
      }
    }

    //en passant
    if (this.color === Color.WHITE) {
      //pawn white move
      if (sourcePosition.j === 5) {
        if (
          (board[sourcePosition.i - 1][sourcePosition.j] && !board[sourcePosition.i - 1][sourcePosition.j + 1] && board[sourcePosition.i - 1][sourcePosition.j].moveCount === 1) ||
          (board[sourcePosition.i + 1][sourcePosition.j] && !board[sourcePosition.i + 1][sourcePosition.j + 1] && board[sourcePosition.i + 1][sourcePosition.j].moveCount === 1)
        ) {
          return { status: true, specialMove: 'enPassant' }
        }
      }
    } else {
      //pawn black move
      if (sourcePosition.j === 4) {
        if (
          (board[sourcePosition.i - 1][sourcePosition.j] && !board[sourcePosition.i - 1][sourcePosition.j - 1] && board[sourcePosition.i - 1][sourcePosition.j].moveCount === 1) ||
          (board[sourcePosition.i + 1][sourcePosition.j] && !board[sourcePosition.i + 1][sourcePosition.j - 1] && board[sourcePosition.i + 1][sourcePosition.j].moveCount === 1)
        ) {
          return { status: true, specialMove: 'enPassant' }
        }
      }
    }
    return { status: false }
  }

}