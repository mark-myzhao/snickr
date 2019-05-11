const WorkspaceModel = require('../models/workspace')
const wMemberModel = require('../models/wmember')
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
        ctx.ok({ success: true, workspace: [] })
        // ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addWorkspace = withAuth(
  async (ctx, next) => {
    try {
      const { wname, wdesc, uemail, wmtype } = ctx.request.body
      if (wname && wdesc && uemail && wmtype) {
        let wid = await WorkspaceModel.add(wname, wdesc, uemail)
        await wMemberModel.addNewmember(uemail, wid, wmtype)
        ctx.created({
          success: true,
          added: {
            wid,
            wname,
            wdesc
          }
        })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let updateWorkspace = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      const { wname, wdesc } = ctx.request.body
      let result = await WorkspaceModel.updateWithWorkspace(wid, wname, wdesc)
      if (result) {
        ctx.ok({ success: true, updated: wid })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let removeWorkspace = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      let result = await WorkspaceModel.removeWithWorkspace(wid)
      if (result) {
        ctx.ok({ success: true, deleted: wid })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

module.exports = {
  getWorkspace,
  addWorkspace,
  updateWorkspace,
  removeWorkspace
}
