class OrderApi {
  constructor(request) {
    this.request = request;
  }

  async crear(data) {
    // Simulamos creación de orden con /posts
    return this.request.post('/posts', {
      data: {
        title: `Orden-${Date.now()}`,
        body: JSON.stringify(data),
        userId: data.userId || 1
      }
    });
  }

  async getById(id) {
    return this.request.get(`/posts/${id}`);
  }

  async getByUsuario(userId) {
    return this.request.get('/posts', { params: { userId } });
  }

  async actualizar(id, data) {
    return this.request.patch(`/posts/${id}`, { data });
  }

  async cancelar(id) {
    return this.request.delete(`/posts/${id}`);
  }
}

module.exports = { OrderApi };