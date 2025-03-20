import { describe, it, expect } from 'vitest';
import { getContactByIdDatabase } from '@/app/contacts/_database/get-contact-by-id';
import { createContactDatabase } from '@/app/contacts/_database/create-contact';
import { initializeTestDbEach } from '@/lib/shared/tdd/lifecycle';
import { db } from '@/db/client';
import { contactsTable } from '@/db/schema';

describe('getContactByIdDatabase', () => {
  initializeTestDbEach();

  describe('given contact already exist', () => {
    it('should return it', async () => {
      const expectedContact = await createContactDatabase({
        ownerId: 1,
        mobileNumberE164: '+1234567890',
      });
      const readContact = await getContactByIdDatabase(expectedContact.id);
      expect(readContact?.mobileNumberE164).toBe(
        expectedContact.mobileNumberE164
      );
    });
  });
});

describe('getContactByIdDatabase', () => {
  initializeTestDbEach();

  describe('given contact does not exist', () => {
    it('should return it', async () => {
      const contacts = await db.select().from(contactsTable);
      expect(contacts).toEqual([]);
    });
  });
});
