import { NextRequest, NextResponse } from 'next/server';
import { getJson } from '@/lib/shared/get-json';
import { PublicUser, GenericUserInput } from '@/app/users/_local/user';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { signInInputSchema } from '@/app/users/_validation/sign-in-input';
import { dataOrThrow } from '@/lib/shared/data-or-throw';
import { getUserByUsername } from '@/app/users/_database/get-by-username';
import { respondWithJwt } from '@/app/users/_local/respond-w-jwt';
import { verifyPassword } from '@/app/users/_local/verify-password';

export const POST = wrapHandler<GenericUserInput, PublicUser>(
  async (request: NextRequest) => {
    const data = await getJson<GenericUserInput>(request);
    const { username, password } = dataOrThrow(signInInputSchema, data);
    const user = await getUserByUsername(username);
    if (!user) {
      throw NextResponse.json(
        { username: 'Invalid username' },
        { status: 400 }
      );
    }
    const isCorrectPassword = verifyPassword(user.password, password);
    if (!isCorrectPassword) {
      throw NextResponse.json(
        { username: 'Invalid password' },
        { status: 400 }
      );
    }

    return respondWithJwt(user);
  }
);
