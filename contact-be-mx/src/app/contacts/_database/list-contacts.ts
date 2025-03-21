import { db } from '@/db/client';
import { contactsTable, permissionsTable } from '@/db/schema';
import { eq, or, getTableColumns, and } from 'drizzle-orm';
import { ContactModel } from '@/app/contacts/_entity/contact';

export const listContactsOwnedByIdDatabase = async (
  ownerId: number
): Promise<ContactModel[]> =>
  db.select().from(contactsTable).where(eq(contactsTable.ownerId, ownerId));

export const listContactsPermittedToUserIdDatabase = (
  userId: number
): Promise<ContactModel[]> =>
  db
    .select(getTableColumns(contactsTable))
    .from(contactsTable)
    .where(
      or(
        eq(contactsTable.ownerId, userId),
        eq(permissionsTable.sharedToId, userId)
      )
    )
    .leftJoin(
      permissionsTable,
      eq(contactsTable.id, permissionsTable.contactId)
    );
