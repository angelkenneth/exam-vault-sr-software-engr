import { defineConfig } from 'drizzle-kit';

export const normalConfig = {
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite' as const,
  dbCredentials: {
    url: 'file:db.sqlite3',
  },
};

export default defineConfig(normalConfig);
