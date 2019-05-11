const db = require('../db.js')

let get = async (wid, cname) => {
  try {
    let data = await db.query('SELECT Message.uemail, uname, nickname, mtime, mcontent FROM User NATURAL JOIN Message WHERE wid = ? AND cname = ?', [wid, cname])
    return data
  } catch (error) {
    throw (error)
  }
}

let addNewmessage = async (wid, cname, uemail, mtime, mcontent) => {
  try {
    if (wid && cname && uemail && mtime && mcontent) {
      await db.query('INSERT INTO Message(wid, cname, uemail, mtime, mcontent) VALUES (?, ?, ?, ?, ?)', [wid, cname, uemail, mtime, mcontent])
      return true
    } else {
      return false
    }
  } catch (error) {
    throw (error)
  }
}

module.exports = {
  get,
  addNewmessage
}
