const Router = require('koa-router')
const router = new Router()
const MessageController = require('../controllers/message-controller')

router.get('/:wid/:cname', MessageController.getmessage)
router.get('/search/:uemail/:query', MessageController.searchmessage)
router.post('/', MessageController.addmessage)

module.exports = router.routes()
