import { useQuery } from '@tanstack/vue-query'
import type { PermissionModel } from '@/permissions/data/entity/Permission.ts'
import { getPermissionByIdNetwork } from '@/permissions/data/remote/GetPermissionById.ts'

export const useGetPermissionByIdQuery = (permissionId: number | void) =>
  useQuery<PermissionModel | null>({
    queryKey: ['permissions', permissionId],
    queryFn: () =>
      permissionId ? getPermissionByIdNetwork(permissionId).then((r) => r.jsonSync()) : null,
  })
