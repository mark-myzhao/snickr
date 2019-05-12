const cInvitationModel = require('../models/cinvitation')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let getallinvitation = withAuth(
  async (ctx, next) => {
    try {
      const remail = ctx.params.remail
      let result = await cInvitationModel.getinvitation(remail)
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

let addcinvitation = withAuth(
  async (ctx, next) => {
    try {
      const { semail, remail, cname, wid } = ctx.request.body
      if (semail && remail && cname && wid) {
        let time = new Date()
        let result = await cInvitationModel.addNewcinvitation(semail, remail, wid, cname, time)
        if (result.success) {
          ctx.created({ success: true, inviteuser: remail })
        } else {
          ctx.ok({ success: false, error: result.error })
        }
      } else {
        ctx.badRequest({ success: false })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let deleteallcinvitation = withAuth(
  async (ctx, next) => {
    try {
      const { semail, remail, wid, cname } = ctx.request.body
      let result = await cInvitationModel.remove(semail, remail, wid, cname)
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
  addcinvitation,
  deleteallcinvitation
}
