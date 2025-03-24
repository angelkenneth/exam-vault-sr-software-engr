<script setup lang="ts">
import { useListPermissionsQuery } from '@/permissions/data/local/ListPermissions.ts'
import { refetchIfIdleFn } from '@/shared/local/refetch-if-idle-fn.ts'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const { contactId } = route.params
const { isFetching, refetch, data } = useListPermissionsQuery()
const refetchIfIdle = refetchIfIdleFn({ isFetching, refetch })
</script>

<template>
  <h1>
    <RouterLink :to="{ name: 'contact-detail', params: { contactId: contactId } }">
      № {{ contactId }}
    </RouterLink>
    &gt;
    List of Permissions
    <button class="link" @click="refetchIfIdle">
      {{ isFetching ? '⏳' : '🔄' }}
    </button>
    <router-link :to="{ name: 'permission-create' }">
      <button class="link">➕</button>
    </router-link>
  </h1>
  <ul>
    <template v-if="data?.length === 0">
      <li>(empty)</li>
    </template>
    <li v-for="permission in data" :key="permission.id">
      <RouterLink :to="{ name: 'permission-detail', params: { permissionId: permission.id } }">
        {{ permission.id }}. Contact № {{ permission.contactId }} shared to User №
        {{ permission.sharedToId }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped></style>
