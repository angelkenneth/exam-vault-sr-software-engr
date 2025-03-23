import { invokeMx } from '@/shared/network/invoke-mx.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'

export const tryToSignOutNetwork = () => invokeMx(MxOrigin.authBe, '/users/sign-out', {})
