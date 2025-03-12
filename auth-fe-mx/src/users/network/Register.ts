import { invokeMx } from '@/shared/network/invoke-mx.ts'
import { BeMx } from '@/shared/network/mx-index.ts'
import type { GenericUserInput } from '@/users/entity/GenericUserInput.ts'

export const tryToRegisterNetwork = (input: GenericUserInput) =>
  invokeMx(BeMx.auth, '/users/register', input)
