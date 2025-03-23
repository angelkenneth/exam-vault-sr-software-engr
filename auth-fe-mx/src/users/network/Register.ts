import { invokeMx } from '@/shared/network/invoke-mx.ts'
import { MxOrigin } from '@/shared/network/mx-origin.ts'
import type { GenericUserInput } from '@/users/entity/GenericUserInput.ts'

export const tryToRegisterNetwork = (input: GenericUserInput) =>
  invokeMx(MxOrigin.authBe, '/users/register', input)
