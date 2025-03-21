import { db } from '@/db/client';
import { contactsTable, permissionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createContactPermissionOnlyQuery } from '@/app/contacts/_database/get-contact-by-id';

// TODO integration test this and assure that 'cascade' works
export const deleteContactDatabase = async (
  contactId: number
): Promise<number> =>
  db
    .delete(contactsTable)
    .where(eq(contactsTable.id, contactId))
    .then((r) => r.rowsAffected);

export const canOwnerByIdDeleteContact = createContactPermissionOnlyQuery(() =>
  eq(permissionsTable.allowDelete, true)
);
