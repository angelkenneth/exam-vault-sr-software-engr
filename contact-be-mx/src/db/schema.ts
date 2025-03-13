import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contactsTable = sqliteTable('contact_table', {
  id: int().primaryKey({ autoIncrement: true }),
  mobileNumberE123: text().notNull(),
});
