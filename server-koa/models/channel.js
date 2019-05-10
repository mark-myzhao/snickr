const db = require('../db.js')

let getchannelinfo = async (wid) => {
  try {
    let data = await db.query('SELECT Channel.cname, ctype, cMember.uemail AS oemail, uname As oname, ctime FROM Channel NATURAL JOIN cMember NATURAL JOIN User WHERE wid = ?', wid)
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
