const db = require('../db.js')

let getmember = async (uemail = undefined) => {
  try {
    let data = null
    if (uemail) {
      data = await db.query('SELECT uemail, wid, cname FROM cMember WHERE uemail = ?', uemail)
    } else {
      data = await db.query('SELECT uemail, wid, cname FROM cMember')
    }
    return data
  } catch (error) {
    throw error
  }
}

let getchannelmember = async (cname) => {
  try {
    let wid = 1
    let data = await db.query('SELECT uemail FROM cMember WHERE cname = ? AND wid = ?', [cname, wid])
    return data
  } catch (error) {
    throw error
  }
}

let addNewmember = async (uemail, wid, cname) => {
  try {
    if (uemail && wid && cname) {
      let data1 = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ?', [uemail, wid])
      let data2 = await db.query('SELECT uemail FROM cMember WHERE uemail = ? AND wid = ? AND cname = ?', [uemail, wid, cname])
      if (data1.length > 0) {
        if (data2.length > 0) {
          return false
        } else {
          await db.query(` INSERT INTO cMember (uemail, wid, cname) VALUES (?, ?, ?) `, [uemail, wid, cname])
          return true
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

let remove = async (uemail, wid, cname) => {
  try {
    let { affectedRows } = await db.query(` DELETE FROM cMember WHERE uemail = ? AND wid = ? AND cname = ?`, [uemail, wid, cname])
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

module.exports = {
  getmember,
  getchannelmember,
  addNewmember,
  remove
}
