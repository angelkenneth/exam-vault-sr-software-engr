import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'
import type { UpdateContactInput } from '@/contacts/data/entity/UpdateContactInput.ts'

export const updateContactByIdNetwork = (contactId: number, input: UpdateContactInput) =>
  invokeRestful(MxOrigin.contactBe, `/contacts/${contactId}`, 'PATCH', input)
