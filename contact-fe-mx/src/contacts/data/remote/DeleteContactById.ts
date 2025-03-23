import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'

export const deleteContactByIdNetwork = (contactId: number) =>
  invokeRestful(MxOrigin.contactBe, `/contacts/${contactId}`, 'DELETE', {})
