import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['example/**', 'spacesim/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      include: ['check-docs.js'],
      thresholds: { lines: 90 }
    }
  }
});
