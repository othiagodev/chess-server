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

    pieces.push(new Pawn(Color.WHITE, 'a2'))
    pieces.push(new Pawn(Color.WHITE, 'b2'))
    pieces.push(new Pawn(Color.WHITE, 'c2'))
    pieces.push(new Pawn(Color.WHITE, 'd2'))
    pieces.push(new Pawn(Color.WHITE, 'e2'))
    pieces.push(new Pawn(Color.WHITE, 'f2'))
    pieces.push(new Pawn(Color.WHITE, 'g2'))
    pieces.push(new Pawn(Color.WHITE, 'h2'))

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
    console.table(this.chessBoard.board)
    const src = chessPositionToPosition(sourcePosition)
    const trg = chessPositionToPosition(targetPosition)

    const piece = this.chessBoard.board[src.i][src.j] //bug com a8 e h8 ou similar

    if (piece && piece.color === this.currentPlayer) {
      const isPossibleMove = piece.possibleMove(this.chessBoard.board, src, trg)

      if (isPossibleMove) {
        this.turn++
        piece.moveCount += 1
        piece.chessPosition = targetPosition
        this.currentPlayer = this.currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE
        if (this.chessBoard.board[trg.i][trg.j])
          this.capturedPieces.push(this.chessBoard.board[trg.i][trg.j])
        this.chessBoard.board[trg.i][trg.j] = piece
        this.chessBoard.board[src.i][src.j] = null
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
