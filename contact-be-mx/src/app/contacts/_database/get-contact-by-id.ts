import { db } from '@/db/client';
import { contactsTable, permissionsTable } from '@/db/schema';
import { eq, or, and, isNull, sql } from 'drizzle-orm';
import { ContactModel } from '@/app/contacts/_entity/contact';
import { PermissionModel } from '@/app/permissions/_entity/permission';
import type { SelectedFields } from 'drizzle-orm/sqlite-core/query-builders/select.types';
import type { SQLWrapper } from 'drizzle-orm/sql/sql';
import { andThen, pipe } from 'ramda';

export const createContactAndPermissionQuery =
  (
    selectArg: () => SelectedFields,
    moreWhereArg: () => SQLWrapper | undefined
  ) =>
  (contactId: number, sharedToId: number) =>
    db
      .select(selectArg())
      .from(contactsTable)
      .where(
        and(
          eq(contactsTable.id, contactId),
          or(
            eq(contactsTable.ownerId, sharedToId),
            and(eq(permissionsTable.sharedToId, sharedToId), moreWhereArg())
          )
        )
      )
      .leftJoin(
        permissionsTable,
        eq(contactsTable.id, permissionsTable.contactId)
      );

export const getContactAndPermissionsForOwnerId = pipe(
  createContactAndPermissionQuery(
    () => ({
      contact: contactsTable,
      permission: permissionsTable,
    }),
    () => void 0
  ),
  andThen(
    (r) =>
      (r[0] as {
        contact: ContactModel;
        permission: PermissionModel | null;
      }) ?? null
  )
);

export const createContactPermissionOnlyQuery = (
  moreWhereArg: () => SQLWrapper | undefined
) =>
  pipe(
    createContactAndPermissionQuery(() => ({ '': sql`1` }), moreWhereArg),
    andThen((r) => r.length > 0)
  );

export const isContactOwnedByUserId = (ownerId: number, contactId: number) =>
  db
    .select({ '': sql`1` })
    .from(contactsTable)
    .where(
      and(eq(contactsTable.id, contactId), eq(contactsTable.ownerId, ownerId))
    )
    .then((r) => r.length > 0);
