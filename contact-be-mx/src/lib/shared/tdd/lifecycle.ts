import { execSync } from 'node:child_process';
import { unlink } from 'node:fs/promises';
import { beforeEach, afterEach } from 'vitest';

export const setUpTestDb = () => {
  execSync('pnpm exec drizzle-kit migrate --config drizzle-tdd.config.ts');
};

export const tearDownTestDb = () => {
  unlink('db-tdd.sqlite3').catch(() => void 0);
};

export const initializeTestDbEach = () => {
  beforeEach(setUpTestDb);
  afterEach(tearDownTestDb);
};
