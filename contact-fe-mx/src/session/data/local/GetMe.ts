import { useQuery } from '@tanstack/vue-query'
import { tryToGetMeNetwork } from '@/session/data/network/GetMe.ts'
import type { PublicUser } from '@/session/data/entity/User.ts'

export const useGetMeQuery = () =>
  useQuery<PublicUser>({
    queryKey: ['session'],
    queryFn: () => tryToGetMeNetwork().then((r) => r.json()),
  })
