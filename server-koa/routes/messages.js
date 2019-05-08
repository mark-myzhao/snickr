const Router = require('koa-router')
const router = new Router()
const MessageController = require('../controllers/message-controller')

router.post('/', MessageController.addmessage)

module.exports = router.routes()
