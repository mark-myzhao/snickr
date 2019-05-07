module.exports = (router) => {
  router.prefix('/v1')
  router.use('/auth', require('./auth'))
  router.use('/users', require('./users'))
  router.use('/workspace', require('./workspaces'))
}
