<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow-x: hidden;
}

body {
  font-family: 'Century Gothic', sans-serif;
  background-color: #f8fafc;
  color: #1a1a1a;
  overflow-y: auto;
  padding-top: 80px;
  position: relative;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.03);
}
</style>
