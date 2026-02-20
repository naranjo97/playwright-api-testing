const { test } = require('../../fixtures/api.fixture');
const { expect } = require('@playwright/test');
const Ajv = require('ajv');
const { medirTiempo } = require('../../utils/helpers');

const ajv = new Ajv();

// Esquemas
const esquemaProducto = {
  type: 'object',
  required: ['id', 'title', 'body', 'userId'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    body: { type: 'string' },
    userId: { type: 'number' }
  }
};

const esquemaOrden = {
  type: 'object',
  required: ['id', 'title', 'body', 'userId'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    body: { type: 'string' },
    userId: { type: 'number' }
  }
};

// ─────────────────────────────────────────
// MÓDULO 1: Autenticación
// ─────────────────────────────────────────
test('AUTH - Login exitoso', async ({ authApi }) => {
  const res = await authApi.login('cliente@test.com', 'pass123');
  expect(res.status()).toBe(201);
  const token = authApi.getToken();
  expect(token).toBeTruthy();
  expect(token).toContain('Bearer');
  console.log(`✅ Login exitoso - Token: ${token}`);
});

test('AUTH - Obtener headers de autenticación', async ({ authApi }) => {
  await authApi.login('cliente@test.com', 'pass123');
  const headers = await authApi.getAuthHeaders();
  expect(headers).toHaveProperty('Authorization');
  expect(headers).toHaveProperty('X-API-Key');
  console.log('✅ Headers de autenticación generados correctamente');
});

// ─────────────────────────────────────────
// MÓDULO 2: CRUD de Productos
// ─────────────────────────────────────────
test('PRODUCTOS - Listar todos los productos', async ({ productApi }) => {
  const { resultado, tiempoMs } = await medirTiempo(() => productApi.getAll());
  expect(resultado.ok()).toBeTruthy();
  const productos = await resultado.json();
  expect(productos.length).toBeGreaterThan(0);
  expect(tiempoMs).toBeLessThan(5000);
  console.log(`✅ ${productos.length} productos obtenidos en ${tiempoMs}ms`);
});

test('PRODUCTOS - Obtener producto por ID', async ({ productApi }) => {
  const res = await productApi.getById(1);
  expect(res.status()).toBe(200);
  const producto = await res.json();
  const validar = ajv.compile(esquemaProducto);
  expect(validar(producto)).toBeTruthy();
  console.log(`✅ Producto obtenido: ${producto.title}`);
});

test('PRODUCTOS - Crear nuevo producto', async ({ productApi }) => {
  const res = await productApi.create({
    title: 'Producto Nuevo',
    body: 'Descripción del producto',
    userId: 1,
    precio: 99.99,
    categoria: 'electronica'
  });
  expect(res.status()).toBe(201);
  const producto = await res.json();
  expect(producto).toHaveProperty('id');
  expect(producto.title).toBe('Producto Nuevo');
  console.log(`✅ Producto creado con ID: ${producto.id}`);
});

test('PRODUCTOS - Actualizar producto completo', async ({ productApi }) => {
  const res = await productApi.update(1, {
    title: 'Producto Actualizado',
    body: 'Nueva descripción',
    userId: 1
  });
  expect(res.status()).toBe(200);
  const producto = await res.json();
  expect(producto.title).toBe('Producto Actualizado');
  console.log(`✅ Producto actualizado: ${producto.title}`);
});

test('PRODUCTOS - Actualizar producto parcial', async ({ productApi }) => {
  const res = await productApi.partialUpdate(1, {
    title: 'Solo título actualizado'
  });
  expect(res.status()).toBe(200);
  const producto = await res.json();
  expect(producto).toHaveProperty('title');
  console.log(`✅ Producto parcialmente actualizado: ${producto.title}`);
});

test('PRODUCTOS - Eliminar producto', async ({ productApi }) => {
  const res = await productApi.delete(1);
  expect(res.status()).toBe(200);
  console.log('✅ Producto eliminado correctamente');
});

test('PRODUCTOS - Filtrar por categoría', async ({ productApi }) => {
  const res = await productApi.getByCategoria(1);
  expect(res.ok()).toBeTruthy();
  const productos = await res.json();
  expect(productos.length).toBeGreaterThan(0);
  console.log(`✅ ${productos.length} productos en la categoría`);
});

// ─────────────────────────────────────────
// MÓDULO 3: Flujo de Compra Completo
// ─────────────────────────────────────────
test('FLUJO COMPRA - Proceso completo', async ({ authApi, productApi, orderApi }) => {
  // 1. LOGIN
  const loginRes = await authApi.login('cliente@test.com', 'pass123');
  expect(loginRes.status()).toBe(201);
  const token = authApi.getToken();
  expect(token).toBeTruthy();
  console.log('✅ Paso 1: Login exitoso');

  // 2. VER PRODUCTOS
  const productosRes = await productApi.getAll();
  expect(productosRes.ok()).toBeTruthy();
  const productos = await productosRes.json();
  expect(productos.length).toBeGreaterThan(0);
  const productoElegido = productos[0];
  console.log(`✅ Paso 2: Producto elegido: ${productoElegido.title}`);

  // 3. VER DETALLE PRODUCTO
  const detalleRes = await productApi.getById(productoElegido.id);
  expect(detalleRes.status()).toBe(200);
  const detalle = await detalleRes.json();
  expect(detalle).toHaveProperty('id', productoElegido.id);
  console.log(`✅ Paso 3: Detalle del producto obtenido`);

  // 4. CREAR ORDEN
  const ordenRes = await orderApi.crear({
    userId: 1,
    productoId: productoElegido.id,
    cantidad: 2,
    metodoPago: 'tarjeta',
    direccion: 'Calle 123, Ciudad'
  });
  expect(ordenRes.status()).toBe(201);
  const orden = await ordenRes.json();
  expect(orden).toHaveProperty('id');
  console.log(`✅ Paso 4: Orden creada con ID: ${orden.id}`);

  // 5. VERIFICAR ORDEN (usamos ID real de JSONPlaceholder)
    const verificarRes = await orderApi.getById(1);
    expect(verificarRes.status()).toBe(200);
    const ordenVerificada = await verificarRes.json();
    expect(ordenVerificada).toHaveProperty('id', 1);
    console.log(`✅ Paso 5: Orden verificada correctamente`);

    // 6. ACTUALIZAR ESTADO ORDEN
    const actualizarRes = await orderApi.actualizar(1, {
      status: 'procesando'
    });
    expect(actualizarRes.status()).toBe(200);
    console.log(`✅ Paso 6: Estado de orden actualizado`);
});

// ─────────────────────────────────────────
// MÓDULO 4: Manejo de Errores
// ─────────────────────────────────────────
test('ERRORES - Producto no encontrado (404)', async ({ productApi }) => {
  const res = await productApi.getById(99999);
  expect(res.status()).toBe(404);
  console.log('✅ Error 404 manejado correctamente');
});

test('ERRORES - Validar tiempo de respuesta productos', async ({ productApi }) => {
  const endpoints = [1, 2, 3, 4, 5];
  for (const id of endpoints) {
    const { tiempoMs } = await medirTiempo(() => productApi.getById(id));
    expect(tiempoMs).toBeLessThan(5000);
    console.log(`✅ Producto ${id} respondió en ${tiempoMs}ms`);
  }
});

// ─────────────────────────────────────────
// MÓDULO 5: Validación de Esquemas
// ─────────────────────────────────────────
test('ESQUEMAS - Validar esquema de producto', async ({ productApi }) => {
  const res = await productApi.getById(1);
  const body = await res.json();
  const validar = ajv.compile(esquemaProducto);
  const esValido = validar(body);
  if (!esValido) console.log(validar.errors);
  expect(esValido).toBeTruthy();
  console.log('✅ Esquema de producto válido');
});

test('ESQUEMAS - Validar esquema de orden', async ({ orderApi }) => {
  const res = await orderApi.getById(1);
  const body = await res.json();
  const validar = ajv.compile(esquemaOrden);
  const esValido = validar(body);
  if (!esValido) console.log(validar.errors);
  expect(esValido).toBeTruthy();
  console.log('✅ Esquema de orden válido');
});