class AuthApi {
  constructor(request) {
    this.request = request;
    this.token = null;
  }

  async login(email, password) {
    // Simulamos login con JSONPlaceholder
    const res = await this.request.post('/users', {
      data: { email, password }
    });
    // Simulamos token generado
    this.token = `Bearer token-simulado-${Date.now()}`;
    return res;
  }

  async getAuthHeaders() {
    return {
      Authorization: this.token || 'Bearer token-simulado',
      'X-API-Key': process.env.API_KEY || 'clave-simulada'
    };
  }

  getToken() {
    return this.token;
  }
}

module.exports = { AuthApi };