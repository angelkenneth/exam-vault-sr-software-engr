import { NextRequest, NextResponse } from 'next/server';

export const wrapHandler =
  <TInput, TOutput>(
    handler: (
      request: NextRequest,
      ctx: { params: Promise<Record<string, string>> }
    ) => Promise<NextResponse<TOutput>>
  ) =>
  async (
    request: NextRequest,
    ctx: { params: Promise<Record<string, string>> }
  ): Promise<NextResponse<TOutput>> => {
    try {
      return await handler(request, ctx);
    } catch (error) {
      if (error instanceof NextResponse) {
        return error;
      }
      throw error;
    }
  };
