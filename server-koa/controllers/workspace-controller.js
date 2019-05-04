const WorkspaceModel = require('../models/workspace')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let getWorkspace = withAuth(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      let result = await WorkspaceModel.getWithUemail(uemail)
      if (result.length > 0) {
        ctx.ok({
          success: true,
          workspace: result
        })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

module.exports = {
  getWorkspace
}
