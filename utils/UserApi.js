class UserApi {
  constructor(request) {
    this.request = request;
  }

  async getAll(params = {}) {
    return this.request.get('/users', { params });
  }

  async getById(id) {
    return this.request.get(`/users/${id}`);
  }

  async create(data) {
    return this.request.post('/users', { data });
  }

  async update(id, data) {
    return this.request.put(`/users/${id}`, { data });
  }

  async partialUpdate(id, data) {
    return this.request.patch(`/users/${id}`, { data });
  }

  async delete(id) {
    return this.request.delete(`/users/${id}`);
  }
}

module.exports = { UserApi };