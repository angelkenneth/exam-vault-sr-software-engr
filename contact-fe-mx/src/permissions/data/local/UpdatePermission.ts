import { QueryClient, useMutation } from '@tanstack/vue-query'
import type { PermissionModel } from '@/permissions/data/entity/Permission.ts'
import type { IdInputPair } from '@/shared/network/id-input-pair.ts'
import { updatePermissionByIdNetwork } from '@/permissions/data/remote/UpdatePermission.ts'
import type { UpdatePermissionInput } from '@/permissions/data/entity/UpdatePermissionInput.ts'
import { cond } from 'ramda'
import { elseResponse, when200 } from '@/shared/utility/when-response.ts'
import { whenZodError } from '@/shared/utility/when-zod-error.ts'
import { doThrow } from '@/shared/local/do-throw.ts'

export const useUpdatePermissionByIdMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (input: IdInputPair<UpdatePermissionInput>): Promise<PermissionModel> =>
      updatePermissionByIdNetwork(input.id, input.input).then(
        cond([when200((r) => r.jsonSync()), whenZodError(doThrow), elseResponse(doThrow)]),
      ),
    onSuccess: async (permission, permissionId) => {
      queryClient.setQueryData(['permissions', permissionId], permission)
      await queryClient.invalidateQueries({ queryKey: ['permissions'], exact: true })
    },
  })
