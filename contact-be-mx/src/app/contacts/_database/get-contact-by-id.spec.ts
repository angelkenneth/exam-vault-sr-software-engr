import { describe, it, expect, beforeEach } from 'vitest';
import { getContactAndPermissionsForOwnerId } from './get-contact-by-id';
import { createContactDatabase } from '@/app/contacts/_database/create-contact';
import { initializeTestDbEach } from '@/lib/shared/tdd/lifecycle';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { createPermissionDatabase } from '@/app/permissions/_database/create-permission';
import { PermissionModel } from '@/app/permissions/_entity/permission';

describe('getContactAndPermissionsForOwnerId', () => {
  initializeTestDbEach();
  let userId: number;
  beforeEach(() => {
    userId = 1;
  });

  describe('given no contact exist', () => {
    it('should return null', async () => {
      const result = await getContactAndPermissionsForOwnerId(1, userId);
      expect(result).toBeNull();
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
      it('should return results', async () => {
        await createContact();
        const result = await getContactAndPermissionsForOwnerId(
          contact.id,
          userId
        );
        expect(result).toEqual({ contact, permission: null });
      });
    });
    describe('but owned by another', () => {
      beforeEach(() => {
        ownerId = 2;
      });
      describe('and is not permitted to access it', () => {
        it('should return null', async () => {
          await createContact();
          const result = await getContactAndPermissionsForOwnerId(
            contact.id,
            userId
          );
          expect(result).toBeNull();
        });
      });
      describe('and is permitted to read it', () => {
        let permission: PermissionModel;
        const createPermission = async () => {
          permission = await createPermissionDatabase({
            contactId: contact.id,
            sharedToId: userId,
          });
        };
        it('should return results', async () => {
          await createContact();
          await createPermission();
          const result = await getContactAndPermissionsForOwnerId(
            contact.id,
            userId
          );
          expect(result).toEqual({ contact, permission });
        });
      });
    });
  });
});
