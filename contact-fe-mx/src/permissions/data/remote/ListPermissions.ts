import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'

export const listPermissionsNetwork = () =>
  invokeRestful(MxOrigin.contactBe, '/permissions', 'GET', {})
