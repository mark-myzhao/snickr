const Router = require('koa-router')
const router = new Router()
const UserController = require('../controllers/user-controller')

router.get('/all', UserController.getAllUsers)
router.get('/test', (ctx, next) => {
  ctx.body = 'test'
})

module.exports = router.routes()
