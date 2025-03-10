<script setup lang="ts">
import { tryToSignOutNetwork } from '../network/SignOut.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const tryToSignOut = async () => {
  await tryToSignOutNetwork()
  await router.push('/sign-in')
}
</script>

<template>
  <button @click="tryToSignOut">Sign Out</button>
</template>

<style></style>
