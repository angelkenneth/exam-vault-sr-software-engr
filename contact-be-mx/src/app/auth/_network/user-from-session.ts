import { pipe } from 'ramda';
import { NextRequest, NextResponse } from 'next/server';
import { decodeJwtNetwork } from '@/app/auth/_network/decode-jwt';

export const userFromSession = pipe((request: NextRequest) => {
  const session = request.cookies.get('session');
  if (!session) {
    throw NextResponse.json(
      { message: 'Session cookie not found' },
      { status: 401 }
    );
  }
  return { token: session.value };
}, decodeJwtNetwork);
