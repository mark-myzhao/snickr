const Router = require('koa-router')
const router = new Router()
const ChannelController = require('../controllers/channel-controller')

router.get('/:wid/:uemail', ChannelController.getchannelinworkspace)
router.post('/', ChannelController.addchannel)
router.put('/', ChannelController.changechannel)
router.delete('/:cname', ChannelController.deletechannel)

module.exports = router.routes()
