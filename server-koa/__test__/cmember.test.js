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

  // get all cmembers
  it('Should be able to access now GET /v1/cmember', function (done) {
    request(server)
      .get('/v1/cmember')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // get a particular cmembers
  it('Should be able to access now GET /v1/cmember/:uemail', function (done) {
    request(server)
      .get('/v1/cmember/498973030@qq.com')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // get a cmember who does not exist
  it('Should get 404 for not exist member GET /v1/cmember/donotexist', function (done) {
    request(server)
      .get('/v1/cmember/newuser@nyu.edu')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })

  // get the member in the particular channel   SET wid = 1 for test
  it('Should be able to access now GET /v1/cmember/getchannelmember/:cname', function (done) {
    request(server)
      .get('/v1/cmember/getchannelmember/channel1')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // add a cmember
  it('Should be able to add a cmember POST /v1/cmember', function (done) {
    request(server)
      .post('/v1/cmember')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({
        'uemail': 'jiaqi@gmail.com',
        'wid': 1,
        'cname': 'channel2'
      })
      .expect(201)
      .end(done)
  })

  // add a cmember existed
  it('Should get 400 for a cmember existed POST /v1/cmember', function (done) {
    request(server)
      .post('/v1/cmember')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({
        'uemail': 'jiaqi@gmail.com',
        'wid': 1,
        'cname': 'channel2'
      })
      .expect(400)
      .end(done)
  })

  // delete the cmember
  it('Should be able to remove the wmember DELETE /v1/cmember/:uemail', function (done) {
    request(server)
      .delete('/v1/cmember/jiaqi@gmail.com')
      .send({
        cname: 'channel2',
        wid: 1
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // the cmember no longer exists, cannot delete again
  it('Should not be able to remove the wmember again DELETE /v1/cmember/:uemail', function (done) {
    request(server)
      .delete('/v1/cmember/jiaqi@gmail.com')
      .send({
        cname: 'channel2',
        wid: 1
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })
})
