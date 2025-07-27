import { defineConfig } from 'vitest/config';

export default defineConfig({
  benchmark: {
    include: ['performance/**/*.bench.ts']
  },
  test: { include: [] }
});
