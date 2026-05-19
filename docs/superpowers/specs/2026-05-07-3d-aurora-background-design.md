# 3D 极光星空背景 — 设计规格

## 概述

将 index.html 的 2D CSS 背景替换为 Three.js 驱动的 3D 可交互极光星空背景。鼠标移动产生视差跟随效果，保留所有现有交互功能。

## 技术方案

- **引擎**: Three.js (CDN: unpkg, ES module 或 IIFE build)
- **渲染**: WebGL Canvas，位于 z-index 最底层
- **交互**: 鼠标位置 → 分层视差偏移，requestAnimationFrame 中 lerp 平滑

## Z-Index 分层

Three.js Canvas 放在 z: -3（通过 CSS），位于 body::before/after 原来的位置。所有现有元素保持在 z: 0 及以上，不冲突。

## 场景组成

### 1. 星空粒子系统 (~2000 颗)
- PointsMaterial + BufferGeometry
- 分布在大半径球壳内 (r=600~900)
- 3 个深度层：近景大星(亮白)、中景(蓝白)、远景(深蓝紫)
- 每颗星独立闪烁：通过 uniform time 在 vertex shader 中调制 opacity
- 星星大小与深度相关

### 2. 极光帷幕 (2-3 条)
- 自定义 ShaderMaterial，使用正弦波 + 噪声叠加
- 半透明渐变: 青色(#50d0b0) → 紫色(#b890e0) → 蓝色(#5090d0)
- 位置在星空层和相机之间
- 顶点沿水平方向波浪位移，片段着色器中处理颜色渐变和透明度
- 缓慢自动飘动，不受鼠标视差影响（或有轻微响应）

### 3. 流星 (~每3-8秒一颗)
- 使用 Line 或细长 Plane，带渐变拖尾
- 随机方向（主要在右下方），随机速度
- 出现时短暂增亮周围星星

### 4. 微尘漂浮粒子 (~100 个)
- 近距离大颗粒 (r=1.5~4)，半透明带辉光
- 分布范围: 相机前方 50~200 单位
- 缓慢随机漂移 + 鼠标视差高响应

## 鼠标交互模型

| 层 | 偏移系数 | Lerp 速度 | 说明 |
|---|---------|----------|------|
| 远景星空 | 0.3 | 0.02 | 缓慢跟随，深度感 |
| 中景极光 | 0.5 | 0.04 | 中等响应 |
| 近景微尘 | 0.8 | 0.06 | 紧密跟随，空间感 |

- 鼠标位置归一化到 [-1, 1]
- 相机围绕场景中心做微小旋转偏移
- 移动端: 触摸事件替代，灵敏度降低 30%

## 代码变更清单

### 移除
- `body::before` 和 `body::after` CSS 规则（含 auroraShift 动画）
- `#starfield` div 元素
- `.star` / `.shooting-star` CSS 类及 @keyframes
- JS 中 starfield 相关代码: 创建星星、createShootingStar、scheduleMeteor

### 新增
- `<canvas id="threeBg">` 元素
- Three.js CDN script 标签
- `js/three-background.js` — 场景初始化、星空、极光、流星、微尘、鼠标交互、动画循环
- CSS: `#threeBg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -3; pointer-events: none; }`

### 保留
- Hero 区域的 `::before` 极光效果
- 爱心拖尾 Canvas
- Warp 过渡
- 许愿星空覆盖层
- 仙女灯
- 所有 UI 组件和交互

## 性能要求

- CDN 加载 Three.js (~150KB gzipped)
- 粒子总数 ≤ 2500（移动端 ≤ 1200）
- 移动端 ≥ 30fps，桌面端 ≥ 50fps
- Resize debounce 250ms
- Page Visibility API 暂停不可见时渲染
- 使用 `devicePixelRatio` 上限为 2

## 兼容性

- 所有现代浏览器 (Chrome/Firefox/Safari/Edge 最近2年版本)
- 移动端 WebGL 支持检测，不支持时回退到现有 CSS 背景
- 保留现有 responsive 断点
