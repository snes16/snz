<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Заменяем стандартный импорт на импорт через CDN
// import gsap from 'gsap';

// Добавляем объявление типа для window.gsap
declare global {
  interface Window {
    gsap: any;
  }
}

// Добавляем CDN скрипт для GSAP
const loadGSAP = () => {
  return new Promise((resolve) => {
    if (window.gsap) {
      resolve(window.gsap);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js';
    script.onload = () => resolve(window.gsap);
    document.head.appendChild(script);
  });
};

let gsap: any;

const data = [
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

const _ = (id: string): HTMLElement | null => document.getElementById(id);
const cards = data.map((i, index: number) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`).join('');

const cardContents = data.map((i, index: number) => `<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>
</div>`).join('');

const sildeNumbers = data.map((_, index: number) => `<div class="item" id="slide-item-${index}">${index+1}</div>`).join('');

const range = (n: number) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);

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

let order = [0, 1, 2, 3, 4];
let detailsEven = true;
let set: ((targets: any, vars: any) => any) | undefined;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  set = gsap.set;
  
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
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
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    // Используем безопасный доступ к элементу массива
    const shifted = order.shift();
    if (shifted !== undefined) {
      order.push(shifted);
    }
    
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    // Добавим проверки на null
    const title1Element = document.querySelector(`${detailsActive} .title-1`);
    if (title1Element && order.length > 0) {
      title1Element.textContent = data[order[0]].title;
    }
    
    const title2Element = document.querySelector(`${detailsActive} .title-2`);
    if (title2Element && order.length > 0) {
      title2Element.textContent = data[order[0]].title2;
    }

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  
  // Проверяем, что set инициализирован
  if (set) {
    set(".indicator", { x: -window.innerWidth });
  } else {
    // Если почему-то set не инициализирован, используем gsap.set напрямую
    gsap.set(".indicator", { x: -window.innerWidth });
  }
  
  await step();
  loop();
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
    // Загружаем GSAP перед использованием
    gsap = await loadGSAP();
    
    // После загрузки GSAP инициализируем set
    set = gsap.set;
    
    await loadImages();
    
    // Запускаем инициализацию только после полной загрузки GSAP и изображений
    if (gsap) {
      init();
    } else {
      console.error("GSAP не был загружен правильно");
    }
  } catch (error) {
    console.error("One or more images failed to load or GSAP failed to load", error);
  }
}

const router = useRouter();

onMounted(async () => {
  const demoElement = _('demo');
  if (demoElement) {
    demoElement.innerHTML = cards + cardContents;
  }
  
  const slideNumbersElement = _('slide-numbers');
  if (slideNumbersElement) {
    slideNumbersElement.innerHTML = sildeNumbers;
  }
  
  const prevButton = document.querySelector('.arrow-left');
  const nextButton = document.querySelector('.arrow-right');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      clicks = 1;
      step();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      clicks = 1;
      step();
    });
  }
  
  // Добавляем обработчики для навигации
  const setupNavigation = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Удаляем активный класс у всех ссылок
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Добавляем активный класс текущей ссылке
        link.classList.add('active');
        
        // Переходим по указанному маршруту
        const href = link.getAttribute('href');
        if (href) {
          router.push(href);
        }
      });
    });
    
    // Добавляем обработчик для логотипа
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
      logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Активируем ссылку "Главная"
        const homeLink = document.querySelector('.nav-link[href="/"]');
        if (homeLink) {
          // Удаляем активный класс у всех ссылок
          navLinks.forEach(l => l.classList.remove('active'));
          
          // Добавляем активный класс ссылке "Главная"
          homeLink.classList.add('active');
        }
        
        // Переходим на главную страницу
        router.push('/');
      });
    }
  };
  
  // Запускаем настройку навигации после небольшой задержки,
  // чтобы DOM успел загрузиться
  setTimeout(setupNavigation, 100);
  
  await start();
});
</script>

<template>
  <div class="app-container">
    <div class="indicator"></div>
    
    <nav>
      <div>
        <a href="/" class="logo-link">
          <img src="https://snzproject.com/wp-content/uploads/2023/12/snz_logo_-1.png"
              alt="SNZ"
              style="height: 120px"
          />
        </a>
      </div>
      <div class="nav-links">
        <a href="/" class="nav-link active">Главная</a>
        <a href="/architecture" class="nav-link">Архитектура</a>
        <a href="/interior" class="nav-link">Интерьер</a>
        <a href="/landscape" class="nav-link">Ландшафты</a>
        <a href="/contacts" class="nav-link">Контакты</a>
      </div>
    </nav>
    
    <!-- Здесь будет отображаться содержимое маршрутов -->
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap");

:root {
  --primary-color: #ecad29;
  --text-color: #FFFFFFDD;
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
  font-family: "Inter", sans-serif;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
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
  font-weight: 500;
}

.content-place {
  font-weight: 500;
}

.content-title-1,
.content-title-2 {
  font-weight: 600;
  font-size: 20px;
  font-family: "Oswald", sans-serif;
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
  font-weight: 600;
  font-size: 72px;
  font-family: "Oswald", sans-serif;
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
  font-weight: 500;
  background-color: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(5px);
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

nav > div:first-child {
  gap: 20px;
  margin-right: 40px;
}

/* Обновленные стили для навигации */
.nav-links {
  gap: 50px;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease, opacity 0.3s ease;
  padding-bottom: 4px;
  font-size: 1.8rem;
  font-weight: 600;
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
  display: block;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
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
</style>
