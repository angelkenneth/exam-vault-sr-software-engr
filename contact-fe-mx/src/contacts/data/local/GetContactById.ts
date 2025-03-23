import { useQuery } from '@tanstack/vue-query'
import type { ContactModel } from '@/contacts/data/entity/Contact.ts'
import { getContactByIdNetwork } from '@/contacts/data/remote/GetContactById.ts'

export const useGetContactByIdQuery = (contactId: number | void) =>
  useQuery<ContactModel | null>({
    queryKey: ['contacts', contactId],
    queryFn: () => (contactId ? getContactByIdNetwork(contactId).then((r) => r.jsonSync()) : null),
  })
