<script setup lang="ts">
</script>

<template>
  <div class="contacts-view">
    <h1 class="contacts-title">Контакты</h1>
    
    <div class="contacts-content">
      <div class="contact-info">
        <h2>SnZ Project</h2>
        <p>Проектное бюро в Алматы</p>
        <p>Адрес: г. Алматы, ул. Примерная, 123</p>
        <p>Телефон: +7 (777) 123-45-67</p>
        <p>Email: info@snzproject.kz</p>
      </div>
      
      <div class="contact-form">
        <h2>Связаться с нами</h2>
        <form>
          <div class="form-group">
            <label for="name">Имя</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="message">Сообщение</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="submit-button">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contacts-view {
  padding: 40px 0;
}

.contacts-title {
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: 500;
}

.contacts-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-info h2,
.contact-form h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 500;
}

.contact-info p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.submit-button {
  background-color: #333;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #555;
}

@media (max-width: 768px) {
  .contacts-view {
    padding: 30px 0;
  }
  
  .contacts-title {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  .contacts-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form {
    order: 2;
  }
  
  .contact-info {
    order: 1;
  }
}
</style>
