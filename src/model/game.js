export default props => {
  return {
    player1: props.player1,
    player2: null,
    turn: null,
    currentPlayer: null,
    board: null,
    check: false,
    checkMate: false,
    capturedPieces: [],
    startGame: () => {

    },
    inicitialSetup: () => {

    }
  }
}