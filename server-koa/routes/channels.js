const Router = require('koa-router')
const router = new Router()
const ChannelController = require('../controllers/channel-controller')

router.get('/:wid', ChannelController.getchannelinworkspace)
router.post('/:wid', ChannelController.addchannel)
router.delete('/:cname', ChannelController.deletechannel)

module.exports = router.routes()
