import { invokeMx } from '@/shared/network/invoke-mx.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'

export const tryToGetMeNetwork = () => invokeMx(MxOrigin.authBe, '/users/me', {})
