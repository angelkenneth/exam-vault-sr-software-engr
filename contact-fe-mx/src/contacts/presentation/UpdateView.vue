<script setup lang="ts">
import { useGetContactByIdQuery } from '@/contacts/data/local/GetContactById.ts'
import { useRoute, useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import { useUpdateContactByIdMutation } from '@/contacts/data/local/UpdateContacts.ts'
import { ErrorMessage, useForm } from 'vee-validate'
import type { UpdateContactInput } from '@/contacts/data/entity/UpdateContactInput.ts'
import type { CreateContactInput } from '@/contacts/data/entity/CreateContactInput.ts'
import { isZodErrorObject } from '@/shared/utility/when-zod-error.ts'

const queryClient = useQueryClient()
const route = useRoute()
const router = useRouter()
const { contactId } = route.params
const { data: contact } = useGetContactByIdQuery(Number(contactId))
const { defineField, handleSubmit, setFieldError } = useForm<CreateContactInput>({
  initialValues: contact.value,
})
const [mobileNumberE164, mobileNumberE164Attrs] = defineField('mobileNumberE164')
const { mutateAsync, isPending } = useUpdateContactByIdMutation(queryClient)
const disabled = isPending
const doMutate = (input: UpdateContactInput) => {
  if (isPending.value) {
    return
  }
  const contact_ = contact.value
  if (!contact_) {
    return
  }
  return mutateAsync(
    { id: contact_.id, input },
    {
      onSuccess: (contact) => {
        router.push({
          name: 'contact-detail',
          params: { contactId: contact.id },
        })
      },
      onError: (error) => {
        if (isZodErrorObject(error)) {
          error.issues.forEach((issue) => {
            const path = issue.path.join('.') as keyof CreateContactInput
            setFieldError(path, issue.message)
          })
          return true
        }
        throw error
      },
    },
  )
}
const doSubmit = handleSubmit.withControlled(doMutate)
</script>

<template>
  <form @submit.prevent="doSubmit">
    <label for="mobileNumberE164">Mobile Number</label>
    <input
      id="mobileNumberE164"
      type="tel"
      v-model="mobileNumberE164"
      v-bind="mobileNumberE164Attrs"
      :disabled="disabled"
    />
    <ErrorMessage name="mobileNumberE164" v-slot="{ message }"> ({{ message }})</ErrorMessage>
    <div>
      <button type="submit" :disabled="disabled">
        {{ isPending ? 'Updating...' : 'Update' }}
      </button>
      &nbsp;
      <RouterLink :to="{ name: 'contact-detail', params: { contactId } }">Cancel</RouterLink>
    </div>
  </form>
</template>

<style scoped>
form {
  display: grid;
}
</style>
