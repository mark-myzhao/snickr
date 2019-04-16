const UserModel = require('../models/user')

module.exports = {
  getAllUsers: async (ctx, next) => {
    let result = await UserModel.getUsers(ctx.db)
    ctx.ok({
      users: result
    })
  }
}
