import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'
import type { CreateContactInput } from '@/contacts/data/entity/CreateContactInput.ts'

export const createContactNetwork = (input: CreateContactInput) =>
  invokeRestful(MxOrigin.contactBe, '/contacts', 'POST', input)
