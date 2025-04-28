<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  overflow-x: hidden;
}

/* Small mobile styles */
@media (max-width: 480px) {
  .app {
    padding: 0 15px;
  }
}
</style>
