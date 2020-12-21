export const Color = {
  BLACK: 'BLACK',
  WHITE: 'WHITE'
}

export default props => {
  const color = props.color
  let position = props.position


  let possibleMoves = () => {}

  const Bishop = () => {}
  const King = () => {}
  const Knight = () => {}
  const Pawn = () => {
    return {
      symbol: 'P',
      color,
      position,
      possibleMoves: () =>{

      }
    }
  }
  const Quenn = () => {}
  const Rook = () => {}

  return {
    Bishop,
    King,
    Knight,
    Pawn,
    Quenn,
    Rook
  }
}