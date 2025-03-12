<script setup lang="ts">
import { ref } from 'vue'
import { whenZodError } from '@/shared/utility/when-zod-error.ts'
import { zodMessageFromPath } from '@/shared/utility/zod-message-from-path.ts'
import { useRouter } from 'vue-router'
import { cond } from 'ramda'
import { when200 } from '@/shared/utility/when-response.ts'
import type { GenericUserInput } from '@/users/entity/GenericUserInput.ts'
import { tryToRegisterNetwork } from '@/users/network/Register.ts'

const router = useRouter()
const username = ref('')
const usernameError = ref('')
const password = ref('')
const passwordError = ref('')
const isRegisteringIn = ref(false)

const redirectToProfile = () => {
  router.push('/profile')
}

const tryToRegister = () => {
  if (isRegisteringIn.value) {
    return
  }
  isRegisteringIn.value = true
  usernameError.value = ''
  passwordError.value = ''
  tryToRegisterNetwork({ username: username.value, password: password.value })
    .then(
      cond([
        when200(redirectToProfile),
        whenZodError<GenericUserInput>((zodError) => {
          usernameError.value = zodMessageFromPath(['username'], zodError)
          passwordError.value = zodMessageFromPath(['password'], zodError)
        }),
      ]),
    )
    .finally(() => {
      isRegisteringIn.value = false
    })
}
</script>

<template>
  <div class="about">
    <h1>Register here</h1>
    <form @submit.prevent="tryToRegister">
      <input
        type="text"
        v-model="username"
        placeholder="Username"
        maxlength="32"
        required
        :disabled="isRegisteringIn"
      />
      <div>{{ usernameError }}</div>
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        maxlength="64"
        required
        :disabled="isRegisteringIn"
      />
      <div>{{ passwordError }}</div>
      <button type="submit" :disabled="isRegisteringIn">
        {{ isRegisteringIn ? 'Registering...' : 'Register' }}
      </button>
    </form>
  </div>
</template>

<style></style>
