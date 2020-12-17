const { Router } = require('express')
const TestController = require('./TestController')

const routes = Router()

routes.get('/', TestController.index)

routes.get('/test', TestController.test)

module.exports = routes