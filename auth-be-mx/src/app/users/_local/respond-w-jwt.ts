import { JwtUserPayload, User } from '@/app/users/_local/user';
import { NextResponse } from 'next/server';
import { omit } from 'ramda';
import { sign } from 'jsonwebtoken';

export const respondWithJwt = async (secretKey: string, user: User) => {
  const publicUser = omit(['password'], user);
  const jwtPayload: JwtUserPayload = {
    ...publicUser,
    sub: `${publicUser.id}`,
  };
  const jwt = sign(jwtPayload, secretKey, { expiresIn: '24hr' });
  const response = NextResponse.json(publicUser);
  response.cookies.set('session', jwt, {
    httpOnly: true,
    secure: true,
  });
  return response;
};
