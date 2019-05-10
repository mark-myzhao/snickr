const Router = require('koa-router')
const router = new Router()
const wMemberController = require('../controllers/wmember-controller')

router.get('/:wid', wMemberController.findmember)
router.get('/', wMemberController.findallmember)
router.get('/getwid/:uemail', wMemberController.getwidthememberin)
router.post('/', wMemberController.addmember)
router.put('/:wid/:uemail', wMemberController.updatetype)
router.delete('/:wid/:uemail', wMemberController.deletewmember)

module.exports = router.routes()
