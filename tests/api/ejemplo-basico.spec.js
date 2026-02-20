const { test, expect } = require('@playwright/test');

test('GET - Obtener usuarios', async ({ request }) => {
  const response = await request.get('/users');
  expect(response.status()).toBe(200);
  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('id');
});

test('POST - Crear usuario', async ({ request }) => {
  const response = await request.post('/users', {
    data: {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com'
    }
  });
  expect(response.status()).toBe(201);
  const user = await response.json();
  expect(user).toHaveProperty('id');
});