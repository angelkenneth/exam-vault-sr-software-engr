<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import { ErrorMessage, useForm } from 'vee-validate'
import type { CreatePermissionInput } from '@/permissions/data/entity/CreatePermissionInput.ts'
import { useCreatePermissionMutation } from '@/permissions/data/local/CreatePermission.ts'
import { isZodErrorObject } from '@/shared/utility/when-zod-error.ts'

const queryClient = useQueryClient()
const router = useRouter()
const route = useRoute()
const { contactId } = route.params
const { defineField, handleSubmit, setFieldError } = useForm<CreatePermissionInput>()
const [sharedToUsername, sharedToUsernameAttrs] = defineField('sharedToUsername')
const [allowUpdate, allowUpdateAttrs] = defineField('allowUpdate')
const [allowDelete, allowDeleteAttrs] = defineField('allowDelete')
const { mutateAsync, isPending } = useCreatePermissionMutation(queryClient)
const disabled = isPending
const doMutate = (input_: CreatePermissionInput) => {
  if (isPending.value) {
    return
  }
  const input = { ...input_, contactId: Number(contactId) }
  return mutateAsync(input, {
    onSuccess: (permission) => {
      router.push({
        name: 'permission-detail',
        params: { permissionId: permission.id },
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
  })
}
const doSubmit = handleSubmit.withControlled(doMutate)
</script>

<template>
  <form @submit.prevent="doSubmit">
    <label for="sharedToUsername">Username</label>
    <!-- TODO use username -->
    <input
      id="sharedToUsername"
      type="text"
      v-model="sharedToUsername"
      v-bind="sharedToUsernameAttrs"
      :disabled="disabled"
    />
    <ErrorMessage name="sharedToUsername" v-slot="{ message }"> ({{ message }})</ErrorMessage>
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
        {{ isPending ? 'Creating...' : 'Create' }}
      </button>
      &nbsp;
      <RouterLink :to="{ name: 'permission-list', params: { contactId } }">Cancel</RouterLink>
    </div>
  </form>
</template>

<style scoped>
form {
  display: grid;
}
</style>
