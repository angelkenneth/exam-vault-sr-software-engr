import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { getJson } from '@/lib/shared/local/get-json';
import { dataOrThrow } from '@/lib/shared/local/data-or-throw';
import { userFromSession } from '@/app/auth/_network/user-from-session';
import { createPermissionDatabase } from '@/app/permissions/_database/create-permission';
import { createPermissionInputSchema } from '@/app/permissions/_validation/create-permission-input';
import {
  CreatePermissionApiInput,
  CreatePermissionDatabaseInput,
} from '@/app/permissions/_entity/create-permission-input';
import { PermissionModel } from '@/app/permissions/_entity/permission';
import { EmptyShape } from '@/lib/shared/entity/empty';
import { listPermissionsRelatedToUserByIdDatabase } from '@/app/permissions/_database/list-permissions-by-owner-id';
import { isContactOwnedByUserId } from '@/app/contacts/_database/get-contact-by-id';
import { zodForbidden, zodNotFound } from '@/lib/shared/local/to-zod-error';
import { getUserByUsernameNetwork } from '@/app/auth/_network/get-by-username';
import { omit } from 'ramda';

export const GET = wrapHandler<EmptyShape, PermissionModel[]>(
  async (request) => {
    const user = await userFromSession(request);
    const permissions = await listPermissionsRelatedToUserByIdDatabase(user.id);
    return NextResponse.json(permissions);
  }
);

export const POST = wrapHandler<CreatePermissionApiInput, PermissionModel>(
  async (request) => {
    const user = await userFromSession(request);
    let input = dataOrThrow(
      createPermissionInputSchema,
      await getJson<CreatePermissionApiInput>(request)
    );
    let sharedToId = input.sharedToId;
    if (!sharedToId && input.sharedToUsername) {
      const user = await getUserByUsernameNetwork({
        username: input.sharedToUsername,
      });
      if (!user) {
        return zodNotFound({
          sharedToUsername: 'User with username not found',
        });
      }
      sharedToId = user.id;
      input = omit(['sharedToUsername'], { ...input, sharedToId });
    }
    const isOwned = await isContactOwnedByUserId(user.id, input.contactId);
    if (!isOwned) {
      return zodForbidden({
        contactId: 'You can only create permission for your own contact',
      });
    }
    const permission = await createPermissionDatabase(
      input as CreatePermissionDatabaseInput
    );
    return NextResponse.json(permission, { status: 201 });
  }
);
