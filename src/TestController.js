module.exports = {
  index(req, res) {
    return res.send('API running...')
  },
  test(req, res) {
    return res.status(200).json({test: true})
  }
}