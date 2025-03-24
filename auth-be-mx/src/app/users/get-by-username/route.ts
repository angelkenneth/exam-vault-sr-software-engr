import { NextRequest, NextResponse } from 'next/server';
import { getJson } from '@/lib/shared/get-json';
import {
  PublicUser,
  GenericUserInput,
  GetByUsernameInput,
} from '@/app/users/_entity/user';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { dataOrThrow } from '@/lib/shared/data-or-throw';
import { getUserByUsername } from '@/app/users/_database/get-by-username';
import { zodNotFound } from '@/lib/shared/to-zod-error';
import { getByUsernameInputSchema } from '@/app/users/_validation/get-by-username';

// TODO not meant for public access -- add inter microservice authentication
export const POST = wrapHandler<GenericUserInput, PublicUser>(
  async (request: NextRequest) => {
    const data = await getJson<GetByUsernameInput>(request);
    const { username } = dataOrThrow(getByUsernameInputSchema, data);
    const user = await getUserByUsername(username);
    if (!user) {
      throw zodNotFound({ username: 'User with username not found' });
    }
    return NextResponse.json(user);
  }
);
