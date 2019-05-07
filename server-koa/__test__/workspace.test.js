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

  // add a workspace
  it('Should be able to add a workspace POST /v1/workspace', function (done) {
    request(server)
      .post('/v1/workspace')
      .send({
        wid: '12',
        wname: 'new workspace',
        wdesc: 'new desc',
        uemail: 'hangbo@gmail.com'
      })
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(201)
      .end(done)
  })

  // update the name of this user
  it('Should be able to update the workspace GET /v1/workspace/:wid', function (done) {
    request(server)
      .put('/v1/workspace/1')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({
        wname: 'UpdatedWorkspaceName',
        wdesc: 'UpdatedWorkspaceDescription'
      })
      .expect(200)
      .end(done)
  })

  // delete the workspace
  it('Should be able to remove the workspace GET /v1/workspace/:wid', function (done) {
    request(server)
      .delete('/v1/workspace/12')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(200)
      .end(done)
  })

  // the workspace no longer exists, cannot delete again
  it('Should not be able to remove the workspace again GET /v1/workspace/:wid', function (done) {
    request(server)
      .delete('/v1/workspace/12')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .expect(404)
      .end(done)
  })
})
