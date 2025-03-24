import { QueryClient, useMutation } from '@tanstack/vue-query'
import type { PermissionModel } from '@/permissions/data/entity/Permission.ts'
import type { CreatePermissionInput } from '@/permissions/data/entity/CreatePermissionInput.ts'
import { createPermissionNetwork } from '@/permissions/data/remote/CreatePermission.ts'
import { cond } from 'ramda'
import { elseResponse, when201 } from '@/shared/utility/when-response.ts'
import { doThrow } from '@/shared/local/do-throw.ts'
import { when404ZodError, whenZodError } from '@/shared/utility/when-zod-error.ts'

export const useCreatePermissionMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (input: CreatePermissionInput): Promise<PermissionModel> =>
      createPermissionNetwork(input).then(
        cond([
          when201((r) => r.jsonSync()),
          when404ZodError(doThrow),
          whenZodError(doThrow),
          elseResponse(doThrow),
        ]),
      ),
    onSuccess: async (permission, permissionId) => {
      queryClient.setQueryData(['permissions', permissionId], permission)
      await queryClient.invalidateQueries({ queryKey: ['permissions'], exact: true })
    },
  })
