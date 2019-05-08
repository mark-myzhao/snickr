const MessageModel = require('../models/message')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let addmessage = withAuth(
  async (ctx, next) => {
    try {
      const { wid, cname, uemail, mcontent } = ctx.request.body
      let time = new Date()
      let mtime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.toLocaleTimeString()
      let result = await MessageModel.addNewmessage(wid, cname, uemail, mtime, mcontent)
      if (result) {
        ctx.created({ success: true, message: mcontent })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

module.exports = {
  addmessage
}
