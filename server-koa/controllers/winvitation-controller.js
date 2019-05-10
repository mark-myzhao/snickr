const wInvitationModel = require('../models/winvitation')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let addinvitation = withAuth(
  async (ctx, next) => {
    try {
      const { semail, remail } = ctx.request.body
      const wid = ctx.params.wid
      let result = await wInvitationModel.addNewinvitation(wid, semail, remail)
      if (result) {
        ctx.created({ success: true, invitewid: wid, invitemember: remail })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
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
      ctx.badRequest({ error })
    }
  }
)

module.exports = {
  addinvitation,
  deleteallwinvitation
}
