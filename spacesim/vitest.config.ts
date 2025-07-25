import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: ['node_modules/**', 'e2e/**', 'performance/**'],

    coverage: {
      provider: 'v8',
      thresholds: { lines: 60 },
      exclude: [
        'src/components/**',
        'src/*.tsx',
        'src/renderers/**',
        'src/simulation.ts',
        'src/sandbox.ts',
        'playwright.config.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'performance/**',
        'vitest.performance.config.ts'
      ]
    }
  }
});
