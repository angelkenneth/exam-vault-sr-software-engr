import { invokePostOnly } from '@/shared/network/invoke-mx.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'

export const tryToSignOutNetwork = () => invokePostOnly(MxOrigin.authBe, '/users/sign-out', {})
