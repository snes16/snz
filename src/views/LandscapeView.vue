<script setup lang="ts">
import { ref } from 'vue';
import ProjectCard from '../components/ProjectCard.vue'

// Mock data for landscape projects - will be replaced with API data later
const projects = ref([
  {
    id: 1,
    title: 'Частный сад',
    image: 'https://placehold.co/600x400?text=Ландшафт+1',
    description: 'Гармоничный ландшафтный дизайн с использованием местных растений и материалов.'
  },
  {
    id: 2,
    title: 'Общественный парк',
    image: 'https://placehold.co/600x400?text=Ландшафт+2',
    description: 'Современное общественное пространство с зонами отдыха и активного досуга.'
  },
  {
    id: 3,
    title: 'Озеленение территории',
    image: 'https://placehold.co/600x400?text=Ландшафт+3',
    description: 'Комплексное озеленение территории жилого комплекса с учетом местного климата.'
  }
]);
</script>

<template>
  <div class="landscape-page">
    <section class="hero">
      <h1 class="title">Ландшафт</h1>
      <p class="subtitle">Превращаем пространство в произведение искусства</p>
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
        <h2>Наш подход к ландшафтному дизайну</h2>
        <div class="content">
          <p>Мы создаем уникальные ландшафтные проекты, которые гармонично сочетают природную красоту с современными решениями. Наша команда специалистов учитывает все особенности участка и пожелания клиента.</p>
          <p>От концепции до реализации - мы сопровождаем каждый этап проекта, обеспечивая высокое качество и внимание к деталям. Наши ландшафты не только красивы, но и функциональны, экологичны и просты в уходе.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landscape-page {
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
