<script setup lang="ts">
import { tryToSignOutNetwork } from '../network/SignOut.ts'
import { useRouter } from 'vue-router'
import { cond } from 'ramda'
import { when200, when200Json, when401 } from '@/shared/utility/when-response.ts'
import { tryToGetMeNetwork } from '@/users/network/GetMe.ts'
import { computed, onMounted, ref } from 'vue'
import type { PublicUser } from '@/users/entity/User.ts'

const router = useRouter()
const publicUser = ref<PublicUser | null>(null)
const isKnowingMe = ref(false)
const isSigningOut = ref(false)
const isBusy = computed(() => isKnowingMe.value && isSigningOut.value)

const tryToSignOut = () => {
  if (isBusy.value) {
    return
  }
  isSigningOut.value = true
  tryToSignOutNetwork()
    .then(cond([when200(() => router.push('/sign-in'))]))
    .finally(() => {
      isSigningOut.value = false
    })
}

const tryToGetMe = () => {
  if (isBusy.value) {
    return
  }
  isKnowingMe.value = true
  tryToGetMeNetwork()
    .then(
      cond([
        when200Json((user: PublicUser) => {
          publicUser.value = user
        }),
        when401(() => {
          publicUser.value = null
          setTimeout(() => {
            router.push('/sign-in')
          }, 2000)
        }),
      ]),
    )
    .finally(() => {
      isKnowingMe.value = false
    })
}

onMounted(() => {
  tryToGetMe()
})
</script>

<template>
  <h1>
    {{
      isKnowingMe
        ? 'Loading...'
        : publicUser
          ? `Hello, ${publicUser.username}`
          : 'Redirecting to sign in page...'
    }}
  </h1>
  <button type="button" :disabled="isBusy" @click="tryToSignOut">
    {{ isSigningOut ? 'Signing out...' : 'Sign out' }}
  </button>
</template>

<style></style>
