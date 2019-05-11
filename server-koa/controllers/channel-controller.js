const ChannelModel = require('../models/channel')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let getchannelinworkspace = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      const uemail = ctx.params.uemail
      let result = await ChannelModel.getchannelinfo(wid, uemail)
      if (result.length > 0) {
        ctx.ok({ success: true, channels: result })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addchannel = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      const { cname, ctype } = ctx.request.body
      let time = new Date()
      let ctime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.toLocaleTimeString()
      let result = await ChannelModel.addNewchannel(wid, cname, ctype, ctime)
      if (result) {
        ctx.created({ success: true, added: cname })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

let deletechannel = withAuth(
  async (ctx, next) => {
    try {
      const cname = ctx.params.cname
      const wid = ctx.request.body
      let result = await ChannelModel.removechannel(wid, cname)
      if (result) {
        ctx.ok({ success: true, delete: cname })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

module.exports = {
  getchannelinworkspace,
  addchannel,
  deletechannel
}
