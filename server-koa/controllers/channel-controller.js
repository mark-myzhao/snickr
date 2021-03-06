const ChannelModel = require('../models/channel')
const cMemberModel = require('../models/cmember')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let getUnjoinedPublicChannels = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      const uemail = ctx.params.uemail
      let result = await ChannelModel.getChannelExclude('public', wid, uemail)
      if (result.length > 0) {
        ctx.ok({ success: true, channels: result })
      } else {
        ctx.ok({ success: false, channels: [] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let getchannelinworkspace = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      const uemail = ctx.params.uemail
      let result = await ChannelModel.getchannelinfo(wid, uemail)
      if (result.length > 0) {
        ctx.ok({ success: true, channels: result })
      } else {
        // ctx.notFound({ success: false, error: ERRMSG['notFound'] })
        ctx.ok({ success: false, channels: [] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addchannel = withAuth(
  async (ctx, next) => {
    try {
      const { wid, cname, ctype, uemail } = ctx.request.body
      if (wid && cname && ctype && uemail) {
        let time = new Date()
        await ChannelModel.addNewchannel(wid, cname, ctype, time)
        await cMemberModel.addNewmember(uemail, wid, cname)
        ctx.created({ success: true, added: cname })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let changechannel = withAuth(
  async (ctx, next) => {
    try {
      const { wid, cname, ctype, uemail, oname } = ctx.request.body
      let result = await ChannelModel.change(wid, cname, ctype, oname, uemail)
      if (result) {
        ctx.ok({ success: true })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let deletechannel = withAuth(
  async (ctx, next) => {
    try {
      const { wid, cname } = ctx.params
      let result = await ChannelModel.removechannel(wid, cname)
      if (result) {
        ctx.ok({ success: true, delete: cname })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

module.exports = {
  getUnjoinedPublicChannels,
  getchannelinworkspace,
  addchannel,
  changechannel,
  deletechannel
}
