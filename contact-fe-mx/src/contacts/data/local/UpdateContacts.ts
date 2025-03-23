import { QueryClient, useMutation } from '@tanstack/vue-query'
import type { ContactModel } from '@/contacts/data/entity/Contact.ts'
import type { IdInputPair } from '@/shared/network/id-input-pair.ts'
import { updateContactByIdNetwork } from '@/contacts/data/remote/UpdateContacts.ts'
import type { UpdateContactInput } from '@/contacts/data/entity/UpdateContactInput.ts'
import { cond } from 'ramda'
import { elseResponse, when200 } from '@/shared/utility/when-response.ts'
import { whenZodError } from '@/shared/utility/when-zod-error.ts'
import { doThrow } from '@/shared/local/do-throw.ts'

export const useUpdateContactByIdMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (input: IdInputPair<UpdateContactInput>): Promise<ContactModel> =>
      updateContactByIdNetwork(input.id, input.input).then(
        cond([when200((r) => r.jsonSync()), whenZodError(doThrow), elseResponse(doThrow)]),
      ),
    onSuccess: async (contact, contactId) => {
      queryClient.setQueryData(['contacts', contactId], contact)
      await queryClient.invalidateQueries({ queryKey: ['contacts'], exact: true })
    },
  })
