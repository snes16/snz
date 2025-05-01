<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Данные о проектах в разделе Ландшафт
const projects = ref([
  {
    id: 'french-garden',
    title: 'Французский сад',
    image: 'https://placehold.co/800x600?text=Французский+сад',
    description: 'Классический французский регулярный сад с четкой геометрией, симметричными элементами и строгими линиями. В проекте использованы традиционные приемы парковой архитектуры.',
    year: '2022',
    location: 'Подмосковье'
  },
  {
    id: 'plot-83',
    title: 'Участок 83',
    image: 'https://placehold.co/800x600?text=Участок+83',
    description: 'Современный ландшафтный дизайн загородного участка, сочетающий функциональные зоны для отдыха с декоративным озеленением. Проект включает в себя террасы, водоем и многоуровневые цветники.',
    year: '2021',
    location: 'Московская область'
  },
  {
    id: 'eco-park',
    title: 'Эко-парк',
    image: 'https://placehold.co/800x600?text=Эко-парк',
    description: 'Общественное пространство, спроектированное с использованием экологичных материалов и принципов устойчивого развития. В проекте предусмотрены зоны для различных видов отдыха, сохранены существующие деревья.',
    year: '2020',
    location: 'г. Казань'
  },
  {
    id: 'city-square',
    title: 'Городская площадь',
    image: 'https://placehold.co/800x600?text=Городская+площадь',
    description: 'Реновация городского общественного пространства с созданием многофункциональной площади для проведения мероприятий, с зонами отдыха и современным озеленением.',
    year: '2019',
    location: 'г. Алматы, Казахстан'
  }
]);

// Активный проект для подсветки в меню
const activeProject = ref<string | null>(null);

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
  // Устанавливаем первый проект как активный при загрузке
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
          <div class="project-image">
            <img :src="project.image" :alt="project.title">
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
  margin-top: 190px;
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
  padding: 2rem 2rem 2rem 400px;
  overflow-y: auto;
  height: calc(100vh - 20px);
  max-height: 1030px;
  margin-left: auto;
  width: 50%;
  margin-top: -20px;
}

.project-card {
  margin-bottom: 5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #eaeaea;
}

.project-card:last-child {
  border-bottom: none;
}

.project-image {
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.project-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.project-image:hover img {
  transform: scale(1.01);
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
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

/* Медиа запросы для адаптивности */
@media (max-width: 992px) {
  .page-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: none;
    position: relative;
    top: 0;
    border-right: none;
    border-bottom: 1px solid #eaeaea;
    overflow-y: visible;
    padding: 1rem;
    background-color: transparent;
  }

  .content {
    height: auto;
    max-height: none;
    overflow-y: visible;
    padding: 1rem;
    margin-left: 0;
  }

  .project-nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-nav a {
    padding: 0.5rem 1rem;
    border-left: none;
    border-bottom: 3px solid transparent;
    font-size: 20px;
  }

  .project-nav a:hover,
  .project-nav a.active {
    border-left-color: transparent;
    border-bottom-color: var(--primary-color, #ecad29);
  }
}
</style>
