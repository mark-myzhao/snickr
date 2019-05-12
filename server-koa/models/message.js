const db = require('../db.js')

let get = async (wid, cname) => {
  try {
    let data = await db.query('SELECT Message.uemail, uname, nickname, mtime, mcontent FROM User NATURAL JOIN Message WHERE wid = ? AND cname = ?', [wid, cname])
    return data
  } catch (error) {
    throw (error)
  }
}

let search = async (uemail, query) => {
  try {
    let data = await db.query(`
    SELECT Workspace.wname, Message.wid, Message.cname, Message.uemail, mtime, mcontent, uname, nickname
    FROM cMember, Message, User, Workspace
    WHERE cMember.wid = Message.wid AND cMember.cname = Message.cname AND cMember.uemail = ? AND mcontent LIKE concat('%',?,'%') AND User.uemail = Message.uemail AND Workspace.wid = Message.wid;`, [uemail, query])
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
  search,
  addNewmessage
}
