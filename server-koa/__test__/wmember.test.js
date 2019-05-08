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

  // get all wmembers
  it('Should be able to access now GET /v1/wmember', function (done) {
    request(server)
      .get('/v1/wmember')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // get a wmember who does not exist
  it('Should get 404 for not exist member GET /v1/member/donotexist', function (done) {
    request(server)
      .get('/v1/member/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })

  // add a wmember
  it('Should be able to add a wmember POST /v1/wmember', function (done) {
    request(server)
      .post('/v1/wmember')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({
        'uemail': 'xz8888@nyu.edu',
        'wid': '2',
        'wmtype': 'user'
      })
      .expect(201)
      .end(done)
  })

  // add a wmember existed
  it('Should get 400 for a wmember existed POST /v1/wmember', function (done) {
    request(server)
      .post('/v1/wmember')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({
        'uemail': 'xz8888@nyu.edu',
        'wid': '2',
        'wmtype': 'user'
      })
      .expect(400)
      .end(done)
  })

  //  get the particular wmember
  it('Should be able to find the member GET /v1/users/:uemail', function (done) {
    request(server)
      .get('/v1/users/498973030@qq.com')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.users[0].uname, 'Test')
        done()
      })
  })

  // update the wmtype of this wmember
  it('Should be able to update the wmember PUT /v1/wmember/:uemail', function (done) {
    request(server)
      .put('/v1/wmember/hangbo@gmail.com')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({ wmtype: 'admin' })
      .expect(200)
      .end(done)
  })

  // update the wmtype of a member who did not exist
  it('Should be 404 PUT /v1/wmember/:uemail', function (done) {
    request(server)
      .put('/v1/wmember/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({ wmtype: 'admin' })
      .expect(404)
      .end(done)
  })

  // delete the wmember
  it('Should be able to remove the wmember DELETE /v1/wmember/newuser@nyu.edu', function (done) {
    request(server)
      .delete('/v1/wmember/xz8888@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // the wmember no longer exists, cannot delete again
  it('Should not be able to remove the wmember again DELETE /v1/wmember/newuser@nyu.edu', function (done) {
    request(server)
      .delete('/v1/wmember/xz8888@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })
})
