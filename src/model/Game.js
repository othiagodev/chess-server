import Pawn from './Piece/Pawn.js'
import Board from './Board.js'
import Knight from './Piece/Knight.js'
import Bishop from './Piece/Bishop.js'
import Rook from './Piece/Rook.js'

export const Color = {
  BLACK: 'BLACK',
  WHITE: 'WHITE'
}

export default function(player) {
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

    pieces.push(new Rook(Color.WHITE, 'a1'))
    pieces.push(new Rook(Color.WHITE, 'h1'))
    pieces.push(new Bishop(Color.WHITE, 'c1'))
    pieces.push(new Bishop(Color.WHITE, 'f1'))
    pieces.push(new Knight(Color.WHITE, 'b1'))
    pieces.push(new Knight(Color.WHITE, 'g1'))
    pieces.push(new Pawn(Color.WHITE, 'a2'))
    pieces.push(new Pawn(Color.WHITE, 'b2'))
    pieces.push(new Pawn(Color.WHITE, 'c2'))
    pieces.push(new Pawn(Color.WHITE, 'd2'))
    pieces.push(new Pawn(Color.WHITE, 'e2'))
    pieces.push(new Pawn(Color.WHITE, 'f2'))
    pieces.push(new Pawn(Color.WHITE, 'g2'))
    pieces.push(new Pawn(Color.WHITE, 'h2'))

    pieces.push(new Rook(Color.BLACK, 'a8'))
    pieces.push(new Rook(Color.BLACK, 'h8'))
    pieces.push(new Bishop(Color.BLACK, 'c8'))
    pieces.push(new Bishop(Color.BLACK, 'f8'))
    pieces.push(new Knight(Color.BLACK, 'b8'))
    pieces.push(new Knight(Color.BLACK, 'g8'))
    pieces.push(new Pawn(Color.BLACK, 'a7'))
    pieces.push(new Pawn(Color.BLACK, 'b7'))
    pieces.push(new Pawn(Color.BLACK, 'c7'))
    pieces.push(new Pawn(Color.BLACK, 'd7'))
    pieces.push(new Pawn(Color.BLACK, 'e7'))
    pieces.push(new Pawn(Color.BLACK, 'f7'))
    pieces.push(new Pawn(Color.BLACK, 'g7'))
    pieces.push(new Pawn(Color.BLACK, 'h7'))

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

    const handleGameStage = () => {
      this.turn++
      piece.moveCount += 1
      piece.chessPosition = targetPosition
      this.currentPlayer = this.currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE
    }

    if (piece && piece.color === this.currentPlayer) {
      const isPossibleMove = piece.possibleMove(this.chessBoard.board, src, trg)

      if (isPossibleMove.status) {
        if (isPossibleMove.specialMove === 'enPassant') {
          if (this.chessBoard.board[src.i][src.j].color === Color.WHITE) {
            handleGameStage()
            this.capturedPieces.push(this.chessBoard.board[trg.i][trg.j - 1])
            this.chessBoard.board[trg.i][trg.j] = piece
            this.chessBoard.board[trg.i][trg.j - 1] = null
            this.chessBoard.board[src.i][src.j] = null
            return true

          } else {
            handleGameStage()
            this.capturedPieces.push(this.chessBoard.board[trg.i][trg.j + 1])
            this.chessBoard.board[trg.i][trg.j] = piece
            this.chessBoard.board[trg.i][trg.j + 1] = null
            this.chessBoard.board[src.i][src.j] = null
            return true

          }
        } else {
          handleGameStage()
          if (this.chessBoard.board[trg.i][trg.j])
            this.capturedPieces.push(this.chessBoard.board[trg.i][trg.j])

          this.chessBoard.board[trg.i][trg.j] = piece
          this.chessBoard.board[src.i][src.j] = null

          return true
        }
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
        currentPlayer: this.currentPlayer,
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

  if (position.i !== null && position.j !== null)
    return position
}
