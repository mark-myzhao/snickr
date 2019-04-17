module.exports = {
  getUsers: async (db, uemail = undefined) => {
    try {
      let data = null
      if (!uemail) {
        data = await db.query(` SELECT uemail, uname, nickname FROM User`)
      } else {
        data = await db.query(` SELECT uemail, uname, nickname FROM User WHERE uemail=? `, uemail)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
