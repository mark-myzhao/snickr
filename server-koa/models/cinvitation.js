const db = require('../db.js')

let getinvitation = async (remail) => {
  try {
    let data = await db.query('SELECT wid, wname, citime, cname, semail, remail, uname AS sname FROM User, cInvitation NATURAL JOIN Workspace WHERE remail = ? AND User.uemail = cInvitation.semail', remail)
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

// get all invitations related to the particular channel
const getChannelInvitation = async (wid, channel) => {
  try {
    let data = await db.query(`
      SELECT semail, remail, citime
      FROM cInvitation
      WHERE wid = ? AND cname = ?
    `, [wid, channel])
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

let addNewcinvitation = async (semail, remail, wid, cname, citime) => {
  try {
    if (semail && remail && wid && cname && citime) {
      let data1 = await db.query('SELECT uemail FROM cMember WHERE uemail = ? AND wid = ? AND cname = ?', [semail, wid, cname])
      if (data1.length === 0) {
        return {
          success: false,
          error: 'Invalid sender.'
        }
      }
      let data2 = await db.query('SELECT uemail FROM wMember WHERE uemail = ? AND wid = ?', [remail, wid])
      if (data2.length === 0) {
        return {
          success: false,
          error: 'Receiver is not in workspace yet.'
        }
      }
      let data3 = await db.query('SELECT uemail FROM cMember WHERE uemail = ? AND wid = ? AND cname = ?', [remail, wid, cname])
      if (data3.length > 0) {
        return {
          success: false,
          error: 'Receiver is already in the channel.'
        }
      }
      await db.query('INSERT INTO cInvitation(semail, remail, wid, cname, citime) VALUES (?, ?, ?, ?, ?)', [semail, remail, wid, cname, citime])
      return {
        success: true
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
  getChannelInvitation,
  addNewcinvitation,
  remove
}
