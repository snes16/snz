<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Analytics } from '@vercel/analytics/nuxt'
import gsap from 'gsap';

let data = [
  {
    place: 'Switzerland Alps',
    title: 'Название',
    title2: '',
    description: 'Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It\'s a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.',
    image: 'https://snzproject.com/wp-content/uploads/2025/04/banner1.png'
  },
  {
    place: '',
    title: 'Название',
    title2: '',
    description: 'Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country\'s best powder.',
    image: 'https://snzproject.com/wp-content/uploads/2023/12/group-881.png'
  },
  {
    place: '',
    title: 'Название',
    title2: '',
    description: 'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
    image: 'https://snzproject.com/wp-content/uploads/2023/12/bg4.png'
  },
  {
    place: '',
    title: 'Название',
    title2: '',
    description: 'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
    image: 'https://snzproject.com/wp-content/uploads/2023/12/bg3.png'
  },
  {
    place: 'Название',
    title: 'Название',
    title2: '',
    description: 'Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach\'s long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.',
    image: 'https://snzproject.com/wp-content/uploads/2023/12/bg2.png'
  },
];

// Refs для управления состоянием
const isInitialized = ref(false);
const animationTimeline = ref<gsap.core.Timeline | null>(null);
const isAnimating = ref(false);

// Функции для работы с DOM
const _ = (id: string): HTMLElement | null => document.getElementById(id);

// Генерация HTML для карточек
const cards = data.map((i, index: number) =>
    `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`
).join('');

const cardContents = data.map((i, index: number) =>
    `<div class="card-content" id="card-content-${index}">
    <div class="content-start"></div>
    <div class="content-title-1">${i.title}</div>
    <div class="content-title-2">${i.title2}</div>
  </div>`
).join('');

const sildeNumbers = data.map((_, index: number) =>
    `<div class="item" id="slide-item-${index}">${index+1}</div>`
).join('');

// Настройки анимации
let order = [0, 1, 2, 3, 4];
let detailsEven = true;
let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

// Функции для работы с анимацией
function getCard(index: number): string {
  return `#card${index}`;
}

function getCardContent(index: number): string {
  return `#card-content-${index}`;
}

function getSliderItem(index: number): string {
  return `#slide-item-${index}`;
}

function animate(target: string, duration: number, properties: any) {
  return new Promise<void>((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

function init() {
  if (isInitialized.value) return;

  isInitialized.value = true;
  isAnimating.value = true;

  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  // Создаем новую временную шкалу для анимации
  const tl = gsap.timeline();
  animationTimeline.value = tl;

  tl.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });

  tl.set("nav", { y: -200, opacity: 0 });
  tl.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  tl.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  tl.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  tl.set(detailsInactive, { opacity: 0, zIndex: 12 });
  tl.set(`${detailsInactive} .text`, { y: 100 });
  tl.set(`${detailsInactive} .title-1`, { y: 100 });
  tl.set(`${detailsInactive} .title-2`, { y: 100 });
  tl.set(`${detailsInactive} .desc`, { y: 50 });
  tl.set(`${detailsInactive} .cta`, { y: 60 });
  tl.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    tl.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    tl.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    tl.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  tl.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  tl.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });

  rest.forEach((i, index) => {
    tl.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      ease,
      delay: startDelay,
    });
    tl.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      ease,
      delay: startDelay,
    });
  });

  tl.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  tl.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  tl.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

  tl.call(() => {
    isAnimating.value = false;
  });
}

async function step() {
  if (isAnimating.value) return;
  isAnimating.value = true;

  return new Promise((resolve) => {
    const shifted = order.shift();
    if (shifted !== undefined) {
      order.push(shifted);
    }

    detailsEven = !detailsEven;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    const title1Element = document.querySelector(`${detailsActive} .title-1`);
    if (title1Element && order.length > 0) {
      title1Element.textContent = data[order[0]].title;
    }

    const title2Element = document.querySelector(`${detailsActive} .title-2`);
    if (title2Element && order.length > 0) {
      title2Element.textContent = data[order[0]].title2;
    }

    const tl = gsap.timeline();
    animationTimeline.value = tl;

    tl.set(detailsActive, { zIndex: 22 });
    tl.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    tl.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    tl.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    tl.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    tl.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    tl.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      ease,
    });
    tl.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    tl.set(getCard(prv), { zIndex: 10 });
    tl.set(getCard(active), { zIndex: 20 });
    tl.to(getCard(prv), { scale: 1.5, ease });

    tl.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    tl.to(getSliderItem(active), { x: 0, ease });
    tl.to(getSliderItem(prv), { x: -numberSize, ease });
    tl.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    tl.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        tl.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        tl.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        tl.set(getSliderItem(prv), { x: rest.length * numberSize });

        tl.set(detailsInactive, { opacity: 0 });
        tl.set(`${detailsInactive} .text`, { y: 100 });
        tl.set(`${detailsInactive} .title-1`, { y: 100 });
        tl.set(`${detailsInactive} .title-2`, { y: 100 });
        tl.set(`${detailsInactive} .desc`, { y: 50 });
        tl.set(`${detailsInactive} .cta`, { y: 60 });

        isAnimating.value = false;
        resolve();
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        tl.set(getCard(i), { zIndex: 30 });
        tl.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        tl.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        tl.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  if (!isHomePage.value || isAnimating.value) return;

  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });

  gsap.set(".indicator", { x: -window.innerWidth });

  await step();

  if (isHomePage.value) {
    loop();
  }
}

async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

// Очистка анимаций при размонтировании
function cleanupAnimations() {
  if (animationTimeline.value) {
    animationTimeline.value.kill();
    animationTimeline.value = null;
  }
  gsap.globalTimeline.clear();
}

const router = useRouter();
const route = useRoute();
const isHomePage = computed(() => route.name === 'home');
const isNavCollapsed = ref(true);

function toggleNav() {
  isNavCollapsed.value = !isNavCollapsed.value;
}

onMounted(async () => {
  // Вставка HTML
  const demoElement = _('demo');
  if (demoElement) {
    demoElement.innerHTML = cards + cardContents;
  }

  const slideNumbersElement = _('slide-numbers');
  if (slideNumbersElement) {
    slideNumbersElement.innerHTML = sildeNumbers;
  }

  // Обработчики кнопок
  const prevButton = document.querySelector('.arrow-left');
  const nextButton = document.querySelector('.arrow-right');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (!isAnimating.value) step();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (!isAnimating.value) step();
    });
  }

  // Настройка навигации
  const setupNavigation = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const href = link.getAttribute('href');
        if (href) {
          router.push(href);
        }
      });
    });

    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
      logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        const homeLink = document.querySelector('.nav-link[href="/"]');
        if (homeLink) {
          navLinks.forEach(l => l.classList.remove('active'));
          homeLink.classList.add('active');
        }
        router.push('/');
      });
    }
  };

  setTimeout(setupNavigation, 100);

  // Запуск анимации только если это главная страница
  if (isHomePage.value) {
    await start();
  }
});

const shouldHideOverflow = computed(() => {
  const routeName = route.name?.toString() || '';
  return ['architecture', 'interior', 'landscape', ''].includes(routeName);
});

onUnmounted(() => {
  cleanupAnimations();
});
</script>

<template>
  <analytics/>
  <div class="app-container" :class="{'full': isNavCollapsed, 'no-overflow': shouldHideOverflow}">
    <!-- Only render the indicator on the home page -->
    <div v-if="isHomePage" class="indicator"></div>

    <nav>
      <div class="arrow-container">
        <button class="nav-arrow" @click="toggleNav">
          <div class="burger-menu" :class="{ 'active': isNavCollapsed }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      <div class="logo-container-desktop">
        <a href="/" class="logo-link">
          <img src="https://snzproject.com/wp-content/uploads/2024/01/snz_logo_-1-e1705565210397.png"
               alt="SNZ"
               style="height: 120px"
          />
        </a>
      </div>
      <div class="nav-links">
        <div class="nav-items" :class="{ 'nav-items-collapsed': isNavCollapsed }">
          <a href="/" class="nav-link active">Главная</a>
          <a href="/architecture" class="nav-link">Архитектура</a>
          <a href="/interior" class="nav-link">Интерьер</a>
          <a href="/landscape" class="nav-link">Ландшафты</a>
          <a href="/contacts" class="nav-link">Контакты</a>
        </div>
      </div>
      <div class="logo-container-mobile">
        <a href="/" class="logo-link">
          <img src="https://snzproject.com/wp-content/uploads/2024/01/snz_logo_-1-e1705565210397.png"
               alt="SNZ"
               style="height: 120px"
          />
        </a>
      </div>
    </nav>

    <!-- Здесь будет отображаться содержимое маршрутов -->
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Century+Gothic:wght@400;500;600;700&display=swap");

:root {
  --primary-color: #ecad29;
  --text-color: #FFFFFFDD;
  --main-font: "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #1a1a1a;
  color: var(--text-color);
  position: relative;
  overflow: hidden;
  font-family:  "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
  font-weight: 500;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  position: relative;

  .no-overflow {
    overflow: hidden;
  }
}

.card {
  position: absolute;
  left: 0;
  top: 0;
  background-position: center;
  background-size: cover;
  box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6);
}

#btn {
  position: absolute;
  top: 690px;
  left: 16px;
  z-index: 99;
}

.card-content {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--text-color);
  padding-left: 16px;
}

.content-place {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
}

.content-place {
  font-weight: 600;
}

.content-title-1,
.content-title-2 {
  font-weight: 700;
  font-size: 18px;
  font-family:  "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
}

.content-start {
  width: 30px;
  height: 5px;
  border-radius: 99px;
  background-color: var(--text-color);
  margin-bottom: 8px;
}

.details {
  z-index: 22;
  position: absolute;
  top: 240px;
  left: 60px;
}

.place-box {
  height: 46px;
  overflow: hidden;
}

.place-box .text {
  padding-top: 16px;
  font-size: 20px;
  position: relative;
}

.place-box .text:before {
  top: 0;
  left: 0;
  position: absolute;
  content: "";
  width: 30px;
  height: 4px;
  border-radius: 99px;
  background-color: white;
}

.title-1,
.title-2 {
  font-weight: 700;
  font-size: 72px;
  font-family:  "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
  line-height: 1.1;
}

.title-box-1,
.title-box-2 {
  margin-top: 2px;
  height: 100px;
  overflow: hidden;
}

.desc {
  margin-top: 16px;
  width: 500px;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.8;
  font-weight: 500;
}

.cta {
  width: 500px;
  margin-top: 24px;
  display: flex;
  align-items: center;
}

.bookmark {
  border: none;
  background-color: var(--primary-color);
  width: 36px;
  height: 36px;
  border-radius: 99px;
  color: white;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.bookmark svg {
  width: 20px;
  height: 20px;
}

.arrow-container {
  display: none;
}

.discover {
  border: 1px solid #ffffff;
  background-color: transparent;
  height: 36px;
  border-radius: 99px;
  color: #ffffff;
  padding: 4px 24px;
  font-size: 12px;
  margin-left: 16px;
  text-transform: uppercase;
  cursor: pointer;
}

nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 50px;
  font-weight: 600;
  background-color: rgba(26, 26, 26, 1);
  backdrop-filter: blur(5px);
}

.logo-container-mobile {
  display: none;
}

nav svg {
  width: 20px;
  height: 20px;
}

.svg-container {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

nav > div {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 14px;
}

.nav-link {
  color: white;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease, opacity 0.3s ease;
  padding-bottom: 4px;
  font-weight: 600;
  font-size: 1.8rem;
  margin-right: 30px; /* Уменьшил отступ для умещения всех пунктов */
}

.nav-link:hover {
  opacity: 1;
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 4px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
  border-radius: 99px;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active::after {
  width: 100%;
}

.logo-link {
  padding-left: 32px;
  display: block;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

/* Медиа запросы для адаптивности */
@media (max-width: 1400px) {
  .nav-link {
    font-size: 1.5rem;
    margin-right: 20px;
  }
}

@media (max-width: 1200px) {
  .logo-container-desktop {
    transform: scale(0.7);
  }
  .nav-link {
    font-size: 1.2rem;
    margin-right: 20px;
  }
}

@media (max-width: 992px) {
  .content-title-1,
  .content-title-2 {
    font-weight: 700;
    font-size: 14px;
    font-family:  "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
  }
  .nav-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-arrow {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    margin-left: 10px;
  }

  .nav-arrow-icon,
  .nav-arrow-icon-active {
    display: none;
  }

  .nav-items {
    display: none;
    flex-direction: column;
    padding-left: 20px;
  }

  .nav-items-collapsed {
    display: flex;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    transition: color 0.3s ease, opacity 0.3s ease;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 5px 0;
    padding-bottom: 4px;
  }

  .nav-link:hover {
    opacity: 1;
    color: var(--primary-color);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 4px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
    border-radius: 99px;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-link.active::after {
    width: 100%;
  }

  nav {
    flex-direction: row;
    position: sticky;
    height: 200px;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    z-index: 1001;
    backdrop-filter: blur(10px);
  }

  .full {
    max-height: 100vh;
    overflow: auto;

    nav {
      height: 300px;
    }
  }

  .no-overflow {
    overflow: hidden;
  }

  .nav-links {
    display: flex;
    gap: 15px !important;
    align-items: center;
    margin-top: 10px;
  }

  .logo-container-desktop {
    display: none;
  }

  .arrow-container {
    margin-top: 20px;
    outline: none;
    display: flex;
    align-items: center;
  }

  .arrow-container button {
    outline: none;
  }

  .logo-container-mobile {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  nav {
    align-items: flex-start;
    justify-content: flex-start;
  }

  .nav-links {
    flex-direction: column;
    gap: 1rem;
  }

  .logo-container-mobile {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}

/* Дополнительные стили для очень маленьких экранов */
@media (max-width: 480px) {
  .logo-link img {
    height: 80px !important;
  }

  .nav-links {
    margin-top: 10px;
  }

  .nav-items {
    padding-left: 10px;
  }

  .nav-link {
    font-size: 1rem;
  }
}

.indicator {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 5px;
  z-index: 60;
  background-color: var(--primary-color);
}

.pagination {
  position: absolute;
  left: 0px;
  top: 0px;
  display: inline-flex;
}

.arrow {
  z-index: 60;
  width: 50px;
  height: 50px;
  border-radius: 999px;
  border: 2px solid #ffffff55;
  display: grid;
  place-items: center;
}

.arrow:nth-child(2) {
  margin-left: 20px;
}

.arrow svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: #ffffff99;
}

.progress-sub-container {
  margin-left: 24px;
  z-index: 60;
  width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
}

.progress-sub-background {
  width: 500px;
  height: 3px;
  background-color: #ffffff33;
}

.progress-sub-foreground {
  height: 3px;
  background-color: var(--primary-color);
}

.slide-numbers {
  width: 50px;
  height: 50px;
  overflow: hidden;
  z-index: 60;
  position: relative;
}

.slide-numbers .item {
  width: 50px;
  height: 50px;
  position: absolute;
  color: white;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  font-size: 32px;
  font-weight: bold;
}

.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
}

/* Добавляем новые стили для бургер-меню */
.burger-menu {
  width: 35px;
  height: 25px;
  position: relative;
  cursor: pointer;
  padding: 0;
  background: none;
  border: none;
}

.burger-menu span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: white;
  border-radius: 3px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.burger-menu span:nth-child(1) {
  top: 0px;
}

.burger-menu span:nth-child(2) {
  top: 11px;
}

.burger-menu span:nth-child(3) {
  top: 22px;
}

.burger-menu.active span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.burger-menu.active span:nth-child(2) {
  opacity: 0;
}

.burger-menu.active span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}
</style>