import { allPass } from 'ramda';
import type { ZodError } from 'zod';
import { ResponseSync } from '@/lib/shared/entity/response-sync';
import { WhenZodError } from '@/lib/shared/local/when-zod-error.shape';
import {
  is400,
  is404,
  isJson,
  whenResponse,
  wrapJsonAsInput,
} from '@/lib/shared/local/when-response';

export const isZodErrorObject = (obj: unknown): obj is ZodError =>
  (obj as ZodError)?.name === 'ZodError';

export const isZodError = (response: ResponseSync): boolean =>
  isZodErrorObject(response.jsonSync<ZodError>?.());

export const whenZodError: WhenZodError = <TInput, TOutput = void>(
  ifZodErrorFn: (json: TInput) => TOutput | Promise<TOutput>
) =>
  whenResponse(
    allPass([is400, isJson, isZodError]),
    wrapJsonAsInput<TInput, TOutput>(ifZodErrorFn)
  );

export const when404ZodError: WhenZodError = <TInput, TOutput = void>(
  ifZodErrorFn: (json: TInput) => TOutput | Promise<TOutput>
) =>
  whenResponse(
    allPass([is404, isJson, isZodError]),
    wrapJsonAsInput<TInput, TOutput>(ifZodErrorFn)
  );
