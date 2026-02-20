const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  timeout: parseInt(process.env.TIMEOUT) || 30000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_KEY || '',
    },
  },
});