import { BeMx } from '@/lib/shared/network/mx-index';
import { ResponseSync } from '@/lib/shared/entity/response-sync';

export interface InvokeMx {
  <TInput, TOutput>(
    microservice: BeMx,
    path: string,
    input: TInput
  ): Promise<ResponseSync<TOutput>>;

  <TInput, TOutput>(
    microservice: BeMx,
    path: string
  ): InvokeMx1Input<TInput, TOutput>;

  (microservice: BeMx): InvokeMx2Input;
}

export interface InvokeMx2Input {
  <TInput, TOutput>(
    path: string,
    input: TInput
  ): Promise<ResponseSync<TOutput>>;

  <TInput, TOutput>(path: string): InvokeMx1Input<TInput, TOutput>;
}

export interface InvokeMx1Input<TInput, TOutput> {
  (input: TInput): Promise<ResponseSync<TOutput>>;
}
