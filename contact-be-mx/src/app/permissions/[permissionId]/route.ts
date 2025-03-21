import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { DeletePermissionInput } from '@/app/permissions/_entity/delete-permission-input';
import { deletePermissionInputSchema } from '@/app/permissions/_validation/delete-permission-input';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { zodForbidden, zodNotFound } from '@/lib/shared/local/to-zod-error';
import { getByIdPermissionInputSchema } from '@/app/permissions/_validation/get-by-id-permission-input';
import { PermissionModel } from '@/app/permissions/_entity/permission';
import {
  getPermissionByIdDatabase,
  isContactOwnedByUserIdByPermissionId,
} from '@/app/permissions/_database/get-permission-by-id';
import { GetPermissionByIdInput } from '@/app/permissions/_entity/get-permission-by-id';
import { UpdatePermissionInput } from '@/app/permissions/_entity/update-permission-input';
import { getJson } from '@/lib/shared/local/get-json';
import { updatePermissionDatabase } from '@/app/permissions/_database/update-permission';
import { updatePermissionInputSchema } from '@/app/permissions/_validation/update-permission-input';
import { deletePermissionDatabase } from '@/app/permissions/_database/delete-permission';

export const GET = wrapHandler<GetPermissionByIdInput, PermissionModel>(
  async (request, ctx) => {
    const user = await userFromSession(request);
    const { permissionId } = dataOrThrow<GetPermissionByIdInput>(
      getByIdPermissionInputSchema,
      await ctx.params
    );
    const result = await getPermissionByIdDatabase(permissionId);
    if (!result) {
      return zodNotFound({ permissionId: 'Permission not found' });
    }
    const { contactOwnerId, permission } = result;
    const isOwned = contactOwnerId === user.id;
    const isShared = permission.sharedToId === user.id;
    if (isOwned || isShared) {
      return NextResponse.json(permission);
    }
    return zodForbidden({ permissionId: 'You are not allowed to read' });
  }
);

export const PATCH = wrapHandler<GetPermissionByIdInput, UpdatePermissionInput>(
  async (request, ctx) => {
    const user = await userFromSession(request);
    const { permissionId } = dataOrThrow<GetPermissionByIdInput>(
      getByIdPermissionInputSchema,
      await ctx.params
    );
    const input = dataOrThrow(
      updatePermissionInputSchema,
      await getJson<UpdatePermissionInput>(request)
    );
    const isOwned = await isContactOwnedByUserIdByPermissionId(
      user.id,
      permissionId
    );
    if (!isOwned) {
      const updatedPermission = await updatePermissionDatabase(
        permissionId,
        input
      );
      return NextResponse.json(updatedPermission);
    }
    return zodForbidden({ permissionId: 'You are not allowed to update' });
  }
);

export const DELETE = wrapHandler<
  DeletePermissionInput,
  Record<keyof DeletePermissionInput, string>
>(async (request, ctx) => {
  const user = await userFromSession(request);
  const { permissionId } = dataOrThrow<DeletePermissionInput>(
    deletePermissionInputSchema,
    await ctx.params
  );
  const isOwned = await isContactOwnedByUserIdByPermissionId(
    user.id,
    permissionId
  );
  if (isOwned) {
    await deletePermissionDatabase(permissionId);
    return NextResponse.json({ permissionId: 'Deleted' });
  }
  return zodForbidden({
    permissionId: 'Can only delete own permission, or it does not exist',
  });
});
