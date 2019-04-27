const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')

router.post('/token', (ctx) => {
  return passport.authenticate('local', { session: false }, (error, user, info, status) => {
    if (error) {
      ctx.internalServerError({ error })
    } else if (user === false) {
      ctx.unauthorized({
        success: false,
        error: info.message
      })
    } else {
      ctx.ok({
        token: user,
        success: true
      })
    }
  })(ctx)
})

module.exports = router.routes()
