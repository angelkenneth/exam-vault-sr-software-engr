import { db } from '@/db/client';
import { contactsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ContactModel } from '@/app/contacts/_entity/contact';

export const listContactsByOwnerIdDatabase = async (
  ownerId: number
): Promise<ContactModel[]> =>
  db.select().from(contactsTable).where(eq(contactsTable.ownerId, ownerId));
