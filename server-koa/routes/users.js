const Router = require('koa-router')
const router = new Router()
const User = require('../controllers/users')

router.get('/all', User.getAllUsersInfo)

module.exports = router.routes()
