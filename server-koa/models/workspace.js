const db = require('../db.js')

let getWithUemail = async (uemail) => {
  try {
    let data = await db.query(
      ` SELECT Workspace.wid, wname, wdesc
        FROM Workspace NATURAL JOIN wMember
        WHERE uemail = ? `, uemail)
    return data
  } catch (error) {
    throw error
  }
}

let add = async (wname, wdesc, uemail) => {
  try {
    if (wname && wdesc && uemail) {
      const result = await db.query('INSERT INTO Workspace(wname, wdesc) VALUES (?, ?)', [wname, wdesc])
      return result.insertId
    } else {
      return false
    }
  } catch (error) {
    throw (error)
  }
}

let updateWithWorkspace = async (wid, wname, wdesc, uemail) => {
  try {
    let data = await db.query('SELECT uemail FROM wMember NATURAL JOIN Workspace WHERE uemail = ? AND wid = ?', [uemail, wid])
    console.log(data)
    if (data.length > 0) {
      await db.query('UPDATE Workspace SET wname = ?, wdesc = ? WHERE wid = ?', [wname, wdesc, wid])
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

let removeWithWorkspace = async (wid) => {
  try {
    let { affectedRows } = await db.query(` DELETE FROM Workspace WHERE wid = ? `, wid)
    return affectedRows > 0
  } catch (error) {
    throw error
  }
}

module.exports = {
  getWithUemail,
  add,
  updateWithWorkspace,
  removeWithWorkspace
}
