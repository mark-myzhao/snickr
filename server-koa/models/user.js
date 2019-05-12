const db = require('../db.js')

let get = async (uemail = undefined) => {
  try {
    let data = null
    if (!uemail) {
      data = await db.query(` SELECT uemail, uname, nickname FROM User`)
    } else {
      data = await db.query(` SELECT uemail, uname, nickname FROM User WHERE uemail=? `, uemail)
    }
    return data
  } catch (error) {
    throw error
  }
}

let add = async (uemail, uname, nickname, password) => {
  try {
    console.log(uemail, uname, nickname, password)
    if (uemail && uname && nickname && password) {
      await db.query(` INSERT INTO User (uemail, uname, nickname, password) VALUES (?, ?, ?, ?) `, [uemail, uname, nickname, password])
      console.log('--')
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

let update = async (uemail, arg1, arg2) => {
  try {
    let statement = null
    let feed = []
    if (!uemail) return false
    let values
    if (arg2) {
      values = { uname: arg1, nickname: arg2 }
    } else {
      values = { password: arg1 }
    }
    console.log(values)
    for (let k in values) {
      if (values[k]) {
        statement = statement ? statement + `, ${k} = ?` : `SET ${k} = ?`
        feed.push(values[k])
      }
    }
    console.log(statement)
    feed.push(uemail)
    let { affectedRows } = await db.query(` UPDATE User ${statement} WHERE uemail = ? `, feed)
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

let remove = async (uemail) => {
  try {
    let { affectedRows } = await db.query(` DELETE FROM User WHERE uemail = ? `, [uemail])
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

module.exports = {
  get,
  add,
  update,
  remove
}
