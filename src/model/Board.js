export default function() {
  this.board = Array(8).fill(null).map(() => Array(8).fill(null))

  this.placaNewPiece = piece => {
    this.board[7][7] = piece
  }
}
