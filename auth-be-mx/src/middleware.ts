import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const origin = request.headers.get('origin');
  if (origin) {
    const url = new URL(origin);
    const isLocalhost = url.hostname === 'localhost';
    const isAkTolentino = url.hostname.endsWith('.aktolentino.com');
    const isOriginAllowed = isLocalhost || isAkTolentino;
    if (!isOriginAllowed) {
      return NextResponse.next();
    }

    const headers: HeadersInit = {
      'Access-Control-Allow-Origin': url.origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS,FOO',
      'Access-Control-Allow-Headers':
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400',
    };
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers,
      });
    }

    return NextResponse.next({ headers });
  }
  return NextResponse.next();
};

export const config = {
  matcher: '/:path*',
};
