const db = require('../db.js')

let addNewinvitation = async (wid, semail, remail) => {
  try {
    if (wid && semail && remail) {
      let wtypeadmin = 'admin'
      let data1 = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ? AND wmtype = ?', [semail, wid, wtypeadmin])
      let data2 = await db.query('SELECT uemail FROM User WHERE uemail = ?', [remail])
      if (data1.length > 0 && data2.length > 0) {
        let time = new Date()
        let witime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.toLocaleTimeString()
        await db.query('INSERT INTO wInvitation(semail, remail, wid, witime) VALUES (?, ?, ?, ?)', [semail, remail, wid, witime])
        // let wmtype = 'user'
        // await db.query('INSERT INTO wMember(uemail, wid, wmtype) VALUES (?, ?, ?)', [remail, wid, wmtype])
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    throw (error)
  }
}

let remove = async (semail, remail, wid) => {
  try {
    let { affectedRows } = await db.query(` DELETE FROM wInvitation WHERE semail = ? AND remail = ? AND wid = ? `, [semail, remail, wid])
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

module.exports = {
  addNewinvitation,
  remove
}
