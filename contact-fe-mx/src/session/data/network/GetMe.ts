import { invokePostOnly } from '@/shared/network/invoke-mx.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'

export const tryToGetMeNetwork = () => invokePostOnly(MxOrigin.authBe, '/users/me', {})
