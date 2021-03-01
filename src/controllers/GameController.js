import BoardController from './BoardController.js'

export const Color = {
  BLACK: 'BLACK',
  WHITE: 'WHITE'
}

export default function (game) {
  this.player1 = game.player1
  this.player2 = game.player2
  this.turn = game.turn
  this.currentPlayer = game.currentPlayer
  this.board = game.board
  this.check = game.check
  this.checkMate = game.checkMate
  this.capturedPieces = game.capturedPieces
  this.promotionPiece = game.promotionPiece
  
  this.initialSetup = () => {
    const boardController = new BoardController()
  
    this.board = boardController.board
    const pieces = boardController.setup()
    pieces.forEach(piece => boardController.placeNewPiece(piece))
  }

  this.startGame = () => {
    this.initialSetup()
    this.turn = 1
    this.currentPlayer = Color.WHITE
  }

  this.doMovePiece = (sourcePosition, targetPosition) => {
    const src = chessPositionToPosition(sourcePosition)
    const trg = chessPositionToPosition(targetPosition)

    const piece = this.board[src.i][src.j]

    const handleGameStage = () => {
      this.turn++
      piece.moveCount += 1
      piece.chessPosition = targetPosition
      this.currentPlayer = this.currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE
    }

    if (piece && piece.color === this.currentPlayer) {
      const isPossibleMove = piece.possibleMove(this.board, src, trg)

      if (isPossibleMove.status) {
        if (isPossibleMove.specialMove === 'enPassant') {
          if (this.board[src.i][src.j].color === Color.WHITE) {
            handleGameStage()
            this.capturedPieces.push(this.board[trg.i][trg.j - 1])
            this.board[trg.i][trg.j] = piece
            this.board[trg.i][trg.j - 1] = null
            this.board[src.i][src.j] = null
            return true

          } else {
            handleGameStage()
            this.capturedPieces.push(this.board[trg.i][trg.j + 1])
            this.board[trg.i][trg.j] = piece
            this.board[trg.i][trg.j + 1] = null
            this.board[src.i][src.j] = null
            return true

          }
        } else if (isPossibleMove.specialMove === 'castling') {
          if (trg.i < src.i) {
            handleGameStage()
            const rook = this.board[0][src.j]
            this.board[2][src.j] = piece
            this.board[3][src.j] = rook
            this.board[4][src.j] = null
            this.board[0][src.j] = null
            return true

          } else {
            handleGameStage()
            const rook = this.board[7][src.j]
            this.board[6][src.j] = piece
            this.board[5][src.j] = rook
            this.board[4][src.j] = null
            this.board[7][src.j] = null
            return true

          }
        } else if (isPossibleMove.specialMove === 'promotion') {
          console.log('promotion');
          if (this.board[trg.i][trg.j])
            this.capturedPieces.push(this.board[trg.i][trg.j])

          piece.moveCount += 1
          piece.chessPosition = targetPosition
          this.board[trg.i][trg.j] = piece
          this.board[src.i][src.j] = null
          this.promotionPiece['target'] = trg

          const currentPlayer = (this.player1.playerColor === this.currentPlayer) ? this.player1 : this.player2
          currentPlayer.socket.emit('promotion', this.generatorData())
          
          return true
        } else {
          handleGameStage()
          if (this.board[trg.i][trg.j])
            this.capturedPieces.push(this.board[trg.i][trg.j])

          this.board[trg.i][trg.j] = piece
          this.board[src.i][src.j] = null

          return true
        }
      }
    }
    return false
  }

  const undoMovePiece = () => {

  }

  this.promotion = piece => {
    const target = this.promotionPiece['target']
    
    this.board[target.i][target.j] = this.newPromotionPiece(piece.symbol)
    delete this.promotionPiece['target']

    this.turn++
    this.currentPlayer = this.currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE
  }

  this.newPromotionPiece = piece => {
    let newPiece = null
    switch(piece) {
      case 'Q':
        newPiece = new Queen(this.currentPlayer)
        break;
      case 'R':
        newPiece = new Rook(this.currentPlayer)
        break;
      case 'B':
        newPiece = new Bishop(this.currentPlayer)
        break;
      case 'N':
        newPiece = new Knight(this.currentPlayer)
    }
    return newPiece
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
        board: this.board,
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
        if (data)
          player.socket.emit(string, data)
        else
          player.socket.emit(string)
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