<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-links">
        <div 
          v-for="(link, index) in links" 
          :key="index"
          class="nav-item"
          @mouseenter="handleHover(index)"
          @mouseleave="handleLeave(index)"
        >
          <router-link 
            :to="link.path" 
            class="nav-link"
          >
            <span class="link-text">{{ link.name }}</span>
            <div class="underline" :class="{ 'active': activeIndex === index }"></div>
          </router-link>
          
          <div v-if="link.submenu" class="dropdown-menu" :class="{ 'active': activeIndex === index }">
            <router-link 
              v-for="(item, subIndex) in link.submenu" 
              :key="subIndex"
              :to="item.path"
              class="dropdown-item"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="logo">
        <img src="../assets/logo.png" alt="SnZ Logo">
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(null)

const links = [
  { 
    name: 'Интерьер', 
    path: '/Interior',
    submenu: [
      { name: 'Квартира 133м2', path: '/interior/apartment-133' },
      { name: 'Проект Роdium', path: '/interior/podium' },
      { name: 'Квартира 95м2', path: '/interior/apartment-95' },
      { name: 'Салон красоты Aneli', path: '/interior/aneli' },
      { name: 'Квартира 100м2', path: '/interior/apartment-100' }
    ]
  },
  { 
    name: 'Ландшафт', 
    path: '/Landscape',
    submenu: [
      { name: 'Французский сад', path: '/landscape/french-garden' },
      { name: 'Участок 83', path: '/landscape/plot-83' }
    ]
  },
  { 
    name: 'Архитектура', 
    path: '/Architecture',
    submenu: [
      { name: 'ЖК в г. Шали', path: '/architecture/shali' },
      { name: 'Цех для сборки медицинского оборудования', path: '/architecture/medical' },
      { name: 'Визит-центр Чарын', path: '/architecture/charyn' },
      { name: 'Визит-центр Алтын-Эмель', path: '/architecture/altyn-emel' },
      { name: 'Леруа Мерлен', path: '/architecture/leroy-merlin' },
      { name: 'ЖК Лемонадофф', path: '/architecture/lemonadoff' }
    ]
  },
  { name: 'Контакты', path: '/contacts' }
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
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  padding: 80px 2rem;
  background-color: #A3A69B;
  color: white;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 0 10%;
}

.nav-links {
  display: flex;
  gap: 12rem;
  margin-left: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
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

.dropdown-menu {
  font-size: 1.5rem;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  min-width: 250px;
  padding: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  color: white;
}

.dropdown-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 0.8rem 1.5rem;
  color: #1a1a1a;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.logo {
  margin-left: auto;
}

.logo img {
  height: 100px;
  width: auto;
}

@media (max-width: 768px) {
  .nav-links {
    gap: 2rem;
  }
  
  .nav-link {
    font-size: 1.1rem;
  }
  
  .dropdown-menu {
    position: fixed;
    top: auto;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style> 