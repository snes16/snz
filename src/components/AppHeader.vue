<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const isMobileMenuOpen = ref(false);
const route = useRoute();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Mock data for project dropdown menus - will be replaced with API data later
const architectureProjects = [
  { id: 1, title: 'Жилой дом в Алматы', path: '/architecture#project1' },
  { id: 2, title: 'Офисное здание', path: '/architecture#project2' },
  { id: 3, title: 'Загородный дом', path: '/architecture#project3' },
];

const interiorProjects = [
  { id: 1, title: 'Минималистичная квартира', path: '/interior#project1' },
  { id: 2, title: 'Загородный дом', path: '/interior#project2' },
  { id: 3, title: 'Офисное пространство', path: '/interior#project3' },
];

const landscapeProjects = [
  { id: 1, title: 'Частный сад', path: '/landscape#project1' },
  { id: 2, title: 'Общественный парк', path: '/landscape#project2' },
  { id: 3, title: 'Озеленение территории', path: '/landscape#project3' },
];

// Determine which dropdown should be active based on current route
const activeSection = computed(() => {
  const path = route.path;
  if (path.includes('architecture')) return 'architecture';
  if (path.includes('interior')) return 'interior';
  if (path.includes('landscape')) return 'landscape';
  return null;
});
</script>

<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <h1>SnZ</h1>
      </router-link>
    </div>
    
    <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <nav class="navigation" :class="{ 'mobile-open': isMobileMenuOpen }">
      <ul class="nav-links">
        <li class="nav-item" :class="{ 'active': activeSection === 'architecture' }">
          <router-link to="/architecture">Архитектура</router-link>
          <div class="dropdown-menu" v-if="activeSection === 'architecture'">
            <ul>
              <li v-for="project in architectureProjects" :key="project.id">
                <router-link :to="project.path">{{ project.title }}</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" :class="{ 'active': activeSection === 'interior' }">
          <router-link to="/interior">Интерьер</router-link>
          <div class="dropdown-menu" v-if="activeSection === 'interior'">
            <ul>
              <li v-for="project in interiorProjects" :key="project.id">
                <router-link :to="project.path">{{ project.title }}</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" :class="{ 'active': activeSection === 'landscape' }">
          <router-link to="/landscape">Ландшафт</router-link>
          <div class="dropdown-menu" v-if="activeSection === 'landscape'">
            <ul>
              <li v-for="project in landscapeProjects" :key="project.id">
                <router-link :to="project.path">{{ project.title }}</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <router-link to="/contacts">Контакты</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  position: relative;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 20;
}

.logo a {
  text-decoration: none;
  color: inherit;
}

.navigation {
  flex: 1;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  justify-content: flex-end;
}

.nav-item {
  position: relative;
}

.nav-item.active a {
  font-weight: 700;
  color: #333;
}

.nav-links a {
  font-weight: 500;
  transition: color 0.3s;
  text-decoration: none;
  color: #555;
}

.nav-links a:hover {
  color: #333;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 0;
  min-width: 200px;
  z-index: 30;
  margin-top: 10px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
}

.dropdown-menu li {
  padding: 0;
}

.dropdown-menu a {
  display: block;
  padding: 8px 15px;
  font-weight: 400;
  font-size: 0.95rem;
}

.dropdown-menu a:hover {
  background-color: #f5f5f5;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 20;
}

.mobile-menu-toggle span {
  width: 100%;
  height: 3px;
  background-color: #333;
  transition: all 0.3s ease;
}

/* Mobile styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .navigation {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background-color: white;
    z-index: 10;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    padding: 80px 20px 20px;
  }
  
  .navigation.mobile-open {
    right: 0;
  }
  
  .nav-links {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    padding: 10px 0 10px 15px;
    margin-top: 5px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .header {
    padding: 15px 0;
  }
  
  .navigation {
    width: 85%;
  }
}
</style>
