export default function (id, socket, name) {
  return {
    id: id,
    socket: socket,
    name: name,
    game: null,
    playerColor: null
  }
}
