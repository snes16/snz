<template>
  <div class="about-page">
    <!-- Основной контент -->
    <div class="about-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>SnZ Project</h1>
        <p class="tagline">Создаем пространства со смыслом и характером</p>
      </div>
    </div>

    <div class="about-content">
      <section class="about-section">
        <div class="section-text">
          <h2>О студии</h2>
          <p>С 2019 года мы воплощаем архитектурные, интерьерные и ландшафтные проекты. Наш фокус – не просто красивая картинка, а продуманная до мелочей функциональность и эстетика, ориентированная на человека и реализуемая в рамках вашего бюджета.</p>
        </div>
        <img class="section-image" src="../assets/bg4.png" alt=""></img>
      </section>

      <section class="principles-section">
        <h2>Наши принципы</h2>
        <ul class="principles-list">
          <li>Глубоко анализировать контекст: особенности участка, инсоляцию, эргономику движения</li>
          <li>Находить красоту в чистых линиях, качественных материалах и продуманных деталях</li>
          <li>Быть честными: не обещать невозможного, а превосходить ожидания качеством и подходом</li>
        </ul>
      </section>

      <section class="why-us-section">
        <h2>Нас выбирают, когда нужно:</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <p>Разработать комплексный проект, где архитектура, интерьер и ландшафт гармонично дополняют друг друга</p>
          </div>
          <div class="benefit-card">
            <p>Найти элегантное решение для сложных исходных данных и ограничений</p>
          </div>
          <div class="benefit-card">
            <p>Получить не компромисс, а сильную, жизнеспособную концепцию</p>
          </div>
          <div class="benefit-card">
            <p>Не просто "красивый дизайн", а пространство, продуманное от общей логистики до атмосферы</p>
          </div>
        </div>
      </section>
      <section class="services-section">
        <h2>Наши услуги:</h2>
        <div class="services-grid">
          <div class="service-card">
            <p><strong>Проектирование зданий и сооружений</strong><br>Эскизный проект, рабочий проект, прохождение экспертизы</p>
          </div>
          <div class="service-card">
            <p><strong>Ландшафтный дизайн</strong><br>Концептуальное решение, рабочий проект, прохождение экспертизы</p>
          </div>
          <div class="service-card">
            <p><strong>Дизайн интерьера</strong><br>3D визуализация, рабочий проект</p>
          </div>
          <div class="service-card">
            <p><strong>Авторский надзор</strong></p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isModalOpen = ref(false);
const formData = ref({
  name: '',
  phone: '',
  email: '',
  agreement: false
});

const openModal = () => isModalOpen.value = true;
const closeModal = () => isModalOpen.value = false;
const submitForm = () => {
  // ... существующая логика отправки ...
};
</script>

<style scoped>
/* Общие стили */
.about-page {
  font-family: 'Century Gothic', sans-serif;
  color: white;
  height: 100vh;
  overflow: auto;
  padding-top: 180px;
}

/* Герой-секция с фоновым изображением */
.about-hero {
  position: relative;
  height: 70vh;
  min-height: 500px;
  background-image: url('../assets/bg3.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.tagline {
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
}

/* Основной контент */
.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
}

/* Секции */
.about-section {
  display: flex;
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: center;
}

.section-text {
  flex: 1;
  h2 {
    color: white;
  }
  p {
    color: white;
  }
}

.section-image {
  flex: 1;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 700;
}

p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #555;
}

/* Принципы */
.principles-section {
  margin-bottom: 5rem;

  h2 {
    color: white;
  }
}

.principles-list {
  list-style-type: none;
  padding: 0;
}

.principles-list li {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.8;
}

.principles-list li:before {
  content: "—";
  position: absolute;
  left: 0;
  color: #8f9680;
}

/* Преимущества */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.benefit-card {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  transition: transform 0.3s;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.why-us-section {
  h2 {
    color: white;
  }
}

.services-section {
  margin-top: 5rem;
}

.services-section h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.service-card {
  background: #f9f9f9;
  color: #333;
  padding: 2rem;
  border-radius: 8px;
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.benefit-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Команда */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.team-member {
  text-align: center;
}

.member-photo {
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  background: #ddd;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

/* Контакты */
.contact-section {
  text-align: center;
  margin-top: 5rem;
  padding: 3rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.contact-info p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.cta-button {
  background: #333;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;
  transition: background 0.3s;
}

.cta-button:hover {
  background: #555;
}

/* Адаптивность */
@media (max-width: 992px) {
  .about-page {
    padding-top: 0;
    padding-bottom: 200px;
  }
  .about-hero {
    height: 50vh;
    min-height: 400px;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .about-section {
    flex-direction: column;
  }

  .section-image {
    width: 100%;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    padding: 2rem 1rem;
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .about-hero {
    height: 60vh;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

}
</style>