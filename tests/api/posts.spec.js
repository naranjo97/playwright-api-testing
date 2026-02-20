const { test } = require('../../fixtures/api.fixture');
const { expect } = require('@playwright/test');

test('GET - Obtener todos los posts', async ({ postApi }) => {
  const res = await postApi.getAll();
  expect(res.ok()).toBeTruthy();
  const posts = await res.json();
  expect(posts.length).toBeGreaterThan(0);
  expect(posts[0]).toHaveProperty('id');
  expect(posts[0]).toHaveProperty('title');
  expect(posts[0]).toHaveProperty('body');
  expect(posts[0]).toHaveProperty('userId');
});

test('GET - Obtener post por ID', async ({ postApi }) => {
  const res = await postApi.getById(1);
  expect(res.status()).toBe(200);
  const post = await res.json();
  expect(post).toHaveProperty('id', 1);
  expect(post).toHaveProperty('title');
  expect(post).toHaveProperty('body');
});

test('GET - Obtener posts por usuario', async ({ postApi }) => {
  const res = await postApi.getByUser(1);
  expect(res.ok()).toBeTruthy();
  const posts = await res.json();
  expect(posts.length).toBeGreaterThan(0);
  posts.forEach(post => {
    expect(post.userId).toBe(1);
  });
});

test('Flujo CRUD completo de posts', async ({ postApi }) => {
  // 1. CREAR
  const crear = await postApi.create({
    title: 'Mi primer post',
    body: 'Contenido del post',
    userId: 1
  });
  expect(crear.status()).toBe(201);
  const postCreado = await crear.json();
  expect(postCreado).toHaveProperty('id');
  expect(postCreado.title).toBe('Mi primer post');
  console.log(`✅ Post creado con ID: ${postCreado.id}`);

  // 2. LEER
  const leer = await postApi.getById(1);
  expect(leer.status()).toBe(200);
  const postLeido = await leer.json();
  expect(postLeido).toHaveProperty('id', 1);
  console.log(`✅ Post leído: ${postLeido.title}`);

  // 3. ACTUALIZAR COMPLETO
  const actualizar = await postApi.update(1, {
    title: 'Título actualizado',
    body: 'Contenido actualizado',
    userId: 1
  });
  expect(actualizar.status()).toBe(200);
  const postActualizado = await actualizar.json();
  expect(postActualizado.title).toBe('Título actualizado');
  console.log(`✅ Post actualizado: ${postActualizado.title}`);

  // 4. ACTUALIZAR PARCIAL
  const parcial = await postApi.partialUpdate(1, {
    title: 'Solo el título cambia'
  });
  expect(parcial.status()).toBe(200);
  const postParcial = await parcial.json();
  expect(postParcial).toHaveProperty('title');
  console.log(`✅ Post parcialmente actualizado: ${postParcial.title}`);

  // 5. ELIMINAR
  const eliminar = await postApi.delete(1);
  expect(eliminar.status()).toBe(200);
  console.log(`✅ Post eliminado correctamente`);
});