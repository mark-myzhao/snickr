const UserModel = require('../models/user')

async function getAllUsers (ctx) {
  let result = await UserModel.getAllUsers()
  ctx.ok({ users: result })
}

module.exports = {
  getAllUsers
}
