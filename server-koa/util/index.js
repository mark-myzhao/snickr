const passport = require('koa-passport')
const ERRMSG = require('./errmsg')

module.exports = {
  withAuth: (func) => {
    return async (ctx) => {
      return passport.authenticate('bearer', async (error, user, info, status) => {
        if (error) {
          ctx.internalServerError({
            success: false,
            error
          })
        } else if (user === false) {
          ctx.unauthorized({
            success: false,
            error: ERRMSG.unauthorized
          })
        } else {
          await func(ctx)
        }
      })(ctx)
    }
  }
}
