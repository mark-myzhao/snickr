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

  // get all message in particular channel
  it('Should be able to access now GET /v1/message/:wid/:cname', function (done) {
    request(server)
      .get('/v1/message/1/channel1')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // add a message
  it('Should be able to add a message POST /v1/message', function (done) {
    request(server)
      .post('/v1/message')
      .send({
        wid: 1,
        cname: 'channel1',
        uemail: '498973030@qq.com',
        mcontent: 'hello Colleoni!'
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(201)
      .end(done)
  })
})
