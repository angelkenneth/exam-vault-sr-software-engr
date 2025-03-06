import { NextRequest, NextResponse } from 'next/server';

export const wrapHandler =
  <TInput, TOutput>(
    handler: (request: NextRequest) => Promise<NextResponse<TOutput>>
  ) =>
  async (request: NextRequest): Promise<NextResponse<TOutput>> => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof NextResponse) {
        return error;
      }
      throw error;
    }
  };
