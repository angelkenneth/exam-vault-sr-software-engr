import type { UseQueryReturnType } from '@tanstack/vue-query'

export const refetchIfIdleFn =
  <TOutput>(useResult: Pick<UseQueryReturnType<TOutput, Error>, 'isFetching' | 'refetch'>) =>
  () => {
    if (useResult.isFetching.value) {
      return
    }
    useResult.refetch()
  }
