import type { BeMx } from '@/shared/network/mx-index.ts'
import type { ResponseSync } from '@/shared/data/response-sync.ts'

export const invokeMx = async <TInput>(microservice: BeMx, path: string, input: TInput) =>
  fetch(`${microservice}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then(async <TShape>(r2): ResponseSync => {
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
    responseSync.jsonSync = () => json
    return responseSync;
  })
