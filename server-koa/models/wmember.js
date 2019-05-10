const db = require('../db.js')

let getmember = async (wid = undefined) => {
  try {
    let data = null
    if (wid) {
      data = await db.query('SELECT wMember.uemail, uname, nickname, wmtype FROM wMember NATURAL JOIN User WHERE wid = ?', wid)
    } else {
      data = await db.query('SELECT wMember.uemail, uname, nickname, wmtype FROM wMember NATURAL JOIN User')
    }
    return data
  } catch (error) {
    throw error
  }
}

let getwid = async (uemail) => {
  try {
    let data = await db.query('SELECT wid, wmtype FROM wMember WHERE uemail = ?', uemail)
    return data
  } catch (error) {
    throw error
  }
}

let addNewmember = async (uemail, wid, wmtype) => {
  try {
    if (uemail && wid && wmtype) {
      let data1 = await db.query('SELECT uemail FROM User WHERE uemail = ?', uemail)
      let data2 = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ?', [uemail, wid])
      if (data1.length > 0) {
        if (data2.length > 0) {
          return false
        } else {
          await db.query(` INSERT INTO wMember (uemail, wid, wmtype) VALUES (?, ?, ?) `, [uemail, wid, wmtype])
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

let update = async (uemail, wid, wmtype) => {
  try {
    if (uemail && wmtype) {
      let data = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ?', [uemail, wid])
      if (data.length > 0) {
        await db.query('UPDATE wMember SET wmtype = ? WHERE uemail = ? AND wid = ?', [wmtype, uemail, wid])
        return true
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

let remove = async (uemail, wid) => {
  try {
    let { affectedRows } = await db.query(` DELETE FROM wMember WHERE uemail = ? AND wid = ?`, [uemail, wid])
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

module.exports = {
  getmember,
  addNewmember,
  getwid,
  update,
  remove
}
