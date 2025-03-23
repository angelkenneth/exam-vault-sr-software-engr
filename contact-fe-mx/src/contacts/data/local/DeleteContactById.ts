import { QueryClient, useMutation } from '@tanstack/vue-query'
import type { ContactModel } from '@/contacts/data/entity/Contact.ts'
import { deleteContactByIdNetwork } from '@/contacts/data/remote/DeleteContactById.ts'

export const useDeleteContactByIdMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (contactId: number) =>
      deleteContactByIdNetwork(contactId).then((r) => r.jsonSync() as Promise<ContactModel>),
    onMutate: async (contactId) => {
      await queryClient.cancelQueries({ queryKey: ['contacts', contactId] })
    },
    onSuccess: async (contact, contactId) => {
      queryClient.setQueryData(['contacts', contactId], contact)
      await queryClient.invalidateQueries({ queryKey: ['contacts'], exact: true })
    },
  })
