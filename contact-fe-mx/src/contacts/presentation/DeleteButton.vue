<script setup lang="ts">
import { useGetContactByIdQuery } from '@/contacts/data/local/GetContactById.ts'
import { useRoute, useRouter } from 'vue-router'
import { useDeleteContactByIdMutation } from '@/contacts/data/local/DeleteContactById.ts'
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
const route = useRoute()
const router = useRouter()
const { contactId } = route.params
const { data: contact } = useGetContactByIdQuery(Number(contactId))
const { mutate, isPending } = useDeleteContactByIdMutation(queryClient)
const doMutate = () => {
  if (isPending.value) {
    return
  }
  const contact_ = contact.value
  if (!contact_) {
    return
  }
  const sure = confirm(`Delete ${contact_.mobileNumberE164}?`)
  if (sure) {
    mutate(contact_.id, {
      onSuccess: () => {
        router.push({ name: 'contact-list' })
      },
    })
  }
}
</script>

<template>
  <button class="link" @click="doMutate">
    {{ isPending ? '⏳' : '🗑️' }}
  </button>
</template>

<style scoped></style>
