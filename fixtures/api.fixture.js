const { test: base } = require('@playwright/test');
const { UserApi } = require('../utils/UserApi');
const { PostApi } = require('../utils/PostApi');
const { AuthApi } = require('../utils/AuthApi');
const { ProductApi } = require('../utils/ProductApi');
const { OrderApi } = require('../utils/OrderApi');

const test = base.extend({
  userApi: async ({ request }, use) => {
    await use(new UserApi(request));
  },

  postApi: async ({ request }, use) => {
    await use(new PostApi(request));
  },

  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  productApi: async ({ request }, use) => {
    await use(new ProductApi(request));
  },

  orderApi: async ({ request }, use) => {
    await use(new OrderApi(request));
  },
});

module.exports = { test };