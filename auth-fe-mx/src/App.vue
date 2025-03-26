<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationView from '@/navigation/presentation/NavigationView.vue'
</script>

<template>
  <header>
    <img
      alt="Logo by https://www.textstudio.com"
      class="logo"
      src="@/assets/logo.png"
      width="1024"
      height="352"
    />
  </header>
  <NavigationView />
  <RouterView />
</template>

<style scoped></style>
