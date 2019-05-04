const Router = require('koa-router')
const router = new Router()
const WorkspaceController = require('../controllers/workspace-controller')

router.get('/:uemail', WorkspaceController.getWorkspace)
// router.post('/', WorkspaceController.addUser)
// router.put('/:uemail', WorkspaceController.updateUser)
// router.delete('/:uemail', WorkspaceController.removeUser) 

module.exports = router.routes()
