import { pipe } from 'ramda';
import { NextRequest } from 'next/server';
import { decodeJwtNetwork } from '@/app/auth/_network/decode-jwt';
import { zodNotAuthenticate } from '@/lib/shared/local/to-zod-error';

export const userFromSession = pipe((request: NextRequest) => {
  const session = request.cookies.get('session');
  if (!session) {
    throw zodNotAuthenticate({ session: 'Session cookie not found' });
  }
  return { token: session.value };
}, decodeJwtNetwork);
