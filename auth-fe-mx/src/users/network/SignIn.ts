import { invokeMx } from '@/shared/network/invoke-mx.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'
import type { GenericUserInput } from '@/users/entity/GenericUserInput.ts'

export const tryToSignInNetwork = (input: GenericUserInput) =>
  invokeMx(MxOrigin.auth, '/users/sign-in', input)
