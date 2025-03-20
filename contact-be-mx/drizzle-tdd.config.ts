import { defineConfig } from 'drizzle-kit';
import { normalConfig } from './drizzle.config';

export default defineConfig({
  ...normalConfig,
  dbCredentials: {
    ...normalConfig.dbCredentials,
    url: 'file:db-tdd.sqlite3',
  },
});
