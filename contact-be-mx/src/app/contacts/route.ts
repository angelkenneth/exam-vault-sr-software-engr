import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { getJson } from '@/lib/shared/local/get-json';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { createContactDatabase } from '@/app/contacts/_database/create-contact';
import { createContactInputSchema } from '@/app/contacts/_validation/create-contact-input';
import {
  CreateContactApiInput,
  CreateContactDatabaseInput,
} from '@/app/contacts/_entity/create-contact-input';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { EmptyShape } from '@/lib/shared/entity/empty';
import {
  listContactsPermittedToUserIdDatabase,
  listContactsOwnedByIdDatabase,
} from '@/app/contacts/_database/list-contacts';
import { listContactsSchema } from '@/app/contacts/_validation/list-contacts';
import { ListContactsInput } from '@/app/contacts/_entity/list-contacts';

export const GET = wrapHandler<EmptyShape, ContactModel[]>(async (request) => {
  const user = await userFromSession(request);
  const { excludeShared } = dataOrThrow(
    listContactsSchema,
    await getJson<ListContactsInput>(request)
  );
  let contacts: ContactModel[];
  if (excludeShared) {
    contacts = await listContactsOwnedByIdDatabase(user.id);
  } else {
    contacts = await listContactsPermittedToUserIdDatabase(user.id);
  }
  return NextResponse.json(contacts);
});

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
