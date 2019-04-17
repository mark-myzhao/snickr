const UserModel = require('../models/user')
const Util = require('../util')

module.exports = {
  getAllUsers: Util.authWarpper(
    async (ctx, next) => {
      let result = await UserModel.getUsers(ctx.db)
      ctx.ok({
        users: result
      })
    }
  ),
  getAUser: Util.authWarpper(
    async (ctx, next) => {
      const uemail = ctx.params.uemail
      let result = await UserModel.getUsers(ctx.db, [uemail])
      ctx.ok({
        users: result
      })
    }
  ),
  addUser: Util.authWarpper(
    async (ctx, next) => {
      //
    }
  )
}
