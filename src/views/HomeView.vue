<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';
import back1 from '../assets/back1.png';
import back2 from '../assets/back2.jpg';
import back3 from '../assets/back3.png';
import back4 from '../assets/back4.jpg';
import back5 from '../assets/back5.jpg';

const data = [
  {
    place: 'Switzerland Alps',
    title: '',
    title2: '',
    description: 'Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It\'s a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.',
    image: back1
  },
  {
    place: '',
    title: '',
    title2: '',
    description: 'Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country\'s best powder.',
    image: back2
  },
  {
    place: '',
    title: '',
    title2: '',
    description: 'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
    image: back3
  },
  {
    place: '',
    title: '',
    title2: '',
    description: 'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
    image: back4
  },
  {
    place: '',
    title: '',
    title2: '',
    description: 'Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach\'s long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.',
    image: back5
  },
];

const route = useRoute();
const isHomePage = ref(route.name === 'home');
const animationActive = ref(false);
let order = [0, 1, 2, 3, 4];
let detailsEven = true;
let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";
let animationTimeline: gsap.core.Timeline | null = null;

watch(() => route.name, (newName) => {
  isHomePage.value = newName === 'home';
  if (isHomePage.value) {
    startAnimation();
  } else {
    stopAnimation();
  }
});

const _ = (id: string): HTMLElement | null => document.getElementById(id);
const cards = data.map((i, index: number) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`).join('');
const cardContents = data.map((i, index: number) => `<div class="card-content" id="card-content-${index}">
</div>`).join('');
const sildeNumbers = data.map((_, index: number) => `<div class="item" id="slide-item-${index}">${index+1}</div>`).join('');

function getCard(index: number): string { return `#card${index}`; }
function getCardContent(index: number): string { return `#card-content-${index}`; }
function getSliderItem(index: number): string { return `#slide-item-${index}`; }

function resetAnimation() {
  // Останавливаем все текущие анимации
  if (animationTimeline) {
    animationTimeline.kill();
    animationTimeline = null;
  }
  gsap.killTweensOf(".card, .card-content, .details, .pagination, .indicator, .cover");

  // Сбрасываем состояние
  order = [0, 1, 2, 3, 4];
  detailsEven = true;
  animationActive.value = false;

  // Скрываем все элементы
  gsap.set(".card, .card-content, .details, .pagination, .indicator", { opacity: 0 });
}

function init() {
  resetAnimation();

  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;

  // Адаптивные размеры для мобильных устройств
  if (width <= 480) {
    cardWidth = 150;
    cardHeight = 200;
    gap = 20;
    numberSize = 30;
    offsetTop = height - 300;
    offsetLeft = width - 400;
  } else if (width <= 768) {
    cardWidth = 180;
    cardHeight = 250;
    gap = 30;
    numberSize = 40;
    offsetTop = height - 350;
    offsetLeft = width - 500;
  } else if (width <= 992) {
    cardWidth = 200;
    cardHeight = 280;
    gap = 35;
    numberSize = 45;
    offsetTop = height - 400;
    offsetLeft = width - 600;
  } else {
    cardWidth = 200;
    cardHeight = 300;
    gap = 40;
    numberSize = 50;
    offsetTop = height - 430;
    offsetLeft = width - 830;
  }

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    opacity: 1,
    zIndex: 20
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
      opacity: 1
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
      opacity: 1
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth, opacity: 1 });
  gsap.set(".cover", { x: 0, opacity: 1 });
}

async function step() {
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

  gsap.set(detailsActive, { zIndex: 22 });
  gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
  gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
  gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
  gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
  gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
  gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.35, duration: 0.4, ease });

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
}

async function loop() {
  await gsap.to(".indicator", { x: 0, duration: 2, ease });
  await gsap.to(".indicator", { x: window.innerWidth, duration: 0.8, delay: 0.3, ease });
  gsap.set(".indicator", { x: -window.innerWidth });

  if (animationActive.value) {
    await step();
    loop();
  }
}

async function startInitialAnimation() {
  const { innerWidth: width } = window;
  const startDelay = 0.6;

  // Анимация cover
  await gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
  });

  animationActive.value = true;

  // Анимация карточек
  const [active, ...rest] = order;
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      ease,
    }, startDelay);

    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      ease,
    }, startDelay);
  });

  // Анимация пагинации и деталей
  gsap.to("#pagination", { y: 0, opacity: 1, ease }, startDelay);
  gsap.to(detailsEven ? "#details-even" : "#details-odd", {
    opacity: 1,
    x: 0,
    ease
  }, startDelay);

  loop();
}

function stopAnimation() {
  animationActive.value = false;
  resetAnimation();
}

async function startAnimation() {
  init();
  await startInitialAnimation();
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
      if (animationActive.value) {
        step();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (animationActive.value) {
        step();
      }
    });
  }

  await loadImages();
  if (isHomePage.value) {
    startAnimation();
  }
});

onUnmounted(() => {
  stopAnimation();
});
</script>

<template>
  <div class="home-view">

    <div class="static-content">
      <h1>SnZ Project</h1>
      <h2>Архитектура. Интерьеры. Ландшафт.</h2>
      <div class="static-description">
        <p>Проектируем пространства, которые легко воплотить в жизнь и комфортно использовать. Работаем с жилыми и коммерческими объектами в Алматы и за ее пределами.</p>
        <p class="highlight-text">Наш подход: продуманная функция, яркая эстетика и реализуемые проекты.</p>
        <div class="features-list">
          <div class="feature-item">🔸 Опыт основателей – более 15 лет в профессии</div>
          <div class="feature-item">🔸 Проекты, готовые к строительству</div>
          <div class="feature-item">🔸 Эстетика и функция в идеальном балансе</div>
        </div>
      </div>
    </div>

    <div id="demo"></div>

    <div style="color: black">
      <div class="details" id="details-even">
        <div class="place-box">
          <div class="text"></div>
        </div>
        <div class="title-box-1"><div class="title-1"></div></div>
        <div class="title-box-2"><div class="title-2"></div></div>
        <div class="desc">
        </div>
      </div>

      <div class="details" id="details-odd">
        <div class="place-box">
        </div>
        <div class="title-box-1"><div class="title-1"></div></div>
        <div class="title-box-2"><div class="title-2"></div></div>
        <div class="desc">
        </div>
      </div>

      <div class="pagination" id="pagination">
        <div class="arrow arrow-left" style="display: none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div class="arrow arrow-right" style="display: none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div class="progress-sub-container" >
          <div class="progress-sub-background" >
            <div class="progress-sub-foreground" ></div>
          </div>
        </div>
        <div class="slide-numbers" id="slide-numbers"></div>
      </div>
    </div>

    <div class="cover"></div>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.card {
  position: absolute;
  left: 0;
  top: 0;
  background-position: center;
  background-size: cover;
  box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6);
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

.content-title-1,
.content-title-2 {
  font-weight: 600;
  font-size: 20px;
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
  line-height: 1.1;
  color: #ffffff;
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
  cursor: pointer;
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

@media (max-width: 992px) {

  .home-view {
    margin-top: -180px;
  }
  .details {
    top: 180px;
    left: 30px;
  }

  .title-1,
  .title-2 {
    font-size: 48px;
  }

  .title-box-1 {
    margin-top: 20px;
  }

  .title-box-1,
  .title-box-2 {
    height: 70px;
  }

  .desc {
    width: 80%;
    max-width: 400px;
  }

  .slide-numbers {
    width: 40px;
    height: 40px;
  }

  .slide-numbers .item {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  .arrow {
    width: 40px;
    height: 40px;
  }

  .arrow svg {
    width: 20px;
    height: 20px;
  }

  .pagination {
    display: none;
  }
}

@media (max-width: 768px) {
  .details {
    top: 150px;
    left: 20px;
  }

  .title-1,
  .title-2 {
    font-size: 36px;
  }

  .title-box-1,
  .title-box-2 {
    height: 50px;
  }

  .desc {
    width: 90%;
    font-size: 14px;
  }

  .progress-sub-container {
    width: 200px;
  }

  .progress-sub-background {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .details {
    top: 120px;
    left: 15px;
  }

  .title-1,
  .title-2 {
    font-size: 28px;
  }

  .title-box-1,
  .title-box-2 {
    height: 40px;
  }

  .desc {
    width: 95%;
    font-size: 13px;
  }

  .progress-sub-container {
    width: 150px;
  }

  .progress-sub-background {
    width: 150px;
  }

  .slide-numbers {
    width: 30px;
    height: 30px;
  }

  .slide-numbers .item {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }

  .arrow {
    width: 30px;
    height: 30px;
  }

  .arrow svg {
    width: 16px;
    height: 16px;
  }
}

.static-content {
  background: rgba(26, 26, 26, 0.6);
  padding: 30px 40px;
  border-radius: 25px;
  position: absolute;
  top: 25%;
  left: 82px;
  z-index: 50;
  color: white;
  max-width: 800px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.static-content h1 {
  font-size: 4.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.static-content h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.static-description p {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  max-width: 700px;
}

.highlight-text {
  font-size: 1.6rem;
  font-weight: 500;
  margin: 2rem 0;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 2rem;
}

.feature-item {
  font-size: 1.4rem;
  line-height: 1.5;
  position: relative;
  padding-left: 2rem;
}

/* Адаптивные стили */
@media (max-width: 1600px) {
  .static-content {
    max-width: 450px;
    max-height: 570px;

    .static-description {
      overflow: auto;
      max-height: 280px;
    }
  }
  .static-content h1 {
    font-size: 3rem;
  }
  .static-description p {
    font-size: 1.4rem;
  }
  .feature-item {
    font-size: 1.3rem;
  }
}

@media (max-width: 1200px) {
  .static-content {
    left: 8%;
    right: 8%;
  }
}

@media (max-width: 992px) {
  .static-content {
    max-width: 80%;
    left: 10%;
    max-height: 60%;
    top: 250px;

    .static-description {
      overflow: auto;
      max-height: 200px;
    }
  }
  .static-content h1 {
    font-size: 3rem;
  }
  .static-content h2 {
    font-size: 1.6rem;
  }
  .static-description p {
    font-size: 1.2rem;
  }
  .feature-item {
    font-size: 1.1rem;
    padding-left: 1.8rem;
  }
}

@media (max-width: 768px) {

  .static-content h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .static-content h1 {
    font-size: 2rem;
  }
  .static-content h2 {
    font-size: 1.3rem;
  }
  .static-description p {
    font-size: 1.1rem;
  }
  .feature-item {
    font-size: 1rem;
    padding-left: 1.5rem;
  }
}
</style>