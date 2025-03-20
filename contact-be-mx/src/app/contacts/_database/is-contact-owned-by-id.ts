import { db } from '@/db/client';
import { and, eq, sql } from 'drizzle-orm';
import { contactsTable } from '@/db/schema';

export const isContactOwnedByIdDatabase = (
  contactId: number,
  ownerId: number
): Promise<boolean> =>
  db
    .select({ '': sql`1` })
    .from(contactsTable)
    .where(
      and(eq(contactsTable.id, contactId), eq(contactsTable.ownerId, ownerId))
    )
    .then((r) => r.length > 0);
