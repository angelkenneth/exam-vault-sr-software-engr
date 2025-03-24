<script setup lang="ts">
import { useGetPermissionByIdQuery } from '@/permissions/data/local/GetPermissionById.ts'
import { useRoute, useRouter } from 'vue-router'
import { useDeletePermissionByIdMutation } from '@/permissions/data/local/DeletePermissionById.ts'
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
const route = useRoute()
const router = useRouter()
const { permissionId } = route.params
const { data: permission } = useGetPermissionByIdQuery(Number(permissionId))
const { mutate, isPending } = useDeletePermissionByIdMutation(queryClient)
const doMutate = () => {
  if (isPending.value) {
    return
  }
  const permission_ = permission.value
  if (!permission_) {
    return
  }
  const sure = confirm(
    `Unshared contact № ${permission_.contactId} from user № ${permission_.sharedToId}?`,
  )
  if (sure) {
    mutate(permission_.id, {
      onSuccess: () => {
        router.push({ name: 'permission-list' })
      },
    })
  }
}
</script>

<template>
  <button class="link" @click="doMutate" :title="isPending ? 'Deleting...' : 'Delete'">
    {{ isPending ? '⏳' : '🗑️' }}
  </button>
</template>

<style scoped></style>
