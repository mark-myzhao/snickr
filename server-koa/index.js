const server = require('./server')

const port = process.env.PORT || 3000
const app = server.listen(port, () => console.log(`API server started on ${port}`))

module.exports = app
