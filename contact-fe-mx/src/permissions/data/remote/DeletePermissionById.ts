import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'

export const deletePermissionByIdNetwork = (permissionId: number) =>
  invokeRestful(MxOrigin.contactBe, `/permissions/${permissionId}`, 'DELETE', {})
