import { NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { EmptyShape } from '@/lib/shared/empty';

export const POST = wrapHandler<EmptyShape, EmptyShape>(async () => {
  const response = NextResponse.json({});
  response.cookies.delete('session');
  return response;
});
