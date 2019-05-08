const cInvitationModel = require('../models/cinvitation')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

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

module.exports = {
  addcinvitation
}
