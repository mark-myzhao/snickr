const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')

// const Util = require('../util')

router.post('/logout',
  passport.authenticate('bearer', { session: false }),
  async (ctx, next) => {
    // TODO Remove the token
    ctx.ok({
      success: true
    })
  }
)

router.get(
  '/me',
  passport.authenticate('bearer', { session: false }),
  async (ctx, next) => {
    ctx.ok({
      success: true
    })
  }
)

router.post(
  '/login',
  passport.authenticate('local', { session: false }), async (ctx) => {
    ctx.ok({
      user: ctx.req.user,
      success: true
    })
  }
)

// router.post('/login', async (ctx) => {
//   if (!ctx.isAuthenticated()) {
//     return passport.authenticate('local', (err, user, info, status) => {
//       if (err) {
//         ctx.internalServerError(err)
//       } else if (user === false) {
//         ctx.unauthorized({ success: false })
//       } else {
//         ctx.body = {
//           success: true,
//           session: ctx.session
//         }
//         return ctx.login(user)
//       }
//     })(ctx)
//   } else {
//     ctx.ok({ success: true })
//   }
// })

module.exports = router.routes()
