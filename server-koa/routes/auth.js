const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')

const Util = require('../util')

router.post('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout()
    ctx.ok({ success: true })
  } else {
    ctx.unauthorized({ success: false, info: 'need login first' })
  }
})

router.get('/me', Util.authWarpper(
  async (ctx, next) => {
    let { user } = ctx.session.passport
    ctx.ok({
      success: true,
      user
    })
  }
))

router.post('/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    return passport.authenticate('local', (err, user, info, status) => {
      if (err) {
        ctx.internalServerError(err)
      } else if (user === false) {
        ctx.unauthorized({ success: false })
      } else {
        ctx.body = {
          success: true,
          session: ctx.session
        }
        return ctx.login(user)
      }
    })(ctx)
  } else {
    ctx.ok({ success: true })
  }
})

module.exports = router.routes()
