export interface ResponseSync<TOutput> extends Response {
  isJson: boolean;
  jsonSync: () => TOutput;
}
