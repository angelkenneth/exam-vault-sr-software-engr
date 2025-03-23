import { useQuery } from '@tanstack/vue-query'
import type { ContactModel } from '@/contacts/data/entity/Contact.ts'
import { listContactsNetwork } from '@/contacts/data/remote/ListContacts.ts'

export const useListContactsQuery = () =>
  useQuery<ContactModel[]>({
    queryKey: ['contacts'],
    queryFn: () => listContactsNetwork().then((r) => r.jsonSync()),
  })
