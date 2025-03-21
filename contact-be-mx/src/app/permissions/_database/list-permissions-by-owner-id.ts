import { db } from '@/db/client';
import { contactsTable, permissionsTable } from '@/db/schema';
import { or, eq, getTableColumns } from 'drizzle-orm';
import { PermissionModel } from '@/app/permissions/_entity/permission';

export const listPermissionsRelatedToUserByIdDatabase = async (
  userId: number
): Promise<PermissionModel[]> =>
  db
    .select(getTableColumns(permissionsTable))
    .from(permissionsTable)
    .where(
      or(
        eq(permissionsTable.sharedToId, userId),
        eq(contactsTable.ownerId, userId)
      )
    )
    .leftJoin(contactsTable, eq(permissionsTable.contactId, contactsTable.id));
