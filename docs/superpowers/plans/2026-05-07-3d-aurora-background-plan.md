# 3D 极光星空背景 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 index.html 的 CSS 2D 背景替换为 Three.js 3D 可交互极光星空背景，鼠标视差跟随。

**Architecture:** 单个 HTML 文件内联实现。Three.js 从 CDN 加载，新增 `<canvas id="threeBg">` 作为 3D 渲染面，通过自定义 Shader 实现极光帷幕，PointsMaterial 实现星空粒子。所有代码写在 index.html 内的 `<script>` 标签中，遵循现有单文件模式。

**Tech Stack:** Three.js (CDN), WebGL, GLSL Shader, 原生 JavaScript

---

### Task 1: 清理旧背景代码

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 移除 CSS 中的旧背景样式**

删除以下 CSS 规则：
- `body::before` (第 43-53 行) — CSS 极光渐变
- `body::after` (第 54-66 行) — CSS 极光动画层
- `@keyframes auroraShift` (第 63-66 行)
- `#starfield` (第 69 行) 及其内部 `.star` (第 70-79 行)、`.shooting-star` (第 80-91 行)、`@keyframes twinkle` (第 76-79 行)、`@keyframes shoot` (第 87-91 行)

同时删除 HTML 中 `<div id="starfield"></div>` (第 561 行)。

- [ ] **Step 2: 移除 JS 中的星空生成代码**

删除 JS 中以下代码段：
- `// ===== STARFIELD =====` 整个区块 (约第 1228-1257 行)，包括：
  - `const starfield = document.getElementById('starfield');`
  - `STAR_COUNT` 循环创建 `.star` 元素
  - `createShootingStar()` 函数
  - `scheduleMeteor()` 函数
  - 初始 10 次 `setTimeout(() => createShootingStar(), ...)` 调用
  - `scheduleMeteor()` 调用

- [ ] **Step 3: 验证清理后页面无残留错误**

在浏览器中打开 index.html，确认：
- 页面背景变为纯色（`--bg-deep: #06061a`）
- Console 中无 JS 错误
- 所有 UI 组件正常显示（header、hero、cards、footer）
- 爱心拖尾、warp 过渡、许愿星空仍正常工作

---

### Task 2: 添加 Three.js CDN 和 Canvas 元素

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 添加 Three.js CDN import**

在 `<head>` 末尾（`</style>` 之后）添加 Three.js CDN：

```html
<script type="importmap">
{
    "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
    }
}
</script>
```

- [ ] **Step 2: 添加 Three.js 背景 Canvas**

在 `<body>` 开头（`<div id="starfield"></div>` 原位置）替换为：

```html
<canvas id="threeBg"></canvas>
```

- [ ] **Step 3: 添加 Canvas CSS 样式**

在 CSS 中添加：

```css
#threeBg {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    z-index: -3; pointer-events: none;
    background: var(--bg-deep);
}
```

- [ ] **Step 4: 验证 Canvas 渲染正常**

在浏览器中打开 index.html，确认：
- Canvas 元素存在，占据全屏
- 目前显示深色背景（`--bg-deep`）
- 不影响页面任何交互

---

### Task 3: 编写 Three.js 场景核心（导入 & 初始化）

**Files:**
- Modify: `index.html`

在现有 `<script>` 标签之前添加新的 `<script type="module">` 标签来编写 Three.js 代码。

- [ ] **Step 1: 创建场景基础结构**

```javascript
<script type="module">
import * as THREE from 'three';

// ===== DOM ELEMENT =====
const canvas = document.getElementById('threeBg');

// ===== BASIC SCENE SETUP =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, 250);
});

// ===== MOUSE TRACKING =====
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
});
window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mouse.tx = (t.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(t.clientY / window.innerHeight) * 2 + 1;
}, { passive: true });

// ===== VISIBILITY API =====
let isVisible = true;
document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
});

// ===== ANIMATION LOOP =====
function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    // Smooth mouse lerp
    mouse.x += (mouse.tx - mouse.x) * 0.03;
    mouse.y += (mouse.ty - mouse.y) * 0.03;

    renderer.render(scene, camera);
}
animate();
</script>
```

- [ ] **Step 2: 验证基础场景**

在浏览器中打开，确认：
- 无 Console 错误
- Three.js 成功加载
- Canvas 渲染深色背景

---

### Task 4: 实现星空粒子系统

**Files:**
- Modify: `index.html` (在 Task 3 的 `<script type="module">` 内追加)

- [ ] **Step 1: 创建星空粒子**

在 animate() 之前添加：

```javascript
// ===== STARFIELD =====
const STAR_COUNT = 2000;
const starGeo = new THREE.BufferGeometry();
const positions = new Float32Array(STAR_COUNT * 3);
const colors = new Float32Array(STAR_COUNT * 3);
const sizes = new Float32Array(STAR_COUNT);

const SPHERE_RADIUS = 800;

for (let i = 0; i < STAR_COUNT; i++) {
    // Random point on sphere surface (with thickness)
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = SPHERE_RADIUS * (0.75 + Math.random() * 0.25);

    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
    positions[i * 3 + 2] = Math.cos(phi) * r;

    // Color by depth: front = warm white, back = blue/purple tint
    const depth = (r / SPHERE_RADIUS);
    colors[i * 3] = 0.8 + Math.random() * 0.2;
    colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
    colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;

    sizes[i] = 0.5 + Math.random() * 3.0;
}

starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

// Star sprite texture
const starCanvas = document.createElement('canvas');
starCanvas.width = 32; starCanvas.height = 32;
const sctx = starCanvas.getContext('2d');
const gradient = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
gradient.addColorStop(0, 'rgba(255,255,255,1)');
gradient.addColorStop(0.1, 'rgba(255,255,255,0.8)');
gradient.addColorStop(0.4, 'rgba(200,220,255,0.2)');
gradient.addColorStop(1, 'rgba(0,0,0,0)');
sctx.fillStyle = gradient;
sctx.fillRect(0, 0, 32, 32);
const starTexture = new THREE.CanvasTexture(starCanvas);

const starMaterial = new THREE.PointsMaterial({
    size: 4.5,
    map: starTexture,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.8,
});

const starfield = new THREE.Points(starGeo, starMaterial);
scene.add(starfield);
```

- [ ] **Step 2: 在 animate() 中添加星空旋转和视差**

在 `animate()` 函数的 `renderer.render` 之前添加：

```javascript
// Starfield slow rotation + parallax
starfield.rotation.y += 0.0001;
starfield.rotation.x += mouse.y * 0.0002;
starfield.rotation.z += mouse.x * 0.0002;

// Subtle camera movement for parallax
camera.position.x += (mouse.x * 15 - camera.position.x) * 0.01;
camera.position.y += (mouse.y * 10 - camera.position.y) * 0.01;
camera.lookAt(scene.position);
```

- [ ] **Step 3: 验证星空效果**

在浏览器中打开，确认：
- 星空粒子可见，分布在球面上
- 有深度感（近处大亮、远处小暗）
- 鼠标移动时有视差响应
- 星空缓慢自转

---

### Task 5: 实现极光帷幕

**Files:**
- Modify: `index.html` (在 Task 4 的代码之后追加)

- [ ] **Step 1: 创建极光着色器材质**

```javascript
// ===== AURORA CURTAINS =====
const auroraVertexShader = /* glsl */`
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const auroraFragmentShader = /* glsl */`
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uOpacity;

    // Simple noise function
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        float h = vUv.y;
        float t = uTime * 0.3;

        // Vertical bands with noise
        float n = fbm(vec2(vUv.x * 3.0 + t * 0.2, vUv.y * 2.0 + sin(vUv.x * 2.0 + t) * 0.5));
        float band1 = smoothstep(0.2, 0.6, h) * smoothstep(0.8, 0.4, h);
        float band2 = smoothstep(0.5, 0.75, h) * smoothstep(0.95, 0.7, h);
        float band3 = smoothstep(0.0, 0.3, h) * smoothstep(0.5, 0.2, h);

        float strength = (band1 * 0.8 + band2 * 0.5 + band3 * 0.4) * n;

        // Color gradient: cyan -> violet -> blue
        vec3 color1 = vec3(0.314, 0.816, 0.690); // #50d0b0 cyan
        vec3 color2 = vec3(0.722, 0.565, 0.878); // #b890e0 violet
        vec3 color3 = vec3(0.314, 0.565, 0.816); // #5090d0 blue

        vec3 color = mix(color1, color2, h);
        color = mix(color, color3, sin(h * 3.14159) * 0.5 + 0.5);

        float alpha = strength * uOpacity * (0.3 + n * 0.7);
        gl_FragColor = vec4(color, alpha);
    }
`;

const auroraUniforms = {
    uTime: { value: 0 },
    uOpacity: { value: 0.6 },
};
```

- [ ] **Step 2: 创建极光平面并添加到场景**

在 shader 代码后添加：

```javascript
function createAuroraCurtain(width, height, yOffset, zPos, rotationY) {
    const geo = new THREE.PlaneGeometry(width, height, 64, 32);
    const mat = new THREE.ShaderMaterial({
        vertexShader: auroraVertexShader,
        fragmentShader: auroraFragmentShader,
        uniforms: auroraUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = yOffset;
    mesh.position.z = zPos;
    mesh.rotation.y = rotationY;
    return mesh;
}

// 3 aurora curtains at different positions
const auroraCurtains = [
    createAuroraCurtain(900, 350, 50, -100, 0),
    createAuroraCurtain(800, 300, -30, -130, 0.3),
    createAuroraCurtain(850, 320, 80, -115, -0.25),
];

auroraCurtains.forEach(c => scene.add(c));
```

- [ ] **Step 3: 在 animate() 中更新极光时间**

在 `animate()` 函数的 `renderer.render` 之前添加：

```javascript
auroraUniforms.uTime.value += 0.008;

// Aurora subtle parallax movement
auroraCurtains.forEach((curtain, i) => {
    const factor = 0.5 + i * 0.2;
    curtain.position.x += (mouse.x * 20 * factor - curtain.position.x) * 0.015;
    curtain.position.y += (mouse.y * 8 * factor - curtain.position.y) * 0.015;
});
```

- [ ] **Step 4: 验证极光效果**

在浏览器中打开，确认：
- 极光帷幕可见，半透明柔和
- 颜色渐变：青→紫→蓝
- 极光随时间缓慢飘动
- 鼠标移动时有轻微视差

---

### Task 6: 实现流星效果

**Files:**
- Modify: `index.html` (在 Task 5 代码之后追加)

- [ ] **Step 1: 创建流星系统**

```javascript
// ===== SHOOTING STARS =====
const shootingStars = [];
const MAX_SHOOTERS = 3;

function createShootingStar() {
    // Random start position on screen
    const startAngle = Math.random() * Math.PI * 2;
    const startDist = 400 + Math.random() * 300;
    const sx = Math.cos(startAngle) * startDist;
    const sy = (Math.random() - 0.5) * 600;
    const sz = -100 + Math.random() * 200;

    const points = [];
    const trailLen = 30;
    const angle = -Math.PI / 6 + (Math.random() - 0.5) * 0.4;
    const speed = 15 + Math.random() * 20;

    for (let i = 0; i < trailLen; i++) {
        points.push(new THREE.Vector3(
            sx - Math.cos(angle) * i * 8,
            sy - Math.sin(angle) * i * 8,
            sz
        ));
    }

    const trailGeo = new THREE.BufferGeometry().setFromPoints(points);

    // Fade colors along trail
    const trailColors = new Float32Array(trailLen * 3);
    for (let i = 0; i < trailLen; i++) {
        const alpha = 1 - i / trailLen;
        trailColors[i * 3] = 0.9;
        trailColors[i * 3 + 1] = 0.95;
        trailColors[i * 3 + 2] = 1.0;
    }
    trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    const trailMat = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.9,
    });

    const trailLine = new THREE.Points(trailGeo, trailMat);

    // Bright head
    const headGeo = new THREE.BufferGeometry();
    headGeo.setAttribute('position', new THREE.BufferAttribute(
        new Float32Array([sx, sy, sz]), 3
    ));
    const headMat = new THREE.PointsMaterial({
        size: 6,
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 1,
    });
    const head = new THREE.Points(headGeo, headMat);

    const group = new THREE.Group();
    group.add(trailLine);
    group.add(head);
    scene.add(group);

    shootingStars.push({
        group,
        head,
        trail: trailLine,
        sx, sy, sz,
        angle,
        speed,
        life: 1.0,
        trailLen,
        points,
    });

    // Limit concurrent shooters
    if (shootingStars.length > MAX_SHOOTERS) {
        const old = shootingStars.shift();
        scene.remove(old.group);
        old.group.children.forEach(c => { c.geometry.dispose(); c.material.dispose(); });
    }
}

// Schedule shooting stars
function scheduleShootingStar() {
    const delay = 2000 + Math.random() * 5000;
    setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
    }, delay);
}
scheduleShootingStar();
```

- [ ] **Step 2: 在 animate() 中更新流星**

在 `renderer.render` 之前添加：

```javascript
// Update shooting stars
for (let i = shootingStars.length - 1; i >= 0; i--) {
    const ss = shootingStars[i];
    ss.life -= 0.006;
    ss.sx += Math.cos(ss.angle) * ss.speed;
    ss.sy += Math.sin(ss.angle) * ss.speed;

    // Update trail positions
    for (let j = ss.trailLen - 1; j > 0; j--) {
        ss.points[j].copy(ss.points[j - 1]);
    }
    ss.points[0].set(ss.sx, ss.sy, ss.sz);
    ss.trail.geometry.setFromPoints(ss.points);
    ss.trail.material.opacity = ss.life * 0.9;

    // Update head
    const headPos = new Float32Array([ss.sx, ss.sy, ss.sz]);
    ss.head.geometry.setAttribute('position', new THREE.BufferAttribute(headPos, 3));
    ss.head.material.opacity = ss.life;

    if (ss.life <= 0) {
        scene.remove(ss.group);
        ss.group.children.forEach(c => { c.geometry.dispose(); c.material.dispose(); });
        shootingStars.splice(i, 1);
    }
}
```

- [ ] **Step 3: 验证流星效果**

在浏览器中打开，确认：
- 每隔几秒出现一颗流星
- 流星有明亮的头部和渐变拖尾
- 方向随机，划过天空
- 不会同时出现太多

---

### Task 7: 实现微尘漂浮粒子

**Files:**
- Modify: `index.html` (在 Task 6 代码之后追加)

- [ ] **Step 1: 创建微尘粒子系统**

```javascript
// ===== FLOATING DUST =====
const DUST_COUNT = 100;
const dustGeo = new THREE.BufferGeometry();
const dustPositions = new Float32Array(DUST_COUNT * 3);
const dustSizes = new Float32Array(DUST_COUNT);
const dustData = []; // per-particle drift data

for (let i = 0; i < DUST_COUNT; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 500;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
    dustPositions[i * 3 + 2] = 50 + Math.random() * 200;
    dustSizes[i] = 1.5 + Math.random() * 3.5;

    dustData.push({
        baseX: dustPositions[i * 3],
        baseY: dustPositions[i * 3 + 1],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        amplitude: 10 + Math.random() * 40,
    });
}

dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
dustGeo.setAttribute('size', new THREE.BufferAttribute(dustSizes, 1));

const dustMat = new THREE.PointsMaterial({
    size: 3,
    map: starTexture,
    color: 0x80d0e0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.5,
});

const dustParticles = new THREE.Points(dustGeo, dustMat);
scene.add(dustParticles);
```

- [ ] **Step 2: 在 animate() 中更新微尘**

在 `renderer.render` 之前添加：

```javascript
// Update floating dust
const dustPos = dustParticles.geometry.attributes.position.array;
for (let i = 0; i < DUST_COUNT; i++) {
    const d = dustData[i];
    const time = performance.now() * 0.001;
    dustPos[i * 3] = d.baseX + Math.sin(time * d.speedX + d.phase) * d.amplitude;
    dustPos[i * 3 + 1] = d.baseY + Math.cos(time * d.speedY + d.phase) * d.amplitude * 0.7;

    // Strong parallax response
    dustPos[i * 3] += mouse.x * 40 * 0.8;
    dustPos[i * 3 + 1] += mouse.y * 30 * 0.8;
}
dustParticles.geometry.attributes.position.needsUpdate = true;
```

- [ ] **Step 3: 验证微尘效果**

在浏览器中打开，确认：
- 近处有缓慢漂浮的半透明粒子
- 鼠标移动时紧密跟随
- 增强空间深度感

---

### Task 8: 移动端适配与性能优化

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 添加移动端检测与降配**

在所有粒子创建代码之前添加：

```javascript
// ===== DEVICE DETECTION =====
const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) || window.innerWidth <= 768;
const STAR_COUNT = isMobile ? 1000 : 2000;
const DUST_COUNT = isMobile ? 50 : 100;
```

这需要将现有的 `const STAR_COUNT = 2000` 和 `const DUST_COUNT = 100` 替换为使用这里的变量。

- [ ] **Step 2: 添加 WebGL 能力检测**

在场景初始化之前：

```javascript
// ===== WebGL SUPPORT CHECK =====
const isWebGLSupported = (() => {
    try {
        const testCanvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
            (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
    } catch (e) { return false; }
})();

if (!isWebGLSupported) {
    // Fallback: keep CSS background (already removed, so add a simple fallback)
    canvas.style.display = 'none';
    document.body.style.background = 'radial-gradient(ellipse at 50% 50%, #0f1045 0%, #06061a 100%)';
}
```

- [ ] **Step 3: 降低移动端灵敏度**

在 animate() 中修改鼠标 lerp 系数：

```javascript
const lerpSpeed = isMobile ? 0.02 : 0.03;
mouse.x += (mouse.tx - mouse.x) * lerpSpeed;
mouse.y += (mouse.ty - mouse.y) * lerpSpeed;
```

- [ ] **Step 4: 验证移动端表现**

在浏览器 DevTools 中切换到移动端视口，确认：
- 粒子数量减少
- 帧率保持在 30fps+
- 触摸滑动正常工作
- 响应式布局无异常

---

### Task 9: 端到端回归测试与 Bug 修复

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 全面功能检查**

在浏览器中逐项确认：

| 功能 | 预期 | 通过 |
|------|------|------|
| 3D 星空可见 | 粒子覆盖视野，有深度 | ☐ |
| 极光帷幕 | 半透明彩带飘动 | ☐ |
| 流星 | 随机出现，带拖尾 | ☐ |
| 微尘漂浮 | 近处粒子漂浮 | ☐ |
| 鼠标视差 | 移动鼠标各层偏移 | ☐ |
| 爱心拖尾 | 仍然显示爱心 | ☐ |
| 开始按钮 → warp | warp 过渡正常 | ☐ |
| 导航跳转 | 点击导航正常工作 | ☐ |
| 3D 轮播 | 拖动旋转正常 | ☐ |
| Lightbox | 点击图片放大 | ☐ |
| 音乐播放 | 播放/切换正常 | ☐ |
| 许愿功能 | 星空覆盖层正常 | ☐ |
| 仙女灯 | 顶部闪烁灯 | ☐ |
| Header 滚动效果 | 滚动缩小 | ☐ |
| 打字机效果 | 首页文字动画 | ☐ |
| 移动端 | 30fps+, 布局正确 | ☐ |
| WebGL 不支持回退 | 纯 CSS 背景 | ☐ |
| Resize | Canvas 随窗口调整 | ☐ |
| 页面隐藏暂停 | 切标签页暂停渲染 | ☐ |

- [ ] **Step 2: Console 检查**

确认浏览器 Console 中无以下错误：
- Three.js import 失败
- WebGL 上下文丢失
- JS 语法错误
- 变量重复声明（注意 `STAR_COUNT` 等常量只声明一次）

- [ ] **Step 3: 修复发现的问题**

根据检查结果修复 bug，直到所有项目通过。

---

### Task 10: 最终代码整理

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 确保代码结构清晰**

检查 index.html 结构：

```
<!DOCTYPE html>
<html>
<head>
    <meta>...
    <title>...
    <link>...
    <style> /* 所有 CSS */ </style>
    <script type="importmap"> /* Three.js CDN */ </script>
</head>
<body>
    <canvas id="threeBg"></canvas>
    <!-- 所有 HTML 内容 -->
    <script> /* 现有 JS（爱心拖尾、warp、carousel 等） */ </script>
    <script type="module"> /* 新增 Three.js 代码 */ </script>
</body>
</html>
```

- [ ] **Step 2: 最终验证**

再次运行 Task 9 的检查清单，确保所有功能正常。
