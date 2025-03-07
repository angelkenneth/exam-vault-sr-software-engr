import { invokeMx } from '@/shared/invoke-mx.ts'
import { BeMx } from '@/shared/mx-index.ts'

export const tryToSignOut = async () => invokeMx(BeMx.auth, '/users/sign-out', {})
