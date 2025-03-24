import { ResponseSync } from '@/lib/shared/entity/response-sync';

export interface WhenResponse {
  <TOutput = void>(
    conditionFn: (response: ResponseSync) => boolean,
    ifTrueFn: (response: ResponseSync) => TOutput | Promise<TOutput>
  ): WhenResponseCondition<TOutput>;

  (conditionFn: (response: ResponseSync) => boolean): WhenResponse1Input;
}

export interface WhenResponse1Input {
  <TOutput = void>(
    ifTrueFn: (response: ResponseSync) => TOutput | Promise<TOutput>
  ): WhenResponseCondition<TOutput>;
}

export interface WhenJsonResponse {
  <TInput, TOutput = void>(
    if200JsonFn: (json: TInput) => TOutput | Promise<TOutput>
  ): WhenResponseCondition<TOutput>;
}

export type WhenResponseCondition<TOutput> = [
  conditionFn: (response: ResponseSync) => boolean,
  ifTrueFn: (response: ResponseSync) => TOutput | Promise<TOutput>,
];
