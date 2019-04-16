const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')

router.post('/test', async (ctx, next) => {
  ctx.ok({
    res: ctx.request.body
  })
})

router.post('/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    console.log({ user, info, status })
    if (err) {
      ctx.internalServerError(err)
    } else if (user === false) {
      ctx.unauthorized({ success: false })
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
  })(ctx)
})

module.exports = router.routes()
