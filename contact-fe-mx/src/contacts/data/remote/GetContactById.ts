import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'

export const getContactByIdNetwork = (contactId: number) =>
  invokeRestful(MxOrigin.contactBe, `/contacts/${contactId}`, 'GET', {})
