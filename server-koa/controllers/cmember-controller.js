const cMemberModel = require('../models/cmember')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let findmember = withAuth(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      let result = await cMemberModel.getmember(uemail)
      if (result.length > 0) {
        ctx.ok({
          success: true,
          memberinfo: result
        })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let findallmember = withAuth(
  async (ctx, next) => {
    try {
      let result = await cMemberModel.getmember()
      if (result.length > 0) {
        ctx.ok({
          success: true,
          memberinfo: result
        })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let getmemberinchannel = withAuth(
  async (ctx, next) => {
    try {
      const cname = ctx.params.cname
      const wid = ctx.params.wid
      let result = await cMemberModel.getchannelmember(cname, wid)
      if (result.length > 0) {
        ctx.ok({
          success: true,
          member: result
        })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addmember = withAuth(
  async (ctx, next) => {
    try {
      const { uemail, wid, cname } = ctx.request.body
      let result = await cMemberModel.addNewmember(uemail, wid, cname)
      if (result) {
        ctx.created({ success: true, added: uemail })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

let deletemember = withAuth(
  async (ctx, next) => {
    try {
      const { uemail, wid, cname } = ctx.request.body
      let result = await cMemberModel.remove(uemail, wid, cname)
      if (result) {
        ctx.ok({ success: true, deleted: uemail })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

module.exports = {
  findmember,
  findallmember,
  getmemberinchannel,
  addmember,
  deletemember
}
