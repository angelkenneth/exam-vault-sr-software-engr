import { NextRequest, NextResponse } from 'next/server';
import { getJson } from '@/lib/shared/get-json';
import { PublicUser, GenericUserInput } from '@/app/users/_entiry/user';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { registerInputSchema } from '@/app/users/_validation/sign-in-input';
import { dataOrThrow } from '@/lib/shared/data-or-throw';
import { getUserByUsername } from '@/app/users/_database/get-by-username';
import { hashPassword } from '@/app/users/_local/hash-password';
import { createUser } from '@/app/users/_database/create';
import { respondWithJwt } from '@/app/users/_local/respond-w-jwt';
import { getConfig } from '@/app/config/_database/get-config';
import { toZodError } from '@/lib/shared/to-zod-error';

export const POST = wrapHandler<GenericUserInput, PublicUser>(
  async (request: NextRequest) => {
    const data = await getJson<GenericUserInput>(request);
    const { username, password } = dataOrThrow(registerInputSchema, data);
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      throw NextResponse.json(toZodError({ username: 'Invalid username' }), {
        status: 400,
      });
    }
    const hashedPassword = hashPassword(password);
    const createdUser = await createUser({
      username,
      password: hashedPassword,
    });
    const config = await getConfig();
    return respondWithJwt(config.secretKey, createdUser);
  }
);
