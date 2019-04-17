const Router = require('koa-router')
const router = new Router()
const UserController = require('../controllers/user-controller')

router.get('/', UserController.getAllUsers) // Return all users
router.get('/:uemail', UserController.getUser) // Return a SINGLE user
router.post('/', UserController.addUser) // Add a user
router.put('/:uemail', UserController.updateUser) // Update a user
router.delete('/:uemail', UserController.removeUser) // delete a user

module.exports = router.routes()
