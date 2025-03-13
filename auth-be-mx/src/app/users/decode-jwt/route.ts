import { NextRequest, NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { TokenInput } from '@/app/users/_entiry/token';
import { dataOrThrow } from '@/lib/shared/data-or-throw';
import { tokenInputSchema } from '@/app/users/_validation/token-input';
import { getJson } from '@/lib/shared/get-json';
import { decodeJwt } from '@/app/users/_local/decode-jwt';
import { getConfig } from '@/app/config/_database/get-config';
import { JwtUserPayload } from '@/app/users/_entiry/user';

export const POST = wrapHandler<TokenInput, JwtUserPayload>(
  async (request: NextRequest) => {
    const { token } = dataOrThrow<TokenInput>(
      tokenInputSchema,
      await getJson(request)
    );
    const config = await getConfig();
    const payload = decodeJwt(config.secretKey, token);
    return NextResponse.json(payload);
  }
);
