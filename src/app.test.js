const supertest = require('supertest');

const { app } = require('./app');
const request = supertest(app);

describe('#app', () => {
  test('it should startup and return health check status ok', async (done) => {
    const response = await request.get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: 'ok' });
    done();
  });
});
