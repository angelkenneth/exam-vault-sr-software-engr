import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'

export const getPermissionByIdNetwork = (permissionId: number) =>
  invokeRestful(MxOrigin.contactBe, `/permissions/${permissionId}`, 'GET', {})
