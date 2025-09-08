const request = require('supertest');
const app = require('../src/app');
const { sequelize, User } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Register, login flow', async () => {
  const email = 't@test.com';
  const password = 'secret123';

  let res = await request(app).post('/api/auth/register').send({ email, password, fullName: 'T' });
  expect(res.statusCode).toBe(200);
  expect(res.body.email).toBe(email);

  res = await request(app).post('/api/auth/login').send({ email, password });
  expect(res.statusCode).toBe(200);
  expect(res.body.accessToken).toBeDefined();
});
