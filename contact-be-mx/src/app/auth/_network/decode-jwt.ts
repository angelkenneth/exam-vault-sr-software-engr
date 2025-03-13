import { invokeMx } from '@/lib/shared/network/invoke-mx';
import { BeMx } from '@/lib/shared/network/mx-index';
import { DecodeJwtInput } from '@/app/auth/_entity/decode-jwt';
import { andThen, pipe } from 'ramda';
import { JwtUserPayload } from '@/app/auth/_entity/user';
import { NextResponse } from 'next/server';

export const decodeJwtNetwork = pipe(
  invokeMx<DecodeJwtInput, JwtUserPayload>(BeMx.auth, '/users/decode-jwt'),
  andThen((response) => {
    if (response.status === 200) {
      return response.jsonSync();
    }
    // TODO figure out to just propagate the error, instead of fallback to empty
    const body = response.isJson ? response.jsonSync() : {};
    throw NextResponse.json(body, {
      status: response.status,
    });
  })
);
