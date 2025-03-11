import { invokeMx } from '@/shared/network/invoke-mx.ts'
import { BeMx } from '@/shared/network/mx-index.ts'

export const tryToSignOutNetwork = async () => invokeMx(BeMx.auth, '/users/sign-out', {})
