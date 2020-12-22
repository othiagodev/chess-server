import { Color } from "../Game.js"

export default function (color, position) {
  this.symbol = 'P'
  this.color = color
  this.moveCount = 0
  this.chessPosition = position
  this.possibleMove = (board, sourcePosition, targetPosition) => {

    if (this.color === Color.WHITE) {
      //pawn white move
      if ('') {
        return true
      }
    } else {
      //pawn black move
      if ('') {
        return true
      }
    }
    return false
  }

}