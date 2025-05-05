<template>
  <div class="contact-page">
    <div class="contact-content">
      <h1 class="title">Контакты</h1>

      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-details">
            <h2 class="section-title">Наш офис</h2>
            <p class="address">
              Адрес: 050046, Казахстан, Алматы,<br>
              БЦ Жел Тау, ул. Егизбаева 7В,<br>
              5 этаж, офис 507/2
            </p>

            <p class="phone">Тел: +7 707 113 3055</p>
            <p class="email">E-mail: snzproject@yandex.ru</p>

            <div class="social-media">
              <h2 class="section-title">Социальные сети</h2>
              <p class="instagram">Instagram: @snzproject</p>
            </div>

            <button class="request-button" @click="openModal">Отправить заявку</button>
          </div>
        </div>

        <div class="map-container">
          <iframe style="-webkit-filter: grayscale(100%);filter: grayscale(100%);"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d726.7329503418385!2d76.8851965839379!3d43.23188950089807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883691b0d18784f%3A0x907fa9f6f65fbb34!2z0JbQtdC7INCi0LDRgw!5e0!3m2!1sru!2sua!4v1702118900523!5m2!1sru!2sua"
                  width="100%" height="500" allowfullscreen="" loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <!-- Модальное окно с формой заявки -->
      <div class="modal" v-if="isModalOpen">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Отправить заявку</h2>
            <button class="close-button" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">ФИО</label>
                <input type="text" id="name" v-model="formData.name" required>
              </div>
              <div class="form-group">
                <label for="phone">Телефон</label>
                <input type="tel" id="phone" v-model="formData.phone" required>
              </div>
              <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group checkbox-group">
                <input type="checkbox" id="agreement" v-model="formData.agreement" required>
                <label for="agreement">Я согласен(сна) на обработку персональных данных</label>
              </div>
              <button type="submit" class="submit-button">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Состояние модального окна
const isModalOpen = ref(false);

// Данные формы
const formData = ref({
  name: '',
  phone: '',
  email: '',
  agreement: false
});

// Открытие модального окна
const openModal = () => {
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

// Закрытие модального окна
const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
};

// Отправка формы
const submitForm = async () => {
  const { name, phone, email, agreement } = formData.value;

  if (!agreement) {
    alert("Вы должны согласиться на обработку персональных данных.");
    return;
  }

  const token = '7473689022:AAEueEmsA-kdeeZxykBrcTvEccpzzq_538k';
  const chatIds = ['1472870243']; // Добавь сюда нужные chat_id

  const message = `📩 Новая заявка с сайта:\n\n👤 ФИО: ${name}\n📞 Телефон: ${phone}\n📧 Email: ${email}`;

  try {
    const results = await Promise.all(
        chatIds.map(chat_id =>
            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id, text: message })
            })
        )
    );

    const allSuccessful = results.every(res => res.ok);

    if (allSuccessful) {
      alert('Ваша заявка успешно отправлена!');
      closeModal();
      formData.value = {
        name: '',
        phone: '',
        email: '',
        agreement: false
      };
    } else {
      alert('Ошибка при отправке хотя бы в один из чатов.');
    }
  } catch (error) {
    console.error('Ошибка отправки:', error);
    alert('Ошибка при отправке. Проверьте соединение.');
  }
};


</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  padding-top: 80px;
  margin-top: 180px;
  color: #333333;
}

.contact-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 4rem;
  position: relative;
}

.title {
  font-family: 'Century Gothic', sans-serif;
  font-size: 2.5rem;
  color: #333333;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #333333;
  border-bottom: 2px solid #eeeeee;
  padding-bottom: 0.5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-details {
  font-family: 'Century Gothic', sans-serif;
  line-height: 1.8;
  font-weight: 500;
}

.address, .phone, .email, .instagram {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #555555;
  font-weight: 500;
}

.social-media {
  margin-top: 2rem;
}

/* Стили для карты */
.map-container {
  height: 500px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
}

/* Стили для кнопки заявки */
.request-button {
  background-color: #333333;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Century Gothic', sans-serif;
  font-weight: 600;
  margin-top: 2rem;
}

.request-button:hover {
  background-color: #555555;
  transform: translateY(-2px);
}

.request-button:active {
  transform: translateY(0);
}

/* Стили для модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  background-color: #333333;
  color: white;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-family: 'Century Gothic', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333333;
  font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="tel"],
.form-group input[type="email"] {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #f9f9f9;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-group input {
  margin: 0;
}

.checkbox-group label {
  margin: 0;
  font-size: 0.9rem;
  color: #555555;
  font-weight: 500;
}

.submit-button {
  background-color: #333333;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Century Gothic', sans-serif;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #555555;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 350px 1fr;
    gap: 2rem;
  }

  .contact-content {
    padding: 2rem;
  }
}

@media (max-width: 992px) {
  .contact-page {
    margin-top: 0;
    padding: 20px 20px 200px;
    max-height: calc(100vh - 120px);
    overflow: auto;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .map-container {
    height: 350px;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }

  .modal-content {
    width: 95%;
  }

  .contact-content {
    padding: 1.5rem;
  }
}
</style>