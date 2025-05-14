<script setup lang="ts">
import { ref, onMounted } from 'vue';
import image65 from '../assets/slider/65.webp';
import image66 from '../assets/slider/66.webp';
import image67 from '../assets/slider/67.webp';
import image68 from '../assets/slider/68.webp';
import image69 from '../assets/slider/69.webp';

// Данные о проектах в разделе Ландшафт
const projects = ref([
  {
    id: 'french-garden',
    title: 'Французский сад',
    images: [
      image65,
      image66,
      image67,
      image68,
      image69,
    ],
    description: 'Проект классического французского сада для частного участка в Алматы. Концепция строится на симметрии, балансе и главной оси, проходящей через весь сад. Архитектурная строгость формованных лип и осевой дорожки смягчается природными элементами: фонтаном-прудом, спроектированным по принципам фен-шуй, прогулочной аллеей с кипарисами и ароматной лавандой, уединенной зоной отдыха с качелями и несколькими точками с классической уличной мебелью. Пространство сочетает регулярную структуру с живыми ароматами и звуками воды, создавая атмосферу гармонии и спокойствия.',
    year: '2025',
    location: 'Частный участок, Алматы'
  },
  {
    id: 'city-square',
    title: 'Территория Зоны семейного отдыха',
    images: [
      'https://snzproject.com/wp-content/uploads/2023/12/r6.png',
    ],
    description: 'Общественное пространство, спроектированное с использованием экологичных материалов и принципов устойчивого развития. В проекте предусмотрены зоны для различных видов отдыха, сохранены существующие деревья.',
    year: '2023',
    location: 'Алматинская обл., Верхняя Каскеленская трасса, п. Жандасово'
  }
]);

// Активный проект для подсветки в меню
const activeProject = ref<string | null>(null);
// Текущий индекс изображения для каждого слайдера
const currentImageIndex = ref<Record<string, number>>({});
// Состояние загрузки для каждого слайдера
const loadingStates = ref<Record<string, boolean>>({});

// Инициализация состояний
projects.value.forEach(project => {
  currentImageIndex.value[project.id] = 0;
  loadingStates.value[project.id] = false;
});

// Предзагрузка соседних изображений
const preloadImages = (projectId: string) => {
  const project = projects.value.find(p => p.id === projectId);
  if (!project) return;

  const current = currentImageIndex.value[projectId];
  const next = (current + 1) % project.images.length;
  const prev = (current - 1 + project.images.length) % project.images.length;

  [current, next, prev].forEach(index => {
    const img = new Image();
    img.src = project.images[index];
  });
};

// Функции для управления слайдерами
const nextImage = (projectId: string) => {
  const project = projects.value.find(p => p.id === projectId);
  if (project && project.images.length > 1) {
    loadingStates.value[projectId] = true;
    currentImageIndex.value[projectId] =
        (currentImageIndex.value[projectId] + 1) % project.images.length;
    preloadImages(projectId);
  }
};

const prevImage = (projectId: string) => {
  const project = projects.value.find(p => p.id === projectId);
  if (project && project.images.length > 1) {
    loadingStates.value[projectId] = true;
    currentImageIndex.value[projectId] =
        (currentImageIndex.value[projectId] - 1 + project.images.length) % project.images.length;
    preloadImages(projectId);
  };
};

const onImageLoad = (projectId: string) => {
  loadingStates.value[projectId] = false;
};

// Функция для скролла к нужному проекту
const scrollToProject = (projectId: string) => {
  const element = document.getElementById(projectId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Обработчик скролла для отслеживания видимых проектов
const handleScroll = () => {
  const projectElements = projects.value.map(project => ({
    id: project.id,
    element: document.getElementById(project.id)
  }));

  for (const { id, element } of projectElements) {
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom >= 200) {
        activeProject.value = id;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  // Предзагрузка изображений для всех проектов
  projects.value.forEach(project => {
    // Предзагружаем первое изображение и соседние
    preloadImages(project.id);

    // Предзагружаем все остальные изображения в фоне
    setTimeout(() => {
      project.images.forEach(img => {
        const image = new Image();
        image.src = img;
      });
    }, 1000);
  });

  if (projects.value.length > 0) {
    activeProject.value = projects.value[0].id;
  }
});
</script>

<template>
  <div class="landscape-page">
    <div class="page-container">
      <!-- Фиксированная левая панель с навигацией по проектам -->
      <aside class="sidebar">
        <h1 class="page-title">Ландшафт</h1>
        <nav class="project-nav">
          <ul>
            <li v-for="project in projects" :key="project.id">
              <a
                  href="javascript:void(0)"
                  @click="scrollToProject(project.id)"
                  :class="{ active: activeProject === project.id }"
              >
                {{ project.title }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Скроллящаяся правая часть с проектами -->
      <main class="content">
        <div
            v-for="project in projects"
            :key="project.id"
            :id="project.id"
            class="project-card"
        >
          <div class="project-slider">
            <div class="slider-container">
              <div v-if="loadingStates[project.id]" class="loading-indicator">
                <div class="spinner"></div>
              </div>
              <img
                  :src="project.images[currentImageIndex[project.id]]"
                  :alt="project.title"
                  class="slider-image"
                  @load="onImageLoad(project.id)"
              >
              <button
                  v-if="project.images.length > 1"
                  class="slider-button prev"
                  @click="prevImage(project.id)"
                  :disabled="loadingStates[project.id]"
              >
                &lt;
              </button>
              <button
                  v-if="project.images.length > 1"
                  class="slider-button next"
                  @click="nextImage(project.id)"
                  :disabled="loadingStates[project.id]"
              >
                &gt;
              </button>
              <div
                  v-if="project.images.length > 1"
                  class="slider-dots"
              >
                <span
                    v-for="(img, index) in project.images"
                    :key="index"
                    :class="{ active: currentImageIndex[project.id] === index }"
                    @click="currentImageIndex[project.id] = index"
                ></span>
              </div>
            </div>
          </div>
          <div class="project-details">
            <h2 class="project-title">{{ project.title }}</h2>
            <div class="project-meta">
              <span class="project-location">{{ project.location }}</span>
              <span class="project-year">{{ project.year }}</span>
            </div>
            <p class="project-description">{{ project.description }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.landscape-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  color: #333;
  padding-top: 1rem;
  margin-top: 185px;
}

.page-container {
  display: flex;
  max-width: 1400px;
  margin: 0 0 0 auto;
  min-height: calc(100vh - 2rem);
}

/* Стили для фиксированной боковой панели */
.sidebar {
  width: 600px;
  position: fixed;
  left: 0;
  top: 190px;
  height: calc(100vh - 120px);
  padding: 2rem;
  overflow-y: auto;
  background-color: #f8f9fa;
  z-index: 10;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  padding: 0 50px;
}

.project-nav {
  background: none;
  position: static;
}

.project-nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.project-nav a {
  display: block;
  padding: 0.8rem 0;
  text-decoration: none;
  color: #555;
  font-size: 1.6rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
}

.project-nav a:hover,
.project-nav a.active {
  color: #1a1a1a;
  font-weight: 600;
  border-left-color: var(--primary-color, #ecad29);
  background-color: transparent;
}

/* Стили для скроллящегося контента */
.content {
  flex-grow: 1;
  padding: 0 80px 2rem 300px;
  overflow-y: auto;
  height: calc(100vh - 20px);
  max-height: 100vh;
  margin-left: auto;
  width: 50%;
}

.project-card {
  margin-bottom: 5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #eaeaea;
}

.project-card:last-child {
  border-bottom: none;
}

/* Стили для слайдера */
.project-slider {
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* Соотношение 16:9 */
  overflow: hidden;
}

.loading-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color, #ecad29);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.slider-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.slider-button {
  position: absolute;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.slider-button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.7);
}

.slider-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev {
  left: 15px;
}

.next {
  right: 15px;
}

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 2;
}

.slider-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-dots span.active {
  background-color: white;
  transform: scale(1.2);
}

.slider-dots span:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

/* Стили для деталей проекта */
.project-details {
  padding: 1rem 0;
}

.project-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #222;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.9rem;
}

.project-description {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #444;
  font-weight: 500;
}

/* Медиа запросы для адаптивности */
@media (max-width: 1700px) {
  .content {
    padding: 200px 80px 2rem 350px;
  }

  .slider-container {
    height: 500px;
    padding-bottom: 0;
  }

  .sidebar {
    .page-title {
      font-size: 30px;
    }

    max-width: 300px;
    padding-right: 0;

    .project-nav {
      font-size: 20px;
      width: 200px;
      a {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 992px) {
  .page-container {
    flex-direction: column;
    height: 100vh;
  }

  .sidebar {
    display: none;
  }

  .content {
    width: 100%;
    padding: 1rem;
    margin-left: 0;
    height: auto;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
  }

  .project-card {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
  }

  .project-title {
    font-size: 1.5rem;
  }

  .project-description {
    font-size: 1.1rem;
  }

  .landscape-page {
    margin-top: 0;
  }

  .content {
    overflow: auto;
    height: 100vh;
  }

  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .slider-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .landscape-page {
    margin-top: 0;
  }

  .content {
    height: auto;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .slider-container {
    height: 200px;
  }

  .slider-button {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }

  .slider-dots span {
    width: 8px;
    height: 8px;
  }
}
</style>