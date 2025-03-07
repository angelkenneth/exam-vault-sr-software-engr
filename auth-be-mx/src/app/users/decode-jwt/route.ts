import { NextRequest, NextResponse } from 'next/server';
import { wrapHandler } from '@/lib/shared/wrap-handler';
import { TokenInput, TokenOutput } from '@/app/users/_local/token';
import { dataOrThrow } from '@/lib/shared/data-or-throw';
import { tokenInputSchema } from '@/app/users/_validation/token-input';
import { getJson } from '@/lib/shared/get-json';
import { decodeJwt } from '@/app/users/_local/decode-jwt';
import { getConfig } from '@/app/config/_database/get-config';

export const POST = wrapHandler<TokenInput, TokenOutput>(
  async (request: NextRequest) => {
    const { token } = dataOrThrow<TokenInput>(
      tokenInputSchema,
      await getJson(request)
    );
    const config = await getConfig();
    const payload = decodeJwt(config.secretKey, token);
    const yesValidJwt = !!payload;
    return NextResponse.json({ isTokenValid: yesValidJwt });
  }
);
