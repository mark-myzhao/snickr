module.exports = {
  // a self-defined simple decorator
  authWarpper: (func) => {
    return async (ctx, next) => {
      if (ctx.isAuthenticated()) {
        await func(ctx, next)
      } else {
        ctx.unauthorized({ success: false, info: 'need login first' })
      }
    }
  }
}
