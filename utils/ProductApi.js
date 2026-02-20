class ProductApi {
  constructor(request) {
    this.request = request;
  }

  async getAll(params = {}) {
    // Usamos /posts como simulación de productos
    return this.request.get('/posts', { params });
  }

  async getById(id) {
    return this.request.get(`/posts/${id}`);
  }

  async create(data) {
    return this.request.post('/posts', { data });
  }

  async update(id, data) {
    return this.request.put(`/posts/${id}`, { data });
  }

  async partialUpdate(id, data) {
    return this.request.patch(`/posts/${id}`, { data });
  }

  async delete(id) {
    return this.request.delete(`/posts/${id}`);
  }

  async getByCategoria(userId) {
    // Simulamos filtro por categoría con userId
    return this.request.get('/posts', { params: { userId } });
  }
}

module.exports = { ProductApi };