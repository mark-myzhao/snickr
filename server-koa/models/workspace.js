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

let addWithWorkspace = async (wname, wdesc, uemail) => {
  try {
    if (wname && wdesc && uemail) {
      await db.query('INSERT INTO Workspace(wname, wdesc) VALUES (?, ?)', [wname, wdesc])
      return true
    } else {
      return false
    }
  } catch (error) {
    throw (error)
  }
}

let updateWithWorkspace = async (wid, wname, wdesc) => {
  try {
    let statement = null
    let feed = []
    if (!wid) return false
    let values = { wname, wdesc }
    for (let k in values) {
      if (values[k]) {
        statement = statement ? statement + `, ${k} = ?` : `SET ${k} = ?`
        feed.push(values[k])
      }
    }
    feed.push(wid)
    let { affectedRows } = await db.query(` UPDATE Workspace ${statement} WHERE wid = ? `, feed)
    return affectedRows > 0
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
  addWithWorkspace,
  updateWithWorkspace,
  removeWithWorkspace
}
