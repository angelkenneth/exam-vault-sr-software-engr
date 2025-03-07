<script setup lang="ts">
import { tryToSignOut } from '@/network/sign-out.ts'
</script>

<template>
  <div class="about">
    <button @click="tryToSignOut">Sign Out</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
