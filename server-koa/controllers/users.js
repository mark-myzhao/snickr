const { getAllUsers } = require('../models/user')

async function getAllUsersInfo (ctx) {
  let result = await getAllUsers()
  ctx.ok({ users: result })
}

module.exports = {
  getAllUsersInfo
}
