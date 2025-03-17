import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { EmptyShape } from '@/lib/shared/entity/empty';
import { getJson } from '@/lib/shared/local/get-json';
import { DeleteContactInput } from '@/app/contacts/_entity/delete-contact-input';
import { deleteContactInputSchema } from '@/app/contacts/_validation/delete-contact-input';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { deleteContactDatabase } from '@/app/contacts/_database/delete-contact';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { createContactDatabase } from '@/app/contacts/_database/create-contact';
import { createContactInputSchema } from '@/app/contacts/_validation/create-contact-input';
import {
  CreateContactApiInput,
  CreateContactDatabaseInput,
} from '@/app/contacts/_entity/create-contact-input';
import { ContactModel } from '@/app/contacts/_entity/contact';

export const POST = wrapHandler<CreateContactApiInput, ContactModel>(
  async (request) => {
    const user = await userFromSession(request);
    const apiInput = dataOrThrow(
      createContactInputSchema,
      await getJson<CreateContactApiInput>(request)
    );
    const databaseInput: CreateContactDatabaseInput = {
      ...apiInput,
      ownerId: user.id,
    };
    const contact = await createContactDatabase(databaseInput);
    return NextResponse.json(contact, { status: 201 });
  }
);

export const DELETE = wrapHandler<DeleteContactInput, EmptyShape>(
  async (request) => {
    const user = await userFromSession(request);
    // TODO verify that they own contact first
    const data = await getJson<DeleteContactInput>(request);
    const { id: contactId } = dataOrThrow(deleteContactInputSchema, data);
    await deleteContactDatabase(contactId);
    return NextResponse.json({});
  }
);
