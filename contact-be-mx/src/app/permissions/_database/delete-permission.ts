import { db } from '@/db/client';
import { permissionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const deletePermissionDatabase = async (
  permissionId: number
): Promise<number> =>
  db
    .delete(permissionsTable)
    .where(eq(permissionsTable.id, permissionId))
    .then((r) => r.rowsAffected);
