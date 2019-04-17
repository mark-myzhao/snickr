const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')

router.post('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout()
    ctx.ok({ success: true })
  } else {
    ctx.unauthorized({ success: false, info: 'need login first' })
  }
})

router.post('/test', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.ok({
      res: 'result'
    })
  } else {
    ctx.ok({
      res: 'need login'
    })
  }
})

router.post('/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    return passport.authenticate('local', (err, user, info, status) => {
      if (err) {
        ctx.internalServerError(err)
      } else if (user === false) {
        ctx.unauthorized({ success: false })
      } else {
        ctx.body = { success: true }
        return ctx.login(user)
      }
    })(ctx)
  } else {
    ctx.ok({ success: true })
  }
})

module.exports = router.routes()
