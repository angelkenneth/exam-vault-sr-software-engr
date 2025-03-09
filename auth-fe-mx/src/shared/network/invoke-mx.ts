import type { BeMx } from '@/shared/network/mx-index.ts'

export const invokeMx = async <TInput, TOutput>(
  microservice: BeMx,
  path: string,
  input: TInput,
): Promise<TOutput> => {
  return fetch(`${microservice}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then(async (r) => {
    if (r.status < 300) {
      return r.json()
    } else {
      throw r
    }
  })
}
