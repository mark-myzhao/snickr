module.exports = {
  getUsers: async (db, query = 'True') => {
    try {
      let data = await db.query(
        `
        SELECT uemail
        FROM User
        WHERE ${query}
        `
      )
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
