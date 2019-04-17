const request = require('supertest')
const session = require('supertest-session')
const server = require('../index')

let testSession = null

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!')
  testSession = session(server)
})

// close the server after each test
afterAll(() => {
  server.close()
  console.log('server closed!')
})

describe('should be restructed before authenticating', function () {
  it('Should be restricted GET /v1/users', function (done) {
    testSession.get('/v1/users')
      .expect(401)
      .end(done)
  })
})

describe('should be able to login', function () {
  it('POST /v1/auth/login', function (done) {
    testSession.post('/v1/auth/login')
      .send({ uemail: 'mingyusysu@gmail.com', password: '12345678' })
      .expect(200)
      .end(done)
  })
})

describe('should be able to get access with authenticating session', function () {
  var authenticatedSession

  // login for this part of session
  beforeEach(function (done) {
    testSession.post('/v1/auth/login')
      .send({ uemail: 'mingyusysu@gmail.com', password: '12345678' })
      .expect(200)
      .end(function (err) {
        if (err) return done(err)
        authenticatedSession = testSession
        return done()
      })
  })

  it('Should be able to access now GET /v1/users', function (done) {
    testSession.get('/v1/users')
      .expect(200)
      .end(done)
    })

  it('Should not login twice POST /v1/auth/login', function (done) {
    testSession.post('/v1/auth/login')
      .expect(200)
      .end(done)
    })

  it('Should be able to access now GET /v1/users/498973030@qq.com', function (done) {
    testSession.get('/v1/users/498973030@qq.com')
      .expect(200)
      .end(done)
    })

  it('Should be able to logout POST /v1/auth/logout', function (done) {
    testSession.post('/v1/auth/logout')
      .expect(200)
      .end(done)
  })
})
