import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'
import type { CreatePermissionInput } from '@/permissions/data/entity/CreatePermissionInput.ts'

export const createPermissionNetwork = (input: CreatePermissionInput) =>
  invokeRestful(MxOrigin.contactBe, '/permissions', 'POST', input)
