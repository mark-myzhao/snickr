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

describe('dog tests', () => {
  test('get all Users GET /v1/users', async () => {
    const response = await request(server).get('/v1/users')
    expect(response.status).toEqual(200)
  })
})
