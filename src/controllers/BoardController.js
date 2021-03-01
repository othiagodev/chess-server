import Pawn from '../controllers/Piece/PawnController.js'
import Knight from '../controllers/Piece/KnightController.js'
import Bishop from '../controllers/Piece/BishopController.js'
import Rook from '../controllers/Piece/RookController.js'
import Queen from '../controllers/Piece/QueenController.js'
import King from '../controllers/Piece/KingController.js'
import Board from '../models/Board.js'
import { Color } from './GameController.js'
import { chessPositionToPosition } from './GameController.js'

export default function () {
  this.board = Board()

  this.placeNewPiece = piece => {
    const position = chessPositionToPosition(piece.chessPosition)
    this.board[position.i][position.j] = piece
  }

  this.setup = () => {
    return [
      new Knight(Color.WHITE, 'b1'),
      new Knight(Color.WHITE, 'g1'),
      new Bishop(Color.WHITE, 'c1'),
      new Bishop(Color.WHITE, 'f1'),
      new Queen(Color.WHITE, 'd1'),
      new King(Color.WHITE, 'e1'),
      new Rook(Color.WHITE, 'a1'),
      new Rook(Color.WHITE, 'h1'),
      new Pawn(Color.WHITE, 'a2'),
      new Pawn(Color.WHITE, 'b2'),
      new Pawn(Color.WHITE, 'c2'),
      new Pawn(Color.WHITE, 'd2'),
      new Pawn(Color.WHITE, 'e2'),
      new Pawn(Color.WHITE, 'f2'),
      new Pawn(Color.WHITE, 'g2'),
      new Pawn(Color.WHITE, 'h2'),
      new Knight(Color.BLACK, 'b8'),
      new Knight(Color.BLACK, 'g8'),
      new Bishop(Color.BLACK, 'c8'),
      new Bishop(Color.BLACK, 'f8'),
      new Queen(Color.BLACK, 'd8'),
      new King(Color.BLACK, 'e8'),
      new Rook(Color.BLACK, 'a8'),
      new Rook(Color.BLACK, 'h8'),
      new Pawn(Color.BLACK, 'a7'),
      new Pawn(Color.BLACK, 'b7'),
      new Pawn(Color.BLACK, 'c7'),
      new Pawn(Color.BLACK, 'd7'),
      new Pawn(Color.BLACK, 'e7'),
      new Pawn(Color.BLACK, 'f7'),
      new Pawn(Color.BLACK, 'g7'),
      new Pawn(Color.BLACK, 'h7'),
    ]
  }
}