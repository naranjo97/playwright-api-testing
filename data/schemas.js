const esquemaUsuario = {
  type: 'object',
  required: ['id', 'name', 'email', 'phone', 'website'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string' },
    phone: { type: 'string' },
    website: { type: 'string' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        zipcode: { type: 'string' }
      }
    },
    company: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    }
  },
  additionalProperties: true
};

const esquemaPost = {
  type: 'object',
  required: ['id', 'title', 'body', 'userId'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    body: { type: 'string', minLength: 1 },
    userId: { type: 'number' }
  },
  additionalProperties: true
};

const esquemaListaUsuarios = {
  type: 'array',
  minItems: 1,
  items: esquemaUsuario
};

const esquemaListaPosts = {
  type: 'array',
  minItems: 1,
  items: esquemaPost
};

module.exports = {
  esquemaUsuario,
  esquemaPost,
  esquemaListaUsuarios,
  esquemaListaPosts
};