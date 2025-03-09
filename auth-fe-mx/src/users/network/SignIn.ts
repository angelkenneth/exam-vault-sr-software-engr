import { invokeMx } from '../../shared/network/invoke-mx.ts'
import { BeMx } from '../../shared/network/mx-index.ts'
import type { SignInInput } from '@/users/entity/SignIn.ts'

export const tryToSignInNetwork = async (input: SignInInput) =>
  invokeMx(BeMx.auth, '/users/sign-in', input)
