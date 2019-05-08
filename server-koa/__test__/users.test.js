const request = require('supertest')
const server = require('../index')
const assert = require('assert')

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!')
})

// close the server after each test
afterAll(() => {
  server.close()
  console.log('server closed!')
})

describe('should be able to get access with authenticating session', function () {
  let TEST_TOKEN = ''

  // before login
  it('Should be restricted GET /v1/users', function (done) {
    request(server)
      .get('/v1/users')
      .expect(401)
      .end(done)
  })

  it('POST /v1/auth/token', function (done) {
    request(server)
      .post('/v1/auth/token')
      .send({ uemail: '2333@gmail.com', password: '12345678' })
      .expect(401)
      .end(done)
  })

  // get token
  it('POST /v1/auth/token', function (done) {
    request(server)
      .post('/v1/auth/token')
      .send({ uemail: 'mingyusysu@gmail.com', password: '12345678' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        TEST_TOKEN = res.body.token
        done()
      })
  })

  // get all users
  it('Should be able to access now GET /v1/users', function (done) {
    request(server)
      .get('/v1/users')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // get a user who does not exist
  it('Should get 404 for not exist user GET /v1/users/donotexist', function (done) {
    request(server)
      .get('/v1/users/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })

  // add a user
  it('Should be able to add a users POST /v1/users', function (done) {
    request(server)
      .post('/v1/users')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({
        'uemail': 'newuser@nyu.edu',
        'username': 'Test',
        'nickname': 'TT',
        'password': 'abcdefgh'
      })
      .expect(201)
      .end(done)
  })

  //  get the particular users
  it('Should be able to find the added user GET /v1/users/newuser@nyu.edu', function (done) {
    request(server)
      .get('/v1/users/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.users[0].uname, 'Test')
        done()
      })
  })

  // update the name of this user
  it('Should be able to update the user GET /v1/users/newuser@nyu.edu', function (done) {
    request(server)
      .put('/v1/users/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({ username: 'UpdatedName' })
      .expect(200)
      .end(done)
  })

  // delete the user
  it('Should be able to remove the user GET /v1/users/newuser@nyu.edu', function (done) {
    request(server)
      .delete('/v1/users/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // the user no longer exists, cannot delete again
  it('Should not be able to remove the user again GET /v1/users/newuser@nyu.edu', function (done) {
    request(server)
      .delete('/v1/users/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })
})
