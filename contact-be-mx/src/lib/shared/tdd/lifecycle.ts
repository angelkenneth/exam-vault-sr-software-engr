import { execSync } from 'node:child_process';
import { beforeEach, afterEach, vi } from 'vitest';
import * as clientExports from '@/db/client';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { nanoid } from 'nanoid';
import { unlink } from 'node:fs/promises';

export const initializeTestDbEach = () => {
  let testId: string;
  beforeEach(() => {
    testId = nanoid();
    const client = createClient({ url: `file:db-${testId}.sqlite3` });
    const db = drizzle(client);
    vi.spyOn(clientExports, 'db', 'get').mockReturnValue(db);
    execSync('pnpm exec drizzle-kit migrate --config drizzle-tdd.config.ts', {
      env: {
        ...process.env,
        DB_URL: `file:db-${testId}.sqlite3`,
      },
    });
  });
  afterEach(() => {
    unlink(`db-${testId}.sqlite3`).catch(() => void 0);
  });
};
