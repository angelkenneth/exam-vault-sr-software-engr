import { invokePostOnly } from '@/shared/network/invoke-mx.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'
import type { GenericUserInput } from '@/users/entity/GenericUserInput.ts'

export const tryToSignInNetwork = (input: GenericUserInput) =>
  invokePostOnly(MxOrigin.authBe, '/users/sign-in', input)
