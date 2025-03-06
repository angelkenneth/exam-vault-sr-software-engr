import { NextRequest, NextResponse } from 'next/server';
import { getJson } from '@/lib/shared/get-json';
import { PublicUser, SignInInput, User } from '@/app/users/_local/user';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { signInInputSchema } from '@/app/users/_validation/sign-in-input';
import { dataOrThrow } from '@/lib/shared/data-or-throw';
import { getUserByUsername } from '@/app/users/_database/get-by-username';

export const POST = wrapHandler<SignInInput, PublicUser>(
  async (request: NextRequest) => {
    const data = await getJson<SignInInput>(request);
    const { username, password } = dataOrThrow(signInInputSchema, data);
    const user = await getUserByUsername(username);
    if (!user) {
      throw NextResponse.json(
        { username: 'Invalid username' },
        { status: 404 }
      );
    }

    return;
  }
);
