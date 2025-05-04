<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';

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
<div class="content-start"></div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>
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
  offsetTop = height - 430;
  offsetLeft = width - 830;

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
    <div id="demo"></div>

    <div style="color: black">
      <div class="details" id="details-even">
        <div class="place-box">
          <div class="text"></div>
        </div>
        <div class="title-box-1"><div class="title-1">SAINT</div></div>
        <div class="title-box-2"><div class="title-2">ANTONIEN</div></div>
        <div class="desc">
        </div>
      </div>

      <div class="details" id="details-odd">
        <div class="place-box">
        </div>
        <div class="title-box-1"><div class="title-1">SAINT </div></div>
        <div class="title-box-2"><div class="title-2">ANTONIEN</div></div>
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
</style>