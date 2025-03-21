import { PermissionModel } from '@/app/permissions/_entity/permission';
import { UpdatePermissionInput } from '@/app/permissions/_entity/update-permission-input';
import { db } from '@/db/client';
import { permissionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updatePermissionDatabase = async (
  permissionId: number,
  input: UpdatePermissionInput
): Promise<PermissionModel> =>
  db
    .update(permissionsTable)
    .set(input)
    .where(eq(permissionsTable.id, permissionId))
    .returning()
    .then((r) => r[0]);
