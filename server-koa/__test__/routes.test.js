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

describe('should be able to get access with authenticating session', function () {
  // before login
  it('Should be restricted GET /v1/users', function (done) {
    testSession.get('/v1/users')
      .expect(401)
      .end(done)
  })

  // login for this part of session
  it('POST /v1/auth/login', function (done) {
    testSession.post('/v1/auth/login')
      .send({ uemail: 'mingyusysu@gmail.com', password: '22334455' })
      .expect(200)
      .end(done)
  })

  // get all users
  it('Should be able to access now GET /v1/users', function (done) {
    testSession.get('/v1/users')
      .expect(200)
      .end(done)
  })

  // get a user who does not exist
  it('Should get 404 for not exist user GET /v1/users/donotexist', function (done) {
    testSession.get('/v1/users/newuser@nyu.edu')
      .expect(404)
      .end(done)
  })

  // add a user
  it('Should be able to add a users POST /v1/users', function (done) {
    testSession.post('/v1/users')
      .send({
        "uemail": "newuser@nyu.edu",
        "username": "Test",
        "nickname": "TT",
        "password": "abcdefgh"
      })
      .expect(201)
      .end(done)
  })

  // get the particular users
  it('Should be able to find the added user GET /v1/users/newuser@nyu.edu', function (done) {
    testSession.get('/v1/users/newuser@nyu.edu')
      .expect(200)
      .end(done)
  })

  // update the name of this user
  it('Should be able to update the user GET /v1/users/newuser@nyu.edu', function (done) {
    testSession.put('/v1/users/newuser@nyu.edu')
      .send({ username: "UpdatedName" })
      .expect(200)
      .end(done)
  })

  // delete the user
  it('Should be able to remove the user GET /v1/users/newuser@nyu.edu', function (done) {
    testSession.delete('/v1/users/newuser@nyu.edu')
      .expect(200)
      .end(done)
  })

  // the user no longer exists, cannot delete again
  it('Should not be able to remove the user again GET /v1/users/newuser@nyu.edu', function (done) {
    testSession.delete('/v1/users/newuser@nyu.edu')
      .expect(404)
      .end(done)
  })

  // logout
  it('Should be able to logout POST /v1/auth/logout', function (done) {
    testSession.post('/v1/auth/logout')
      .expect(200)
      .end(done)
  })

  // cannot get access to the api after logout
  it('Should be restricted GET /v1/users', function (done) {
    testSession.get('/v1/users')
      .expect(401)
      .end(done)
  })
})
