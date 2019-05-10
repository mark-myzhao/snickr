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
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addcinvitation = withAuth(
  async (ctx, next) => {
    try {
      const cname = ctx.params.cname
      const { semail, remail, wid } = ctx.request.body
      let time = new Date()
      let citime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.toLocaleTimeString()
      let result = await cInvitationModel.addNewcinvitation(semail, remail, wid, cname, citime)
      if (result) {
        ctx.created({ success: true, inviteuser: remail })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
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
      ctx.badRequest({ error })
    }
  }
)

module.exports = {
  getallinvitation,
  addcinvitation,
  deleteallcinvitation
}
