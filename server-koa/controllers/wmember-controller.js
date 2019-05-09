const wMemberModel = require('../models/wmember')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let findmember = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      let result = await wMemberModel.getmember(wid)
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

let findallmember = withAuth(
  async (ctx, next) => {
    try {
      let result = await wMemberModel.getmember()
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

let getwidthememberin = withAuth(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      let result = await wMemberModel.getwid(uemail)
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

let addmember = withAuth(
  async (ctx, next) => {
    try {
      const { uemail, wid, wmtype } = ctx.request.body
      let result = await wMemberModel.addNewmember(uemail, wid, wmtype)
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

let updatetype = withAuth(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      const wmtype = ctx.request.body
      let result = await wMemberModel.update(uemail, wmtype)
      if (result) {
        ctx.ok({ success: true, updated: uemail })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

let deletewmember = withAuth(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      let result = await wMemberModel.remove(uemail)
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
  getwidthememberin,
  addmember,
  updatetype,
  deletewmember
}
