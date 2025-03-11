<script setup lang="ts">
import { tryToSignOutNetwork } from '../network/SignOut.ts'
import { useRouter } from 'vue-router'
import { cond } from 'ramda'
import { when200 } from '@/shared/utility/when-response.ts'

const router = useRouter()

const tryToSignOut = () =>
  tryToSignOutNetwork().then(cond([when200(() => router.push('/sign-in'))]))
</script>

<template>
  <button @click="tryToSignOut">Sign Out</button>
</template>

<style></style>
