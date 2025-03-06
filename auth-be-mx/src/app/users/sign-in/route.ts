import { NextRequest, NextResponse } from 'next/server';
import { getJson } from '@/lib/shared/get-json';
import { SignInInput, SignUpOutput } from '@/app/users/_local/user';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { signInInputSchema } from '@/app/users/_validation/sign-in-input';
import { dataOrThrow } from '@/lib/shared/data-or-throw';

export const POST = wrapHandler<SignInInput, SignUpOutput>(
  async (request: NextRequest) => {
    const data = await getJson<SignInInput>(request);
    const { username, password } = dataOrThrow(signInInputSchema, data);

    // TODO implement password validation
    if (!password) {
      return NextResponse.json({ okay: false });
    }

    // TODO: Implement JWT
    const jwt = JSON.stringify({ username });

    const response = NextResponse.json({ okay: true });
    response.cookies.set('token', jwt, {
      httpOnly: true,
      secure: true,
    });
    return response;
  }
);
