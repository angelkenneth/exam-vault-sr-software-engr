import { WhenResponseCondition } from '@/lib/shared/local/when-response.shape';
import { PlainZodError } from '@/lib/shared/entity/plain-zod-error';

export interface WhenZodError {
  <TInput, TOutput = void>(
    ifZodErrorFn: (
      zodError: PlainZodError<TInput>
    ) => TOutput | Promise<TOutput>
  ): WhenResponseCondition<TOutput>;
}
