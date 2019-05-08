const db = require('../db.js')

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

module.exports = {
  addNewcinvitation
}
