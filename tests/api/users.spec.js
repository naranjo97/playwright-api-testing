const { test } = require('../../fixtures/api.fixture');
const { expect } = require('@playwright/test');

// Prueba básica con fixture
test('GET - Obtener todos los usuarios', async ({ userApi }) => {
  const res = await userApi.getAll();
  expect(res.ok()).toBeTruthy();
  const users = await res.json();
  expect(users.length).toBeGreaterThan(0);
});

test('GET - Obtener usuario por ID', async ({ userApi }) => {
  const res = await userApi.getById(1);
  expect(res.status()).toBe(200);
  const user = await res.json();
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
});

test('POST - Crear usuario', async ({ userApi }) => {
  const res = await userApi.create({
    name: 'Carlos García',
    email: 'carlos@ejemplo.com'
  });
  expect(res.status()).toBe(201);
  const user = await res.json();
  expect(user).toHaveProperty('id');
  expect(user.name).toBe('Carlos García');
});

test('PUT - Actualizar usuario completo', async ({ userApi }) => {
  const res = await userApi.update(1, {
    name: 'Carlos Actualizado',
    email: 'carlos.nuevo@ejemplo.com'
  });
  expect(res.status()).toBe(200);
  const user = await res.json();
  expect(user.name).toBe('Carlos Actualizado');
});

test('PATCH - Actualizar usuario parcial', async ({ userApi }) => {
  const res = await userApi.partialUpdate(1, {
    email: 'parcial@ejemplo.com'
  });
  expect(res.status()).toBe(200);
  const user = await res.json();
  expect(user).toHaveProperty('email');
});

test('DELETE - Eliminar usuario', async ({ userApi }) => {
  const res = await userApi.delete(1);
  expect(res.status()).toBe(200);
});

// Pruebas parametrizadas
const casos = [
  { id: 1, nombre: 'Leanne Graham' },
  { id: 2, nombre: 'Ervin Howell' },
  { id: 3, nombre: 'Clementine Bauch' },
];

for (const caso of casos) {
  test(`GET - Verificar usuario ${caso.id}: ${caso.nombre}`, async ({ userApi }) => {
    const res = await userApi.getById(caso.id);
    expect(res.status()).toBe(200);
    const user = await res.json();
    expect(user.id).toBe(caso.id);
    expect(user.name).toBe(caso.nombre);
  });
}