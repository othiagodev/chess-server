export default function() {
  this.board = Array(8).fill(null).map(() => Array(8).fill(null))

  const listLetterChessPosition = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const listNumberChessPosition = ['1', '2', '3', '4', '5', '6', '7', '8']

  this.placaNewPiece = piece => {
    const letterChessPosition = piece.position.substring(1, 0)
    const numberChessPosition = piece.position.substring(2, 1)

    let i = null, j = null

    listLetterChessPosition.forEach((value, index) => {
      if (letterChessPosition === value) {
        i = index
      }
    })

    listNumberChessPosition.forEach((value, index) => {
      if (numberChessPosition === value) {
        j = index
      }
    })

    this.board[i][j] = piece
  }
}
