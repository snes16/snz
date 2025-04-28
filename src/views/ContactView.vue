<template>
  <div class="contact-page">
    <section class="hero">
      <h1 class="title">Контакты</h1>
      <p class="subtitle">Свяжитесь с нами для обсуждения вашего проекта</p>
    </section>

    <section class="contact-info">
      <div class="container">
        <div class="grid">
          <div class="info-card">
            <h3>Адрес</h3>
            <p>г. Алматы, ул. Примерная, 123</p>
          </div>
          <div class="info-card">
            <h3>Телефон</h3>
            <p>+7 (777) 123-45-67</p>
          </div>
          <div class="info-card">
            <h3>Email</h3>
            <p>info@snz.kz</p>
          </div>
          <div class="info-card">
            <h3>Часы работы</h3>
            <p>Пн-Пт: 9:00 - 18:00</p>
            <p>Сб-Вс: Выходной</p>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-form">
      <div class="container">
        <h2>Напишите нам</h2>
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="name">Имя</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input type="tel" id="phone" v-model="form.phone">
          </div>
          <div class="form-group">
            <label for="message">Сообщение</label>
            <textarea id="message" v-model="form.message" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Отправить</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  // Здесь будет логика отправки формы
  console.log('Форма отправлена:', form.value)
}
</script>

<style scoped>
.contact-page {
  padding-top: 80px;
}

.hero {
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/project1.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  margin-bottom: 4rem;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-info {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.info-card p {
  color: #666;
  line-height: 1.6;
}

.contact-form {
  padding: 4rem 0;
}

.contact-form h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}
</style> 