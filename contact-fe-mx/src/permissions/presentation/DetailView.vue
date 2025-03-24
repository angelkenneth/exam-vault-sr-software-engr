<script setup lang="ts">
import { useGetPermissionByIdQuery } from '@/permissions/data/local/GetPermissionById.ts'
import { RouterLink, useRoute } from 'vue-router'
import { refetchIfIdleFn } from '@/shared/local/refetch-if-idle-fn.ts'
import DeleteButton from '@/permissions/presentation/DeleteButton.vue'

const route = useRoute()
const { permissionId } = route.params
const { isFetching, refetch, data: permission } = useGetPermissionByIdQuery(Number(permissionId))
const refetchIfIdle = refetchIfIdleFn({ isFetching, refetch })
</script>

<template>
  <h1>
    {{ permissionId }}.
    <template v-if="permission">
      Contact № {{ permission.contactId }} shared to User № {{ permission.sharedToId }}
    </template>
    <button class="link" @click="refetchIfIdle" :title="isFetching ? 'Refreshing...' : 'Refresh'">
      {{ isFetching ? '⏳' : '🔄' }}
    </button>
    <DeleteButton />
    <router-link :to="{ name: 'permission-update', params: { permissionId: permissionId } }">
      <button class="link" @click="refetchIfIdle" title="Update">✏️</button>
    </router-link>
  </h1>
  <pre>{{ JSON.stringify(permission, null, 2) }}</pre>
</template>

<style scoped></style>
