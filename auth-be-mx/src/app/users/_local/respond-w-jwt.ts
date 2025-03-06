import { User } from '@/app/users/_local/user';
import { NextResponse } from 'next/server';
import { omit } from 'ramda';

export const respondWithJwt = async (user: User) => {
  const publicUser = omit(['password'], user);

  // TODO: Implement JWT
  const jwt = JSON.stringify(publicUser);

  const response = NextResponse.json(omit(['password'], user));
  response.cookies.set('token', jwt, {
    httpOnly: true,
    secure: true,
  });
  return response;
};
