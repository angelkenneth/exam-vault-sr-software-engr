import { ContactModel } from '@/app/contacts/_entity/contact';
import { UpdateContactInput } from '@/app/contacts/_entity/update-contact-input';
import { db } from '@/db';
import { contactsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updateContactDatabase = async (
  contactId: number,
  input: UpdateContactInput
): Promise<ContactModel> =>
  db
    .update(contactsTable)
    .set(input)
    .where(eq(contactsTable.id, contactId))
    .returning()
    .then((r) => r[0]);
