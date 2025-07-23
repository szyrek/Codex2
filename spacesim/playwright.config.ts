import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:4173'
  },
  workers: 1,
  webServer: {
    command: 'npx vite --port 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});
