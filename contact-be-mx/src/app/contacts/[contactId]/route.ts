import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { EmptyShape } from '@/lib/shared/entity/empty';
import { DeleteContactInput } from '@/app/contacts/_entity/delete-contact-input';
import { deleteContactInputSchema } from '@/app/contacts/_validation/delete-contact-input';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { deleteContactDatabase } from '@/app/contacts/_database/delete-contact';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { getContactByIdDatabase } from '@/app/contacts/_database/get-by-id-contact';
import { zodForbidden, zodNotFound } from '@/lib/shared/local/to-zod-error';
import { isContactOwnedByIdDatabase } from '@/app/contacts/_database/is-contact-owned-by-id';

export const DELETE = wrapHandler<DeleteContactInput, EmptyShape>(
  async (request, ctx) => {
    const user = await userFromSession(request);
    const { contactId } = dataOrThrow<DeleteContactInput>(
      deleteContactInputSchema,
      await ctx.params
    );
    const contact = await getContactByIdDatabase(contactId);
    if (!contact) {
      return zodNotFound({ contactId: 'Contact not found' });
    }
    const isOwned = await isContactOwnedByIdDatabase(contactId, user.id);
    if (!isOwned) {
      return zodForbidden({ contactId: 'Can only delete own contact' });
    }
    await deleteContactDatabase(contactId);
    return NextResponse.json({ contactId: 'Deleted' });
  }
);
