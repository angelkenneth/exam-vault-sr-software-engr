import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: "We don't provide root response" },
    { status: 404 }
  );
}
