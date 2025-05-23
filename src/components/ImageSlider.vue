<template>
  <div class="slider-container">
    <div class="slider-wrapper" ref="sliderWrapper">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="slide"
        :class="{ active: currentIndex === index }"
      >
        <img :src="image.url" :alt="image.alt" />
      </div>
    </div>
    
    <div class="slider-controls">
      <button @click="prevSlide" class="control prev">&lt;</button>
      <div class="indicators">
        <span 
          v-for="(_, index) in images" 
          :key="index" 
          class="indicator"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
      <button @click="nextSlide" class="control next">&gt;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Placeholder images until API endpoint is provided
const images = ref([
  { 
    url: 'https://snzproject.com/wp-content/uploads/2023/12/m1.png',
    alt: 'Architecture Project 1' 
  },
  { 
    url: 'https://snzproject.com/wp-content/uploads/2023/12/spalnya-1-2.png',
    alt: 'Interior Design 1' 
  },
  { 
    url: 'https://snzproject.com/wp-content/uploads/2023/12/ek2.png',
    alt: 'Landscape Project 1' 
  },
]);

const currentIndex = ref(0);
const sliderWrapper = ref<HTMLElement | null>(null);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

let intervalId: number;

onMounted(() => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 5000);

  return () => {
    clearInterval(intervalId);
  };
});
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 600px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-inline: auto;
}

.slider-wrapper {
  position: relative;
  height: 600px;
  width: 600px;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-controls {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 50px;
}

.control {
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.3s;
}

.control:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.indicators {
  display: flex;
  gap: 8px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: white;
}
</style>
