<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>You did it!</h2>
</template>

<style scoped></style>
