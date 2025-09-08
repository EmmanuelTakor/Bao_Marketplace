const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

let token;
let productId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await request(app).post('/api/auth/register').send({ email: 'a@x.com', password: 'pass123', fullName: 'A' });
  const res = await request(app).post('/api/auth/login').send({ email: 'a@x.com', password: 'pass123' });
  token = res.body.accessToken;
});

afterAll(async () => {
  await sequelize.close();
});

test('Create product and public listing', async () => {
  const prod = { title: 'P1', description: 'd', price: 10.5, images: ['http://x/1.jpg'] };
  let res = await request(app).post('/api/products').set('Authorization', `Bearer ${token}`).send(prod);
  expect(res.statusCode).toBe(201);
  productId = res.body.id;

  res = await request(app).get('/api/products/public');
  expect(res.statusCode).toBe(200);
  expect(res.body.total).toBeGreaterThanOrEqual(1);
});
