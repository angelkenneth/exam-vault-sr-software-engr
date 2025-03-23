<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { MxOrigin } from '@/shared/network/mx-origin.ts'
import { useGetMeQuery } from '@/session/data/local/GetMe.ts'

const { data: user } = useGetMeQuery()
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <span>|</span>
    <template v-if="user">
      <a :href="MxOrigin.authFe + '/sign-out'">Sign Out</a>
    </template>
    <template v-else>
      <a :href="MxOrigin.authFe + '/sign-in'">Sign In</a>
    </template>
  </nav>
</template>

<style scoped>
nav {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
