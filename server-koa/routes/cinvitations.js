const Router = require('koa-router')
const router = new Router()
const cInvitationController = require('../controllers/cinvitation-controller')

router.get('/:remail', cInvitationController.getallinvitation)
router.post('/:cname', cInvitationController.addcinvitation)
router.delete('/', cInvitationController.deleteallcinvitation)

module.exports = router.routes()
