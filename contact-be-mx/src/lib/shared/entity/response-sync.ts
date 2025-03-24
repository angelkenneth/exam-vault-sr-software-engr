export interface ResponseSync extends Response {
  isJson: boolean;
  jsonSync: <TOutput>() => TOutput;
}
