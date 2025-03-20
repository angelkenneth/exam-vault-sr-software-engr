import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  test: {
    alias: {
      '@/db/client': resolve('./src/db/tdd.ts'),
    },
  },
});
