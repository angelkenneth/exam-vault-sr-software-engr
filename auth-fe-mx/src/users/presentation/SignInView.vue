<script setup lang="ts">
import { tryToSignInNetwork } from '@/users/network/SignIn.ts'
import { ref } from 'vue'
import { whenZodError } from '@/shared/utility/when-zod-error.ts'
import { zodMessageFromPath } from '@/shared/utility/zod-message-from-path.ts'
import { useRouter } from 'vue-router'
import { cond } from 'ramda'
import { when200 } from '@/shared/utility/when-response.ts'
import type { GenericUserInput } from '@/users/entity/GenericUserInput.ts'

const router = useRouter()
const username = ref('')
const usernameError = ref('')
const password = ref('')
const passwordError = ref('')
const isSigningIn = ref(false)

const redirectToProfile = () => {
  const currentUrl = new URL(window.location.href)
  const redirectUri = currentUrl.searchParams.get('redirect_uri')
  if (redirectUri) {
    window.location.href = redirectUri
  } else {
    router.push({ name: 'profile' })
  }
}

const tryToSignIn = () => {
  if (isSigningIn.value) {
    return
  }
  isSigningIn.value = true
  usernameError.value = ''
  passwordError.value = ''
  tryToSignInNetwork({ username: username.value, password: password.value })
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
      isSigningIn.value = false
    })
}
</script>

<template>
  <div class="about">
    <h1>Please Sign In</h1>
    <form @submit.prevent="tryToSignIn">
      <input
        type="text"
        v-model="username"
        placeholder="Username"
        maxlength="32"
        required
        :disabled="isSigningIn"
      />
      <div>{{ usernameError }}</div>
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        maxlength="64"
        required
        :disabled="isSigningIn"
      />
      <div>{{ passwordError }}</div>
      <button type="submit" :disabled="isSigningIn">
        {{ isSigningIn ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

<style></style>
