import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { DeleteContactInput } from '@/app/contacts/_entity/delete-contact-input';
import { deleteContactInputSchema } from '@/app/contacts/_validation/delete-contact-input';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { deleteContactDatabase } from '@/app/contacts/_database/delete-contact';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { zodForbidden, zodNotFound } from '@/lib/shared/local/to-zod-error';
import { isContactOwnedByIdDatabase } from '@/app/contacts/_database/is-contact-owned-by-id';
import { getByIdContactInputSchema } from '@/app/contacts/_validation/get-by-id-contact-input';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { getContactByIdDatabase } from '@/app/contacts/_database/get-contact-by-id';
import { GetContactByIdInput } from '@/app/contacts/_entity/get-contact-by-id';
import { UpdateContactInput } from '@/app/contacts/_entity/update-contact-input';
import { getJson } from '@/lib/shared/local/get-json';
import { updateContactDatabase } from '@/app/contacts/_database/update-contact';
import { updateContactInputSchema } from '@/app/contacts/_validation/update-contact-input';

export const GET = wrapHandler<GetContactByIdInput, ContactModel>(
  async (request, ctx) => {
    const user = await userFromSession(request);
    const { contactId } = dataOrThrow<GetContactByIdInput>(
      getByIdContactInputSchema,
      await ctx.params
    );
    const contact = await getContactByIdDatabase(contactId);
    if (!contact) {
      return zodNotFound({ contactId: 'Contact not found' });
    }
    if (contact.ownerId !== user.id) {
      return zodForbidden({ contactId: 'You are not the owner' });
    }
    return NextResponse.json(contact);
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
    const isOwned = await isContactOwnedByIdDatabase(contactId, user.id);
    if (!isOwned) {
      return zodForbidden({
        contactId: 'You can only update your own contact',
      });
    }
    const contact = await updateContactDatabase(contactId, input);
    return NextResponse.json(contact);
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
  const isOwned = await isContactOwnedByIdDatabase(contactId, user.id);
  if (!isOwned) {
    return zodForbidden({
      contactId: 'Can only delete own contact, or it does not exist',
    });
  }
  await deleteContactDatabase(contactId);
  return NextResponse.json({ contactId: 'Deleted' });
});
