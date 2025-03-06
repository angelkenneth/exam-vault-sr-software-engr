import { NextRequest, NextResponse } from 'next/server';

export const getJson = async <T>(req: NextRequest): Promise<T> => {
  try {
    return await req.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw NextResponse.json(
        { error: 'Unsupported media type' },
        { status: 415 }
      );
    }
    throw error;
  }
}
