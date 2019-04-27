const passport = require('koa-passport')
const db = require('../db')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jwt-simple')
const SECRET = 'mysecret'

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
        return done(null, jwt.encode({ uemail: users[0].uemail }, SECRET))
      } else {
        return done(null, false, { message: 'Incorrect password.' })
      }
    }
  } catch (err) {
    done(err)
  }
}))

passport.use(new BearerStrategy(async (token, done) => {
  try {
    const { uemail } = jwt.decode(token, SECRET)
    const users = await db.query(` SELECT uemail FROM User WHERE uemail=? `, [uemail])
    if (users.length === 0) {
      done(null, false)
    } else {
      done(null, uemail)
    }
  } catch (error) {
    done(null, false)
  }
}))
