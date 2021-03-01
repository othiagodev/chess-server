export default function (player) {
  return {
    player1: player,
    player2: null,
    turn: null,
    currentPlayer: null,
    board: null,
    check: false,
    checkMate: false,
    capturedPieces: [],
    promotionPiece: {}
  }
}
