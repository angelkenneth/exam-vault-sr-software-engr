import { NextRequest, NextResponse } from 'next/server';

export const getJson = async <TInput>(req: NextRequest): Promise<TInput> => {
  try {
    return await req.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      const text = await req.text();
      if (text === '') {
        return {} as TInput;
      }
      throw NextResponse.json(
        { error: 'Unsupported media type' },
        { status: 415 }
      );
    }
    throw error;
  }
};
