import { invokeMx } from '@/lib/shared/network/invoke-mx';
import { GetByUsernameInput, PublicUser } from '@/app/auth/_entity/user';
import { MxOrigin } from '@/lib/shared/network/mx-origin';
import { andThen, cond, identity, pipe } from 'ramda';
import { elseResponse, when200Json } from '@/lib/shared/local/when-response';
import { doThrow } from '@/lib/shared/local/do-throw';
import { when404ZodError } from '@/lib/shared/local/when-zod-error';
import { asTypeFn } from '@/lib/shared/entity/as-type-fn';

export const getUserByUsernameNetwork = pipe(
  invokeMx<GetByUsernameInput>(MxOrigin.authBe, '/users/get-by-username'),
  andThen(
    cond([
      when200Json(identity),
      when404ZodError(() => null),
      elseResponse(doThrow),
    ])
  ),
  asTypeFn<Promise<PublicUser | null>>()
);
