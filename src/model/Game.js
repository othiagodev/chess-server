import Pawn from './Piece/Pawn.js'
import Board from './Board.js'

export const Color = {
  BLACK: 'BLACK',
  WHITE: 'WHITE'
}

export default function (player) {
  this.player1 = player
  this.player2 = null
  this.turn = null
  this.currentPlayer = null
  this.board = null
  this.check = false
  this.checkMate = false
  this.capturedPieces = []

  this.inicitialSetup = () => {
    const pieces = []
    this.chessBoard = new Board()

    pieces.push(new Pawn(Color.WHITE, 'b5'))
    pieces.push(new Pawn(Color.BLACK, 'g4'))

    pieces.forEach(piece => this.chessBoard.placaNewPiece(piece))
  }

  this.startGame = () => {
    this.inicitialSetup()
    this.turn = 1
    this.currentPlayer = Color.WHITE
    console.log('start game')
  }

  this.doMovePiece = (sourcePosition, targetPosition) => {
    const src = chessPositionToPosition(sourcePosition)
    const trg = chessPositionToPosition(targetPosition)

    const piece = this.chessBoard.board[src.i][src.j]

    if (piece && piece.color === this.currentPlayer) {
      const isPossibleMove = piece.possibleMove(this.chessBoard.board, src, trg)

      if (isPossibleMove) {
        this.chessBoard.board[trg.i][trg.j] = piece
        this.chessBoard.board[src.i][src.j] = null
        piece.moveCount++
        this.turn++
        this.currentPlayer = this.currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE
        console.table(this.chessBoard.board)
        return true
      }
    }
    return false
  }

  const undoMovePiece = () => {

  }

  this.generatorData = () => {
    return {
      waitingOpponent: false,
      match: {
        player1: {
          id: this.player1.id,
          name: this.player1.name,
          playerColor: this.player1.playerColor
        },
        player2: {
          id: this.player2.id,
          name: this.player2.name,
          playerColor: this.player2.playerColor
        },
        turn: this.turn,
        currentPlayer: this.turn,
        chessBoard: this.chessBoard,
        check: this.check,
        checkMate: this.checkMate,
        capturedPieces: this.capturedPieces
      }
    }
  }

  this.emitToPlayers = (string, data) => {
    if (this.player1 && this.player2) {
      const players = [this.player1, this.player2]
      players.forEach(player => {
        player.socket.emit(string, data)
        console.log(string);
      })
    }
  }

}

export function chessPositionToPosition(chessPosition) {
  const listLetterChessPosition = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const listNumberChessPosition = ['1', '2', '3', '4', '5', '6', '7', '8']

  const letterChessPosition = chessPosition.substring(1, 0)
  const numberChessPosition = chessPosition.substring(2, 1)

  const position = {
    i: null, j: null
  }

  listLetterChessPosition.forEach((value, index) => {
    if (letterChessPosition === value) {
      position.i = index
    }
  })

  listNumberChessPosition.forEach((value, index) => {
    if (numberChessPosition === value) {
      position.j = index
    }
  })

  if (position.i && position.j)
    return position
}
