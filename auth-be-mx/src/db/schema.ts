import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const configTable = sqliteTable('config_table', {
  /**
   * Note: I know, this is not secure, but good enough for demonstration
   */
  secretKey: text().notNull(),
});

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().unique().notNull(),
  password: text().notNull(),
});
