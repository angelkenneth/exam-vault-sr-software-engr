import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { invokeRestful } from '@/shared/network/invoke-mx.ts'

export const listContactsNetwork = () => invokeRestful(MxOrigin.contactBe, '/contacts', 'GET', {})
