import { MxOrigin } from '@/lib/shared/network/mx-origin';
import { ResponseSync } from '@/lib/shared/entity/response-sync';

export interface InvokeMx {
  <TInput>(
    microservice: MxOrigin,
    path: string,
    input: TInput
  ): Promise<ResponseSync>;

  <TInput>(microservice: MxOrigin, path: string): InvokeMx1Input<TInput>;

  (microservice: MxOrigin): InvokeMx2Input;
}

export interface InvokeMx2Input {
  <TInput>(path: string, input: TInput): Promise<ResponseSync>;

  <TInput>(path: string): InvokeMx1Input<TInput>;
}

export interface InvokeMx1Input<TInput> {
  (input: TInput): Promise<ResponseSync>;
}
