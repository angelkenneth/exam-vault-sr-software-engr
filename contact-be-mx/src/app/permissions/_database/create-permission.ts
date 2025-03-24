import { db } from '@/db/client';
import { permissionsTable } from '@/db/schema';
import { CreatePermissionDatabaseInput } from '@/app/permissions/_entity/create-permission-input';
import { PermissionModel } from '@/app/permissions/_entity/permission';

export const createPermissionDatabase = async (
  input: CreatePermissionDatabaseInput
): Promise<PermissionModel> =>
  db
    .insert(permissionsTable)
    .values(input)
    .returning()
    .then((r) => r[0]);
