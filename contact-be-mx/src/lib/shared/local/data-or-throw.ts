import { z } from 'zod';
import { NextResponse } from 'next/server';

export const dataOrThrow = <TShape>(
  schema: z.ZodObject<z.ZodRawShape>,
  input: TShape
): TShape => {
  const { error, data } = schema.safeParse(input);
  if (error) {
    throw NextResponse.json(error, { status: 400 });
  }
  return data as TShape;
};
