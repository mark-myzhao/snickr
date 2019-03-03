const pool = require('../db.js')

async function getAllUsers () {
  try {
    let data = await pool.query(
      `
      SELECT uid, uname
      FROM user
      `
    )
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllUsers
}
