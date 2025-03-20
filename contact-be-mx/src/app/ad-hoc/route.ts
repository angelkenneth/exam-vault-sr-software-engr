import { wrapHandler } from '@/lib/shared/local/wrap-handler';
import { NextResponse } from 'next/server';
import { EmptyShape } from '@/lib/shared/entity/empty';

export const POST = wrapHandler<EmptyShape, EmptyShape>(
  async (request, ctx) => {
    return NextResponse.json({ message: 'Ad hoc script done!' });
  }
);
