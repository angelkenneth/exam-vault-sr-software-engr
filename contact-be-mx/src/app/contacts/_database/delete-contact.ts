import { db } from '@/db';
import { contactsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const deleteContactDatabase = async (
  contactAccessId: number
): Promise<number> =>
  db
    .delete(contactsTable)
    .where(eq(contactsTable.id, contactAccessId))
    .then((r) => r.rowsAffected);
