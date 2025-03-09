<script setup lang="ts">
import { tryToSignInNetwork } from '@/users/network/SignIn.ts'
import { ref } from 'vue'
import { ifZodResponse } from '@/shared/utility/if-zod-response.ts'
import { zodMessageFromPath } from '@/shared/utility/zod-message-from-path.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const usernameError = ref('')
const password = ref('')
const passwordError = ref('')

const ableToSignIn = () => {
  username.value = ''
  usernameError.value = ''
  password.value = ''
  passwordError.value = ''
  router.push('/sign-out')
}

const tryToSignIn = async () => {
  usernameError.value = ''
  passwordError.value = ''
  await tryToSignInNetwork({ username: username.value, password: password.value })
    .then(ableToSignIn)
    .catch(
      ifZodResponse((zodError) => {
        usernameError.value = zodMessageFromPath(['username'], zodError) || ''
        passwordError.value = zodMessageFromPath(['password'], zodError) || ''
      }),
    )
}
</script>

<template>
  <div class="about">
    <h1>Please Sign In</h1>
    <form @submit.prevent="tryToSignIn">
      <input type="text" v-model="username" placeholder="Username" maxlength="32" required />
      <div>{{ usernameError }}</div>
      <input type="password" v-model="password" placeholder="Password" maxlength="64" required />
      <div>{{ passwordError }}</div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<style></style>
