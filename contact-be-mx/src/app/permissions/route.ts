import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { getJson } from '@/lib/shared/local/get-json';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { createPermissionDatabase } from '@/app/permissions/_database/create-permission';
import { createPermissionInputSchema } from '@/app/permissions/_validation/create-permission-input';
import { CreatePermissionInput } from '@/app/permissions/_entity/create-permission-input';
import { PermissionModel } from '@/app/permissions/_entity/permission';
import { EmptyShape } from '@/lib/shared/entity/empty';
import { listPermissionsRelatedToUserByIdDatabase } from '@/app/permissions/_database/list-permissions-by-owner-id';
import { isContactOwnedByUserId } from '@/app/contacts/_database/get-contact-by-id';
import { zodForbidden } from '@/lib/shared/local/to-zod-error';

export const GET = wrapHandler<EmptyShape, PermissionModel[]>(
  async (request) => {
    const user = await userFromSession(request);
    const permissions = await listPermissionsRelatedToUserByIdDatabase(user.id);
    return NextResponse.json(permissions);
  }
);

export const POST = wrapHandler<CreatePermissionInput, PermissionModel>(
  async (request) => {
    const user = await userFromSession(request);
    const input = dataOrThrow(
      createPermissionInputSchema,
      await getJson<CreatePermissionInput>(request)
    );
    const isOwned = await isContactOwnedByUserId(input.contactId, user.id);
    if (!isOwned) {
      return zodForbidden({
        contactId: 'You can only create permission for your own contact',
      });
    }
    const permission = await createPermissionDatabase(input);
    return NextResponse.json(permission, { status: 201 });
  }
);
