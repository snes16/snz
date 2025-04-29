<script setup lang="ts">
import { ref } from 'vue';
import ProjectCard from '../components/ProjectCard.vue'

// Mock data for architecture projects - will be replaced with API data later
const projects = ref([
  {
    id: 1,
    title: 'Жилой дом в Алматы',
    image: 'https://placehold.co/600x400?text=Архитектура+1',
    description: 'Современный жилой дом с панорамными окнами и открытой планировкой.'
  },
  {
    id: 2,
    title: 'Офисное здание',
    image: 'https://placehold.co/600x400?text=Архитектура+2',
    description: 'Инновационное офисное пространство с акцентом на экологичность и комфорт.'
  },
  {
    id: 3,
    title: 'Загородный дом',
    image: 'https://placehold.co/600x400?text=Архитектура+3',
    description: 'Уютный загородный дом, интегрированный в природный ландшафт.'
  }
]);
</script>

<template>
  <div class="architecture-page">
    <section class="hero">
      <h1 class="title">Архитектура</h1>
      <p class="subtitle">Создаем будущее в архитектуре</p>
    </section>

    <section class="projects">
      <div class="container">
        <div class="grid">
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
        <h2>Наш подход к архитектуре</h2>
        <div class="content">
          <p>Мы создаем архитектурные проекты, которые сочетают в себе современные технологии, экологичность и эстетику. Наша команда архитекторов работает над созданием уникальных пространств, которые отвечают всем требованиям клиента.</p>
          <p>От концепции до реализации - мы уделяем внимание каждой детали, создавая здания, которые не только красивы, но и функциональны, энергоэффективны и удобны для жизни.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.architecture-page {

}

.hero {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/project1.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  margin-bottom: 4rem;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.about {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.about h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
