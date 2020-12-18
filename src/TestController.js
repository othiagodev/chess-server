module.exports = {
  index(req, res) {
    return res.send('API running...')
  },
  test(req, res) {
    return res.sendFile(__dirname + '/index.html')
  }
}
