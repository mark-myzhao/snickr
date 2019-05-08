const request = require('supertest')
const server = require('../index')

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

  it('Should be restricted GET /v1/users', function (done) {
    request(server)
      .get('/v1/workspace/498973030@qq.com')
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

  it('Should be able to access now: getWithWorkspace', function (done) {
    request(server)
      .get('/v1/workspace/498973030@qq.com')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  it('Should get 404 for not exist user: getWithWorkspace', function (done) {
    request(server)
      .get('/v1/workspace/whodonotexist@qq.com')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })

  // get all channel
  it('Should be able to access now GET /v1/channel/:wid', function (done) {
    request(server)
      .get('/v1/channel/1')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // get channels in wid which does not exist
  it('Should get 404 for not exist user GET /v1/channel/donotexist', function (done) {
    request(server)
      .get('/v1/channel/12')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })

  // add a channel
  it('Should be able to add a channel POST /v1/channel/:wid', function (done) {
    request(server)
      .post('/v1/channel/1')
      .send({
        cname: 'channel18',
        ctype: 'public'
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(201)
      .end(done)
  })

  // add a channel which has already existed
  it('Should be able to add a channel POST /v1/channel/:wid', function (done) {
    request(server)
      .post('/v1/channel/1')
      .send({
        cname: 'channel18',
        ctype: 'public'
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(400)
      .end(done)
  })

  // delete the channel
  it('Should be able to remove the channel DELETE /v1/channel/:cname', function (done) {
    request(server)
      .delete('/v1/channel/channel18')
      .send({
        wid: 1
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // the channel no longer exists, cannot delete again
  it('Should not be able to remove the channel again DELETE /v1/channel/:cname', function (done) {
    request(server)
      .delete('/v1/channel/channel18')
      .send({
        wid: 1
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })
})
