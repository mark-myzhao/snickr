const db = require('../db.js')

let getChannelExclude = async (type, wid, uemail) => {
  try {
    let data = await db.query(`
      SELECT cname
      FROM Channel
      WHERE wid = ? AND ctype = ? AND cname not in (
          SELECT cname
          FROM Channel NATURAL JOIN cMember
          WHERE wid = ? AND ctype = ? AND uemail = ?
      )
    `, [wid, type, wid, type, uemail])
    return data
  } catch (error) {
    console.error(error)
  }
}

let getchannelinfo = async (wid, uemail) => {
  try {
    let data = await db.query('SELECT cname, ctype, ctime FROM cMember NATURAL JOIN Channel WHERE wid = ? AND uemail = ?', [wid, uemail])
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

let change = async (wid, cname, ctype, oname, uemail) => {
  try {
    let data = await db.query('SELECT uemail FROM Channel NATURAL JOIN cMember WHERE uemail = ? AND wid = ? AND cname = ?', [uemail, wid, oname])
    if (data.length > 0) {
      await db.query('UPDATE Channel SET cname = ?, ctype = ? WHERE wid = ? AND cname = ?', [cname, ctype, wid, oname])
      // await db.query('UPDATE cMember SET cname = ? WHERE wid = ? AND cname = ?', [cname, wid, oname])
      // await db.query('UPDATE Message SET cname = ? WHERE wid = ? AND cname = ?', [cname, wid, oname])
      // await db.query('UPDATE cInvitation SET cname = ? WHERE wid = ? AND cname = ?', [cname, wid, oname])
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
  getChannelExclude,
  getchannelinfo,
  addNewchannel,
  change,
  removechannel
}
