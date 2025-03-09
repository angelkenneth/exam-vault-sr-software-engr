<script setup lang="ts">
import { tryToSignOut } from '../network/SignOut.ts'
</script>

<template>
  <button @click="tryToSignOut">Sign Out</button>
</template>

<style></style>
