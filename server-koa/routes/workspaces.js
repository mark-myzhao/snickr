const Router = require('koa-router')
const router = new Router()
const WorkspaceController = require('../controllers/workspace-controller')

router.get('/:uemail', WorkspaceController.getWorkspace)
router.post('/', WorkspaceController.addWorkspace)
router.put('/:wid', WorkspaceController.updateWorkspace)
router.delete('/:wid', WorkspaceController.removeWorkspace)

module.exports = router.routes()
