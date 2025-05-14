<script setup lang="ts">
import { ref, onMounted } from 'vue';
import image1 from '../assets/slider/1.webp';
import image2 from '../assets/slider/2.webp';
import image3 from '../assets/slider/3.webp';
import image4 from '../assets/slider/4.webp';
import image5 from '../assets/slider/5.webp';
import image6 from '../assets/slider/6.webp';
import image7 from '../assets/slider/7.webp';
import image8 from '../assets/slider/8.webp';
import image9 from '../assets/slider/9.webp';
import image10 from '../assets/slider/10.webp';
import image11 from '../assets/slider/11.webp';
import image12 from '../assets/slider/12.webp';
import image13 from '../assets/slider/13.webp';
import image14 from '../assets/slider/14.webp';
import image15 from '../assets/slider/15.webp';

// Тип для проекта
interface Project {
  id: string;
  title: string;
  images: string[];
  description: string;
  year: string;
  location: string;
}

// Данные о проектах
const projects = ref<Project[]>([
  {
    id: 'shali',
    title: 'ЖК в г. Шали',
    images: [image1, image2, image3],
    description: 'Амбициозный проект в Шали: пять 25-этажных башен комфорт-класса, 7-этажный бизнес-блок и 2-этажное коммерческое здание, объединенные стилобатом. Архитектура в исламском стиле: арки, орнаменты, синие купола. На стилобате — общественная зона с площадками, аллеями и озеленением, подземный паркинг. Безопасность по спецСТУ. Сочетание высотности, национального колорита и современных стандартов.',
    year: '2025',
    location: 'г. Шали, Чеченская Республика'
  },
  {
    id: 'medical',
    title: 'Цех для сборки медицинского оборудования',
    images: [image4, image5, image6],
    description: 'В чистом поле села Тайтобе построили современный хайтек-завод по сборке медицинских приборов с энергоэффективным корпусом и модульным общежитием из морских контейнеров для персонала.',
    year: '2024',
    location: 'с. Тайтобе, Акмолинская обл.'
  },
  {
    id: 'charyn',
    title: 'Визит-центр Чарын',
    images: [image7, image8, image9],
    description: 'Функциональный модульный визит-центр с вентилируемым фасадом гармонично вписан в природный ландшафт, объединяя современные инженерные решения, доступность и продуманную инфраструктуру, включая смотровую площадку, кафе и конференц-зал.',
    year: '2024',
    location: 'Национальный природный парк Чарын, Алматинская область'
  },
  {
    id: 'leroy-merlin',
    title: 'Леруа Мерлен',
    images: [image10, image11, image12],
    description: 'В Шымкенте построили типовой одноэтажный магазин формата «Леруа Мерлен» с антресольным этажом, металлокаркасной конструкцией и фирменным бело-зелёным дизайном, включающий торговый зал, складскую зону, административные помещения и соцобъекты для персонала.',
    year: '2022',
    location: 'Шымкент, Аль-Фарабийский р-он'
  },
  {
    id: 'lemonadoff',
    title: 'ЖК Лемонадофф',
    images: [image14, image13, image15],
    description: 'В Медеуском районе возводится жилой комплекс комфорт-класса: 13 высоток (9-12 этажей) с 430 квартирами, подземным паркингом, коммерцией и детсадом, гармонично вписанный в сложный рельеф с 20-метровым перепадом высот.',
    year: '2021',
    location: 'Алматы, Медеуский р-н'
  }
]);

const activeProject = ref<string | null>(null);
const currentImageIndex = ref<Record<string, number>>({});
const loadedImages = ref<Record<string, boolean[]>>({});
const isChanging = ref<Record<string, boolean>>({});

// Инициализация состояний
projects.value.forEach(project => {
  currentImageIndex.value[project.id] = 0;
  loadedImages.value[project.id] = Array(project.images.length).fill(false);
  isChanging.value[project.id] = false;
});

// Предзагрузка всех изображений
const preloadImages = () => {
  projects.value.forEach(project => {
    project.images.forEach((imgSrc, index) => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        loadedImages.value[project.id][index] = true;
      };
    });
  });
};

// Переключение изображений с анимацией
const changeImage = (projectId: string, direction: 'next' | 'prev') => {
  if (isChanging.value[projectId]) return;

  const project = projects.value.find(p => p.id === projectId);
  if (!project) return;

  isChanging.value[projectId] = true;

  setTimeout(() => {
    if (direction === 'next') {
      currentImageIndex.value[projectId] =
          (currentImageIndex.value[projectId] + 1) % project.images.length;
    } else {
      currentImageIndex.value[projectId] =
          (currentImageIndex.value[projectId] - 1 + project.images.length) % project.images.length;
    }

    setTimeout(() => {
      isChanging.value[projectId] = false;
    }, 50);
  }, 10);
};

const nextImage = (projectId: string) => changeImage(projectId, 'next');
const prevImage = (projectId: string) => changeImage(projectId, 'prev');

// Скролл к проекту
const scrollToProject = (projectId: string) => {
  const element = document.getElementById(projectId);
  if (element) {
    activeProject.value = projectId;
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Обработчик скролла
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
  preloadImages();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeProject.value = entry.target.id;
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50% 0px'
  });

  projects.value.forEach(project => {
    const element = document.getElementById(project.id);
    if (element) observer.observe(element);
  });
});
</script>

<template>
  <div class="architecture-page">
    <div class="page-container">
      <aside class="sidebar">
        <h1 class="page-title">Архитектура</h1>
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

      <main class="content" @scroll="handleScroll">
        <div
            v-for="project in projects"
            :key="project.id"
            :id="project.id"
            class="project-card"
        >
          <div class="project-slider">
            <div class="slider-container">
              <transition name="fade" mode="out-in">
                <div v-if="loadedImages[project.id][currentImageIndex[project.id]]" class="image-wrapper">
                  <img
                      :src="project.images[currentImageIndex[project.id]]"
                      :alt="project.title"
                      class="slider-image"
                      :class="{ changing: isChanging[project.id] }"
                  >
                </div>
                <div v-else class="image-loader">
                  <div class="loader"></div>
                </div>
              </transition>

              <button
                  v-if="project.images.length > 1"
                  class="slider-button prev"
                  @click="prevImage(project.id)"
                  :disabled="isChanging[project.id]"
              >
                &lt;
              </button>
              <button
                  v-if="project.images.length > 1"
                  class="slider-button next"
                  @click="nextImage(project.id)"
                  :disabled="isChanging[project.id]"
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
                    :class="{
                    active: currentImageIndex[project.id] === index,
                    loaded: loadedImages[project.id][index]
                  }"
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
.architecture-page {
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

.project-nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.project-nav {
  background: none;
  position: static;
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
  padding-bottom: 56.25%;
  overflow: hidden;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

.slider-image.changing {
  opacity: 0.7;
}

.image-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ecad29;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

.slider-button:hover {
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
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-dots span.loaded {
  background-color: rgba(255, 255, 255, 0.5);
}

.slider-dots span.active {
  background-color: white;
  transform: scale(1.2);
}

.slider-dots span:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    margin-top: 0;
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

  .architecture-page {
    margin-top: 0;
  }

  .content {
    overflow: auto;
    height: calc(100vh - 200px);
    padding-bottom: 200px;
  }

  .slider-container {
    height: 350px;
  }

  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .architecture-page {
    margin-top: 0;
  }

  .content {
    overflow: auto;
    height: calc(100vh - 200px);
    padding-bottom: 200px;
  }

  .slider-container {
    height: 280px;
  }

  .slider-button {
    width: 36px;
    height: 36px;
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
    height: 220px;
  }

  .slider-button {
    width: 32px;
    height: 32px;
  }
}
</style>