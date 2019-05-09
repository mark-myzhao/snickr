const db = require('../db.js')

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
  addNewmessage
}
