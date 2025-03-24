<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import { ErrorMessage, useForm } from 'vee-validate'
import type { CreateContactInput } from '@/contacts/data/entity/CreateContactInput.ts'
import { useCreateContactMutation } from '@/contacts/data/local/CreateContacts.ts'
import { isZodErrorObject } from '@/shared/utility/when-zod-error.ts'

const queryClient = useQueryClient()
const router = useRouter()
const { defineField, handleSubmit, setFieldError } = useForm<CreateContactInput>()
const [mobileNumberE164, mobileNumberE164Attrs] = defineField('mobileNumberE164')
const { mutateAsync, isPending } = useCreateContactMutation(queryClient)
const disabled = isPending
const doMutate = (input: CreateContactInput) => {
  if (isPending.value) {
    return
  }
  return mutateAsync(input, {
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
  })
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
        {{ isPending ? 'Creating...' : 'Create' }}
      </button>
      &nbsp;
      <RouterLink :to="{ name: 'contact-list' }">Cancel</RouterLink>
    </div>
  </form>
</template>

<style scoped>
form {
  display: grid;
}
</style>
