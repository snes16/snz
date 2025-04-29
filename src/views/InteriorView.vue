<script setup lang="ts">
import { ref } from 'vue';
import ProjectCard from '../components/ProjectCard.vue'

// Mock data for interior projects - will be replaced with API data later
const projects = ref([
  {
    id: 1,
    title: 'Минималистичная квартира',
    image: 'https://placehold.co/1200x800?text=Интерьер+1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 2,
    title: 'Загородный дом',
    image: 'https://placehold.co/1200x800?text=Интерьер+2',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 3,
    title: 'Офисное пространство',
    image: 'https://placehold.co/1200x800?text=Интерьер+3',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
]);
</script>

<template>
  <div class="interior-page">
    <section class="hero">
      <h1 class="title">Интерьер</h1>
      <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </section>

    <section class="projects">
      <div class="container">
        <div class="projects-list">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="index"
            :image="project.image"
            :title="project.title"
            :description="project.description"
          />
        </div>
      </div>
    </section>

    <section class="about">
      <div class="container">
        <h2>О нашем подходе</h2>
        <div class="content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.interior-page {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
}

.hero {
  height: 50vh;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/src/assets/project1.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 4rem;
  width: 100%;
}

.about {
  padding: 4rem 0;
  background-color: #fafafa;
}

.about h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.content p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  font-weight: 300;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .content {
    grid-template-columns: 1fr;
  }
  
  .hero {
    height: 40vh;
  }
}
</style>
