import { describe, it, expect, beforeEach } from 'vitest';
import { initializeTestDbEach } from '@/lib/shared/tdd/lifecycle';
import { createContactDatabase } from '@/app/contacts/_database/create-contact';
import { createPermissionDatabase } from '@/app/permissions/_database/create-permission';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { canOwnerByIdDeleteContact } from '@/app/contacts/_database/delete-contact';

describe('canOwnerByIdDeleteContact', () => {
  initializeTestDbEach();
  let userId: number;
  beforeEach(() => {
    userId = 1;
  });

  describe('given no contact exist', () => {
    it('should return false', async () => {
      const result = await canOwnerByIdDeleteContact(1, userId);
      expect(result).toBe(false);
    });
  });
  describe('given contact exist', () => {
    let contact: ContactModel;
    let ownerId: number;
    const createContact = async () => {
      contact = await createContactDatabase({
        ownerId,
        mobileNumberE164: '+1234567890',
      });
    };
    describe('and its the owner', () => {
      beforeEach(() => {
        ownerId = 1;
      });
      it('should return true', async () => {
        await createContact();
        const result = await canOwnerByIdDeleteContact(contact.id, userId);
        expect(result).toBe(true);
      });
    });
    describe('but owned by another', () => {
      beforeEach(() => {
        ownerId = 2;
      });
      describe('and is not permitted to access it', () => {
        it('should return false', async () => {
          await createContact();
          const result = await canOwnerByIdDeleteContact(contact.id, userId);
          expect(result).toBe(false);
        });
      });
      describe('and is permitted to read it', () => {
        let allowDelete: boolean;
        const createPermission = () =>
          createPermissionDatabase({
            contactId: contact.id,
            sharedToId: userId,
            allowDelete,
          });
        describe('but not allowed to delete it', () => {
          beforeEach(() => {
            allowDelete = false;
          });
          it('should return false', async () => {
            await createContact();
            await createPermission();
            const result = await canOwnerByIdDeleteContact(contact.id, userId);
            expect(result).toBe(false);
          });
        });
        describe('and allowed to delete it', () => {
          beforeEach(() => {
            allowDelete = true;
          });
          it('should return true', async () => {
            await createContact();
            await createPermission();
            const result = await canOwnerByIdDeleteContact(contact.id, userId);
            expect(result).toBe(true);
          });
        });
      });
    });
  });
});
