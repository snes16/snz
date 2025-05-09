<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Данные о проектах в разделе Архитектура
const projects = ref([
  {
    id: 'shali',
    title: 'ЖК в г. Шали',
    image: 'https://snzproject.com/wp-content/uploads/2025/05/scene-13_-scaled.png',
    description: 'Амбициозный проект в Шали: пять 25-этажных башен комфорт-класса, 7-этажный бизнес-блок и 2-этажное коммерческое здание, объединенные стилобатом. Архитектура в исламском стиле: арки, орнаменты, синие купола. На стилобате — общественная зона с площадками, аллеями и озеленением, подземный паркинг. Безопасность по спецСТУ. Сочетание высотности, национального колорита и современных стандартов.',
    year: '2025',
    location: 'г. Шали, Чеченская Республика'
  },
  {
    id: 'medical',
    title: 'Цех для сборки медицинского оборудования',
    image: 'https://snzproject.com/wp-content/uploads/2025/05/enhanced_11-scaled.png',
    description: 'В чистом поле села Тайтобе построили современный хайтек-завод по сборке медицинских приборов с энергоэффективным корпусом и модульным общежитием из морских контейнеров для персонала.',
    year: '2024',
    location: 'с. Тайтобе, Акмолинская обл.'
  },
  {
    id: 'charyn',
    title: 'Визит-центр Чарын',
    image: 'https://snzproject.com/wp-content/uploads/2025/05/enhanced_1_8-photo-scaled.png',
    description: 'Функциональный модульный визит-центр с вентилируемым фасадом гармонично вписан в природный ландшафт, объединяя современные инженерные решения, доступность и продуманную инфраструктуру, включая смотровую площадку, кафе и конференц-зал.',
    year: '2024',
    location: 'Национальный природный парк Чарын, Алматинская область'
  },
  {
    id: 'leroy-merlin',
    title: 'Леруа Мерлен',
    image: 'https://snzproject.com/wp-content/uploads/2025/05/8.2-scaled.jpg',
    description: 'В Шымкенте построили типовой одноэтажный магазин формата «Леруа Мерлен» с антресольным этажом, металлокаркасной конструкцией и фирменным бело-зелёным дизайном, включающий торговый зал, складскую зону, административные помещения и соцобъекты для персонала.',
    year: '2022',
    location: 'Шымкент, Аль-Фарабийский р-он'
  },
  {
    id: 'lemonadoff',
    title: 'ЖК Лемонадофф',
    image: 'https://snzproject.com/wp-content/uploads/2025/05/0011-scaled.jpg',
    description: 'В Медеуском районе возводится жилой комплекс комфорт-класса: 13 высоток (9-12 этажей) с 430 квартирами, подземным паркингом, коммерцией и детсадом, гармонично вписанный в сложный рельеф с 20-метровым перепадом высот.',
    year: '2021',
    location: 'Алматы, Медеуский р-н'
  }
]);

// Функция для скролла к нужному проекту
const scrollToProject = (projectId: string) => {
  const element = document.getElementById(projectId);
  if (element) {
    // Immediately set the active project
    activeProject.value = projectId;
    element.scrollIntoView({ behavior: 'smooth' });

    // Add a small delay to ensure scroll position is updated
    setTimeout(() => {
      handleScroll();
    }, 500);
  }
};

// Активный проект для подсветки в меню
const activeProject = ref<string | null>(null);

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

/* Стили для фиксированной боковой панели */
.sidebar {
  width: 600px;
  position: fixed; /* Изменено с sticky на fixed */
  left: 0;
  top: 190px; /* Оставляем место под хедер */
  height: calc(100vh - 120px);
  padding: 2rem;
  overflow-y: auto;
  background-color: #f8f9fa; /* Добавим фон для лучшей читаемости */
  z-index: 10; /* Чтобы сайдбар был поверх других элементов */
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

/* Стили для скроллящегося контента */
.content {
  flex-grow: 1;
  padding: 2rem 80px 2rem 300px;
  overflow-y: auto;
  height: calc(100vh - 20px);
  max-height: 1030px;
  margin-left: auto;
  width: 50%;
  margin-top: 150px;
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
  font-size: 1.3rem;
  line-height: 1.6;
  color: #444;
  font-weight: 500;
}

@media (max-width: 1700px) {

  .content {
    padding: 0 80px 2rem 350px;
    margin-top: 0;
  }

  .project-image {
    width: 100%;
    height: 500px;
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
    height: auto;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-image {
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .architecture-page {
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

  .project-image {
    margin-bottom: 1rem;
  }
}
</style>
