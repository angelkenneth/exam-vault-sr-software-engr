import { describe, it, expect, beforeEach } from 'vitest';
import { isContactOwnedByUserIdByPermissionId } from './get-permission-by-id';
import { initializeTestDbEach } from '@/lib/shared/tdd/lifecycle';
import { PermissionModel } from '@/app/permissions/_entity/permission';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { createContactDatabase } from '@/app/contacts/_database/create-contact';
import { createPermissionDatabase } from '@/app/permissions/_database/create-permission';

describe('isContactOwnedByUserIdByPermissionId', () => {
  initializeTestDbEach();
  let invokingUserId: number;
  let otherUserId: number;
  beforeEach(() => {
    invokingUserId = 1;
    otherUserId = 2;
  });

  describe('given permission does not exist', () => {
    it('returns false', async () => {
      const result = await isContactOwnedByUserIdByPermissionId(1, 1);
      expect(result).toBe(false);
    });
  });

  describe('given permission exist', () => {
    let permission: PermissionModel;
    let contact: ContactModel;
    describe('and the contact is owned by the invoking user', () => {
      beforeEach(async () => {
        contact = await createContactDatabase({
          ownerId: invokingUserId,
          mobileNumberE164: '+1234567890',
        });
        permission = await createPermissionDatabase({
          contactId: contact.id,
          sharedToId: otherUserId, // Doesn't matter
        });
      });
      it('should return true', async () => {
        const result = await isContactOwnedByUserIdByPermissionId(
          invokingUserId,
          permission.id
        );
        expect(result).toBe(true);
      });
      describe('and the contact is owned by another user', () => {
        beforeEach(async () => {
          contact = await createContactDatabase({
            ownerId: otherUserId,
            mobileNumberE164: '+1234567890',
          });
          permission = await createPermissionDatabase({
            contactId: contact.id,
            sharedToId: invokingUserId,
          });
        });
        it('should return false', async () => {
          const result = await isContactOwnedByUserIdByPermissionId(
            invokingUserId,
            permission.id
          );
          expect(result).toBe(false);
        });
      });
    });
  });
});
