export default function socketController(props) {
  return {
    socket: props.socket,
    client: props.client,

    connected: () => {
      this.id = props.socket.id
      console.log(`a user connected, id: ${this.id}`)
    },

    disconnect: () => {
      console.log(`${this.nickname} disconnected`)
    },

    message: data => {
      this.nickname = data.nickname
      console.log(data)
    }
  }
}