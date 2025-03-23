<script setup lang="ts">
import { useListContactsQuery } from '@/contacts/data/local/ListContacts.ts'
import { refetchIfIdleFn } from '@/shared/local/refetch-if-idle-fn.ts'
import { RouterLink } from 'vue-router'

const { isFetching, refetch, data } = useListContactsQuery()
const refetchIfIdle = refetchIfIdleFn({ isFetching, refetch })
</script>

<template>
  <h1>
    List of Contacts
    <button class="link" @click="refetchIfIdle">
      {{ isFetching ? '⏳' : '🔄' }}
    </button>
    <router-link :to="{ name: 'contact-create' }">
      <button class="link">➕</button>
    </router-link>
  </h1>
  <ul>
    <template v-if="data?.length === 0">
      <li>(empty)</li>
    </template>
    <li v-for="contact in data" :key="contact.id">
      <RouterLink :to="{ name: 'contact-detail', params: { contactId: contact.id } }">
        {{ contact.id }}. {{ contact.mobileNumberE164 }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped></style>
