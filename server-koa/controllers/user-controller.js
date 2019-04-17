const UserModel = require('../models/user')
const Util = require('../util')

const ERRMSG = {
  'notFound': 'User Not Found',
  'badRequest': 'Invalid Request'
}

let getAllUsers = Util.authWarpper(
  async (ctx, next) => {
    try {
      let result = await UserModel.get()
      if (result.length > 0) {
        ctx.ok({ users: result })
      } else {
        ctx.notFound({ error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let getUser = Util.authWarpper(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      let result = await UserModel.get([uemail])
      if (result.length > 0) {
        ctx.ok({ users: result })
      } else {
        ctx.notFound({ error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addUser = Util.authWarpper(
  async (ctx, next) => {
    try {
      const { uemail, username, nickname, password } = ctx.request.body
      let result = await UserModel.add(uemail, username, nickname, password)
      if (result) {
        ctx.created({ success: true, added: uemail })
      } else {
        ctx.badRequest({ error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

let updateUser = Util.authWarpper(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      const { username, nickname, password } = ctx.request.body
      let result = await UserModel.update(uemail, username, nickname, password)
      if (result) {
        ctx.ok({ success: true, updated: uemail })
      } else {
        ctx.notFound({ error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

let removeUser = Util.authWarpper(
  async (ctx, next) => {
    try {
      const uemail = ctx.params.uemail
      let result = await UserModel.remove(uemail)
      if (result) {
        ctx.ok({ success: true, deleted: uemail })
      } else {
        ctx.notFound({ error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  removeUser
}
