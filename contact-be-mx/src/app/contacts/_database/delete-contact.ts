import { db } from '@/db';
import { contactsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const deleteContactDatabase = async (
  contactId: number
): Promise<number> =>
  db
    .delete(contactsTable)
    .where(eq(contactsTable.id, contactId))
    .then((r) => r.rowsAffected);
