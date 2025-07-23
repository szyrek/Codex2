import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [
      'node_modules/**',
      'e2e/**',
      'dist/**',
      'vite.config.js',
      'vitest.config.js'
    ],

    coverage: {
      provider: 'v8',
      thresholds: { lines: 90 },
      exclude: [
        'src/components/**',
        'src/*.tsx',
        'src/renderers/**',
        'src/simulation.ts',
        'src/sandbox.ts',
        'playwright.config.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'vite.config.js',
        'vitest.config.js',
        'dist/**'
        'performance/**',
        'vitest.performance.config.ts'
      ]
    }
  }
});
