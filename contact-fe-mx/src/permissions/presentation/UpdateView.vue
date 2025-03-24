<script setup lang="ts">
import { useGetPermissionByIdQuery } from '@/permissions/data/local/GetPermissionById.ts'
import { useRoute, useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import { useUpdatePermissionByIdMutation } from '@/permissions/data/local/UpdatePermission.ts'
import { ErrorMessage, useForm } from 'vee-validate'
import type { UpdatePermissionInput } from '@/permissions/data/entity/UpdatePermissionInput.ts'
import type { CreatePermissionInput } from '@/permissions/data/entity/CreatePermissionInput.ts'
import { isZodErrorObject } from '@/shared/utility/when-zod-error.ts'

const queryClient = useQueryClient()
const router = useRouter()
const route = useRoute()
const { contactId, permissionId } = route.params
const { data: permission } = useGetPermissionByIdQuery(Number(permissionId))
const { defineField, handleSubmit, setFieldError } = useForm<CreatePermissionInput>({
  initialValues: permission.value,
})
const [allowUpdate, allowUpdateAttrs] = defineField('allowUpdate')
const [allowDelete, allowDeleteAttrs] = defineField('allowDelete')
const { mutateAsync, isPending } = useUpdatePermissionByIdMutation(queryClient)
const disabled = isPending
const doMutate = (input: UpdatePermissionInput) => {
  if (isPending.value) {
    return
  }
  const permission_ = permission.value
  if (!permission_) {
    return
  }
  return mutateAsync(
    { id: permission_.id, input },
    {
      onSuccess: (permission) => {
        router.push({
          name: 'permission-detail',
          params: { contactId, permissionId: permission.id },
        })
      },
      onError: (error) => {
        if (isZodErrorObject(error)) {
          error.issues.forEach((issue) => {
            const path = issue.path.join('.') as keyof CreatePermissionInput
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
    <div>
      <input
        id="allowUpdate"
        type="checkbox"
        v-model="allowUpdate"
        v-bind="allowUpdateAttrs"
        :disabled="disabled"
      />
      <label for="allowUpdate">Allow Update?</label>
      <ErrorMessage name="allowUpdate" v-slot="{ message }"> ({{ message }})</ErrorMessage>
    </div>
    <div>
      <input
        id="allowDelete"
        type="checkbox"
        v-model="allowDelete"
        v-bind="allowDeleteAttrs"
        :disabled="disabled"
      />
      <label for="allowDelete">Allow Delete?</label>
      <ErrorMessage name="allowDelete" v-slot="{ message }"> ({{ message }})</ErrorMessage>
    </div>
    <div>
      <button type="submit" :disabled="disabled">
        {{ isPending ? 'Updating...' : 'Update' }}
      </button>
      &nbsp;
      <RouterLink :to="{ name: 'permission-list', params: { contactId, permissionId } }">
        Cancel
      </RouterLink>
    </div>
  </form>
</template>

<style scoped>
form {
  display: grid;
}
</style>
