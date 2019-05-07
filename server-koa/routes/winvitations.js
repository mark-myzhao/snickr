const Router = require('koa-router')
const router = new Router()
const WinvitationController = require('../controllers/winvitation-controller')

router.post('/:wid', WinvitationController.addinvitation)

module.exports = router.routes()
