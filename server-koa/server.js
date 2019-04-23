const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
// const session = require('koa-session')
const passport = require('koa-passport')
require('dotenv').config()

const app = new Koa()
const router = new Router()

// sessions
// app.keys = ['super-secret-key']
// app.use(session(app))

// default safe settings
app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

// allow client to reach
app.use(Cors({
  origin: process.env.CLIENT_ADDRESS,
  credentials: true
}))
app.use(bodyParser())

// authentication
require('./auth')
app.use(passport.initialize())
// app.use(passport.session())

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
