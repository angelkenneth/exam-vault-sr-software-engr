<script setup lang="ts">
import { useGetContactByIdQuery } from '@/contacts/data/local/GetContactById.ts'
import { RouterLink, useRoute } from 'vue-router'
import { refetchIfIdleFn } from '@/shared/local/refetch-if-idle-fn.ts'
import DeleteButton from '@/contacts/presentation/DeleteButton.vue'

const route = useRoute()
const { contactId } = route.params
const { isFetching, refetch, data: contact } = useGetContactByIdQuery(Number(contactId))
const refetchIfIdle = refetchIfIdleFn({ isFetching, refetch })
</script>

<template>
  <h1>
    {{ contactId }}.
    {{ contact ? contact.mobileNumberE164 : 'Loading...' }}
    <button class="link" @click="refetchIfIdle" :title="isFetching ? 'Refreshing...' : 'Refresh'">
      {{ isFetching ? '⏳' : '🔄' }}
    </button>
    <DeleteButton />
    <router-link :to="{ name: 'contact-update', params: { contactId: contactId } }">
      <button class="link" @click="refetchIfIdle" title="Update">✏️</button>
    </router-link>
    <router-link :to="{ name: 'permission-list', params: { contactId: contactId } }">
      <button class="link share" title="Sharing">↩️</button>
    </router-link>
  </h1>
  <pre>{{ JSON.stringify(contact, null, 2) }}</pre>
</template>

<style scoped>
.share {
  rotate: 180deg;
}
</style>
