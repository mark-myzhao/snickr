const db = require('../db.js')

let getchannelinfo = async (wid, uemail) => {
  try {
    let data = await db.query('SELECT cname, ctype, ctime FROM cMember NATURAL JOIN Channel WHERE wid = ? AND uemail = ?', wid, uemail)
    return data
  } catch (error) {
    throw error
  }
}

let addNewchannel = async (wid, cname, ctype, ctime) => {
  try {
    if (wid && cname && ctype && ctime) {
      await db.query('INSERT INTO Channel(wid, cname, ctype, ctime) VALUES (?, ?, ?, ?)', [wid, cname, ctype, ctime])
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

let removechannel = async (wid, cname) => {
  try {
    if (wid && cname) {
      let data = await db.query('SELECT cname FROM Channel WHERE wid = ? AND cname = ?', [wid, cname])
      if (data.length > 0) {
        await db.query('DELETE FROM Channel WHERE wid = ? AND cname = ?', [wid, cname])
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
  getchannelinfo,
  addNewchannel,
  removechannel
}
