const { test } = require('../../fixtures/api.fixture');
const { expect } = require('@playwright/test');
const Ajv = require('ajv');
const {
  esquemaUsuario,
  esquemaPost,
  esquemaListaUsuarios,
  esquemaListaPosts
} = require('../../data/schemas');

const ajv = new Ajv();

test('Validar esquema de un usuario', async ({ userApi }) => {
  const res = await userApi.getById(1);
  expect(res.status()).toBe(200);
  const body = await res.json();

  const validar = ajv.compile(esquemaUsuario);
  const esValido = validar(body);

  if (!esValido) {
    console.log('Errores de esquema:', validar.errors);
  }

  expect(esValido).toBeTruthy();
  console.log('✅ Esquema de usuario válido');
});

test('Validar esquema de lista de usuarios', async ({ userApi }) => {
  const res = await userApi.getAll();
  expect(res.ok()).toBeTruthy();
  const body = await res.json();

  const validar = ajv.compile(esquemaListaUsuarios);
  const esValido = validar(body);

  if (!esValido) {
    console.log('Errores de esquema:', validar.errors);
  }

  expect(esValido).toBeTruthy();
  console.log(`✅ Lista de ${body.length} usuarios válida`);
});

test('Validar esquema de un post', async ({ postApi }) => {
  const res = await postApi.getById(1);
  expect(res.status()).toBe(200);
  const body = await res.json();

  const validar = ajv.compile(esquemaPost);
  const esValido = validar(body);

  if (!esValido) {
    console.log('Errores de esquema:', validar.errors);
  }

  expect(esValido).toBeTruthy();
  console.log('✅ Esquema de post válido');
});

test('Validar esquema de lista de posts', async ({ postApi }) => {
  const res = await postApi.getAll();
  expect(res.ok()).toBeTruthy();
  const body = await res.json();

  const validar = ajv.compile(esquemaListaPosts);
  const esValido = validar(body);

  if (!esValido) {
    console.log('Errores de esquema:', validar.errors);
  }

  expect(esValido).toBeTruthy();
  console.log(`✅ Lista de ${body.length} posts válida`);
});