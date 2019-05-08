const Router = require('koa-router')
const router = new Router()
const cMemberController = require('../controllers/cmember-controller')

router.get('/:uemail', cMemberController.findmember)

module.exports = router.routes()
