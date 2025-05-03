console.log('Cursor script started loading...');

// Создаем два canvas
const cursorCanvas = document.querySelector("canvas");
const bgCanvas = document.createElement('canvas');
document.body.appendChild(bgCanvas);

if (!cursorCanvas || !bgCanvas) {
    console.error('Canvas elements not found!');
} else {
    console.log('Canvas elements found successfully');
}

const cursorCtx = cursorCanvas.getContext('2d');
const bgCtx = bgCanvas.getContext('2d');

if (!cursorCtx || !bgCtx) {
    console.error('Could not get canvas context!');
} else {
    console.log('Canvas contexts obtained successfully');
}

// для вводной анимации
let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
}

const params = {
    pointsNumber: 40,
    widthFactor: .05,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

function setupCanvas() {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;

    // Копируем содержимое страницы на bgCanvas
    html2canvas(document.body).then(canvas => {
        bgCtx.drawImage(canvas, 0, 0);
    });
}

function getColorAt(x, y) {
    const pixel = bgCtx.getImageData(x, y, 1, 1).data;
    const brightness = (pixel[0] * 0.299 + pixel[1] * 0.587 + pixel[2] * 0.114) / 255;
    return brightness > 0.5 ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);

function update(t) {
    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    cursorCtx.lineCap = "round";
    cursorCtx.beginPath();
    cursorCtx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        cursorCtx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        cursorCtx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        const color = getColorAt(Math.round(trail[i].x), Math.round(trail[i].y));
        cursorCtx.strokeStyle = color + (1 - i/params.pointsNumber) + ')';
        cursorCtx.stroke();
    }
    cursorCtx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    cursorCtx.stroke();

    window.requestAnimationFrame(update);
}

console.log('Cursor script finished loading');