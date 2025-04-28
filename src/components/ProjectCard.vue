<template>
  <div class="project-card" :class="{ 'hovered': isHovered }" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="image-container">
      <img :src="image" :alt="title" class="project-image">
      <div class="overlay">
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  image: string
  title: string
  description: string
}>()

const isHovered = ref(false)
</script>

<style scoped>
.project-card {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 3rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.project-card.hovered .overlay {
  transform: translateY(0);
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 300;
}

@media (max-width: 768px) {
  .project-card {
    height: 60vh;
    min-height: 400px;
  }
  
  .overlay {
    padding: 2rem;
  }
  
  .title {
    font-size: 1.5rem;
  }
}
</style> 