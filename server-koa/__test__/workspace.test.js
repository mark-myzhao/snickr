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
      .send({ uemail: 'mingyusysu@gmail.com', password: '22334455' })
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
})
