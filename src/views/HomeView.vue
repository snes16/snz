<script setup lang="ts">
import ImageSlider from '../components/ImageSlider.vue';
</script>

<template>
  <main class="main-content">
    <div class="description">
      <p>
        SnZ Project — проектное бюро в Алматы. Проектируем архитектуру, интерьеры и
        ландшафты, в которых всё продумано до мелочей. Любим нестандартные задачи,
        работаем с контекстом, историей места и образом жизни заказчика. Создаём
        пространства для жизни.
      </p>
    </div>
    
    <div class="slider">
      <ImageSlider />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  display: flex;
  gap: 40px;
  align-items: center;
  height: 800px;
}

.description {
  flex: 1;
  font-size: 1.5rem;
  line-height: 1.6;
  margin-left: 120px;
}

.slider {
  flex: 1;
  width: 600px;
}

/* Tablet styles */
@media (max-width: 1024px) {
  .main-content {
    gap: 30px;
    margin-top: 40px;
  }
  
  .description {
    font-size: 1rem;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    margin-top: 30px;
    gap: 30px;
  }
  
  .description {
    order: 2;
  }
  
  .slider {
    order: 1;
    width: 100%;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .main-content {
    margin-top: 20px;
    gap: 20px;
  }
  
  .description {
    font-size: 0.95rem;
  }
}
</style>
