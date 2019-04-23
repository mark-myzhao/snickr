const passport = require('koa-passport')
const db = require('./db')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

passport.serializeUser((user, done) => {
  done(null, user.uemail)
})

passport.deserializeUser(async (uemail, done) => {
  try {
    const users = await db.query(` SELECT uemail, password FROM User WHERE uemail=? `, [uemail])
    done(null, users[0])
  } catch (err) {
    done(err, null)
  }
})

passport.use(new LocalStrategy({
  usernameField: 'uemail',
  passwordField: 'password'
}, async (uemail, password, done) => {
  try {
    const users = await db.query(` SELECT uemail, password FROM User WHERE uemail=? `, [uemail])
    if (users.length === 0) {
      done(null, false, { message: 'Email not exists.' })
    } else {
      if (password === users[0].password) {
        return done(null, users[0])
      } else {
        return done(null, false, { message: 'Incorrect password.' })
      }
    }
  } catch (err) {
    done(err)
  }
}))

// passport.use(new BearerStrategy(
//   function (token, done) {
//     User.findOne({ token: token }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       return done(null, user, { scope: 'read' });
//     });
//   }
// ));
