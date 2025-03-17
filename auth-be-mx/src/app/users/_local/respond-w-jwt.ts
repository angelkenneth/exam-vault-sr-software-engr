import { JwtUserPayload, User } from '@/app/users/_entity/user';
import { NextResponse } from 'next/server';
import { omit } from 'ramda';
import { sign } from 'jsonwebtoken';
import { decodeJwt } from '@/app/users/_local/decode-jwt';

export const respondWithJwt = (
  secretKey: string,
  user: User
): NextResponse<JwtUserPayload> => {
  const publicUser = omit(['password'], user);
  const jwtPayload: JwtUserPayload = {
    ...publicUser,
    sub: `${publicUser.id}`,
  };
  const jwt = sign(jwtPayload, secretKey, { expiresIn: '24hr' });
  const newJwtPayload = decodeJwt(secretKey, jwt);
  const response = NextResponse.json(newJwtPayload);
  response.cookies.set('session', jwt, {
    httpOnly: true,
    secure: true,
  });
  return response;
};
