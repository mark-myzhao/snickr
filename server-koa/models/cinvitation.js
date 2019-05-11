const db = require('../db.js')

let getinvitation = async (remail) => {
  try {
    let data = await db.query('SELECT wid, wname, citime, cname, semail, remail, uname AS sname FROM User, cInvitation NATURAL JOIN Workspace WHERE remail = ? AND User.uemail = cInvitation.semail', remail)
    return data
  } catch (error) {
    throw error
  }
}

let addNewcinvitation = async (semail, remail, wid, cname, citime) => {
  try {
    if (semail && remail && wid && cname && citime) {
      let data1 = await db.query('SELECT uemail FROM cMember WHERE uemail = ? AND wid = ? AND cname = ?', [semail, wid, cname])
      let data2 = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ?', [remail, wid])
      if (data1.length > 0 && data2.length > 0) {
        await db.query('INSERT INTO cInvitation(semail, remail, wid, cname, citime) VALUES (?, ?, ?, ?, ?)', [semail, remail, wid, cname, citime])
        return true
      } else {
        return false
      }
    }
  } catch (error) {
    throw error
  }
}

let remove = async (semail, remail, wid, cname) => {
  try {
    let { affectedRows } = await db.query(` DELETE FROM cInvitation WHERE semail = ? AND remail = ? AND wid = ? AND cname = ?`, [semail, remail, wid, cname])
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

module.exports = {
  getinvitation,
  addNewcinvitation,
  remove
}
