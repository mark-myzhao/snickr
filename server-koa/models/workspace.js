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

module.exports = {
  getWithUemail
}
