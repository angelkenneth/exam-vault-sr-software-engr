import type { BeMx } from '@/shared/network/mx-index.ts'
import type { ResponseSync } from '@/shared/data/response-sync.ts'

export const invokeMx = async <TInput>(microservice: BeMx, path: string, input: TInput) => {
  const url = new URL(microservice)
  url.pathname = path
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const request = new Request(url, {
    method: 'POST',
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
