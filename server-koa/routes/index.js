module.exports = (router) => {
  router.prefix('/v1')
  router.use('/auth', require('./auth'))
  router.use('/users', require('./users'))
  router.use('/workspace', require('./workspaces'))
  router.use('/winvitation', require('./winvitations'))
  router.use('/channel', require('./channels'))
  router.use('/cinvitation', require('./cinvitations'))
  router.use('/message', require('./messages'))
  router.use('/wmember', require('./wmembers'))
}
