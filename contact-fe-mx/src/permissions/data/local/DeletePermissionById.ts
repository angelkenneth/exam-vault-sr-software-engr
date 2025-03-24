import { QueryClient, useMutation } from '@tanstack/vue-query'
import type { PermissionModel } from '@/permissions/data/entity/Permission.ts'
import { deletePermissionByIdNetwork } from '@/permissions/data/remote/DeletePermissionById.ts'

export const useDeletePermissionByIdMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (permissionId: number) =>
      deletePermissionByIdNetwork(permissionId).then(
        (r) => r.jsonSync() as Promise<PermissionModel>,
      ),
    onMutate: async (permissionId) => {
      await queryClient.cancelQueries({ queryKey: ['permissions', permissionId] })
    },
    onSuccess: async (permission, permissionId) => {
      queryClient.setQueryData(['permissions', permissionId], permission)
      await queryClient.invalidateQueries({ queryKey: ['permissions'], exact: true })
    },
  })
