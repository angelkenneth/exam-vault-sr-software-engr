<script setup lang="ts">
import { tryToSignOutNetwork } from '../network/SignOut.ts'
import { useRouter } from 'vue-router'
import { cond } from 'ramda'
import { when200, when200Json, when401 } from '@/shared/utility/when-response.ts'
import { tryToGetMeNetwork } from '@/users/network/GetMe.ts'
import { onMounted, ref } from 'vue'
import type { PublicUser } from '@/users/entity/User.ts'

const router = useRouter()
const publicUser = ref<PublicUser | null>(null)
const isLoading = ref(true)

const tryToSignOut = () =>
  tryToSignOutNetwork().then(cond([when200(() => router.push('/sign-in'))]))

const tryToGetMe = () =>
  tryToGetMeNetwork().then(
    cond([
      when200Json((user: PublicUser) => {
        publicUser.value = user
        isLoading.value = false
      }),
      when401(() => router.push('/sign-in')),
    ]),
  )

onMounted(() => {
  tryToGetMe()
})
</script>

<template>
  <button @click="tryToSignOut">Sign Out</button>
</template>

<style></style>
