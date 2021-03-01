import Piece from '../../models/Piece.js'
import { Color } from '../GameController.js'

export default function (color, position) {
  const piece = Piece(color, position, 'P')

  this.chessPosition = piece.chessPosition
  this.color = piece.color
  this.moveCount = piece.moveCount
  this.symbol = piece.symbol

  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (this.color === Color.WHITE) {
      //pawn white move
      if (
        (!board[sourcePosition.i][sourcePosition.j + 1] && sourcePosition.i === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
        (!board[sourcePosition.i][sourcePosition.j + 2] && sourcePosition.i === targetPosition.i && sourcePosition.j + 2 === targetPosition.j && !this.moveCount) ||
        (board[targetPosition.i][targetPosition.j] && board[targetPosition.i][targetPosition.j].color !== this.color && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j) ||
        (board[targetPosition.i][targetPosition.j] && board[targetPosition.i][targetPosition.j].color !== this.color && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j + 1 === targetPosition.j)
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
        (!board[sourcePosition.i][sourcePosition.j - 1] && sourcePosition.i === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (!board[sourcePosition.i][sourcePosition.j - 2] && sourcePosition.i === targetPosition.i && sourcePosition.j - 2 === targetPosition.j && !this.moveCount) ||
        (board[targetPosition.i][targetPosition.j] && board[targetPosition.i][targetPosition.j].color !== this.color && sourcePosition.i - 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j) ||
        (board[targetPosition.i][targetPosition.j] && board[targetPosition.i][targetPosition.j].color !== this.color && sourcePosition.i + 1 === targetPosition.i && sourcePosition.j - 1 === targetPosition.j)
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
      if (sourcePosition.j === 4) {
        if (
          (targetPosition.i < sourcePosition.i && board[sourcePosition.i - 1][sourcePosition.j] && board[sourcePosition.i - 1][sourcePosition.j].color !== this.color && !board[sourcePosition.i - 1][sourcePosition.j + 1] && board[sourcePosition.i - 1][sourcePosition.j].moveCount === 1) ||
          (targetPosition.i > sourcePosition.i && board[sourcePosition.i + 1][sourcePosition.j] && board[sourcePosition.i + 1][sourcePosition.j].color !== this.color && !board[sourcePosition.i + 1][sourcePosition.j + 1] && board[sourcePosition.i + 1][sourcePosition.j].moveCount === 1)
        ) {
          return { status: true, specialMove: 'enPassant' }
        }
      }
    } else {
      //pawn black move
      if (sourcePosition.j === 3) {
        if (
          (targetPosition.i < sourcePosition.i && board[sourcePosition.i - 1][sourcePosition.j] && board[sourcePosition.i - 1][sourcePosition.j].color !== this.color && !board[sourcePosition.i - 1][sourcePosition.j - 1] && board[sourcePosition.i - 1][sourcePosition.j].moveCount === 1) ||
          (targetPosition.i > sourcePosition.i && board[sourcePosition.i + 1][sourcePosition.j] && board[sourcePosition.i + 1][sourcePosition.j].color !== this.color && !board[sourcePosition.i + 1][sourcePosition.j - 1] && board[sourcePosition.i + 1][sourcePosition.j].moveCount === 1)
        ) {
          return { status: true, specialMove: 'enPassant' }
        }
      }
    }
    return { status: false }
  }
}