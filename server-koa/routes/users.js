const passport = require('koa-passport')
const Router = require('koa-router')
const router = new Router()
const UC = require('../controllers/user-controller')

router.get('/', passport.authenticate('bearer', { session: false }), UC.getAllUsers) // Return all users
router.get('/:uemail', passport.authenticate('bearer', { session: false }), UC.getUser) // Return a SINGLE user
router.post('/', passport.authenticate('bearer', { session: false }), UC.addUser) // Add a user
router.put('/:uemail', passport.authenticate('bearer', { session: false }), UC.updateUser) // Update a user
router.delete('/:uemail', passport.authenticate('bearer', { session: false }), UC.removeUser) // delete a user

module.exports = router.routes()
