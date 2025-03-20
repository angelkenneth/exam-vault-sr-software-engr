import { db } from '@/db/client';
import { contactsTable } from '@/db/schema';
import { CreateContactDatabaseInput } from '@/app/contacts/_entity/create-contact-input';
import { ContactModel } from '@/app/contacts/_entity/contact';

export const createContactDatabase = async (
  input: CreateContactDatabaseInput
): Promise<ContactModel> =>
  db
    .insert(contactsTable)
    .values(input)
    .returning()
    .then((r) => r[0]);
