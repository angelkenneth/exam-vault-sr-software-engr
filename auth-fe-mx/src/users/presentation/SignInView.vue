<script setup lang="ts">
import { tryToSignInNetwork } from '@/users/network/SignIn.ts'
import { ref } from 'vue'
import { whenZodError } from '@/shared/utility/when-zod-error.ts'
import { zodMessageFromPath } from '@/shared/utility/zod-message-from-path.ts'
import { useRouter } from 'vue-router'
import { cond } from 'ramda'
import { when200 } from '@/shared/utility/when-response.ts'
import type { SignInInput } from '@/users/entity/SignIn.ts'
import type { EmptyShape } from '@/shared/data/empty.ts'

const router = useRouter()
const username = ref('')
const usernameError = ref('')
const password = ref('')
const passwordError = ref('')

const redirectToProfile = () => {
  router.push('/profile')
}

const tryToSignIn = () => {
  usernameError.value = ''
  passwordError.value = ''
  tryToSignInNetwork({ username: username.value, password: password.value }).then(
    cond([
      when200<EmptyShape>(redirectToProfile),
      whenZodError<SignInInput>((zodError) => {
        usernameError.value = zodMessageFromPath(['username'], zodError)
        passwordError.value = zodMessageFromPath(['password'], zodError)
      }),
    ]),
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
