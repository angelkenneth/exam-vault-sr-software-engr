import { defineConfig } from 'drizzle-kit';
import { normalConfig } from './drizzle.config';

if (!process.env.DB_URL) {
  throw new Error('DB_URL is required');
}

export default defineConfig({
  ...normalConfig,
  dbCredentials: {
    ...normalConfig.dbCredentials,
    url: process.env.DB_URL,
  },
});
