import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'
import type { UpdatePermissionInput } from '@/permissions/data/entity/UpdatePermissionInput.ts'

export const updatePermissionByIdNetwork = (permissionId: number, input: UpdatePermissionInput) =>
  invokeRestful(MxOrigin.contactBe, `/permissions/${permissionId}`, 'PATCH', input)
