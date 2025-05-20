<script setup lang="ts">
import { ref, onMounted } from 'vue';
import image16 from '../assets/slider/16.webp';
import image17 from '../assets/slider/17.webp';
import image18 from '../assets/slider/18.webp';
import image19 from '../assets/slider/19.webp';
import image20 from '../assets/slider/20.webp';
import image21 from '../assets/slider/21.webp';
import image22 from '../assets/slider/22.webp';
import image23 from '../assets/slider/23.webp';
import image24 from '../assets/slider/24.webp';
import image25 from '../assets/slider/25.webp';
import image26 from '../assets/slider/26.webp';
import image27 from '../assets/slider/27.webp';
import image28 from '../assets/slider/28.webp';
import image29 from '../assets/slider/29.webp';
import image30 from '../assets/slider/30.webp';
import image31 from '../assets/slider/31.webp';
import image32 from '../assets/slider/32.webp';
import image33 from '../assets/slider/33.webp';
import image34 from '../assets/slider/34.webp';
import image35 from '../assets/slider/35.webp';
import image36 from '../assets/slider/36.webp';
import image37 from '../assets/slider/37.webp';
import image38 from '../assets/slider/38.webp';
import image39 from '../assets/slider/39.webp';
import image40 from '../assets/slider/40.webp';
import image41 from '../assets/slider/41.webp';
import image42 from '../assets/slider/42.webp';
import image43 from '../assets/slider/43.webp';
import image44 from '../assets/slider/44.webp';
import image45 from '../assets/slider/45.webp';
import image46 from '../assets/slider/46.webp';
import image47 from '../assets/slider/47.webp';
import image48 from '../assets/slider/48.webp';
import image49 from '../assets/slider/49.webp';
import image50 from '../assets/slider/50.webp';
import image51 from '../assets/slider/51.webp';
import image52 from '../assets/slider/52.webp';
import image53 from '../assets/slider/53.webp';
import image54 from '../assets/slider/54.webp';
import image55 from '../assets/slider/55.webp';
import image56 from '../assets/slider/56.webp';
import image57 from '../assets/slider/57.webp';
import image58 from '../assets/slider/58.webp';
import image59 from '../assets/slider/59.webp';
import image60 from '../assets/slider/60.webp';
import image61 from '../assets/slider/61.webp';
import image62 from '../assets/slider/62.webp';
import image63 from '../assets/slider/63.webp';
import image64 from '../assets/slider/64.webp';

// Данные о проектах в разделе Интерьер
const projects = ref([
  {
    id: 'apartment-133',
    title: 'Квартира с переосмысленной лоджией',
    images: [
      image16,
      image17,
      image18,
      image19,
      image20,
      image21,
      image22,
      image23,
      image24,
    ],
    description: 'В Ташкенте перепланировали 81,5 м² квартиру, превратив лоджию в кухню и кабинет, освободив место для гостиной, а спальни оснастили продуманными функциональными зонами — получилось эргономично и нестандартно.',
    year: '2024',
    location: 'г. Ташкент'
  },
  {
    id: 'podium',
    title: 'Салон красоты "Aneli"',
    images: [
      image30,
      image25,
      image26,
      image27,
      image28,
      image29,
    ],
    description: 'В Алматы салон красоты 160 м² преобразили без перепланировки: овальный ресепшн, угловые маникюрные столы и зеркальные шкафы органично вписали в черно-белую "шахматку", создав воздушный интерьер с арками, латунью и продуманным хранением — заказчица лично контролировала каждый этап.',
    year: '2023',
    location: 'г. Алматы'
  },
  {
    id: 'apartment-95',
    title: 'Интерьер квартиры (100 м²)',
    images: [
      image31,
      image32,
      image33,
      image34,
      image35,
      image36,
      image37,
    ],
    description: 'Семейный интерьер с продуманным зонированием: раздвижные перегородки между кухней-гостиной, остров с баром, ванная "2 в 1", скрытая постирочная и детская с полноценным рабочим местом — максимум функциональности без перепланировки.',
    year: '2022',
    location: 'г. Алматы'
  },
  {
    id: 'aneli',
    title: 'Современная классика для семьи',
    images: [
      image38,
      image39,
      image40,
      image41,
      image42,
      image43,
      image44,
      image45,
      image46,
    ],
    description: 'Просторный интерьер в современной классике для семьи с детьми: светлая кухня-гостиная, три спальни (включая детскую с трансформируемым пространством) и два санузла с умным хранением — элегантно и практично.',
    year: '2024',
    location: 'г. Ташкент'
  },
  {
    id: 'apartment-100',
    title: 'Интерьер квартиры (133 м²)',
    images: [
      image47,
      image48,
      image49,
      image50,
      image51,
      image52,
      image53,
      image54,
      image55,
      image56,
      image57,
      image58,
      image59,
      image60,
      image61,
      image62,
      image63,
      image64,
    ],
    description: 'Функциональный семейный интерьер в Ташкенте: кухня-столовая с островом, две детские (включая комнату с двухъярусной кроватью), мастер-спальня с гардеробной и два санузла, дополненные кладовой и хозяйственным помещением — продуманный комфорт для жизни с детьми.',
    year: '2024',
    location: 'г. Ташкент'
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
  if (project) {
    loadingStates.value[projectId] = true;
    currentImageIndex.value[projectId] =
        (currentImageIndex.value[projectId] + 1) % project.images.length;
    preloadImages(projectId);
  }
};

const prevImage = (projectId: string) => {
  const project = projects.value.find(p => p.id === projectId);
  if (project) {
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
  <div class="interior-page">
    <div class="page-container">
      <!-- Фиксированная левая панель с навигацией по проектам -->
      <aside class="sidebar">
        <h1 class="page-title">Интерьер</h1>
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
.interior-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  color: #333;
  padding-top: 1rem;
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
  padding-top: 185px !important;
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

/* Адаптивные стили */
@media (max-width: 1700px) {
  .content {
    padding: 100px 80px 2rem 350px;
    margin-top: 0;
  }

  .slider-container {
    height: 400px;
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
    padding: 1rem !important;
    margin-left: 0;
    height: auto;
    max-height: 100vh;
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

  .interior-page {
    margin-top: 0;
  }

  .content {
    overflow: auto;
    height: calc(100vh - 200px);
    padding-bottom: 200px;
  }

  .slider-container {
    height: 300px;
  }

  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .interior-page {
    margin-top: 0;
  }

  .content {
    overflow: auto;
    height: calc(100vh - 200px);
    padding-bottom: 200px;
  }

  .slider-container {
    height: 250px;
  }

  .slider-button {
    width: 36px;
    height: 36px;
  }

  .slider-button svg {
    width: 20px;
    height: 20px;
  }

  .slider-dots span {
    width: 8px;
    height: 8px;
  }

  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .slider-container {
    height: 200px;
  }

  .slider-button {
    width: 32px;
    height: 32px;
  }

  .slider-button svg {
    width: 18px;
    height: 18px;
  }
}
</style>