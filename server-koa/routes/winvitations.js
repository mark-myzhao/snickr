const Router = require('koa-router')
const router = new Router()
const WinvitationController = require('../controllers/winvitation-controller')

router.get('/:remail', WinvitationController.getallinvitation)
router.post('/', WinvitationController.addinvitation)
router.delete('/', WinvitationController.deleteallwinvitation)

module.exports = router.routes()
