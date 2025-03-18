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

export const GET = wrapHandler<DeleteContactInput, ContactModel>(
  async (request, ctx) => {
    const user = await userFromSession(request);
    const { contactId } = dataOrThrow<DeleteContactInput>(
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
