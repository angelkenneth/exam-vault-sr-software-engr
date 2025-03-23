import { QueryClient, useMutation } from '@tanstack/vue-query'
import type { ContactModel } from '@/contacts/data/entity/Contact.ts'
import type { CreateContactInput } from '@/contacts/data/entity/CreateContactInput.ts'
import { createContactNetwork } from '@/contacts/data/remote/CreateContacts.ts'
import { cond } from 'ramda'
import { elseResponse, when201 } from '@/shared/utility/when-response.ts'
import { doThrow } from '@/shared/local/do-throw.ts'
import { whenZodError } from '@/shared/utility/when-zod-error.ts'

export const useCreateContactMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (input: CreateContactInput): Promise<ContactModel> =>
      createContactNetwork(input).then(
        cond([when201((r) => r.jsonSync()), whenZodError(doThrow), elseResponse(doThrow)]),
      ),
    onSuccess: async (contact, contactId) => {
      queryClient.setQueryData(['contacts', contactId], contact)
      await queryClient.invalidateQueries({ queryKey: ['contacts'], exact: true })
    },
  })
