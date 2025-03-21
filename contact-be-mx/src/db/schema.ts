import { int, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

export const contactsTable = sqliteTable('contact_table', {
  id: int().primaryKey({ autoIncrement: true }),
  ownerId: int().notNull(),
  mobileNumberE164: text().notNull(),
});

export const permissionsTable = sqliteTable(
  'permission_table',
  {
    id: int().primaryKey({ autoIncrement: true }),
    contactId: int()
      .references(() => contactsTable.id, { onDelete: 'cascade' })
      .notNull(),
    sharedToId: int().notNull(),
    allowUpdate: int({ mode: 'boolean' }).default(false).notNull(),
    allowDelete: int({ mode: 'boolean' }).default(false).notNull(),
  },
  (t) => [unique().on(t.contactId, t.sharedToId)]
);
