import { describe, it, expect, beforeEach } from 'vitest';
import { initializeTestDbEach } from '@/lib/shared/tdd/lifecycle';
import { listContactsPermittedToUserIdDatabase } from '@/app/contacts/_database/list-contacts';
import { createContactDatabase } from '@/app/contacts/_database/create-contact';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { createPermissionDatabase } from '@/app/permissions/_database/create-permission';

describe('listContactsPermittedToUserIdDatabase', () => {
  initializeTestDbEach();
  let userId: number;
  beforeEach(() => {
    userId = 1;
  });

  describe('given there are no contacts', () => {
    it('should return an empty array', async () => {
      const result = await listContactsPermittedToUserIdDatabase(userId);
      expect(result).toEqual([]);
    });
  });
  describe('given a user owns at least 1 contact', () => {
    let contact: ContactModel;
    beforeEach(async () => {
      contact = await createContactDatabase({
        ownerId: userId,
        mobileNumberE164: '+1234567890',
      });
    });
    it('should return the contact', async () => {
      const result = await listContactsPermittedToUserIdDatabase(userId);
      expect(result).toEqual([contact]);
    });
  });
  describe('given 2 contacts', () => {
    describe('but only owns 1 of them', () => {
      let contact: ContactModel;
      beforeEach(async () => {
        contact = await createContactDatabase({
          ownerId: userId,
          mobileNumberE164: '+1234567890',
        });
        await createContactDatabase({
          ownerId: userId + 1,
          mobileNumberE164: '+1234567891',
        });
      });
      it('should return only the contact owned by the user', async () => {
        const result = await listContactsPermittedToUserIdDatabase(userId);
        expect(result).toEqual([contact]);
      });
    });
  });
  describe('given they were granted access to another contact', () => {
    let contact: ContactModel;
    beforeEach(async () => {
      contact = await createContactDatabase({
        ownerId: userId + 1,
        mobileNumberE164: '+1234567890',
      });
      await createPermissionDatabase({
        contactId: contact.id,
        sharedToId: userId,
      });
    });
    it('should return the contact', async () => {
      const result = await listContactsPermittedToUserIdDatabase(userId);
      expect(result).toEqual([contact]);
    });
    describe('given another unrelated contact', () => {
      beforeEach(async () => {
        const contact2 = await createContactDatabase({
          ownerId: userId + 1,
          mobileNumberE164: '+1234567891',
        });
        await createPermissionDatabase({
          contactId: contact2.id,
          sharedToId: userId + 3,
        });
      });
      it('should not include it', async () => {
        const result = await listContactsPermittedToUserIdDatabase(userId);
        expect(result).toEqual([contact]);
      });
    });
  });
});
