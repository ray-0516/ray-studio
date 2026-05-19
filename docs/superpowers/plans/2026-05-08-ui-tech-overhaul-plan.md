# 520 网站 UI 技术全面升级 · 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将网站升级为全 Three.js 统一渲染的炫酷技术流体验——银河粒子旋涡背景、Bloom 后处理、3D Hero 场景、深度视差滚动、Shader 电影转场、高级微交互。

**Architecture:** 单一 index.html 文件改造。Three.js EffectComposer 管线串联 RenderPass → UnrealBloomPass → ShaderPass。现有星空系统替换为螺旋银河粒子系统，现有极光帘幕改造为沿旋臂飘带，新增鼠标引力/脉冲波交互、3D Hero 场景、滚动视差、转场 shader、卡片 tilt/点击波纹等微交互。

**Tech Stack:** Three.js 0.160.0 + EffectComposer/RenderPass/UnrealBloomPass/ShaderPass (CDN)

---

## 文件结构

```
index.html              — 唯一修改文件
  <style>               — 新增：卡片 3D tilt、点击波纹、Hero 3D 场景样式
  <script> (模块前)     — 新增：卡片 tilt、点击波纹、悬停粒子、滚动视差、转场触发器
  <script type="importmap"> — 修改：添加 addon CDN 路径
  <script type="module">   — 大幅改造：EffectComposer、银河系统、极光飘带、Bloom、3D Hero、shader 转场
```

---

### Task 1: 添加 Three.js Addon CDN 导入

**Files:**
- Modify: `index.html:504-509` (importmap)
- Modify: `index.html:1298` (import 语句)

- [ ] **Step 1: 更新 importmap 添加 addon 路径**

将现有的 importmap：
```json
{
    "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
    }
}
```
替换为：
```json
{
    "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
    }
}
```

- [ ] **Step 2: 更新 import 语句**

```javascript
import * as THREE from 'three';
```
替换为：
```javascript
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
```

- [ ] **Step 3: 提交**

```bash
git add index.html && git commit -m "添加 Three.js addon CDN 导入"
```

- [ ] **Step 4: 验证**

用浏览器打开 index.html，检查控制台无 import 错误。

---

### Task 2: EffectComposer + Bloom 管线

**Files:**
- Modify: `index.html:1321-1328` (scene/camera/renderer setup)
- Modify: `index.html:2291` (renderer.render → composer.render)

- [ ] **Step 1: 在 renderer 初始化后添加 EffectComposer 管线**

在 `renderer.setPixelRatio(...)` 之后插入：

```javascript
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,   // strength
    0.4,   // radius
    0.6    // threshold
);
composer.addPass(bloomPass);
```

- [ ] **Step 2: 替换渲染调用**

将 `renderer.render(scene, camera);` 替换为 `composer.render();`

- [ ] **Step 3: resize 事件中同步更新**

在 resize handler 中（`renderer.setSize(...)` 之后）添加：
```javascript
composer.setSize(window.innerWidth, window.innerHeight);
```

- [ ] **Step 4: 提交**

```bash
git add index.html && git commit -m "添加 EffectComposer + UnrealBloomPass 管线"
```

- [ ] **Step 5: 验证**

浏览器打开，现有的星星和极光应该有光晕效果。亮部（大星、极光）泛光，暗部不变。确认移动端也可运行。

---

### Task 3: 银河粒子旋涡系统（替换旧星空）

**Files:**
- Modify: `index.html` — 删除旧 starfield/galaxy/nebula/glow/constellation 代码段，新增银河旋涡代码

**删除范围：**
- 3 层星空 (lines ~1482-1634)
- Galaxy band + nebula (lines ~1636-1709)
- Deep space glow (lines ~1711-1742)
- Constellation clusters (lines ~2109-2160)
- `starfieldGroup` 相关引用
- `twinkleData` 相关代码

**保留：** Texture factory 函数、aurora curtains（后续改造）、shooting stars、floating dust、fireflies。

- [ ] **Step 1: 删除旧星空系统**

移除 starfieldGroup、largeStars、mediumStars、smallStars、binaryStars、galaxyDisc、nebulaParticles、bgGlowPoints、constellationGroups 及其所有创建代码。移除 twinkleData 和 star twinkling 动画逻辑。

- [ ] **Step 2: 创建银河螺旋粒子系统**

在删除位置插入：

```javascript
const GALAXY_PARTICLE_COUNT = isMobile ? 15000 : 40000;
const SPIRAL_ARMS = 3;
const GALAXY_RADIUS = 450;
const CORE_RADIUS = 60;

const galaxyGroup = new THREE.Group();
scene.add(galaxyGroup);

const galaxyGeo = new THREE.BufferGeometry();
const galaxyPos = new Float32Array(GALAXY_PARTICLE_COUNT * 3);
const galaxyCol = new Float32Array(GALAXY_PARTICLE_COUNT * 3);
const galaxySizes = new Float32Array(GALAXY_PARTICLE_COUNT);
const galaxyData = [];

for (let i = 0; i < GALAXY_PARTICLE_COUNT; i++) {
    const arm = Math.floor(Math.random() * SPIRAL_ARMS);
    const armAngle = (arm / SPIRAL_ARMS) * Math.PI * 2;
    const t = Math.random();
    const radius = CORE_RADIUS + t * (GALAXY_RADIUS - CORE_RADIUS);
    const spiralAngle = t * Math.PI * 2.5 + armAngle;
    const spread = (1 - t) * 0.6 + 0.05;
    const angle = spiralAngle + (Math.random() - 0.5) * spread;

    galaxyPos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 15;
    galaxyPos[i * 3 + 1] = (Math.random() - 0.5) * (15 + t * 30);
    galaxyPos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 15;

    const distRatio = t;
    if (distRatio < 0.15) {
        galaxyCol[i * 3] = 0.95; galaxyCol[i * 3 + 1] = 0.85; galaxyCol[i * 3 + 2] = 0.5;
    } else if (distRatio < 0.4) {
        const s = (distRatio - 0.15) / 0.25;
        galaxyCol[i * 3] = 0.95 - s * 0.45;
        galaxyCol[i * 3 + 1] = 0.85 - s * 0.2;
        galaxyCol[i * 3 + 2] = 0.5 + s * 0.35;
    } else if (distRatio < 0.7) {
        const s = (distRatio - 0.4) / 0.3;
        galaxyCol[i * 3] = 0.5 - s * 0.2;
        galaxyCol[i * 3 + 1] = 0.65 + s * 0.15;
        galaxyCol[i * 3 + 2] = 0.85 - s * 0.15;
    } else {
        const s = (distRatio - 0.7) / 0.3;
        galaxyCol[i * 3] = 0.3 + s * 0.15;
        galaxyCol[i * 3 + 1] = 0.35 + s * 0.35;
        galaxyCol[i * 3 + 2] = 0.7 - s * 0.2;
    }

    galaxySizes[i] = distRatio < 0.15 ? 3 + Math.random() * 4 : (distRatio < 0.5 ? 1.5 + Math.random() * 2.5 : 0.5 + Math.random() * 1.5);

    galaxyData.push({
        baseX: galaxyPos[i * 3], baseY: galaxyPos[i * 3 + 1], baseZ: galaxyPos[i * 3 + 2],
        radius, angle, arm, distRatio,
        driftAmp: 0.5 + Math.random() * 3,
        driftFreq: 0.2 + Math.random() * 0.5,
        driftPhase: Math.random() * Math.PI * 2,
    });
}

galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3));
galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyCol, 3));
galaxyGeo.setAttribute('size', new THREE.BufferAttribute(galaxySizes, 1));

const galaxyTex = createGalaxyParticleTexture();
const galaxyMat = new THREE.PointsMaterial({
    size: 2.5, map: galaxyTex, vertexColors: true,
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.85,
});
const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
galaxyGroup.add(galaxyPoints);
```

- [ ] **Step 3: 创建银河粒子纹理函数**

在 texture factory 区添加：
```javascript
function createGalaxyParticleTexture() {
    const size = 32;
    const cv = document.createElement('canvas');
    cv.width = size; cv.height = size;
    const ctx = cv.getContext('2d');
    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.05, 'rgba(255,255,255,0.95)');
    grad.addColorStop(0.2, 'rgba(255,255,255,0.5)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(cv);
}
```

- [ ] **Step 4: 更新动画循环中的银河逻辑**

在 animate() 中添加：
```javascript
galaxyGroup.rotation.y += 0.0003;
galaxyGroup.rotation.x += mouse.y * 0.00015;
galaxyGroup.rotation.z += mouse.x * 0.00015;

const gPos = galaxyPoints.geometry.attributes.position.array;
for (let i = 0; i < GALAXY_PARTICLE_COUNT; i++) {
    const d = galaxyData[i];
    gPos[i * 3] = d.baseX + Math.sin(time * d.driftFreq + d.driftPhase) * d.driftAmp;
    gPos[i * 3 + 1] = d.baseY + Math.cos(time * d.driftFreq + d.driftPhase) * d.driftAmp * 0.6;
}
galaxyPoints.geometry.attributes.position.needsUpdate = true;
```

并移除旧的 starfieldGroup、galaxyDisc、twinkleData 动画代码。

- [ ] **Step 5: 提交**

```bash
git add index.html && git commit -m "替换旧星空为银河粒子旋涡系统"
```

- [ ] **Step 6: 验证**

浏览器打开，确认：螺旋结构可见、自转流畅、Bloom 光晕在核心亮区可见、移动端帧率可接受。

---

### Task 4: 极光飘带沿旋臂 + 极光粒子雾

**Files:**
- Modify: `index.html` — 修改 aurora curtains section

- [ ] **Step 1: 改造极光帘幕为旋臂飘带**

移除旧的 `auroraCurtains` 创建代码。重新创建 3 条飘带，沿螺旋臂路径放置：

```javascript
const auroraRibbons = [];
for (let arm = 0; arm < SPIRAL_ARMS; arm++) {
    const armAngle = (arm / SPIRAL_ARMS) * Math.PI * 2;
    const ribbonWidth = 350;
    const ribbonHeight = 60;
    const geo = new THREE.PlaneGeometry(ribbonWidth, ribbonHeight, 50, 10);
    const uniforms = {
        uTime: { value: arm * 2.0 },
        uOpacity: { value: 0.45 },
    };
    const mat = new THREE.ShaderMaterial({
        vertexShader: auroraVertexShader,
        fragmentShader: auroraFragmentShader,
        uniforms: uniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
    });
    const ribbon = new THREE.Mesh(geo, mat);
    ribbon.rotation.x = -0.3;
    ribbon.rotation.y = armAngle;
    ribbon.position.y = Math.cos(armAngle) * 10;
    ribbon.renderOrder = 1;
    ribbon.userData = {
        uniforms, arm, armAngle,
        parallaxFactor: 0.6 + arm * 0.2,
    };
    scene.add(ribbon);
    auroraRibbons.push(ribbon);
}
```

- [ ] **Step 2: 创建极光粒子雾**

```javascript
const auroraMistCount = isMobile ? 500 : 1500;
const mistGeo = new THREE.BufferGeometry();
const mistPos = new Float32Array(auroraMistCount * 3);
const mistCol = new Float32Array(auroraMistCount * 3);

for (let i = 0; i < auroraMistCount; i++) {
    const arm = Math.floor(Math.random() * SPIRAL_ARMS);
    const armAngle = (arm / SPIRAL_ARMS) * Math.PI * 2;
    const t = 0.1 + Math.random() * 0.8;
    const radius = CORE_RADIUS + t * (GALAXY_RADIUS - CORE_RADIUS);
    const angle = t * Math.PI * 2.5 + armAngle + (Math.random() - 0.5) * 0.4;
    mistPos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
    mistPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
    mistPos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 40;
    mistCol[i * 3] = 0.2 + Math.random() * 0.3;
    mistCol[i * 3 + 1] = 0.6 + Math.random() * 0.4;
    mistCol[i * 3 + 2] = 0.5 + Math.random() * 0.5;
}

mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
mistGeo.setAttribute('color', new THREE.BufferAttribute(mistCol, 3));
const mistTex = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,0.35)');
    g.addColorStop(0.3, 'rgba(255,255,255,0.1)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
})();
const mistMat = new THREE.PointsMaterial({
    size: 18, map: mistTex, vertexColors: true,
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.3,
});
const mistPoints = new THREE.Points(mistGeo, mistMat);
galaxyGroup.add(mistPoints);
```

- [ ] **Step 3: 更新动画循环中极光飘带逻辑**

```javascript
for (const ribbon of auroraRibbons) {
    ribbon.userData.uniforms.uTime.value += 0.008;
    ribbon.position.x += (mouse.x * 20 * ribbon.userData.parallaxFactor - ribbon.position.x) * 0.015;
    ribbon.position.y += (mouse.y * 10 * ribbon.userData.parallaxFactor - ribbon.position.y) * 0.015;
}
```

- [ ] **Step 4: 提交**

```bash
git add index.html && git commit -m "添加极光旋臂飘带和极光粒子雾"
```

- [ ] **Step 5: 验证**

浏览器确认极光飘带沿旋臂可见，颜色流动，鼠标移动时有分层视差。

---

### Task 5: 鼠标引力场 + 悬停亮区 + 点击脉冲波

**Files:**
- Modify: `index.html` — 在 module script 中添加交互逻辑

- [ ] **Step 1: 添加引力场和悬停亮区逻辑**

在动画循环中（粒子位置更新后）添加：

```javascript
const mouseWorldX = mouse.x * 300;
const mouseWorldY = mouse.y * 200;

for (let i = 0; i < GALAXY_PARTICLE_COUNT; i++) {
    const d = galaxyData[i];
    const px = gPos[i * 3], py = gPos[i * 3 + 1];
    const dx = px - mouseWorldX, dy = py - mouseWorldY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const influenceRadius = 80;

    if (dist < influenceRadius) {
        const force = (1 - dist / influenceRadius) * 15;
        const nx = dx / (dist + 0.01), ny = dy / (dist + 0.01);
        gPos[i * 3] += nx * force;
        gPos[i * 3 + 1] += ny * force;

        const brightness = 1 + (1 - dist / influenceRadius) * 2.5;
        galaxyCol[i * 3] = Math.min(1, d.baseR * brightness);
        galaxyCol[i * 3 + 1] = Math.min(1, d.baseG * brightness + (1 - dist / influenceRadius) * 0.3);
        galaxyCol[i * 3 + 2] = Math.min(1, d.baseB * brightness);
    }
}
```

- [ ] **Step 2: 扩展 galaxyData 存储基色**

在上述代码之前，确保 galaxyData 中存储了 `baseR`, `baseG`, `baseB`：
在创建 `galaxyData` 时添加：
```javascript
baseR: galaxyCol[i * 3], baseG: galaxyCol[i * 3 + 1], baseB: galaxyCol[i * 3 + 2],
```

- [ ] **Step 3: 添加点击脉冲波**

在 module script 中添加：
```javascript
const clickWaves = [];

window.addEventListener('click', (e) => {
    const mx = (e.clientX / window.innerWidth) * 2 - 1;
    const my = -(e.clientY / window.innerHeight) * 2 + 1;
    clickWaves.push({
        x: mx * 300, y: my * 200, radius: 5,
        strength: 1.0, maxRadius: 120,
    });
});

function updateClickWaves() {
    for (let w = clickWaves.length - 1; w >= 0; w--) {
        clickWaves[w].radius += 3;
        clickWaves[w].strength -= 0.025;
        if (clickWaves[w].strength <= 0) {
            clickWaves.splice(w, 1);
            continue;
        }
        const gPos = galaxyPoints.geometry.attributes.position.array;
        for (let i = 0; i < GALAXY_PARTICLE_COUNT; i++) {
            const dx = gPos[i * 3] - clickWaves[w].x;
            const dy = gPos[i * 3 + 1] - clickWaves[w].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ringDist = Math.abs(dist - clickWaves[w].radius);
            if (ringDist < 20) {
                const force = (1 - ringDist / 20) * clickWaves[w].strength * 8;
                gPos[i * 3] += (dx / (dist + 0.01)) * force;
                gPos[i * 3 + 1] += (dy / (dist + 0.01)) * force;
            }
        }
    }
}
```

在动画循环中调用 `updateClickWaves();`

- [ ] **Step 4: 每帧重置粒子颜色**

在动画循环开始处重置颜色回基色，让悬停亮区正确恢复：
```javascript
for (let i = 0; i < GALAXY_PARTICLE_COUNT; i++) {
    const d = galaxyData[i];
    galaxyCol[i * 3] = d.baseR;
    galaxyCol[i * 3 + 1] = d.baseG;
    galaxyCol[i * 3 + 2] = d.baseB;
}
galaxyPoints.geometry.attributes.color.needsUpdate = true;
```

- [ ] **Step 5: 提交**

```bash
git add index.html && git commit -m "添加鼠标引力场、悬停亮区和点击脉冲波"
```

- [ ] **Step 6: 验证**

浏览器中移动鼠标确认粒子被吸引和变亮。点击产生扩散波纹推动粒子。

---

### Task 6: 3D Hero 场景元素

**Files:**
- Modify: `index.html` — Hero section HTML + CSS + module script

- [ ] **Step 1: 添加 3D Hero 容器样式**

在 `<style>` 中添加：
```css
#hero3dLayer {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100vh;
    pointer-events: none; z-index: -1;
}
```

- [ ] **Step 2: 创建 3D 粒子标题**

在 module script 中，galaxy 创建完成后添加：
```javascript
function createParticleText(text, yPos) {
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 512; textCanvas.height = 128;
    const tctx = textCanvas.getContext('2d');
    tctx.fillStyle = '#ffffff';
    tctx.font = 'bold 64px Georgia, serif';
    tctx.textAlign = 'center';
    tctx.fillText(text, 256, 80);

    const imageData = tctx.getImageData(0, 0, 512, 128);
    const positions = [];
    const step = 3;
    for (let py = 0; py < 128; py += step) {
        for (let px = 0; px < 512; px += step) {
            const alpha = imageData.data[(py * 512 + px) * 4 + 3];
            if (alpha > 128) {
                positions.push((px - 256) * 0.8, (64 - py) * 0.8 + yPos, -100 + Math.random() * 50);
            }
        }
    }

    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(positions);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
        size: 1.8, color: 0x50d0b0,
        blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.9,
    });
    const textPoints = new THREE.Points(geo, mat);
    textPoints.renderOrder = 2;
    return textPoints;
}

const heroTitle = createParticleText('Ray的小屋', 60);
scene.add(heroTitle);
```

- [ ] **Step 3: 创建 3D 照片水晶（5 张图钉照片 → 3D 漂浮）**

```javascript
const photoCrystals = [];
const photoFiles = ['图片1.jpg', '图片2.jpg', '图片3.jpg', '图片4.jpg', '图片5.jpg'];
const photoAngles = [-0.6, -0.3, 0, 0.25, 0.55]; // radians around hero

for (let i = 0; i < photoFiles.length; i++) {
    const texture = new THREE.TextureLoader().load(photoFiles[i]);
    const aspect = 3 / 4;
    const width = 60, height = width / aspect;
    const geo = new THREE.PlaneGeometry(width, height);
    const mat = new THREE.MeshBasicMaterial({
        map: texture, transparent: true, opacity: 0.85,
        side: THREE.DoubleSide, depthWrite: false,
    });
    const frame = new THREE.Mesh(geo, mat);
    const angle = photoAngles[i];
    const radius = 180 + i * 20;
    frame.position.set(
        Math.cos(angle) * radius,
        20 + Math.random() * 40,
        -120 + Math.sin(angle) * 60
    );
    frame.rotation.y = -angle + Math.PI / 2;
    frame.rotation.x = (Math.random() - 0.5) * 0.2;
    frame.renderOrder = 2;
    frame.userData = {
        baseX: frame.position.x, baseY: frame.position.y, baseZ: frame.position.z,
        baseRotY: frame.rotation.y, baseRotX: frame.rotation.x,
        rotSpeed: 0.001 + Math.random() * 0.002,
        floatPhase: Math.random() * Math.PI * 2,
    };
    scene.add(frame);
    photoCrystals.push(frame);
}
```

- [ ] **Step 4: 动画循环中更新 3D Hero**

```javascript
heroTitle.position.x += (mouse.x * 15 - heroTitle.position.x) * 0.02;
heroTitle.position.y += (mouse.y * 8 - heroTitle.position.y) * 0.02;

for (const pc of photoCrystals) {
    pc.rotation.y += pc.userData.rotSpeed;
    pc.position.y = pc.userData.baseY + Math.sin(time * 0.5 + pc.userData.floatPhase) * 8;
    pc.position.x += (pc.userData.baseX + mouse.x * 20 - pc.position.x) * 0.015;
}
```

- [ ] **Step 5: 提交**

```bash
git add index.html && git commit -m "添加 3D Hero 场景：粒子标题和照片水晶"
```

- [ ] **Step 6: 验证**

浏览器确认 Hero 区域可见粒子标题"Ray的小屋"和 5 张 3D 漂浮照片。Bloom 使标题发光。

---

### Task 7: 深度视差 3D 滚动

**Files:**
- Modify: `index.html` — module script 滚动监听 + 动画循环修改

- [ ] **Step 1: 添加滚动追踪**

```javascript
let scrollY = 0;
let targetScrollY = 0;
const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY / (pageHeight || 1);
}, { passive: true });
```

- [ ] **Step 2: 动画循环中集成视差**

```javascript
scrollY += (targetScrollY - scrollY) * 0.05;

galaxyGroup.position.z = -scrollY * 150;
galaxyGroup.rotation.x = scrollY * 0.3;

for (const pc of photoCrystals) {
    pc.position.z = pc.userData.baseZ + scrollY * 80;
    pc.material.opacity = 0.85 - scrollY * 0.6;
}

heroTitle.position.z = -100 + scrollY * 60;
heroTitle.material.opacity = 0.9 - scrollY * 0.7;

for (const ribbon of auroraRibbons) {
    ribbon.position.z += (scrollY * 40 * ribbon.userData.parallaxFactor - ribbon.position.z) * 0.05;
}

// Dust 深度视差增强
const dustPos = dustParticles.geometry.attributes.position.array;
for (let i = 0; i < DUST_COUNT; i++) {
    const d = dustData[i];
    const depthFactor = 1.0 - (d.baseZ - 50) / 200;
    dustPos[i * 3] += scrollY * 30 * depthFactor;
}
dustParticles.geometry.attributes.position.needsUpdate = true;
```

- [ ] **Step 3: 提交**

```bash
git add index.html && git commit -m "添加深度视差 3D 滚动系统"
```

- [ ] **Step 4: 验证**

滚动页面时背景银河、Hero 元素、卡片以不同速度移动，产生深度感。滚动回顶部 Hero 重新可见。

---

### Task 8: Shader 电影转场

**Files:**
- Modify: `index.html` — module script 最后添加 ShaderPass 和转场逻辑

- [ ] **Step 1: 创建转场 Shader**

在 EffectComposer 管线的 bloomPass 之后添加：

```javascript
const transitionUniforms = {
    tDiffuse: { value: null },
    uProgress: { value: 0 },
    uType: { value: 0 }, // 0=none, 1=warp, 2=dissolve, 3=glitch
};

const transitionShader = {
    uniforms: transitionUniforms,
    vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: /* glsl */`
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform float uProgress;
        uniform int uType;

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        void main() {
            vec2 uv = vUv;
            vec4 color = texture2D(tDiffuse, uv);

            if (uType == 1) {
                // Warp: FTL stretch from center
                vec2 dir = uv - 0.5;
                float dist = length(dir);
                float stretch = 1.0 + uProgress * uProgress * 8.0;
                uv = 0.5 + dir * (1.0 / (1.0 + stretch * dist));
                float vignette = 1.0 - uProgress * 1.5 * dist;
                color = texture2D(tDiffuse, uv) * vignette;
                color.rgb += uProgress * 0.5 * vec3(0.2, 0.6, 1.0) * (1.0 - dist * 2.0);
            } else if (uType == 2) {
                // Dissolve: random pixel scatter
                float t = uProgress;
                for (int i = 0; i < 3; i++) {
                    float fi = float(i);
                    float r = hash(floor(uv * (100.0 + t * 200.0) + fi));
                    if (r < t) {
                        uv += (vec2(hash(uv + fi * 0.1), hash(uv + fi * 0.2)) - 0.5) * t * 0.3;
                    }
                }
                color = texture2D(tDiffuse, uv);
                color.rgb *= 1.0 - t * 0.5;
            } else if (uType == 3) {
                // Glitch: RGB split + horizontal displacement
                float r = texture2D(tDiffuse, uv + vec2(uProgress * 0.05 * sin(uv.y * 100.0), 0.0)).r;
                float g = texture2D(tDiffuse, uv).g;
                float b = texture2D(tDiffuse, uv - vec2(uProgress * 0.05 * sin(uv.y * 100.0), 0.0)).b;
                color = vec4(r, g, b, 1.0);
                if (mod(uv.y * 30.0, 1.0) < uProgress) {
                    color.rgb *= 0.5;
                }
            }

            gl_FragColor = color;
        }
    `,
};

const transitionPass = new ShaderPass(transitionShader);
transitionPass.renderToScreen = true;
composer.addPass(transitionPass);
```

- [ ] **Step 2: 创建转场触发函数**

```javascript
let transitionActive = false;
let transitionProgress = 0;

function triggerTransition(type) {
    if (transitionActive) return;
    transitionActive = true;
    transitionProgress = 0;
    transitionUniforms.uType.value = type;
}

function updateTransition() {
    if (!transitionActive) return;
    const duration = transitionUniforms.uType.value === 3 ? 0.6 : (transitionUniforms.uType.value === 2 ? 1.0 : 0.8);
    transitionProgress += 0.016 / duration;
    if (transitionProgress >= 1.0) {
        transitionProgress = 1.0;
        transitionActive = false;
        transitionUniforms.uType.value = 0;
    }
    transitionUniforms.uProgress.value = transitionProgress;
}
```

在动画循环中调用 `updateTransition();`

- [ ] **Step 3: 连接现有导航函数触发转场**

在非 module 的 `<script>` 中，修改 `navigateTo()` 调用转场：
在模块 script 中将 `triggerTransition` 挂到 window：
```javascript
window.triggerGalaxyTransition = (type) => triggerTransition(type);
```

在普通 `<script>` 的 navigateTo 中，在滚动之前调用：
```javascript
if (window.triggerGalaxyTransition) {
    window.triggerGalaxyTransition(1); // warp
    setTimeout(() => {
        document.body.classList.remove('locked');
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    }, 400);
} else {
    document.body.classList.remove('locked');
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
}
```

- [ ] **Step 4: 提交**

```bash
git add index.html && git commit -m "添加三种 Shader 电影转场效果"
```

- [ ] **Step 5: 验证**

点击"开始欣赏"按钮，确认出现 Warp 星云穿越转场后再滚动。若已解锁导航至其他区域，也触发快速转场。

---

### Task 9: 高级微交互（卡片 Tilt + 点击波纹 + 悬停粒子）

**Files:**
- Modify: `index.html` — `<style>` + 非 module `<script>`

- [ ] **Step 1: 卡片 3D Tilt CSS**

在 `<style>` 中添加：
```css
.tilt-container { perspective: 800px; }
.diary-card.tilt-enabled {
    transition: transform 0.15s ease-out;
    transform-style: preserve-3d;
}
```

- [ ] **Step 2: 卡片 Tilt JS**

在非 module `<script>` 中添加：
```javascript
document.querySelectorAll('.diary-card').forEach(card => {
    card.classList.add('tilt-enabled');
    const container = card.parentElement;
    if (container) container.classList.add('tilt-container');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});
```

- [ ] **Step 3: 点击能量波纹**

在 `<style>` 中添加：
```css
.click-ripple {
    position: fixed; pointer-events: none; z-index: 9999;
    border-radius: 50%; border: 2px solid rgba(80,208,176,0.6);
    animation: rippleOut 0.5s ease-out forwards;
    transform: translate(-50%, -50%);
}
@keyframes rippleOut {
    0% { width: 0; height: 0; opacity: 1; }
    100% { width: 200px; height: 200px; opacity: 0; }
}
```

在 JS 中：
```javascript
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
});
```

- [ ] **Step 4: 悬停粒子爆发**

在 JS 中添加：
```javascript
document.querySelectorAll('.diary-card, .feature-card-v1, button, .music-toggle').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        const rect = el.getBoundingClientRect();
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            particle.style.cssText = `
                position: fixed; left: ${x}px; top: ${y}px; pointer-events: none; z-index: 9998;
                width: 4px; height: 4px; border-radius: 50%;
                background: hsl(${180 + Math.random() * 100}, 70%, 60%);
                animation: particleBurst ${0.4 + Math.random() * 0.6}s ease-out forwards;
            `;
            document.body.appendChild(particle);
            particle.addEventListener('animationend', () => particle.remove());
        }
    });
});
```

在 `<style>` 中添加：
```css
@keyframes particleBurst {
    0% { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 60}px, ${-(30 + Math.random() * 60)}px) scale(0); opacity: 0; }
}
```

由于 CSS keyframes 不能动态，改用 JS 直接设置 `transform`：
```css
@keyframes particleBurst {
    0% { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(var(--px), var(--py)) scale(0); opacity: 0; }
}
```

particle 创建时设置 CSS 变量：
```javascript
particle.style.setProperty('--px', (Math.random() > 0.5 ? '' : '-') + (20 + Math.random() * 60) + 'px');
particle.style.setProperty('--py', -(30 + Math.random() * 60) + 'px');
```

- [ ] **Step 5: 提交**

```bash
git add index.html && git commit -m "添加高级微交互：卡片 tilt、点击波纹、悬停粒子"
```

- [ ] **Step 6: 验证**

鼠标悬停卡片确认倾斜效果。点击页面任意位置确认波纹扩散。鼠标进入卡片/按钮确认粒子爆发。

---

### Task 10: 整体调优和 Bug 修复

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 浏览器打开网站，检查所有效果**

运行网站，逐项检查：
1. 银河旋涡 + Bloom 光晕
2. 极光飘带 + 粒子雾
3. 鼠标引力场 + 悬停亮区 + 点击脉冲波
4. 3D Hero 粒子标题 + 照片水晶
5. 滚动视差各层速度
6. 导航转场
7. 卡片 tilt + 点击波纹 + 悬停粒子

- [ ] **Step 2: 修复发现的问题**

逐个 bug 修复。重点检查：
- 移动端性能（粒子数太多？降低 GALAXY_PARTICLE_COUNT）
- Bloom 强度是否合适
- 转场与 navigateTo 时序是否正确
- 照片水晶图片路径

- [ ] **Step 3: 移动端验证**

Chrome DevTools 切换移动端视口，确认：
- 粒子数减半
- 性能可接受（30fps+）
- 所有交互仍然工作

- [ ] **Step 4: 最终提交**

```bash
git add index.html && git commit -m "整体调优和 Bug 修复"
```

---

## 验证清单

全部完成后确认：
- [ ] 网站正常打开无 JS 错误
- [ ] 银河螺旋粒子可见，Bloom 光晕效果明显
- [ ] 极光飘带沿旋臂流动
- [ ] 鼠标移动时粒子被吸引、亮度变化
- [ ] 点击产生脉冲波推动粒子
- [ ] Hero 区域显示 3D 粒子标题和漂浮照片
- [ ] 滚动页面各层视差效果自然
- [ ] 导航触发 Warp 转场
- [ ] 卡片随鼠标 3D tilt
- [ ] 点击产生波纹动画
- [ ] 悬停卡片/按钮产生粒子爆发
- [ ] 现有功能不受影响：音乐播放、许愿星空、打字机、灯箱、3D 轮播
- [ ] 移动端性能可接受
- [ ] 图片/音乐/文字内容未被修改
