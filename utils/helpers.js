async function requestConReintento(request, method, url, opciones = {}, intentos = 3) {
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await request[method](url, opciones);
      if (res.ok()) return res;
      console.log(`⚠️ Intento ${i + 1} fallido - Status: ${res.status()}`);
    } catch (e) {
      console.log(`❌ Error en intento ${i + 1}: ${e.message}`);
      if (i === intentos - 1) throw e;
    }
    await new Promise(r => setTimeout(r, 1000 * (i + 1)));
  }
}

async function medirTiempo(fn) {
  const inicio = Date.now();
  const resultado = await fn();
  const fin = Date.now();
  return {
    resultado,
    tiempoMs: fin - inicio
  };
}

module.exports = { requestConReintento, medirTiempo };