import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { EmptyShape } from '@/lib/shared/empty';
import { getConfig } from '@/app/config/_database/get-config';
import { decodeJwt } from '@/app/users/_local/decode-jwt';
import { toZodError } from '@/lib/shared/to-zod-error';

export const POST = wrapHandler<EmptyShape, EmptyShape>(async (request) => {
  const token = request.cookies.get('session');
  if (!token) {
    return NextResponse.json(toZodError({ session: 'Missing session' }), {
      status: 401,
    });
  }
  const config = await getConfig();
  const payload = decodeJwt(config.secretKey, token.value);
  return NextResponse.json(payload);
});
