import { BeMx } from '@/lib/shared/network/mx-index';
import { ResponseSync } from '@/lib/shared/entity/response-sync';
import { curryN } from 'ramda';
import { InvokeMx } from '@/lib/shared/network/invoke-mx.shape';

export const invokeMx: InvokeMx = curryN(
  3,
  async <TInput>(microservice: BeMx, path: string, input: TInput) => {
    const url = new URL(microservice);
    url.pathname = path;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(input),
      headers,
    });
    return fetch(request).then(
      async <TOutput>(r2: Response): Promise<ResponseSync<TOutput>> => {
        const responseSync = r2 as ResponseSync<TOutput>;
        let json: TOutput;
        try {
          json = await responseSync.json();
        } catch (error) {
          responseSync.isJson = false;
          responseSync.jsonSync = responseSync.json = () => {
            throw error;
          };
          return responseSync;
        }
        responseSync.isJson = true;
        responseSync.jsonSync = () => json;
        return responseSync;
      }
    );
  }
);
