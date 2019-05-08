const Router = require('koa-router')
const router = new Router()
const cInvitationController = require('../controllers/cinvitation-controller')

router.post('/:cname', cInvitationController.addcinvitation)

module.exports = router.routes()
