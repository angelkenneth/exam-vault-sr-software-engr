import { ZodError, ZodIssue } from 'zod';
import { NextResponse } from 'next/server';
import { curryN } from 'ramda';

export const toZodError = (keyErrorPair: Record<string, string>): ZodError => {
  const issues: ZodIssue[] = Object.entries(keyErrorPair).map(
    ([key, message]) => ({
      path: [key],
      message,
      code: 'custom',
    })
  );
  return new ZodError(issues);
};

export const zodResponse = curryN(
  2,
  (status: number, keyErrorPair: Record<string, string>): NextResponse =>
    NextResponse.json(toZodError(keyErrorPair), { status })
);

export const zodNotFound = zodResponse(404);
/**
 * We don't know you
 */
export const zodNotAuthenticate = zodResponse(401);
/**
 * We know you, but you're not allowed to do that
 */
export const zodForbidden = zodResponse(403);
