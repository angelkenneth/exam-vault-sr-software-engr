import { useQuery } from '@tanstack/vue-query'
import type { PermissionModel } from '@/permissions/data/entity/Permission.ts'
import { listPermissionsNetwork } from '@/permissions/data/remote/ListPermissions.ts'

export const useListPermissionsQuery = () =>
  useQuery<PermissionModel[]>({
    queryKey: ['permissions'],
    queryFn: () => listPermissionsNetwork().then((r) => r.jsonSync()),
  })
