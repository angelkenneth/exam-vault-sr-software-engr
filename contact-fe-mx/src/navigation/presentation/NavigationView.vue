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
    <a :href="MxOrigin.authFe">
      {{ user ? 'Sign Out' : 'Sign In' }}
    </a>
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
