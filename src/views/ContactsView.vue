<template>
  <div class="contact-page">
    <div class="contact-content">
      <h1 class="title">СТРАНИЧКА КОНТАКТЫ</h1>

      <div class="contact-grid">
        <div class="contact-info">
          <div class="qr-code">
            <p class="instagram">@snzproject</p>
          </div>

          <div class="contact-details">
            <p class="address">
              Адрес: 050046, Казахстан, Алматы,<br>
              БЦ Жел Тау, ул. Егизбаева 7В,<br>
              5 этаж, офис 507/2
            </p>

            <p class="phone">Тел: +7 707 113 3055</p>
            <p class="email">E-mail: snzproject@yandex.ru</p>
          </div>
        </div>

        <div class="map-placeholder">
          <p>ТУТ карта</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #A3A69B;
  padding: 2rem;
  padding-top: calc(80px + 2rem); /* Добавляем отступ для хедера */
  color: white;
}

.contact-content {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 4rem;
}

.title {
  font-family: 'Century Gothic', sans-serif;
  font-size: 2.5rem;
  color: #FF69B4;
  margin-bottom: 4rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.qr-code {
  text-align: center;
}

.qr-code img {
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
}

.instagram {
  font-size: 1.2rem;
  color: white;
}

.contact-details {
  font-family: 'Century Gothic', sans-serif;
  line-height: 1.8;
}

.address, .phone, .email {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.map-placeholder {
  aspect-ratio: 1;
  background-color: transparent;
  border: 2px solid #FF69B4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #FF69B4;
  position: relative;
}

.map-placeholder::before,
.map-placeholder::after {
  content: '';
  position: absolute;
  background-color: #FF69B4;
  pointer-events: none;
}

.map-placeholder::before {
  width: 2px;
  height: 100%;
  transform: rotate(45deg);
}

.map-placeholder::after {
  width: 2px;
  height: 100%;
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 2rem;
  }
}
</style>
<script setup lang="ts">
</script>