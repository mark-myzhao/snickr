const Router = require('koa-router')
const router = new Router()
const WinvitationController = require('../controllers/winvitation-controller')

router.post('/:wid', WinvitationController.addinvitation)
router.delete('/', WinvitationController.deleteallwinvitation)

module.exports = router.routes()
