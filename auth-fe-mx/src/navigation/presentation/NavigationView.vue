<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { MxOrigin } from '@/shared/network/mx-origin.ts'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <span>|</span>
    <RouterLink to="/register">Register</RouterLink>
    <span>|</span>
    <RouterLink to="/sign-in">Sign In</RouterLink>
    <span>|</span>
    <a :href="MxOrigin.contactFe">Contacts</a>
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
