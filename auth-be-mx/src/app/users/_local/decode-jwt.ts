import { JsonWebTokenError, JwtPayload, verify } from 'jsonwebtoken';
import { PublicUser } from '@/app/users/_local/user';
import { NextResponse } from 'next/server';
import { toZodError } from '@/lib/shared/to-zod-error';

export const decodeJwt = (secretKey: string, token: string): PublicUser => {
  let payload: JwtPayload | string;
  try {
    payload = verify(token, secretKey);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      // TODO might be insecure to return the error message in raw form
      throw NextResponse.json(toZodError({ message: error.message }), { status: 401 });
    }
    throw error;
  }
  if (typeof payload === 'string') {
    throw new Error('Unexpected string payload');
  }
  return payload as PublicUser;
};
