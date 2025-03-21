import { db } from '@/db/client';
import { contactsTable, permissionsTable } from '@/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { PermissionModel } from '@/app/permissions/_entity/permission';

interface Output {
  contactOwnerId: number;
  permission: PermissionModel;
}

export const getPermissionByIdDatabase = (
  permissionId: number
): Promise<Output | null> =>
  db
    .select({
      contactOwnerId: contactsTable.ownerId,
      permission: permissionsTable,
    })
    .from(permissionsTable)
    .where(eq(permissionsTable.id, permissionId))
    .leftJoin(contactsTable, eq(permissionsTable.contactId, contactsTable.id))
    .then((r) => (r[0] as Output) ?? null);

export const isContactOwnedByUserIdByPermissionId = (
  ownerId: number,
  permissionId: number
) =>
  db
    .select({ '': sql`1` })
    .from(permissionsTable)
    .where(
      and(
        eq(contactsTable.ownerId, ownerId),
        eq(permissionsTable.id, permissionId)
      )
    )
    .leftJoin(contactsTable, eq(permissionsTable.contactId, contactsTable.id))
    .then((r) => r.length > 0);
