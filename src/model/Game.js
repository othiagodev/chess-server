import Piece, { Color } from './Pieace.js'
import Board from './Board.js'

export default props => {

  let player1 = props.player1
  let player2 = null
  let turn = null
  let currentPlayer = null
  let board = null
  let check = false
  let checkMate = false
  let capturedPieces = []

  const inicitialSetup = () => {
    console.log('start setup');

    const pieces = []
    board = Board()

    pieces.push(Piece({ color: Color.WHITE, position: 'b5' }))
    pieces.push(Piece({ color: Color.BLACK, position: 'g5' }))

    pieces.forEach(piece => board.placaNewPiece(piece))
  }

  const startGame = () => {
    inicitialSetup()
    turn = 1
    currentPlayer = Color.WHITE
    console.log('start game');
  }

  const movePiece = () => {

  }

  return {
    player1,
    player2,
    turn,
    currentPlayer,
    board,
    check,
    checkMate,
    capturedPieces,
    inicitialSetup,
    startGame,
    movePiece
  }
}