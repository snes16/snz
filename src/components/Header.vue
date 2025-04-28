<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-links">
        <router-link 
          v-for="(link, index) in links" 
          :key="index" 
          :to="link.path" 
          class="nav-link"
          @mouseenter="handleHover(index)"
          @mouseleave="handleLeave(index)"
        >
          <span class="link-text">{{ link.name }}</span>
          <div class="underline" :class="{ 'active': activeIndex === index }"></div>
        </router-link>
      </div>
      <div class="logo"
      :to="{ name: 'Главная', path: '/' }" >
        <img src="../assets/logo.svg" alt="SnZ Logo">
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(null)

const links = [
  { name: 'Интерьер', path: '/Interior' },
  { name: 'Ландшафт', path: '/Landscape' },
  { name: 'Архитектура', path: '/Architecture' },
  { name: 'Контакты', path: '/contact' }
]

const handleHover = (index: number) => {
  activeIndex.value = index
}

const handleLeave = () => {
  activeIndex.value = null
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  gap: 6rem;
  margin-left: 2rem;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: #1a1a1a;
  font-size: 1.3rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  letter-spacing: 0.5px;
}

.nav-link:hover {
  color: #2563eb;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #2563eb;
  transition: width 0.3s ease;
}

.underline.active {
  width: 100%;
}

.logo {
  margin-left: auto;
}

.logo img {
  height: 40px;
  width: auto;
}
</style> 