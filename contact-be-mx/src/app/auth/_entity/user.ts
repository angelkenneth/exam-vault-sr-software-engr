import type { JwtPayload } from 'jsonwebtoken';

export interface User {
  id: number;
  username: string;
  password: string;
}

export type PublicUser = Omit<User, 'password'>;

export type JwtUserPayload = PublicUser & JwtPayload;
