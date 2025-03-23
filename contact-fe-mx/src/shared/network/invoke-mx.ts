import type { MxOrigin } from '@/shared/network/mx-origin.ts'
import type { ResponseSync } from '@/shared/data/response-sync.ts'

export const invokeRestful = async <TInput>(
  microservice: MxOrigin,
  path: string,
  method: string,
  input: TInput,
) => {
  const url = new URL(microservice)
  url.pathname = path
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const request = new Request(url, {
    method,
    body: JSON.stringify(input),
    headers,
    credentials: 'include',
    mode: 'cors',
  })
  return fetch(request).then(async <TShape>(r2: Response): Promise<ResponseSync> => {
    const responseSync = r2 as ResponseSync
    let json: TShape
    try {
      json = await responseSync.json()
    } catch (error) {
      responseSync.isJson = false
      responseSync.jsonSync = responseSync.json = () => {
        throw error
      }
      return responseSync
    }
    responseSync.isJson = true
    responseSync.jsonSync = (() => json) as ResponseSync['jsonSync']
    return responseSync
  })
}

export const invokePostOnly = async <TInput>(microservice: MxOrigin, path: string, input: TInput) =>
  invokeRestful(microservice, path, 'POST', input)
