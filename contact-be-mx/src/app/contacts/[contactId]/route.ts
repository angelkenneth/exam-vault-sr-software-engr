import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { DeleteContactInput } from '@/app/contacts/_entity/delete-contact-input';
import { deleteContactInputSchema } from '@/app/contacts/_validation/delete-contact-input';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { zodForbidden, zodNotFound } from '@/lib/shared/local/to-zod-error';
import { getByIdContactInputSchema } from '@/app/contacts/_validation/get-by-id-contact-input';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { GetContactByIdInput } from '@/app/contacts/_entity/get-contact-by-id';
import { UpdateContactInput } from '@/app/contacts/_entity/update-contact-input';
import { getJson } from '@/lib/shared/local/get-json';
import {
  canOwnerByIdUpdateContact,
  updateContactDatabase,
} from '@/app/contacts/_database/update-contact';
import { updateContactInputSchema } from '@/app/contacts/_validation/update-contact-input';
import { getContactAndPermissionsForOwnerId } from '@/app/contacts/_database/get-contact-by-id';
import {
  canOwnerByIdDeleteContact,
  deleteContactDatabase,
} from '@/app/contacts/_database/delete-contact';

export const GET = wrapHandler<GetContactByIdInput, ContactModel>(
  async (request, ctx) => {
    const user = await userFromSession(request);
    const { contactId } = dataOrThrow<GetContactByIdInput>(
      getByIdContactInputSchema,
      await ctx.params
    );
    const result = await getContactAndPermissionsForOwnerId(contactId, user.id);
    if (!result) {
      return zodNotFound({ contactId: 'Contact not found or permitted' });
    }
    const { contact, permission } = result;
    const isOwner = contact.ownerId === user.id;
    const canRead = !!permission;
    if (isOwner || canRead) {
      return NextResponse.json(contact);
    }
    return zodForbidden({ contactId: 'You are not permitted to access this' });
  }
);

export const PATCH = wrapHandler<GetContactByIdInput, UpdateContactInput>(
  async (request, ctx) => {
    const user = await userFromSession(request);
    const { contactId } = dataOrThrow<GetContactByIdInput>(
      getByIdContactInputSchema,
      await ctx.params
    );
    const input = dataOrThrow(
      updateContactInputSchema,
      await getJson<UpdateContactInput>(request)
    );
    const canUpdate = await canOwnerByIdUpdateContact(contactId, user.id);
    if (canUpdate) {
      const contact = await updateContactDatabase(contactId, input);
      return NextResponse.json(contact);
    }
    return zodForbidden({
      contactId: 'You can only update your own contact',
    });
  }
);

export const DELETE = wrapHandler<
  DeleteContactInput,
  Record<keyof DeleteContactInput, string>
>(async (request, ctx) => {
  const user = await userFromSession(request);
  const { contactId } = dataOrThrow<DeleteContactInput>(
    deleteContactInputSchema,
    await ctx.params
  );
  const canDelete = await canOwnerByIdDeleteContact(contactId, user.id);
  if (canDelete) {
    await deleteContactDatabase(contactId);
    return NextResponse.json({ contactId: 'Deleted' });
  }
  return zodForbidden({
    contactId: 'Can only delete own contact, or it does not exist',
  });
});
