const { test } = require('../../fixtures/api.fixture');
const { expect } = require('@playwright/test');
const { requestConReintento, medirTiempo } = require('../../utils/helpers');

test('GET - Recurso no encontrado (404)', async ({ request }) => {
  const res = await request.get('/users/99999');
  expect(res.status()).toBe(404);
  console.log('✅ Error 404 manejado correctamente');
});

test('GET - Ruta inexistente (404)', async ({ request }) => {
  const res = await request.get('/ruta-que-no-existe');
  expect(res.status()).toBe(404);
  console.log('✅ Ruta inexistente manejada correctamente');
});

test('GET - Validar headers de respuesta', async ({ userApi }) => {
  const res = await userApi.getById(1);
  expect(res.status()).toBe(200);
  const headers = res.headers();
  expect(headers['content-type']).toContain('application/json');
  console.log('✅ Headers validados correctamente');
  console.log(`   Content-Type: ${headers['content-type']}`);
});

test('GET - Medir tiempo de respuesta', async ({ userApi }) => {
  const { resultado, tiempoMs } = await medirTiempo(() => userApi.getAll());
  expect(resultado.ok()).toBeTruthy();
  expect(tiempoMs).toBeLessThan(5000);
  console.log(`✅ Tiempo de respuesta: ${tiempoMs}ms`);
});

test('GET - Con reintento automático', async ({ request }) => {
  const res = await requestConReintento(request, 'get', '/users');
  expect(res.ok()).toBeTruthy();
  const users = await res.json();
  expect(users.length).toBeGreaterThan(0);
  console.log('✅ Request con reintento exitoso');
});

test('POST - Crear con datos vacíos', async ({ request }) => {
  const res = await request.post('/users', {
    data: {}
  });
  // JSONPlaceholder acepta datos vacíos pero igual retorna 201
  // En una API real esperaríamos un 400
  expect([201, 400]).toContain(res.status());
  console.log(`✅ Status recibido con datos vacíos: ${res.status()}`);
});

test('GET - Validar tiempo de respuesta de múltiples endpoints', async ({ request }) => {
  const endpoints = ['/users', '/posts', '/users/1', '/posts/1'];

  for (const endpoint of endpoints) {
    const { tiempoMs } = await medirTiempo(() => request.get(endpoint));
    expect(tiempoMs).toBeLessThan(5000);
    console.log(`✅ ${endpoint} respondió en ${tiempoMs}ms`);
  }
});