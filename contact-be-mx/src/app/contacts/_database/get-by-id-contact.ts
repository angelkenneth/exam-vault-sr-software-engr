import { db } from '@/db';
import { contactsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ContactModel } from '@/app/contacts/_entity/contact';

export const getContactByIdDatabase = async (
  contactId: number
): Promise<ContactModel | null> =>
  db
    .select()
    .from(contactsTable)
    .where(eq(contactsTable.id, contactId))
    .then((r) => r[0]);
