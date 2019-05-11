const Router = require('koa-router')
const router = new Router()
const cMemberController = require('../controllers/cmember-controller')

router.get('/:uemail', cMemberController.findmember)
router.get('/', cMemberController.findallmember)
router.get('/:wid/:cname', cMemberController.getmemberinchannel)
router.post('/', cMemberController.addmember)
router.delete('/', cMemberController.deletemember)

module.exports = router.routes()
