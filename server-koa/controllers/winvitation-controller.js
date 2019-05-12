const wInvitationModel = require('../models/winvitation')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let getallinvitation = withAuth(
  async (ctx, next) => {
    try {
      const remail = ctx.params.remail
      let result = await wInvitationModel.getinvitation(remail)
      if (result.length > 0) {
        ctx.ok({
          success: true,
          member: result
        })
      } else {
        // ctx.notFound({ success: false, error: ERRMSG['notFound'] })
        ctx.ok({ success: false, member: [] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addinvitation = withAuth(
  async (ctx, next) => {
    try {
      const { semail, remail, wid } = ctx.request.body
      let result = await wInvitationModel.addNewinvitation(wid, semail, remail, new Date())
      if (result) {
        if (result.success) {
          ctx.created({ success: true, invitewid: wid, invitemember: remail })
        } else {
          ctx.ok(result)
        }
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let deleteallwinvitation = withAuth(
  async (ctx, next) => {
    try {
      const { semail, remail, wid } = ctx.request.body
      let result = await wInvitationModel.remove(semail, remail, wid)
      if (result) {
        ctx.ok({ success: true })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

module.exports = {
  getallinvitation,
  addinvitation,
  deleteallwinvitation
}
