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

module.exports = {
  addinvitation
}
