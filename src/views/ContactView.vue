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
        
        <div id="map" class="map-container"></div>
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
                <label for="agreement">Я согласен на обработку персональных данных</label>
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
/**
 * ContactView.vue - Страница контактов для SNZ Project
 * 
 * DEVELOPER NOTES:
 * ---------------
 * 1. Google Maps API:
 *    - Для работы карты необходимо добавить API ключ Google Maps в строке 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap'
 *    - Получить ключ можно в Google Cloud Console: https://console.cloud.google.com/
 *    - API ключ должен иметь разрешения для Maps JavaScript API
 *    - Для продакшена рекомендуется настроить ограничения по домену и IP
 * 
 * 2. Координаты офиса:
 *    - Текущие координаты: { lat: 43.226, lng: 76.8955 } - примерные координаты БЦ Жел Тау
 *    - Для точного позиционирования необходимо уточнить координаты
 * 
 * 3. Форма обратной связи:
 *    - Текущая реализация только выводит данные в консоль
 *    - Для отправки данных на сервер необходимо реализовать соответствующий API endpoint
 *    - Рекомендуемая структура для отправки: { name, phone, email, agreement }
 * 
 * 4. Стилизация:
 *    - Цветовая схема: белый фон (#ffffff), черный текст (#333333)
 *    - Для мобильных устройств карта отображается первой (order: -1)
 *    - Для корректного отображения на мобильных устройствах используются медиа-запросы
 * 
 * 5. Известные проблемы:
 *    - При первой загрузке карта может отображаться некорректно из-за задержки загрузки API
 *    - Решение: добавить прелоадер или проверку готовности DOM перед инициализацией карты
 * 
 * 6. TODO:
 *    - Добавить валидацию формы (регулярные выражения для телефона и email)
 *    - Реализовать отправку данных на сервер
 *    - Добавить анимацию открытия/закрытия модального окна
 *    - Оптимизировать загрузку Google Maps API (возможно, использовать lazy loading)
 */

import { ref, onMounted } from 'vue';

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
  document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
};

// Закрытие модального окна
const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = ''; // Разблокируем прокрутку страницы
};

// Отправка формы
const submitForm = () => {
  // Здесь будет логика отправки формы
  console.log('Форма отправлена:', formData.value);
  alert('Ваша заявка успешно отправлена!');
  closeModal();
  // Сбрасываем форму
  formData.value = {
    name: '',
    phone: '',
    email: '',
    agreement: false
  };
};

// Инициализация Google Maps
onMounted(() => {
  // Проверяем, существует ли уже скрипт Google Maps на странице
  if (document.getElementById('google-maps-script')) {
    if (window.google && window.google.maps) {
      initMap();
    }
    return;
  }
  
  // Добавляем скрипт Google Maps
  const googleMapsScript = document.createElement('script');
  googleMapsScript.id = 'google-maps-script';
  googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
  googleMapsScript.async = true;
  googleMapsScript.defer = true;
  
  // Определяем функцию инициализации карты в глобальной области видимости
  window.initMap = initMap;
  
  // Добавляем скрипт на страницу
  document.head.appendChild(googleMapsScript);
});

// Функция инициализации карты
function initMap() {
  // Координаты БЦ Жел Тау (уточненные)
  const officeCoords = { lat: 43.226, lng: 76.8955 };
  
  // Создаем карту с настройками
  const map = new google.maps.Map(document.getElementById('map'), {
    center: officeCoords,
    zoom: 16,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "weight": "2.00"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#9c9c9c"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7b7b7b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c8d7d4"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#070707"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ]
  });
  
  // Добавляем маркер для офиса
  const marker = new google.maps.Marker({
    position: officeCoords,
    map: map,
    title: 'БЦ Жел Тау, ул. Егизбаева 7В'
  });
  
  // Добавляем информационное окно
  const infoWindow = new google.maps.InfoWindow({
    content: '<div style="padding: 10px; max-width: 200px;"><strong>БЦ Жел Тау</strong><br>ул. Егизбаева 7В, этаж 5, офис 507/2</div>'
  });
  
  // Открываем информационное окно при клике на маркер
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  padding-top: 80px; /* Отступ для хедера */
  margin-top: 180px;
  color: #333333;
}

.contact-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 4rem;
  position: relative; /* Для правильного позиционирования модального окна */
}

.title {
  font-family: 'Century Gothic', sans-serif;
  font-size: 2.5rem;
  color: #333333;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 600;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
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
}

.address, .phone, .email, .instagram {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #555555;
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
  font-weight: 500;
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
  font-weight: 500;
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
  font-weight: 500;
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
  font-weight: 500;
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

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .map-container {
    height: 350px;
    order: -1; /* Карта будет отображаться первой на мобильных устройствах */
    margin-bottom: 2rem;
  }
  
  .modal-content {
    width: 95%;
  }
  
  .contact-content {
    padding: 1.5rem;
  }
}
</style>