<script setup lang="ts">
import { ref } from 'vue';

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
  <div class="category-view">
    <h1 class="category-title">Ландшафт</h1>
    
    <div class="projects-container">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-image">
          <img :src="project.image" :alt="project.title">
        </div>
        <div class="project-info">
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-description">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-view {
  padding: 40px 0;
}

.category-title {
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: 500;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
}

.project-card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-info {
  padding: 20px;
}

.project-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 500;
}

.project-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .category-view {
    padding: 30px 0;
  }
  
  .category-title {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  .projects-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
