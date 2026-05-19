(function() {
    "use strict";
    var imp = document.createElement("script");
    imp.type = "importmap";
    imp.textContent = '{"imports":{"three":"https://unpkg.com/three@0.160.0/build/three.module.js","three/addons/":"https://unpkg.com/three@0.160.0/examples/jsm/"}}';
    document.head.appendChild(imp);
    var style = document.createElement("style");
    style.textContent = `        :root {
            --bg-deep: #06061a;
            --bg-mid: #0f1045;
            --aurora-cyan: #50d0b0;
            --aurora-violet: #b890e0;
            --aurora-blue: #5090d0;
            --aurora-teal: #40b8a0;
            --aurora-pink: #d080c0;
            --aurora-amber: #e0b860;
            --glass-bg: rgba(15, 15, 55, 0.55);
            --glass-bg-hover: rgba(20, 20, 65, 0.7);
            --glass-border: rgba(150, 180, 220, 0.18);
            --glass-border-hover: rgba(180, 200, 240, 0.35);
            --text-primary: #e0e0f0;
            --text-secondary: #b0b0d0;
            --text-dim: #7070a0;
            --glow-cyan: 0 0 20px rgba(80, 208, 176, 0.3);
            --glow-violet: 0 0 20px rgba(184, 144, 224, 0.3);
            --glow-strong: 0 0 40px rgba(80, 208, 176, 0.5);
            --card-bg: rgba(255, 255, 255, 0.025);
            --card-border: rgba(180, 200, 240, 0.1);
            --card-border-hover: rgba(180, 200, 240, 0.3);
            --card-radius: 6px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Optima', 'Candara', 'Segoe UI', 'PingFang SC', sans-serif; -webkit-tap-highlight-color: transparent; }

        body {
            color: var(--text-secondary);
            background: var(--bg-deep);
            overflow-x: hidden;
            width: 100%;
            position: relative;
            transition: overflow 0.6s;
        }
        body.locked { overflow: hidden; height: 100vh; }

        #threeBg {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: -3; pointer-events: none;
            background: var(--bg-deep);
        }

        /* ===== TYPEWRITER ===== */
        .typewriter-cursor {
            display: inline-block; width: 2px; height: 1.2em;
            background-color: var(--aurora-cyan); margin-left: 2px;
            vertical-align: text-bottom; animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* ===== FAIRY LIGHTS ===== */
        .fairy-lights { position: fixed; top: 60px; left: 0; width: 100%; height: 40px; pointer-events: none; z-index: 500; overflow: visible; }
        .fairy-dot {
            position: absolute; border-radius: 50%;
            animation: fairyGlow var(--fduration, 2.5s) ease-in-out infinite;
            animation-delay: var(--fdelay, 0s);
        }
        @keyframes fairyGlow {
            0%, 100% { opacity: 0.2; transform: scale(0.6); }
            50% { opacity: 1; transform: scale(1.8); }
        }

        /* ===== HEADER ===== */
        header {
            background: rgba(10, 10, 35, 0.75); backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(150, 180, 220, 0.1);
            position: fixed; top: 0; width: 100%; z-index: 100;
            height: 60px; display: flex; align-items: center;
            transition: background 0.4s, height 0.4s, box-shadow 0.4s;
        }
        header.scrolled {
            background: rgba(10, 10, 35, 0.9); box-shadow: 0 4px 30px rgba(0,0,0,0.4);
            height: 52px;
        }
        .nav-container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.3rem; font-weight: 700; color: var(--aurora-cyan); text-decoration: none; letter-spacing: 1px; text-shadow: 0 0 15px rgba(80, 208, 176, 0.5); }
        .nav-links { list-style: none; display: flex; gap: 1.5rem; }
        .nav-links a { text-decoration: none; color: var(--text-dim); font-size: 0.9rem; font-weight: 500; transition: 0.3s; }
        .nav-links a:hover { color: var(--aurora-cyan); text-shadow: 0 0 8px rgba(80, 208, 176, 0.4); }

        /* ===== HERO / LOCK SCREEN ===== */
        .hero {
            text-align: center; padding: clamp(6rem, 15vh, 10rem) 1.5rem 3rem;
            min-height: 100vh; display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            position: relative; overflow: hidden;
        }
        .hero::before {
            content: ''; position: absolute; top: -20%; left: -10%; width: 120%; height: 140%;
            background:
                radial-gradient(ellipse at 30% 25%, rgba(80, 208, 176, 0.18) 0%, transparent 45%),
                radial-gradient(ellipse at 70% 35%, rgba(184, 144, 224, 0.15) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 60%, rgba(80, 144, 208, 0.10) 0%, transparent 50%);
            z-index: 0; pointer-events: none;
            animation: heroAurora 6s ease-in-out infinite;
        }
        @keyframes heroAurora {
            0%, 100% { opacity: 0.8; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-10px); }
        }
        .hero > * { position: relative; z-index: 3; }
        .hero-hint-text { font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.5rem; letter-spacing: 1px; display: block; }
        .festival-wish {
            font-size: clamp(1rem, 4vw, 1.4rem); color: var(--aurora-pink);
            margin-bottom: 1rem; letter-spacing: 2px;
            animation: gentleFade 3s ease-in-out infinite;
            text-shadow: 0 0 15px rgba(208, 128, 192, 0.4);
        }
        @keyframes gentleFade { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        .hero h1 {
            font-size: clamp(1.8rem, 10vw, 3.5rem); color: #fff; margin-bottom: 1.5rem; line-height: 1.2;
            text-shadow: 0 0 10px rgba(80, 208, 176, 0.6), 0 0 20px rgba(80, 208, 176, 0.3), 0 0 40px rgba(184, 144, 224, 0.4), 0 0 60px rgba(80, 144, 208, 0.3);
            animation: neonPulse 2.5s ease-in-out infinite alternate;
        }
        @keyframes neonPulse {
            from { text-shadow: 0 0 8px rgba(80, 208, 176, 0.4), 0 0 18px rgba(80, 208, 176, 0.2), 0 0 35px rgba(184, 144, 224, 0.3); }
            to { text-shadow: 0 0 12px rgba(80, 208, 176, 0.7), 0 0 24px rgba(80, 208, 176, 0.4), 0 0 50px rgba(184, 144, 224, 0.5), 0 0 80px rgba(80, 144, 208, 0.4); }
        }
        .hero p { font-size: clamp(1rem, 3.5vw, 1.2rem); color: var(--text-secondary); max-width: 600px; line-height: 1.6; margin: 0 auto 2.5rem; padding: 0 1rem; }
        #typewriter-text { font-family: 'Caveat', cursive; font-size: 1.35rem; font-weight: 500; color: #e8e8f8; letter-spacing: 0.3px; }
        .highlight { color: var(--aurora-cyan); font-weight: 700; text-shadow: 0 0 10px rgba(80, 208, 176, 0.5); }

        .btn {
            padding: 1rem 2.8rem; font-size: 1.05rem;
            background: linear-gradient(135deg, var(--aurora-cyan), var(--aurora-teal));
            color: #fff; text-decoration: none; border-radius: 100px;
            box-shadow: 0 8px 30px rgba(80, 208, 176, 0.35), 0 0 40px rgba(80, 208, 176, 0.15);
            border: none; cursor: pointer; transition: 0.3s;
            position: relative; overflow: hidden; letter-spacing: 1px; font-weight: 600;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(80, 208, 176, 0.45), 0 0 60px rgba(80, 208, 176, 0.25);
        }
        .btn:active { transform: scale(0.96); }
        .btn::after {
            content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
            opacity: 0; transition: opacity 0.3s;
        }
        .btn:hover::after { opacity: 1; }

        .hero-tip { font-size: 0.85rem; color: var(--text-dim); margin-top: 1.5rem; line-height: 1.7; padding: 0 1rem; opacity: 0; animation: fadeInSlow 3s ease-out forwards; animation-delay: 1s; }
        @keyframes fadeInSlow { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .hero-action-area { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .scroll-hint { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; margin-top: 0.8rem; animation: bounceHint 2s infinite; }
        .scroll-arrow { font-size: 1.4rem; color: var(--aurora-cyan); line-height: 1; }
        .scroll-hint span { font-size: 0.95rem; color: var(--aurora-cyan); font-weight: 600; letter-spacing: 1px; }
        @keyframes bounceHint { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* ===== PINNED PHOTOS ===== */
        .pinned-photo {
            position: absolute; width: 180px; background: rgba(20, 20, 50, 0.7);
            backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
            padding: 8px; padding-bottom: 25px;
            box-shadow: 2px 4px 16px rgba(0,0,0,0.4), 0 0 20px rgba(80, 208, 176, 0.08);
            border-radius: 2px; transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer; z-index: 1; border: 1px solid rgba(150, 180, 220, 0.15);
        }
        .pinned-photo img { width: 100%; height: auto; display: block; border-radius: 1px; }
        .pinned-photo:hover { transform: scale(1.05) rotate(0deg) !important; box-shadow: 3px 8px 24px rgba(0,0,0,0.5), 0 0 30px rgba(80, 208, 176, 0.2); z-index: 10; }
        .pinned-photo::before {
            content: ''; position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
            width: 18px; height: 18px; border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3); z-index: 2;
        }
        .pin-pink::before { background: radial-gradient(circle at 40% 40%, #fff, #d080c0); }
        .pin-yellow::before { background: radial-gradient(circle at 40% 40%, #fff, #e0b860); }
        .pin-blue::before { background: radial-gradient(circle at 40% 40%, #fff, #5090d0); }
        .pin-gray::before { background: radial-gradient(circle at 40% 40%, #fff, #8090b0); }
        .pin-red::before { background: radial-gradient(circle at 40% 40%, #fff, #d06080); }
        .photo-1 { top: 15%; left: 5%; transform: rotate(-3deg); }
        .photo-2 { top: 12%; right: 5%; transform: rotate(4deg); }
        .photo-3 { bottom: 18%; left: 3%; transform: rotate(2deg); }
        .photo-4 { bottom: 15%; right: 4%; transform: rotate(-2deg); }
        .photo-5 { top: 10%; left: 50%; margin-left: -90px; transform: rotate(-1deg); }

        /* ===== SECTIONS ===== */
        .section-padding { padding: 5rem 0; position: relative; }
        .section-title { text-align: center; margin-bottom: 3rem; padding: 0 1.5rem; }
        .section-title span { color: var(--text-dim); font-size: 0.75rem; letter-spacing: 3px; text-transform: uppercase; }
        .section-title h2 {
            font-size: clamp(1.8rem, 8vw, 2.5rem); color: #fff; margin-top: 0.5rem;
            text-shadow: 0 0 20px rgba(80, 208, 176, 0.3), 0 0 40px rgba(184, 144, 224, 0.2);
        }

        .reveal { opacity: 0; transition: opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1); }
        .reveal.revealed { opacity: 1; }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }



        /* ===== AURORA DIVIDER ===== */
        .aurora-divider {
            width: 100%; max-width: 800px; margin: 2rem auto; height: 2px;
            background: linear-gradient(90deg, transparent, rgba(80, 208, 176, 0.4), rgba(184, 144, 224, 0.4), transparent);
            border-radius: 1px;
        }

        /* ===== DIARY SECTION ===== */
        .timeline {
            max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem;
            display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 2.5rem;
            align-items: start;
            position: relative;
        }

        .timeline-item { position: relative; }
        .timeline-item:nth-child(even) { margin-top: 4rem; }
        .timeline-item::after {
            content: '';
            position: absolute;
            top: -20px; left: -30px;
            width: 200px; height: 160px;
            background: radial-gradient(ellipse at 60% 60%, rgba(80, 208, 176, 0.10) 0%, rgba(184, 144, 224, 0.04) 40%, transparent 70%);
            filter: blur(20px);
            pointer-events: none;
            z-index: 0;
            opacity: 0;
            transition: opacity 0.8s ease;
        }
        .timeline-item.revealed::after { opacity: 1; }

        /* ===== DIARY CARD ===== */
        .diary-card {
            background: var(--card-bg); border-radius: var(--card-radius); overflow: hidden; position: relative; z-index: 1;
            transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.4s;
            border: 1px solid var(--card-border);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(80, 208, 176, 0.04), inset 0 0 0 1px rgba(255,255,255,0.03);
            padding: 1.4rem 1.2rem 1.2rem; width: 100%; max-width: 380px;
        }

        .diary-card:hover {
            border-color: rgba(180, 210, 255, 0.5);
            box-shadow: 0 12px 44px rgba(0,0,0,0.4), 0 0 30px rgba(80, 208, 176, 0.15), 0 0 50px rgba(184, 144, 224, 0.1), 0 0 0 2px rgba(80, 208, 176, 0.1);
            transform: translateY(-3px);
        }
        .diary-card:hover .card-label, .feature-card-v1:hover .card-label { opacity: 1; color: #fff; }
        .diary-card:hover .card-title, .feature-card-v1:hover h3 { color: #fff; text-shadow: 0 0 8px rgba(200,220,255,0.3); }
        .diary-card:hover .card-desc, .feature-card-v1:hover p { color: #d8d8f0; }
        .diary-card:hover .card-number { color: rgba(255,255,255,0.08); }
        .card-number {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 56px; font-weight: 900; color: rgba(255,255,255,0.04);
            position: absolute; top: 8px; right: 20px; pointer-events: none;
            line-height: 1; letter-spacing: 0;
        }
        .card-label {
            display: inline-block; font-size: 9px; letter-spacing: 4px;
            color: var(--aurora-cyan); opacity: 0.65; text-transform: uppercase; margin-bottom: 0.8rem;
        }
        .card-label.label-video { color: var(--aurora-violet); }
        .card-title {
            font-size: 20px; font-weight: 700; color: rgba(255,255,255,0.9);
            margin-bottom: 0.7rem; letter-spacing: 0.2px; line-height: 1.3;
        }
        .card-desc {
            font-size: 13px; color: var(--text-secondary); max-width: 68%; line-height: 1.8; margin-bottom: 0;
        }
        .card-float-img {
            position: absolute; top: 24px; right: 28px; width: 100px; height: 80px;
            border-radius: 3px; overflow: hidden; cursor: pointer;
            border: 1px solid rgba(180,200,240,0.12); transform: rotate(2deg);
            box-shadow: 0 4px 18px rgba(0,0,0,0.35); transition: transform 0.3s ease, border-color 0.3s;
        }
        .card-float-img:hover { transform: rotate(0deg); border-color: rgba(180,200,240,0.4); }
        .card-float-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .card-video-inline { margin-top: 1rem; width: 100%; }
        .card-video-inline video { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 3px; background: rgba(0,0,0,0.3); display: block; }
        .card-bottom-decor {
            margin-top: 1.4rem; display: flex; align-items: center; gap: 8px;
        }
        .card-bottom-decor .decor-line {
            height: 1px; width: 48px;
            background: linear-gradient(90deg, rgba(130,190,230,0.25), transparent);
        }
        .card-bottom-decor .decor-dot {
            width: 4px; height: 4px; border-radius: 50%; background: rgba(130,190,230,0.4);
            transition: background 0.3s, box-shadow 0.3s; flex-shrink: 0;
        }
        .card-bottom-decor .decor-dot:nth-child(2) { background: rgba(170,140,220,0.3); }
        .card-bottom-decor .decor-dot:nth-child(3) { background: rgba(190,150,200,0.2); }
        .card-bottom-decor .decor-divider {
            height: 1px; flex: 1; background: linear-gradient(90deg, rgba(255,255,255,0.04), transparent);
        }
        .diary-card:hover .card-bottom-decor .decor-dot:nth-child(1) { background: rgba(130,190,230,0.8); box-shadow: 0 0 8px rgba(130,190,230,0.5); }
        .diary-card:hover .card-bottom-decor .decor-dot:nth-child(2) { background: rgba(170,140,220,0.6); box-shadow: 0 0 8px rgba(170,140,220,0.4); }
        .diary-card:hover .card-bottom-decor .decor-dot:nth-child(3) { background: rgba(190,150,200,0.4); box-shadow: 0 0 8px rgba(190,150,200,0.3); }

        /* ===== ABOUT SECTION ===== */
        .grid-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; }
        .feature-card-v1 {
            background: var(--card-bg); border-radius: var(--card-radius); overflow: hidden; position: relative; z-index: 1;
            transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.4s;
            border: 1px solid var(--card-border);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(80, 208, 176, 0.04), inset 0 0 0 1px rgba(255,255,255,0.03);
            padding: 1.4rem 1.2rem 1.2rem; padding-left: calc(1.2rem + 6px);
        }
        .feature-card-v1::before {
            content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 3px;
            transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .feature-card-v1:hover {
            border-color: var(--card-border-hover);
            box-shadow: 0 12px 44px rgba(0,0,0,0.4), 0 0 30px rgba(80, 208, 176, 0.1), 0 0 50px rgba(184, 144, 224, 0.06);
            transform: translateY(-3px);
        }
        .feature-card-v1:hover::before { width: 6px; }
        .feature-accent-rose::before { background: linear-gradient(180deg, var(--aurora-cyan), var(--aurora-teal)); }
        .feature-accent-lavender::before { background: linear-gradient(180deg, var(--aurora-violet), #a080d0); }
        .feature-accent-gold::before { background: linear-gradient(180deg, var(--aurora-amber), var(--aurora-pink)); }
        .feature-card-v1 .card-label { margin-bottom: 0.5rem; }
        .feature-card-v1 h3 { font-size: 20px; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; letter-spacing: 0.2px; line-height: 1.3; }
        .feature-card-v1 .feature-title-line { display: block; width: 40px; height: 2px; background: linear-gradient(90deg, var(--aurora-cyan), transparent); margin: 0.5rem 0 0.7rem 0; opacity: 0.6; }
        .feature-card-v1 p { font-size: 13px; line-height: 1.8; color: var(--text-secondary); }

        /* ===== 3D CAROUSEL ===== */
        .carousel-scene { perspective: 1000px; width: 100%; max-width: 1100px; height: 380px; margin: 0 auto; position: relative; display: flex; align-items: center; justify-content: center; }
        .carousel-3d { width: 200px; height: 200px; position: relative; transform-style: preserve-3d; will-change: transform; }
        .carousel-item-3d {
            position: absolute; width: 200px; height: 200px; left: 0; top: 0;
            border-radius: 14px; overflow: hidden; cursor: pointer;
            box-shadow: 0 8px 32px rgba(0,0,0,0.45), 0 0 0 3px rgba(80, 208, 176, 0.3), 0 0 60px rgba(80, 208, 176, 0.12);
            -webkit-box-reflect: below 24px linear-gradient(transparent 40%, rgba(255,255,255,0.15));
            user-select: none; -webkit-user-drag: none; transition: box-shadow 0.4s;
        }
        .carousel-item-3d:hover {
            box-shadow: 0 12px 40px rgba(0,0,0,0.55), 0 0 0 4px rgba(80, 208, 176, 0.5), 0 0 80px rgba(80, 208, 176, 0.25);
        }
        .carousel-item-3d::after {
            content: ''; position: absolute; inset: 0; border-radius: 14px;
            background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.15) 100%);
            pointer-events: none;
        }
        .carousel-item-3d img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; display: block; }
        .carousel-hint { text-align: center; color: var(--text-dim); font-size: 0.8rem; margin-top: 1.2rem; letter-spacing: 1px; }

        /* ===== FOOTER ===== */
        footer { padding: 4rem 1rem; text-align: center; color: var(--text-dim); font-size: 0.85rem; }

        /* ===== MUSIC PANEL ===== */
        .music-control-panel {
            position: fixed; bottom: 25px; right: 25px; z-index: 2000;
            display: flex; align-items: center;
            background: rgba(15, 15, 45, 0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            padding: 5px; border-radius: 50px; border: 1px solid rgba(150, 180, 220, 0.15);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .music-toggle { width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, var(--aurora-cyan), var(--aurora-teal)); border: none; color: #fff; cursor: pointer; font-size: 1.1rem; }
        #volumeSlider { width: 0; transition: 0.3s; opacity: 0; margin: 0; accent-color: var(--aurora-cyan); }
        .music-control-panel:hover #volumeSlider { width: 80px; opacity: 1; margin: 0 10px; }

        /* ===== LIGHTBOX ===== */
        .lightbox-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); z-index: 3000;
            display: flex; justify-content: center; align-items: center;
            cursor: pointer; opacity: 0; pointer-events: none; transition: opacity 0.3s;
        }
        .lightbox-overlay.active { opacity: 1; pointer-events: auto; }
        .lightbox-overlay img { max-width: 90vw; max-height: 90vh; border-radius: 8px; box-shadow: 0 0 40px rgba(0,0,0,0.6); transform: scale(0.9); transition: transform 0.3s, opacity 0.2s; }
        .lightbox-overlay.active img { transform: scale(1); }

        /* ===== WISH TRIGGER ===== */
        .wish-trigger {
            position: fixed; bottom: 25px; left: 25px;
            width: 48px; height: 48px;
            background: linear-gradient(135deg, #1a1a40, #252560);
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 1.8rem;
            box-shadow: 0 0 18px rgba(160, 180, 220, 0.4), 0 4px 10px rgba(0,0,0,0.3);
            cursor: pointer; z-index: 1500; transition: transform 0.2s, box-shadow 0.2s;
            border: 2px solid rgba(150, 180, 220, 0.5);
            user-select: none; touch-action: manipulation;
            animation: wishPulse 2.5s ease-in-out infinite;
        }
        @keyframes wishPulse {
            0%, 100% { box-shadow: 0 0 18px rgba(160, 180, 220, 0.4), 0 4px 10px rgba(0,0,0,0.3); }
            50% { box-shadow: 0 0 32px rgba(180, 200, 230, 0.6), 0 4px 10px rgba(0,0,0,0.3); }
        }
        .wish-trigger:active { transform: scale(0.92); box-shadow: 0 0 40px rgba(180, 200, 230, 0.8); }

        /* ===== STARRY OVERLAY ===== */
        .starry-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(ellipse at center, #0a0a2e 0%, #020210 100%);
            z-index: 6000; opacity: 0; pointer-events: none; transition: opacity 0.5s ease; cursor: crosshair;
        }
        .starry-overlay.active { opacity: 1; pointer-events: auto; }
        .starry-overlay canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .starry-hint {
            position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%);
            color: rgba(200, 210, 240, 0.8); font-family: 'Courier New', monospace;
            font-size: 0.95rem; letter-spacing: 1px; pointer-events: none;
            animation: hintFade 3s ease-in-out infinite;
            text-shadow: 0 0 10px rgba(160, 180, 220, 0.5);
        }
        @keyframes hintFade { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .starry-close {
            position: absolute; top: 20px; right: 24px;
            width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
            color: rgba(200, 210, 240, 0.7); font-size: 1.4rem; cursor: pointer;
            z-index: 10; border-radius: 50%; transition: all 0.25s;
        }
        .starry-close:hover { color: #fff; background: rgba(255,255,255,0.06); text-shadow: 0 0 16px rgba(180, 200, 230, 0.7); }
        .wish-text {
            position: absolute; pointer-events: none; z-index: 5;
            font-family: 'Cascadia Code', 'Courier New', monospace;
            color: #ffe9c0; font-size: 1.1rem;
            text-shadow: 0 0 12px rgba(255,220,150,0.8), 0 0 30px rgba(255,200,100,0.4);
            animation: wishFloat 3s ease-out forwards; white-space: nowrap;
        }
        @keyframes wishFloat {
            0% { opacity: 0; transform: translateY(0) scale(0.5); }
            20% { opacity: 1; transform: translateY(-10px) scale(1.1); }
            100% { opacity: 0; transform: translateY(-120px) scale(0.9); }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
            .timeline { grid-template-columns: 1fr; gap: 2rem; }

            .timeline-item:nth-child(even) { margin-top: 0; }
            .diary-card { max-width: 100%; }
            .card-desc { max-width: 100%; font-size: 12px; }
            .card-float-img { width: 60px; height: 48px; top: 12px; right: 12px; }
            .card-number { font-size: 36px; top: 2px; right: 10px; }
            .card-title { font-size: 16px; }
            .card-video-inline video { aspect-ratio: 16/9; }
        }
        @media (max-width: 480px) {
            .nav-container { padding: 0 0.8rem; }
            .logo { font-size: 1rem; }
            .nav-links { gap: 0.8rem; }
            .nav-links a { font-size: 0.7rem; }
            .pinned-photo { width: 120px; padding: 5px; padding-bottom: 18px; }
            .pin-pink::before, .pin-yellow::before, .pin-blue::before, .pin-gray::before, .pin-red::before { width: 14px; height: 14px; top: -8px; }
            .photo-1 { top: 10%; left: 2%; }
            .photo-2 { top: 10%; right: 2%; }
            .photo-3 { bottom: 22%; left: 2%; }
            .photo-4 { bottom: 22%; right: 2%; }
            .photo-5 { top: 5%; left: 50%; margin-left: -60px; transform: rotate(-1deg); }
            header.scrolled { height: 46px; }
            .carousel-scene { height: 260px; }
            .carousel-3d, .carousel-item-3d { width: 140px; height: 140px; }
            .timeline { padding: 1.5rem 0.8rem; }
            .diary-card { padding: 1rem 0.8rem 1rem; max-width: 100%; }
            .card-desc { max-width: 100%; font-size: 11px; }
            .card-float-img { width: 48px; height: 38px; top: 8px; right: 8px; }
            .card-number { font-size: 26px; top: 0; right: 6px; }
            .card-title { font-size: 14px; }
            .wish-trigger { bottom: 15px; left: 15px; width: 42px; height: 42px; font-size: 1.5rem; }
            .starry-hint { bottom: 40px; font-size: 0.8rem; }
            .wish-text { font-size: 0.9rem; }
            .music-control-panel { bottom: 15px; right: 15px; padding: 3px; border-radius: 40px; }
            .music-toggle { width: 40px; height: 40px; }
            #volumeSlider { width: 70px !important; opacity: 1 !important; margin: 0 8px !important; display: block !important; }
        }


        .click-ripple { position: fixed; pointer-events: none; z-index: 9999; border-radius: 50%; border: 2px solid rgba(80,208,176,0.6); animation: rippleOut 0.5s ease-out forwards; }
        @keyframes rippleOut { 0% { width: 0; height: 0; opacity: 1; transform: translate(-50%, -50%) scale(0.2); } 100% { width: 240px; height: 240px; opacity: 0; transform: translate(-50%, -50%) scale(1); } }
        @keyframes particleBurst { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--px), var(--py)) scale(0); opacity: 0; } }`;
    document.head.appendChild(style);
    document.body.className = "locked";
    document.body.innerHTML = `    <canvas id="threeBg"></canvas>

    <audio id="bgMusic" src="music.mp3" preload="auto"></audio>
    <audio id="bgMusic2" src="music2.mp3" preload="auto"></audio>

    <div class="music-control-panel">
        <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.5">
        <button id="musicBtn" class="music-toggle">✕</button>
    </div>

    <canvas id="trailCanvas" style="position:fixed; top:0; left:0; pointer-events:none; z-index:1000;"></canvas>

    <div class="wish-trigger" id="wishTrigger" title="许个愿吧">🌠</div>

    <div class="starry-overlay" id="starryOverlay">
        <canvas id="starryCanvas"></canvas>
        <div class="starry-hint" id="starryHint">点按夜空，许下心愿 ✨</div>
        <div class="starry-close" id="starryClose">✕</div>
    </div>

    <header>
        <div class="nav-container">
            <a href="#" class="logo">RAY'S HUT</a>
            <ul class="nav-links">
                <li><a href="#" data-nav="home">首页</a></li>
                <li><a href="#content" data-nav="content">内容</a></li>
                <li><a href="#about" data-nav="about">关于</a></li>
            </ul>
        </div>
    </header>

    <div class="fairy-lights" id="fairyLights"></div>

    <section class="hero">
        <span class="hero-hint-text">所有视频和图片都可以放大看哦</span>
        <span class="festival-wish">✨ To Martina: Happy 520 ✨</span>
        <h1>欢迎来到 Ray 的小屋</h1>
        <p>
            <span id="typewriter-text"></span><span class="typewriter-cursor">|</span>
        </p>
        <div class="hero-action-area">
            <button id="startBtn" class="btn">开始欣赏小R的摸鱼之作</button>
            <div class="scroll-hint">
                <span class="scroll-arrow">↑</span>
                <span>点击这里，开始浏览</span>
            </div>
        </div>
        <div class="hero-tip">
            网站可以独立控制音乐声音哦，在右下角，应该没有什么 BUG 了，我都测试了好久了！<br>
            审美太差了设计不出好看的风格 将就看吧！！！✨
        </div>

        <div class="pinned-photo pin-pink photo-1" onclick="openLightbox('图片1.jpg')">
            <img src="图片1.jpg" alt="照片1">
        </div>
        <div class="pinned-photo pin-yellow photo-2" onclick="openLightbox('图片2.jpg')">
            <img src="图片2.jpg" alt="照片2">
        </div>
        <div class="pinned-photo pin-blue photo-3" onclick="openLightbox('图片3.jpg')">
            <img src="图片3.jpg" alt="照片3">
        </div>
        <div class="pinned-photo pin-gray photo-4" onclick="openLightbox('图片4.jpg')">
            <img src="图片4.jpg" alt="照片4">
        </div>
        <div class="pinned-photo pin-red photo-5" onclick="openLightbox('图片5.jpg')">
            <img src="图片5.jpg" alt="照片5">
        </div>
    </section>

    <section id="content" class="section-padding">
        <div class="section-title reveal">
            <span>RAY's Diary</span>
            <h2>RAY的日记本</h2>
        </div>
        <div class="aurora-divider"></div>

        <div class="timeline">

            <!-- 01 -->
            <div class="timeline-item reveal">
                <div class="diary-card">
                    <span class="card-label">DIARY</span>
                    <span class="card-number">01</span>
                    <h3 class="card-title">小屋的诞生</h3>
                    <p class="card-desc">转正之后公司给了我报销权限，想用什么AI自己充，记得开发票报销就行，公司还部署了本地的DeepSeek大模型。我问同事为什么可以报销token金额还要做本地部署，他们说因为国产的不好用，只能用来做一些简单的工作，但是成本很低。同事还让我多拿本地大模型练练手，省着报销金额上限了耽误工作。正好在想520应该以什么样的方式和你说一声520快乐，这不就一举两得了。</p>
                    <div class="card-float-img" onclick="openLightbox('图片6.jpg')"><img src="图片6.jpg" alt="小屋的诞生"></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

            <!-- 02 -->
            <div class="timeline-item reveal reveal-delay-1">
                <div class="diary-card">
                    <span class="card-label">DIARY</span>
                    <span class="card-number">02</span>
                    <h3 class="card-title">初步完成！</h3>
                    <p class="card-desc">首页面终于做好啦，第一次从0开始做一个前端，平常工作内容都是想办法1比1复刻设计稿的内容，现在要自己构思了，还真是有点头疼没思路。同事说我想法挺好的，就是能力实在堪忧，呈现效果已经一般的不一般了。有被打击到，这段时间再研究研究怎么能设计的更好一点吧。</p>
                    <div class="card-float-img" onclick="openLightbox('图片7.jpg')"><img src="图片7.jpg" alt="让人心累的时刻"></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

            <!-- 03 -->
            <div class="timeline-item reveal reveal-delay-2">
                <div class="diary-card">
                    <span class="card-label">DIARY</span>
                    <span class="card-number">03</span>
                    <h3 class="card-title">最终敲定方向</h3>
                    <p class="card-desc">你现在看到的网站效果是我大改了4遍后的成品，说实话一直没有什么灵感，直到某一天突然想起来你去年说想去漠河看极光，于是我把主题风格定在了以星空为主题配合极光元素。到此刻为止我已经改动了近百次，很多东西加进去觉得不好又删掉，很多话写进来觉得不合适也删掉了，鬼知道我还要改多少次。后面有视频一定要看一看，里面有给你买的礼物！！</p>
                    <div class="card-float-img" onclick="openLightbox('图片8.jpg')"><img src="图片8.jpg" alt="初步完成！"></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

            <!-- 04 -->
            <div class="timeline-item reveal">
                <div class="diary-card">
                    <span class="card-label label-video">VIDEO</span>
                    <span class="card-number">04</span>
                    <div class="card-video-inline"><video src="视频1.mp4" controls playsinline preload="none" loading="lazy" poster="视频1_poster.jpg"></video></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

            <!-- 05 -->
            <div class="timeline-item reveal">
                <div class="diary-card">
                    <span class="card-label label-video">VIDEO</span>
                    <span class="card-number">05</span>
                    <div class="card-video-inline"><video src="视频2.mp4" controls playsinline preload="none" loading="lazy" poster="视频2_poster.jpg"></video></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

            <!-- 06 -->
            <div class="timeline-item reveal reveal-delay-1">
                <div class="diary-card">
                    <span class="card-label">DIARY</span>
                    <span class="card-number">06</span>
                    <h3 class="card-title">多看一会/多听一会</h3>
                    <p class="card-desc">网站的BGM我用了邓紫棋的唯一和99GOD的Martina。选唯一是因为25年3月份我们分别那天我听着这首歌坐在楼道哭了好久，那是我第一次感觉离别是一件让我难以接受的事。选Martina就是单纯的因为它叫Martina并且还挺好听。但其实我最开始BGM选的是告五人的唯一和王毓千的5.20，最后因为你说过你觉得邓紫棋版本的唯一更好听，跨年那天你也说过王毓千唱歌你觉得一般，并不喜欢。所以给BGM换掉了。</p>
                    <div class="card-float-img" onclick="openLightbox('图片9.jpg')"><img src="图片9.jpg" alt="代码量要失控了"></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

            <!-- 07 -->
            <div class="timeline-item reveal reveal-delay-2">
                <div class="diary-card">
                    <span class="card-label">DIARY</span>
                    <span class="card-number">07</span>
                    <h3 class="card-title">又臭又长</h3>
                    <p class="card-desc">这是我对这个网站内容的评价《又臭又长》。我原本计划了很多内容，视频里应该会有更多东西的。只是很倒霉，都没有完成。甚至连OOTD都没机会展示一下，早知道前几天去上海的时候也拍点视频了。</p>
                    <div class="card-float-img" onclick="openLightbox('图片10.jpg')"><img src="图片10.jpg" alt="新卡片2"></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

            <!-- 08 -->
            <div class="timeline-item reveal">
                <div class="diary-card">
                    <span class="card-label">DIARY</span>
                    <span class="card-number">08</span>
                    <h3 class="card-title">最后整理</h3>
                    <p class="card-desc">现在是23：55分，我在做最后的检查和整理。说实话我对自己的第一个作品失望至极，无论是网站设计还是内容都挺一般的。最drama的是今年的520依旧没有花，如果还有机会见面的话下一次见面我一定是带着花的，毕竟第一次见面我就没有买束花。至于那个金戒指方便的话我可以快递给你，如果怕丢你有朋友回国了让他帮你带一下也行。520快乐！</p>
                    <div class="card-float-img" onclick="openLightbox('图片11.jpg')"><img src="图片11.jpg" alt="新卡片3"></div>
                    <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
                </div>
            </div>

        </div>

        <div class="section-title reveal" style="margin-top:2rem;">
            <span>Photo Gallery</span>
            <h2>照片画廊</h2>
        </div>
        <div class="aurora-divider"></div>
        <div class="carousel-scene reveal" id="carouselScene">
            <div class="carousel-3d" id="carousel3d">
                <div class="carousel-item-3d" data-src="图片1.jpg"><img src="图片1.jpg" alt="照片1"></div>
                <div class="carousel-item-3d" data-src="图片2.jpg"><img src="图片2.jpg" alt="照片2"></div>
                <div class="carousel-item-3d" data-src="图片3.jpg"><img src="图片3.jpg" alt="照片3"></div>
                <div class="carousel-item-3d" data-src="图片4.jpg"><img src="图片4.jpg" alt="照片4"></div>
                <div class="carousel-item-3d" data-src="图片5.jpg"><img src="图片5.jpg" alt="照片5"></div>
                <div class="carousel-item-3d" data-src="图片12.jpg"><img src="图片12.jpg" alt="照片12"></div>
                <div class="carousel-item-3d" data-src="图片13.jpg"><img src="图片13.jpg" alt="照片13"></div>
                <div class="carousel-item-3d" data-src="图片14.jpg"><img src="图片14.jpg" alt="照片14"></div>
                <div class="carousel-item-3d" data-src="图片15.jpg"><img src="图片15.jpg" alt="照片15"></div>
            </div>
        </div>
        <div class="carousel-hint">↔ 拖动旋转 &nbsp;|&nbsp; 点击放大</div>
        <div class="carousel-hint">其实有想过放合照的，但是感觉有点惹人烦了，就挂你自己的照片好了。</div>
        <div class="carousel-hint">（好吧其实我知道不放合照这样也挺惹人烦的）</div>
    </section>

    <section id="about" class="section-padding" style="background: rgba(10,10,35,0.3);">
        <div class="section-title">
            <span>About Ray's Hut</span>
            <h2>关于小屋</h2>
        </div>
        <div class="aurora-divider"></div>
        <div class="grid-container">
            <div class="feature-card-v1 feature-accent-rose reveal">
                <span class="card-label">ORIGIN</span>
                <h3>设计初衷</h3>
                <div class="feature-title-line"></div>
                <p>你说过相比闷声做事你更想要优先提供情绪价值，所以我觉得这个网站是一个很两全其美的办法。"希望每次你打开它，都能感觉到我在想你。"</p>
                <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
            </div>
            <div class="feature-card-v1 feature-accent-lavender reveal reveal-delay-1">
                <span class="card-label">CREDITS</span>
                <h3>鸣谢名单</h3>
                <div class="feature-title-line"></div>
                <p>感谢Claude code，感谢Codex，感谢GPT，感谢DeepSeek。如果你看到这里了也非常感谢你。尽管千里迢迢去到澳洲也没能见面，但是还是很庆幸你没有直接将我晾在一边。</p>
                <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
            </div>
            <div class="feature-card-v1 feature-accent-gold reveal reveal-delay-2">
                <span class="card-label">FUTURE</span>
                <h3>关于未来</h3>
                <div class="feature-title-line"></div>
                <p>其实我对于这个网站并不满意，效果太普通，代码不够优秀，而且所有东西都只是简单的前端贴图而已。尽管如此，如果你没有意见，我还是想一直把这个网站运行下去，让它变得更华丽，有更多值得留存的东西。</p>
                <div class="card-bottom-decor"><div class="decor-line"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-dot"></div><div class="decor-divider"></div></div>
            </div>
        </div>
    </section>

    <footer>
        <p>Crafted with ❤ by Ray | &copy; 2026</p>
    </footer>

    <div class="lightbox-overlay" id="lightbox" onclick="closeLightbox()">
        <img src="" alt="放大图片" id="lightbox-img">
    </div>`;
    // ===== LOCK / UNLOCK MECHANISM =====
    const body = document.body;

    // ===== NAVIGATION =====
    function navigateTo(targetId) {
        if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        body.classList.remove('locked');
        const el = document.getElementById(targetId);
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }

    document.getElementById('startBtn').addEventListener('click', () => {
        tryPlayMusic();
        navigateTo('content');
    });

    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-nav');
            if (target === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            navigateTo(target);
        });
    });

    // Prevent scroll when locked
    function shouldPreventScroll() {
        return body.classList.contains('locked');
    }
    document.addEventListener('wheel', (e) => {
        if (shouldPreventScroll()) e.preventDefault();
    }, { passive: false });
    document.addEventListener('touchmove', (e) => {
        if (shouldPreventScroll()) e.preventDefault();
    }, { passive: false });

    // ===== TYPEWRITER =====
    const preText = "This is a special edition developed exclusively for you by Ray's Studio. Every line of code is written to deliver one simple output: ";
    const highlightText = "Your Happiness.";
    const fullText = '"' + preText + highlightText + '"';
    const typewriterElement = document.getElementById('typewriter-text');
    const cursorElement = document.querySelector('.typewriter-cursor');
    const highlightStartIdx = 1 + preText.length;
    const highlightEndIdx = highlightStartIdx + highlightText.length;
    let charIndex = 0;
    let typewriterInterval = null;
    let hasStarted = false;

    function startTypewriter() {
        if (hasStarted) return;
        hasStarted = true;
        charIndex = 0;
        typewriterElement.innerHTML = '';
        cursorElement.style.display = 'inline-block';
        cursorElement.style.animation = 'blink 1s step-end infinite';
        typewriterInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                let html = '';
                for (let i = 0; i <= charIndex; i++) {
                    if (i === highlightStartIdx) html += '<span class="highlight">';
                    html += fullText[i] === '\n' ? '<br>' : fullText[i];
                    if (i === highlightEndIdx - 1) html += '</span>';
                }
                typewriterElement.innerHTML = html;
                charIndex++;
            } else {
                clearInterval(typewriterInterval);
                cursorElement.style.animation = 'none';
                cursorElement.style.opacity = '0';
            }
        }, 50);
    }
    setTimeout(startTypewriter, 600);

    // ===== MUSIC =====
    const bgMusic = document.getElementById('bgMusic');
    const bgMusic2 = document.getElementById('bgMusic2');
    const musicBtn = document.getElementById('musicBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    let currentAudio = bgMusic;
    let nextAudio = bgMusic2;
    function setVolumes(val) {
        const vol = parseFloat(val);
        if (!isNaN(vol)) { bgMusic.volume = vol; bgMusic2.volume = vol; }
    }
    setVolumes(volumeSlider.value);
    volumeSlider.addEventListener('input', e => setVolumes(e.target.value));
    volumeSlider.addEventListener('change', e => setVolumes(e.target.value));
    function switchTrack() {
        currentAudio.pause(); currentAudio.currentTime = 0;
        [currentAudio, nextAudio] = [nextAudio, currentAudio];
        currentAudio.play().then(() => musicBtn.innerHTML = '♪').catch(() => {});
        currentAudio.removeEventListener('ended', switchTrack);
        currentAudio.addEventListener('ended', switchTrack, { once: true });
    }
    bgMusic.addEventListener('ended', switchTrack, { once: true });
    bgMusic2.addEventListener('ended', switchTrack, { once: true });
    function tryPlayMusic() {
        if (currentAudio.paused) currentAudio.play().then(() => musicBtn.innerHTML = '♪').catch(() => {});
    }
    musicBtn.addEventListener('touchstart', e => e.stopPropagation());
    musicBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (currentAudio.paused) tryPlayMusic();
        else { currentAudio.pause(); musicBtn.innerHTML = '✕'; }
    });
    document.addEventListener('click', tryPlayMusic);
    window.addEventListener('scroll', tryPlayMusic, { once: true });

    // ===== VIDEO PLAYBACK → BGM VOLUME =====
    document.querySelectorAll('video').forEach(v => {
        v.addEventListener('play', () => setVolumes(0.03));
        v.addEventListener('pause', () => setVolumes(0.5));
        v.addEventListener('ended', () => setVolumes(0.5));
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    function openLightbox(src) {
        lightboxImg.style.opacity = '0';
        lightboxImg.src = src;
        lightbox.classList.add('active');
        lightboxImg.onload = () => { lightboxImg.style.opacity = '1'; };
        setTimeout(() => {
            if (lightboxImg.complete && lightboxImg.naturalWidth > 0) lightboxImg.style.opacity = '1';
        }, 100);
    }
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxImg.style.opacity = '1';
    }
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

    document.querySelectorAll('.pinned-photo').forEach(photo => {
        photo.addEventListener('touchend', function() {
            const el = this;
            setTimeout(() => {
                el.style.pointerEvents = 'none';
                setTimeout(() => { el.style.pointerEvents = 'auto'; }, 100);
            }, 350);
        });
    });

    // ===== HEART TRAIL =====
    const trailCanvas = document.getElementById('trailCanvas');
    const tctx = trailCanvas.getContext('2d');
    let particles = [], canSpawn = true, lastX = 0, lastY = 0, lastMoveTime = 0;
    function resizeTrail() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    }
    let resizeTimer;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeTrail, 200); });
    resizeTrail();
    class Heart {
        constructor(x, y, vx, vy) {
            this.x = x; this.y = y;
            this.size = Math.random() * 5 + 3;
            this.speedX = vx + (Math.random() - 0.5) * 0.5;
            this.speedY = vy + (Math.random() - 0.5) * 0.5;
            this.opacity = 1; this.fadeSpeed = 0.008;
            this.hue = [180, 200, 260, 280][Math.floor(Math.random() * 4)];
        }
        draw() {
            if (this.size < 1.5) return;
            tctx.save();
            tctx.translate(this.x, this.y);
            tctx.globalAlpha = this.opacity;
            tctx.beginPath();
            const r = this.size;
            for (let i = 0; i < Math.PI * 2; i += 0.3) {
                const tx = 16 * Math.pow(Math.sin(i), 3);
                const ty = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
                tctx.lineTo(tx * (r / 4), ty * (r / 4));
            }
            tctx.shadowColor = `hsla(${this.hue}, 80%, 70%, 0.6)`;
            tctx.shadowBlur = 8;
            tctx.fillStyle = '#fff';
            tctx.fill();
            tctx.restore();
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            this.opacity -= this.fadeSpeed;
            if (this.size > 0.5) this.size -= 0.02;
        }
    }
    function handleMove(e) {
        if (!canSpawn) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        const now = Date.now();
        let dx = 0, dy = 0;
        if (lastMoveTime > 0) {
            const dt = now - lastMoveTime;
            if (dt > 0 && dt < 100) { dx = (x - lastX) / dt * 3; dy = (y - lastY) / dt * 3; }
        }
        lastX = x; lastY = y; lastMoveTime = now;
        particles.push(new Heart(x, y, dx, dy));
        canSpawn = false;
        setTimeout(() => canSpawn = true, 80);
    }
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    function animateHearts() {
        tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(); particles[i].draw();
            if (particles[i].opacity <= 0.02 || particles[i].size <= 1.2) { particles.splice(i, 1); i--; }
        }
        requestAnimationFrame(animateHearts);
    }
    animateHearts();

    // ===== FAIRY LIGHTS =====
    const fairyLights = document.getElementById('fairyLights');
    const DOT_COUNT = 45;
    const fairyColors = ['#50d0b0', '#80e0c0', '#b890e0', '#fff', '#a0d0e0', '#d080c0', '#e0b860'];
    for (let i = 0; i < DOT_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'fairy-dot';
        const size = Math.random() * 3 + 2;
        dot.style.width = size + 'px'; dot.style.height = size + 'px';
        dot.style.left = (Math.random() * 98) + '%';
        dot.style.top = (Math.random() * 28 + 2) + 'px';
        const color = fairyColors[Math.floor(Math.random() * fairyColors.length)];
        dot.style.background = color;
        dot.style.boxShadow = `0 0 ${size*3}px ${color}, 0 0 ${size*6}px ${color}, 0 0 ${size*10}px rgba(80,208,176,0.35)`;
        dot.style.setProperty('--fduration', (Math.random() * 2.5 + 2) + 's');
        dot.style.setProperty('--fdelay', Math.random() * 3 + 's');
        fairyLights.appendChild(dot);
    }

    // ===== 3D CAROUSEL =====
    var carousel3d = document.getElementById('carousel3d');
    var carouselScene = document.getElementById('carouselScene');
    var carouselItems = carousel3d.querySelectorAll('.carousel-item-3d');
    var totalItems = carouselItems.length;
    var anglePerItem = 360 / totalItems;
    var radius = 420;
    var currentAngle = 0;
    var autoSpeed = 0.12;
    var isDragging = false;
    var dragStartX = 0, dragLastAngle = 0, dragMoved = false;
    var autoSpinId = null;

    function updateRadius() { radius = window.innerWidth <= 480 ? 260 : 420; }
    updateRadius();
    function buildCarousel() {
        updateRadius();
        carouselItems.forEach(function(item, i) {
            var rot = i * anglePerItem;
            item.style.transform = 'rotateY(' + rot + 'deg) translateZ(' + radius + 'px)';
        });
    }
    buildCarousel();
    function rotateCarousel(deg) {
        currentAngle = deg;
        carousel3d.style.transform = 'rotateY(' + deg + 'deg)';
    }
    function autoSpin() {
        if (!isDragging) {
            currentAngle += autoSpeed;
            if (currentAngle >= 360) currentAngle -= 360;
            if (currentAngle <= -360) currentAngle += 360;
            carousel3d.style.transform = 'rotateY(' + currentAngle + 'deg)';
        }
        autoSpinId = requestAnimationFrame(autoSpin);
    }
    autoSpinId = requestAnimationFrame(autoSpin);

    function onDragStart(e) {
        isDragging = true; dragMoved = false;
        dragLastAngle = currentAngle;
        dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
        e.preventDefault();
    }
    function onDragMove(e) {
        if (!isDragging) return;
        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        var deltaX = clientX - dragStartX;
        if (Math.abs(deltaX) > 4) dragMoved = true;
        var newAngle = dragLastAngle + deltaX * 0.4;
        carousel3d.style.transform = 'rotateY(' + newAngle + 'deg)';
        currentAngle = newAngle;
    }
    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        if (!dragMoved) {
            var target = e.target;
            var item = target.closest('.carousel-item-3d');
            if (item) {
                var src = item.getAttribute('data-src');
                if (src) openLightbox(src);
            }
        }
    }
    carouselScene.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    carouselScene.addEventListener('touchstart', onDragStart, { passive: false });
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);

    var carouselResizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(carouselResizeTimer);
        carouselResizeTimer = setTimeout(function() {
            buildCarousel();
            rotateCarousel(currentAngle);
        }, 300);
    });

    // ===== WISH / STARRY OVERLAY =====
    const wishTrigger = document.getElementById('wishTrigger');
    const starryOverlay = document.getElementById('starryOverlay');
    const starryCanvas = document.getElementById('starryCanvas');
    const starryClose = document.getElementById('starryClose');
    const starryHint = document.getElementById('starryHint');
    const starryCtx = starryCanvas.getContext('2d');

    let stars = [], shootingStars = [], wishTexts = [];
    let starryActive = false, starryAnimId = null;
    let canvasW, canvasH;

    const wishMessages = [
        '愿代码永远没有 Bug ✨', '愿每个梦想都闪闪发光 🌟', '愿你每天都有好心情 💫',
        '愿所有的努力都不被辜负 ⭐', '愿我们可以久别重逢 💖', '愿你的笑容像星星一样 ✨',
        '愿未来的路星光灿烂 💫', '送给最特别的你 🌟', '愿许下的愿望都能实现 💫',
        '愿今年可以充满美好回忆 ✨'
    ];

    function rpick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function resizeStarryCanvas() {
        canvasW = window.innerWidth;
        canvasH = window.innerHeight;
        starryCanvas.width = canvasW;
        starryCanvas.height = canvasH;
    }

    function createStars() {
        stars = [];
        var count = Math.floor(canvasW * canvasH / 1800);
        for (var i = 0; i < count; i++) {
            var depth = Math.random();
            stars.push({
                x: Math.random() * canvasW, y: Math.random() * canvasH,
                r: 0.5 + Math.random() * 1.8 * depth,
                twinkleSpeed: 0.005 + Math.random() * 0.03,
                twinkleOffset: Math.random() * Math.PI * 2,
                baseAlpha: 0.3 + Math.random() * 0.7,
                depth: depth
            });
        }
    }

    function drawStarryBackground() {
        var grad = starryCtx.createRadialGradient(canvasW/2, canvasH/2, 0, canvasW/2, canvasH/2, Math.max(canvasW, canvasH) * 0.7);
        grad.addColorStop(0, '#0d0d3a');
        grad.addColorStop(1, '#020210');
        starryCtx.fillStyle = grad;
        starryCtx.fillRect(0, 0, canvasW, canvasH);
    }

    function drawStars(time) {
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            var alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.35;
            alpha = Math.max(0.15, Math.min(1, alpha));
            starryCtx.beginPath();
            starryCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            var hue = s.depth > 0.7 ? 200 : (s.depth > 0.4 ? 240 : 280);
            starryCtx.fillStyle = 'hsla(' + hue + ', 60%, 85%, ' + alpha + ')';
            starryCtx.fill();
            if (s.r > 1.3 && alpha > 0.8) {
                starryCtx.beginPath();
                starryCtx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
                starryCtx.fillStyle = 'hsla(' + hue + ', 70%, 80%, ' + (alpha * 0.12) + ')';
                starryCtx.fill();
            }
        }
    }

    function createShootingStar(x, y) {
        var angle = Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 2;
        var speed = 6 + Math.random() * 10;
        var life = 1;
        var trailLen = 18 + Math.random() * 30;
        var trail = [];
        for (var i = 0; i < trailLen; i++) {
            trail.push({ x: x - Math.cos(angle) * i * 3, y: y - Math.sin(angle) * i * 3 });
        }
        shootingStars.push({
            x: x, y: y, angle: angle, speed: speed,
            life: life, trailLen: trailLen, trail: trail,
            hue: 180 + Math.random() * 80
        });
        if (shootingStars.length > 12) shootingStars.shift();
    }

    function createWishText(x, y) {
        var el = document.createElement('span');
        el.className = 'wish-text';
        el.textContent = rpick(wishMessages);
        el.style.left = x + 'px'; el.style.top = y + 'px';
        starryOverlay.appendChild(el);
        var obj = { el: el, life: 1, x: x, y: y };
        wishTexts.push(obj);
        el.addEventListener('animationend', function() {
            el.remove();
            var idx = wishTexts.indexOf(obj);
            if (idx > -1) wishTexts.splice(idx, 1);
        });
    }

    function updateShootingStars() {
        for (var i = shootingStars.length - 1; i >= 0; i--) {
            var ss = shootingStars[i];
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.trail.unshift({ x: ss.x, y: ss.y });
            if (ss.trail.length > ss.trailLen) ss.trail.pop();
            ss.life -= 0.012;
            if (ss.life <= 0 || ss.x < -100 || ss.x > canvasW + 100 || ss.y < -100 || ss.y > canvasH + 100) {
                shootingStars.splice(i, 1);
            }
        }
    }

    function drawShootingStars() {
        for (var i = 0; i < shootingStars.length; i++) {
            var ss = shootingStars[i];
            var alpha = ss.life;
            starryCtx.beginPath();
            starryCtx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2);
            starryCtx.fillStyle = 'hsla(' + ss.hue + ', 100%, 85%, ' + alpha + ')';
            starryCtx.fill();
            starryCtx.beginPath();
            starryCtx.arc(ss.x, ss.y, 7, 0, Math.PI * 2);
            starryCtx.fillStyle = 'hsla(' + ss.hue + ', 100%, 75%, ' + (alpha * 0.25) + ')';
            starryCtx.fill();
            if (ss.trail.length > 1) {
                starryCtx.beginPath();
                starryCtx.moveTo(ss.trail[0].x, ss.trail[0].y);
                for (var j = 1; j < ss.trail.length; j++) starryCtx.lineTo(ss.trail[j].x, ss.trail[j].y);
                starryCtx.strokeStyle = 'hsla(' + ss.hue + ', 100%, 80%, ' + (alpha * 0.5) + ')';
                starryCtx.lineWidth = 1.2;
                starryCtx.stroke();
            }
        }
    }

    function animateStarry(time) {
        if (!starryActive) return;
        starryCtx.clearRect(0, 0, canvasW, canvasH);
        drawStarryBackground();
        drawStars(time);
        updateShootingStars();
        drawShootingStars();
        starryAnimId = requestAnimationFrame(animateStarry);
    }

    function openStarry() {
        if (starryActive) return;
        starryActive = true;
        resizeStarryCanvas();
        createStars();
        starryOverlay.classList.add('active');
        starryHint.style.display = '';
        starryAnimId = requestAnimationFrame(animateStarry);
    }

    function closeStarry() {
        starryActive = false;
        if (starryAnimId) cancelAnimationFrame(starryAnimId);
        shootingStars = [];
        for (var i = 0; i < wishTexts.length; i++) wishTexts[i].el.remove();
        wishTexts = [];
        starryOverlay.classList.remove('active');
    }

    function onStarryCanvasClick(e) {
        if (!starryActive) return;
        var rect = starryCanvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        createShootingStar(x, y);
        createWishText(x, y - 10);
        starryHint.style.display = 'none';
    }
    wishTrigger.addEventListener('click', openStarry);
    starryClose.addEventListener('click', function(e) { e.stopPropagation(); closeStarry(); });
    starryCanvas.addEventListener('click', onStarryCanvasClick);
    window.addEventListener('resize', function() {
        if (starryActive) { resizeStarryCanvas(); createStars(); }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && starryActive) closeStarry();
    });

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    let scrollTicking = false;
    function onScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(function() {
                if (window.scrollY > 60) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ===== KEYBOARD NAV =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && body.classList.contains('locked')) {
            e.preventDefault();
            tryPlayMusic();
            navigateTo('content');
        }
    });


    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });

    document.querySelectorAll('.diary-card, .feature-card-v1, button, .music-toggle, .wish-trigger').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const rect = el.getBoundingClientRect();
            for (let i = 0; i < 20; i++) {
                const p = document.createElement('div');
                p.style.cssText = 'position:fixed;pointer-events:none;z-index:9998;width:6px;height:6px;border-radius:50%;'
                    + `left:${rect.left + Math.random()*rect.width}px;top:${rect.top + Math.random()*rect.height}px;`
                    + `background:hsl(${180+Math.random()*120},80%,65%);box-shadow:0 0 6px hsl(${180+Math.random()*120},80%,65%);`
                    + `animation:particleBurst ${0.3+Math.random()*0.5}s ease-out forwards;`;
                p.style.setProperty('--px', (Math.random()>0.5?'':'-') + (30+Math.random()*80) + 'px');
                p.style.setProperty('--py', -(40+Math.random()*80) + 'px');
                document.body.appendChild(p);
                p.addEventListener('animationend', () => p.remove());
            }
        });
    });

    var modScript = document.createElement("script");
    modScript.type = "module";
    modScript.textContent = atob("ICAgIGltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJzsKICAgIGltcG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSAndGhyZWUvYWRkb25zL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyLmpzJzsKICAgIGltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tICd0aHJlZS9hZGRvbnMvcG9zdHByb2Nlc3NpbmcvUmVuZGVyUGFzcy5qcyc7CiAgICBpbXBvcnQgeyBVbnJlYWxCbG9vbVBhc3MgfSBmcm9tICd0aHJlZS9hZGRvbnMvcG9zdHByb2Nlc3NpbmcvVW5yZWFsQmxvb21QYXNzLmpzJzsKCiAgICAvLyA9PT09PSBERVZJQ0UgREVURUNUSU9OID09PT09CiAgICBjb25zdCBpc01vYmlsZSA9IC9BbmRyb2lkfGlQaG9uZXxpUGFkfGlQb2R8d2ViT1MvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2ODsKCiAgICAvLyA9PT09PSBET00gRUxFTUVOVCA9PT09PQogICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RocmVlQmcnKTsKCiAgICAvLyA9PT09PSBXRUJHTCBGQUxMQkFDSyA9PT09PQogICAgY29uc3QgaXNXZWJHTFN1cHBvcnRlZCA9ICgoKSA9PiB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgY29uc3QgdGVzdENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOwogICAgICAgICAgICByZXR1cm4gISEod2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJgogICAgICAgICAgICAgICAgKHRlc3RDYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCB0ZXN0Q2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpKSk7CiAgICAgICAgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0KICAgIH0pKCk7CgogICAgaWYgKCFpc1dlYkdMU3VwcG9ydGVkKSB7CiAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDUwJSA1MCUsICMwZjEwNDUgMCUsICMwNjA2MWEgMTAwJSknOwogICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViR0wgbm90IHN1cHBvcnRlZCAtIHVzaW5nIENTUyBmYWxsYmFjaycpOwogICAgfQoKICAgIC8vID09PT09IEJBU0lDIFNDRU5FIFNFVFVQID09PT09CiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpOwogICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgMjAwMCk7CiAgICBjYW1lcmEucG9zaXRpb24ueiA9IDUwMDsKCiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgY2FudmFzLCBhbHBoYTogdHJ1ZSwgYW50aWFsaWFzOiBmYWxzZSB9KTsKICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7CiAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKSk7CgogICAgY29uc3QgY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpOwogICAgY29tcG9zZXIuYWRkUGFzcyhuZXcgUmVuZGVyUGFzcyhzY2VuZSwgY2FtZXJhKSk7CgogICAgY29uc3QgYmxvb21QYXNzID0gbmV3IFVucmVhbEJsb29tUGFzcygKICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KSwKICAgICAgICAxLjUsIDAuNCwgMC42CiAgICApOwogICAgY29tcG9zZXIuYWRkUGFzcyhibG9vbVBhc3MpOwoKICAgIC8vID09PT09IFJFU0laRSBIQU5ETEVSID09PT09CiAgICBsZXQgcmVzaXplVGltZW91dDsKICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7CiAgICAgICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVvdXQpOwogICAgICAgIHJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHsKICAgICAgICAgICAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0OwogICAgICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpOwogICAgICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpOwogICAgICAgICAgICBjb21wb3Nlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpOwogICAgICAgIH0sIDI1MCk7CiAgICB9LCB7IHBhc3NpdmU6IHRydWUgfSk7CgogICAgLy8gPT09PT0gTU9VU0UgVFJBQ0tJTkcgPT09PT0KICAgIGNvbnN0IG1vdXNlID0geyB4OiAwLCB5OiAwLCB0eDogMCwgdHk6IDAgfTsKICAgIGNvbnN0IGxlcnBTcGVlZCA9IGlzTW9iaWxlID8gMC4wMiA6IDAuMDM7CiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHsKICAgICAgICBtb3VzZS50eCA9IChlLmNsaWVudFggLyB3aW5kb3cuaW5uZXJXaWR0aCkgKiAyIC0gMTsKICAgICAgICBtb3VzZS50eSA9IC0oZS5jbGllbnRZIC8gd2luZG93LmlubmVySGVpZ2h0KSAqIDIgKyAxOwogICAgfSk7CiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHsKICAgICAgICBjb25zdCB0ID0gZS50b3VjaGVzWzBdOwogICAgICAgIG1vdXNlLnR4ID0gKHQuY2xpZW50WCAvIHdpbmRvdy5pbm5lcldpZHRoKSAqIDIgLSAxOwogICAgICAgIG1vdXNlLnR5ID0gLSh0LmNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQpICogMiArIDE7CiAgICB9LCB7IHBhc3NpdmU6IHRydWUgfSk7CgogICAgLy8gPT09PT0gVklTSUJJTElUWSBBUEkgPT09PT0KICAgIGxldCBpc1Zpc2libGUgPSAhZG9jdW1lbnQuaGlkZGVuOwogICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHsKICAgICAgICBpc1Zpc2libGUgPSAhZG9jdW1lbnQuaGlkZGVuOwogICAgfSk7CgogICAgLy8gPT09PT0gU0NST0xMIFRSQUNLSU5HID09PT09CiAgICBsZXQgc2Nyb2xsWSA9IDA7CiAgICBsZXQgdGFyZ2V0U2Nyb2xsWSA9IDA7CiAgICBjb25zdCBwYWdlSGVpZ2h0ID0gKCkgPT4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCB8fCAxOwogICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHsKICAgICAgICB0YXJnZXRTY3JvbGxZID0gd2luZG93LnNjcm9sbFkgLyBwYWdlSGVpZ2h0KCk7CiAgICB9LCB7IHBhc3NpdmU6IHRydWUgfSk7CgogICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACiAgICAvLyAgMS4gVEVYVFVSRSBGQUNUT1JZCiAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKCiAgICBmdW5jdGlvbiBjcmVhdGVTdGFyVGV4dHVyZUxhcmdlKCkgewogICAgICAgIGNvbnN0IHNpemUgPSA2NDsKICAgICAgICBjb25zdCBjdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOwogICAgICAgIGN2LndpZHRoID0gc2l6ZTsgY3YuaGVpZ2h0ID0gc2l6ZTsKICAgICAgICBjb25zdCBjdHggPSBjdi5nZXRDb250ZXh0KCcyZCcpOwogICAgICAgIGNvbnN0IGhhbGYgPSBzaXplIC8gMjsKICAgICAgICBjb25zdCBncmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGhhbGYsIGhhbGYsIDAsIGhhbGYsIGhhbGYsIGhhbGYpOwogICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMC4wMiwgJ3JnYmEoMjU1LDI1NSwyNTUsMSknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgwLjEsICdyZ2JhKDI1NSwyNTAsMjQwLDAuOCknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgwLjMsICdyZ2JhKDI1NSwyMjAsMTgwLDAuMyknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgwLjYsICdyZ2JhKDIwMCwxODAsMjU1LDAuMDUpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTsKICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZDsKICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7CiAgICAgICAgLy8gRGlmZnJhY3Rpb24gY3Jvc3Mgc3Bpa2VzIGF0IDDCsCwgNDXCsCwgOTDCsCwgMTM1wrAKICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjcpJzsKICAgICAgICBjdHgubGluZVdpZHRoID0gMS4yOwogICAgICAgIGZvciAoY29uc3QgYW5nbGUgb2YgWzAsIE1hdGguUEkgLyA0LCBNYXRoLlBJIC8gMiwgTWF0aC5QSSAqIDMgLyA0XSkgewogICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7CiAgICAgICAgICAgIGN0eC5tb3ZlVG8oaGFsZiwgaGFsZik7CiAgICAgICAgICAgIGN0eC5saW5lVG8oaGFsZiArIE1hdGguY29zKGFuZ2xlKSAqIGhhbGYgKiAwLjgsIGhhbGYgKyBNYXRoLnNpbihhbmdsZSkgKiBoYWxmICogMC44KTsKICAgICAgICAgICAgY3R4LnN0cm9rZSgpOwogICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7CiAgICAgICAgICAgIGN0eC5tb3ZlVG8oaGFsZiwgaGFsZik7CiAgICAgICAgICAgIGN0eC5saW5lVG8oaGFsZiAtIE1hdGguY29zKGFuZ2xlKSAqIGhhbGYgKiAwLjgsIGhhbGYgLSBNYXRoLnNpbihhbmdsZSkgKiBoYWxmICogMC44KTsKICAgICAgICAgICAgY3R4LnN0cm9rZSgpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY3YpOwogICAgfQoKICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YXJUZXh0dXJlTWVkaXVtKCkgewogICAgICAgIGNvbnN0IHNpemUgPSAzMjsKICAgICAgICBjb25zdCBjdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOwogICAgICAgIGN2LndpZHRoID0gc2l6ZTsgY3YuaGVpZ2h0ID0gc2l6ZTsKICAgICAgICBjb25zdCBjdHggPSBjdi5nZXRDb250ZXh0KCcyZCcpOwogICAgICAgIGNvbnN0IGhhbGYgPSBzaXplIC8gMjsKICAgICAgICBjb25zdCBncmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGhhbGYsIGhhbGYsIDAsIGhhbGYsIGhhbGYsIGhhbGYpOwogICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMC4wNSwgJ3JnYmEoMjU1LDI1NSwyNTUsMC44NSknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgwLjI1LCAncmdiYSgyMjAsMjMwLDI1NSwwLjM1KScpOwogICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAuNiwgJ3JnYmEoMTIwLDE2MCwyMzAsMC4wNCknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwwKScpOwogICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkOwogICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBzaXplLCBzaXplKTsKICAgICAgICByZXR1cm4gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY3YpOwogICAgfQoKICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YXJUZXh0dXJlU21hbGwoKSB7CiAgICAgICAgY29uc3Qgc2l6ZSA9IDE2OwogICAgICAgIGNvbnN0IGN2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7CiAgICAgICAgY3Yud2lkdGggPSBzaXplOyBjdi5oZWlnaHQgPSBzaXplOwogICAgICAgIGNvbnN0IGN0eCA9IGN2LmdldENvbnRleHQoJzJkJyk7CiAgICAgICAgY29uc3QgaGFsZiA9IHNpemUgLyAyOwogICAgICAgIGNvbnN0IGdyYWQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoaGFsZiwgaGFsZiwgMCwgaGFsZiwgaGFsZiwgaGFsZik7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LDI1NSwyNTUsMC44KScpOwogICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAuMTUsICdyZ2JhKDI1NSwyNTUsMjU1LDAuNSknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgwLjUsICdyZ2JhKDE4MCwyMDAsMjQwLDAuMSknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwwKScpOwogICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkOwogICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBzaXplLCBzaXplKTsKICAgICAgICByZXR1cm4gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY3YpOwogICAgfQoKICAgIGZ1bmN0aW9uIGNyZWF0ZUZpcmVmbHlUZXh0dXJlKCkgewogICAgICAgIGNvbnN0IHNpemUgPSAzMjsKICAgICAgICBjb25zdCBjdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOwogICAgICAgIGN2LndpZHRoID0gc2l6ZTsgY3YuaGVpZ2h0ID0gc2l6ZTsKICAgICAgICBjb25zdCBjdHggPSBjdi5nZXRDb250ZXh0KCcyZCcpOwogICAgICAgIGNvbnN0IGhhbGYgPSBzaXplIC8gMjsKICAgICAgICBjb25zdCBncmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGhhbGYsIGhhbGYsIDAsIGhhbGYsIGhhbGYsIGhhbGYpOwogICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDI1NSwyNDAsMjIwLDEpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMC4xLCAncmdiYSgyNTUsMjIwLDE2MCwwLjcpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMC40LCAncmdiYSgyNTUsMTgwLDgwLDAuMTUpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTsKICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZDsKICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7CiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5DYW52YXNUZXh0dXJlKGN2KTsKICAgIH0KCiAgICBmdW5jdGlvbiBjcmVhdGVTcGFya2xlVGV4dHVyZSgpIHsKICAgICAgICBjb25zdCBzaXplID0gODsKICAgICAgICBjb25zdCBjdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOwogICAgICAgIGN2LndpZHRoID0gc2l6ZTsgY3YuaGVpZ2h0ID0gc2l6ZTsKICAgICAgICBjb25zdCBjdHggPSBjdi5nZXRDb250ZXh0KCcyZCcpOwogICAgICAgIGNvbnN0IGhhbGYgPSBzaXplIC8gMjsKICAgICAgICBjb25zdCBncmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGhhbGYsIGhhbGYsIDAsIGhhbGYsIGhhbGYsIGhhbGYpOwogICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMC4yLCAncmdiYSgyNTUsMjU1LDI1NSwwLjkpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMC42LCAncmdiYSgyNTUsMjU1LDI1NSwwLjEpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTsKICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZDsKICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7CiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5DYW52YXNUZXh0dXJlKGN2KTsKICAgIH0KCgogICAgLy8gSW5zdGFudGlhdGUgYWxsIHRleHR1cmVzCiAgICBjb25zdCB0ZXhTdGFyTGFyZ2UgICA9IGNyZWF0ZVN0YXJUZXh0dXJlTGFyZ2UoKTsKICAgIGNvbnN0IHRleFN0YXJNZWRpdW0gID0gY3JlYXRlU3RhclRleHR1cmVNZWRpdW0oKTsKICAgIGNvbnN0IHRleFN0YXJTbWFsbCAgID0gY3JlYXRlU3RhclRleHR1cmVTbWFsbCgpOwogICAgY29uc3QgdGV4RmlyZWZseSAgICAgPSBjcmVhdGVGaXJlZmx5VGV4dHVyZSgpOwogICAgY29uc3QgdGV4U3BhcmtsZSAgICAgPSBjcmVhdGVTcGFya2xlVGV4dHVyZSgpOwoKICAgIC8vIEdhbGF4eSBkaXNjIGJyb2FkLWdsb3cgc3ByaXRlICg2NMOXNjQpCiAgICBjb25zdCBnYWxheHlUZXhDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsKICAgIGdhbGF4eVRleENhbnZhcy53aWR0aCA9IDY0OyBnYWxheHlUZXhDYW52YXMuaGVpZ2h0ID0gNjQ7CiAgICBjb25zdCBnY3R4ID0gZ2FsYXh5VGV4Q2FudmFzLmdldENvbnRleHQoJzJkJyk7CiAgICBjb25zdCBnR3JhZCA9IGdjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoMzIsIDMyLCAwLCAzMiwgMzIsIDMyKTsKICAgIGdHcmFkLmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNTUsMjU1LDI1NSwwLjkpJyk7CiAgICBnR3JhZC5hZGRDb2xvclN0b3AoMC4wOCwgJ3JnYmEoMjU1LDI1NSwyNTUsMC42KScpOwogICAgZ0dyYWQuYWRkQ29sb3JTdG9wKDAuMywgJ3JnYmEoMjAwLDIyMCwyNTUsMC4yKScpOwogICAgZ0dyYWQuYWRkQ29sb3JTdG9wKDAuNywgJ3JnYmEoMTAwLDE1MCwyMjAsMC4wMyknKTsKICAgIGdHcmFkLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwwKScpOwogICAgZ2N0eC5maWxsU3R5bGUgPSBnR3JhZDsKICAgIGdjdHguZmlsbFJlY3QoMCwgMCwgNjQsIDY0KTsKICAgICAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKICAgIC8vICAyLiBHQUxBWFkgUEFSVElDTEUgU1dJUkwKICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAogICAgY29uc3QgR0FMQVhZX1BBUlRJQ0xFX0NPVU5UID0gaXNNb2JpbGUgPyAxNTAwMCA6IDQwMDAwOwogICAgY29uc3QgU1BJUkFMX0FSTVMgPSAzOwogICAgY29uc3QgR0FMQVhZX1JBRElVUyA9IDQ1MDsKICAgIGNvbnN0IENPUkVfUkFESVVTID0gNjA7CgogICAgY29uc3QgQkdfU1RBUl9DT1VOVCA9IGlzTW9iaWxlID8gMTAwMCA6IDMwMDA7CiAgICBjb25zdCBiZ1N0YXJHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTsKICAgIGNvbnN0IGJnU3RhclBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoQkdfU1RBUl9DT1VOVCAqIDMpOwogICAgY29uc3QgYmdTdGFyQ29sID0gbmV3IEZsb2F0MzJBcnJheShCR19TVEFSX0NPVU5UICogMyk7CiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJHX1NUQVJfQ09VTlQ7IGkrKykgewogICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyOwogICAgICAgIGNvbnN0IHBoaSA9IE1hdGguYWNvcygyICogTWF0aC5yYW5kb20oKSAtIDEpOwogICAgICAgIGNvbnN0IHIgPSA3NTAgKyBNYXRoLnJhbmRvbSgpICogNDUwOwogICAgICAgIGJnU3RhclBvc1tpICogM10gPSBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpICogcjsKICAgICAgICBiZ1N0YXJQb3NbaSAqIDMgKyAxXSA9IE1hdGguc2luKHBoaSkgKiBNYXRoLnNpbih0aGV0YSkgKiByOwogICAgICAgIGJnU3RhclBvc1tpICogMyArIDJdID0gTWF0aC5jb3MocGhpKSAqIHI7CiAgICAgICAgY29uc3QgaHVlID0gMjAwICsgTWF0aC5yYW5kb20oKSAqIDYwOwogICAgICAgIGNvbnN0IHNhdCA9IDAuMyArIE1hdGgucmFuZG9tKCkgKiAwLjQ7CiAgICAgICAgY29uc3QgbGlnaHQgPSAwLjYgKyBNYXRoLnJhbmRvbSgpICogMC40OwogICAgICAgIGNvbnN0IGMgPSBuZXcgVEhSRUUuQ29sb3IoKTsKICAgICAgICBjLnNldEhTTChodWUgLyAzNjAsIHNhdCwgbGlnaHQpOwogICAgICAgIGJnU3RhckNvbFtpICogM10gPSBjLnI7CiAgICAgICAgYmdTdGFyQ29sW2kgKiAzICsgMV0gPSBjLmc7CiAgICAgICAgYmdTdGFyQ29sW2kgKiAzICsgMl0gPSBjLmI7CiAgICB9CiAgICBiZ1N0YXJHZW8uc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoYmdTdGFyUG9zLCAzKSk7CiAgICBiZ1N0YXJHZW8uc2V0QXR0cmlidXRlKCdjb2xvcicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoYmdTdGFyQ29sLCAzKSk7CiAgICBjb25zdCBiZ1N0YXJNYXQgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoewogICAgICAgIHNpemU6IDEuNSwgdmVydGV4Q29sb3JzOiB0cnVlLAogICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLCBkZXB0aFdyaXRlOiBmYWxzZSwgdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDAuNzUsCiAgICB9KTsKICAgIGNvbnN0IGJnU3RhcnMgPSBuZXcgVEhSRUUuUG9pbnRzKGJnU3RhckdlbywgYmdTdGFyTWF0KTsKICAgIGJnU3RhcnMucmVuZGVyT3JkZXIgPSAtMjA7CiAgICBzY2VuZS5hZGQoYmdTdGFycyk7CgogICAgY29uc3QgZ2FsYXh5R3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTsKICAgIGdhbGF4eUdyb3VwLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjsKICAgIHNjZW5lLmFkZChnYWxheHlHcm91cCk7CgogICAgZnVuY3Rpb24gY3JlYXRlR2FsYXh5UGFydGljbGVUZXh0dXJlKCkgewogICAgICAgIGNvbnN0IHNpemUgPSAzMjsKICAgICAgICBjb25zdCBjdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOwogICAgICAgIGN2LndpZHRoID0gc2l6ZTsgY3YuaGVpZ2h0ID0gc2l6ZTsKICAgICAgICBjb25zdCBjdHggPSBjdi5nZXRDb250ZXh0KCcyZCcpOwogICAgICAgIGNvbnN0IGhhbGYgPSBzaXplIC8gMjsKICAgICAgICBjb25zdCBncmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGhhbGYsIGhhbGYsIDAsIGhhbGYsIGhhbGYsIGhhbGYpOwogICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyk7CiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMC4wNSwgJ3JnYmEoMjU1LDI1NSwyNTUsMC45NSknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgwLjIsICdyZ2JhKDI1NSwyNTUsMjU1LDAuNSknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgwLjUsICdyZ2JhKDI1NSwyNTUsMjU1LDAuMSknKTsKICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwwKScpOwogICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkOwogICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBzaXplLCBzaXplKTsKICAgICAgICByZXR1cm4gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY3YpOwogICAgfQoKICAgIGNvbnN0IGdhbGF4eUdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpOwogICAgY29uc3QgZ2FsYXh5UG9zID0gbmV3IEZsb2F0MzJBcnJheShHQUxBWFlfUEFSVElDTEVfQ09VTlQgKiAzKTsKICAgIGNvbnN0IGdhbGF4eUNvbCA9IG5ldyBGbG9hdDMyQXJyYXkoR0FMQVhZX1BBUlRJQ0xFX0NPVU5UICogMyk7CiAgICBjb25zdCBnYWxheHlEYXRhID0gW107CgogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHQUxBWFlfUEFSVElDTEVfQ09VTlQ7IGkrKykgewogICAgICAgIGNvbnN0IGFybSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFNQSVJBTF9BUk1TKTsKICAgICAgICBjb25zdCBhcm1BbmdsZSA9IChhcm0gLyBTUElSQUxfQVJNUykgKiBNYXRoLlBJICogMjsKICAgICAgICBjb25zdCB0ID0gTWF0aC5yYW5kb20oKTsKICAgICAgICBjb25zdCByYWRpdXMgPSBDT1JFX1JBRElVUyArIHQgKiAoR0FMQVhZX1JBRElVUyAtIENPUkVfUkFESVVTKTsKICAgICAgICBjb25zdCBzcGlyYWxBbmdsZSA9IHQgKiBNYXRoLlBJICogMi41ICsgYXJtQW5nbGU7CiAgICAgICAgY29uc3Qgc3ByZWFkID0gKDEgLSB0KSAqIDAuNiArIDAuMDU7CiAgICAgICAgY29uc3QgYW5nbGUgPSBzcGlyYWxBbmdsZSArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIHNwcmVhZDsKCiAgICAgICAgZ2FsYXh5UG9zW2kgKiAzXSA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cyArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDE1OwogICAgICAgIGdhbGF4eVBvc1tpICogMyArIDFdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogKDE1ICsgdCAqIDMwKTsKICAgICAgICBnYWxheHlQb3NbaSAqIDMgKyAyXSA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cyArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDE1OwoKICAgICAgICBjb25zdCBkaXN0UmF0aW8gPSB0OwogICAgICAgIGxldCByLCBnLCBiOwogICAgICAgIGlmIChkaXN0UmF0aW8gPCAwLjE1KSB7CiAgICAgICAgICAgIHIgPSAwLjk1OyBnID0gMC44NTsgYiA9IDAuNTsKICAgICAgICB9IGVsc2UgaWYgKGRpc3RSYXRpbyA8IDAuNCkgewogICAgICAgICAgICBjb25zdCBzID0gKGRpc3RSYXRpbyAtIDAuMTUpIC8gMC4yNTsKICAgICAgICAgICAgciA9IDAuOTUgLSBzICogMC40NTsgZyA9IDAuODUgLSBzICogMC4yOyBiID0gMC41ICsgcyAqIDAuMzU7CiAgICAgICAgfSBlbHNlIGlmIChkaXN0UmF0aW8gPCAwLjcpIHsKICAgICAgICAgICAgY29uc3QgcyA9IChkaXN0UmF0aW8gLSAwLjQpIC8gMC4zOwogICAgICAgICAgICByID0gMC41IC0gcyAqIDAuMjsgZyA9IDAuNjUgKyBzICogMC4xNTsgYiA9IDAuODUgLSBzICogMC4xNTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBjb25zdCBzID0gKGRpc3RSYXRpbyAtIDAuNykgLyAwLjM7CiAgICAgICAgICAgIHIgPSAwLjMgKyBzICogMC4xNTsgZyA9IDAuMzUgKyBzICogMC4zNTsgYiA9IDAuNyAtIHMgKiAwLjI7CiAgICAgICAgfQogICAgICAgIGdhbGF4eUNvbFtpICogM10gPSByOwogICAgICAgIGdhbGF4eUNvbFtpICogMyArIDFdID0gZzsKICAgICAgICBnYWxheHlDb2xbaSAqIDMgKyAyXSA9IGI7CgogICAgICAgIGdhbGF4eURhdGEucHVzaCh7CiAgICAgICAgICAgIGJhc2VYOiBnYWxheHlQb3NbaSAqIDNdLCBiYXNlWTogZ2FsYXh5UG9zW2kgKiAzICsgMV0sIGJhc2VaOiBnYWxheHlQb3NbaSAqIDMgKyAyXSwKICAgICAgICAgICAgYmFzZVI6IHIsIGJhc2VHOiBnLCBiYXNlQjogYiwKICAgICAgICAgICAgcmFkaXVzLCBhbmdsZSwgYXJtLCBkaXN0UmF0aW8sCiAgICAgICAgICAgIGRyaWZ0QW1wOiAwLjUgKyBNYXRoLnJhbmRvbSgpICogMywKICAgICAgICAgICAgZHJpZnRGcmVxOiAwLjIgKyBNYXRoLnJhbmRvbSgpICogMC41LAogICAgICAgICAgICBkcmlmdFBoYXNlOiBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIsCiAgICAgICAgfSk7CiAgICB9CgogICAgZ2FsYXh5R2VvLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGdhbGF4eVBvcywgMykpOwogICAgZ2FsYXh5R2VvLnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGdhbGF4eUNvbCwgMykpOwoKICAgIGNvbnN0IGdhbGF4eVRleCA9IGNyZWF0ZUdhbGF4eVBhcnRpY2xlVGV4dHVyZSgpOwogICAgY29uc3QgZ2FsYXh5TWF0ID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHsKICAgICAgICBzaXplOiAyLjUsIG1hcDogZ2FsYXh5VGV4LCB2ZXJ0ZXhDb2xvcnM6IHRydWUsCiAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsIGRlcHRoV3JpdGU6IGZhbHNlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC44NSwKICAgIH0pOwogICAgY29uc3QgZ2FsYXh5UG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyhnYWxheHlHZW8sIGdhbGF4eU1hdCk7CiAgICBnYWxheHlQb2ludHMucmVuZGVyT3JkZXIgPSAtMTsKICAgIGdhbGF4eUdyb3VwLmFkZChnYWxheHlQb2ludHMpOwoKICAgIGNvbnN0IGNvcmVHbG93VGV4ID0gKCgpID0+IHsKICAgICAgICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGMud2lkdGggPSAxMjg7IGMuaGVpZ2h0ID0gMTI4OwogICAgICAgIGNvbnN0IHggPSBjLmdldENvbnRleHQoJzJkJyk7CiAgICAgICAgY29uc3QgZyA9IHguY3JlYXRlUmFkaWFsR3JhZGllbnQoNjQsIDY0LCAwLCA2NCwgNjQsIDY0KTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNTUsMjQwLDIwMCwxKScpOwogICAgICAgIGcuYWRkQ29sb3JTdG9wKDAuMDQsICdyZ2JhKDI1NSwyMjAsMTUwLDAuOSknKTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgwLjE1LCAncmdiYSgyNTUsMTcwLDYwLDAuNSknKTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgwLjQsICdyZ2JhKDI1NSwxMjAsMzAsMC4wOCknKTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwwKScpOwogICAgICAgIHguZmlsbFN0eWxlID0gZzsgeC5maWxsUmVjdCgwLCAwLCAxMjgsIDEyOCk7CiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5DYW52YXNUZXh0dXJlKGMpOwogICAgfSkoKTsKICAgIGNvbnN0IGNvcmVTcHJpdGUgPSBuZXcgVEhSRUUuU3ByaXRlKG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7CiAgICAgICAgbWFwOiBjb3JlR2xvd1RleCwgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsCiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OiAwLjksIGNvbG9yOiAweGZmZTBhMCwKICAgIH0pKTsKICAgIGNvcmVTcHJpdGUuc2NhbGUuc2V0KDkwLCA5MCwgMSk7CiAgICBjb3JlU3ByaXRlLnJlbmRlck9yZGVyID0gMDsKICAgIGNvcmVTcHJpdGUudXNlckRhdGEgPSB7IGlzQ29yZTogdHJ1ZSB9OwogICAgZ2FsYXh5R3JvdXAuYWRkKGNvcmVTcHJpdGUpOwoKICAgIGNvbnN0IGNvcmVHbG93VGV4MiA9ICgoKSA9PiB7CiAgICAgICAgY29uc3QgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBjLndpZHRoID0gMjU2OyBjLmhlaWdodCA9IDI1NjsKICAgICAgICBjb25zdCB4ID0gYy5nZXRDb250ZXh0KCcyZCcpOwogICAgICAgIGNvbnN0IGcgPSB4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KDEyOCwgMTI4LCAwLCAxMjgsIDEyOCwgMTI4KTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgwLCAncmdiYSgxODAsMTYwLDI0MCwwLjI1KScpOwogICAgICAgIGcuYWRkQ29sb3JTdG9wKDAuMTUsICdyZ2JhKDEzMCwxMjAsMjEwLDAuMSknKTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgwLjUsICdyZ2JhKDYwLDgwLDE2MCwwLjAyKScpOwogICAgICAgIGcuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwwLDApJyk7CiAgICAgICAgeC5maWxsU3R5bGUgPSBnOyB4LmZpbGxSZWN0KDAsIDAsIDI1NiwgMjU2KTsKICAgICAgICByZXR1cm4gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoYyk7CiAgICB9KSgpOwogICAgY29uc3QgY29yZVNwcml0ZTIgPSBuZXcgVEhSRUUuU3ByaXRlKG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7CiAgICAgICAgbWFwOiBjb3JlR2xvd1RleDIsIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLAogICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC41LCBjb2xvcjogMHhiODkwZTAsCiAgICB9KSk7CiAgICBjb3JlU3ByaXRlMi5zY2FsZS5zZXQoMjEwLCAyMTAsIDEpOwogICAgY29yZVNwcml0ZTIucmVuZGVyT3JkZXIgPSAtMTsKICAgIGNvcmVTcHJpdGUyLnVzZXJEYXRhID0geyBpc0NvcmUyOiB0cnVlIH07CiAgICBnYWxheHlHcm91cC5hZGQoY29yZVNwcml0ZTIpOwoKICAgIGNvbnN0IG5lYnVsYUNvdW50ID0gaXNNb2JpbGUgPyAzIDogNTsKICAgIGNvbnN0IG5lYnVsYVNwcml0ZXMgPSBbXTsKICAgIGNvbnN0IG5lYnVsYUh1ZXMgPSBbMjAwLCAyNjAsIDE4MCwgMjIwLCAyODBdOwogICAgZnVuY3Rpb24gY3JlYXRlTmVidWxhVGV4dHVyZShodWUpIHsKICAgICAgICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGMud2lkdGggPSAyNTY7IGMuaGVpZ2h0ID0gMjU2OwogICAgICAgIGNvbnN0IHggPSBjLmdldENvbnRleHQoJzJkJyk7CiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAyNTsgaisrKSB7CiAgICAgICAgICAgIGNvbnN0IGN4ID0gNDAgKyBNYXRoLnJhbmRvbSgpICogMTc2OwogICAgICAgICAgICBjb25zdCBjeSA9IDQwICsgTWF0aC5yYW5kb20oKSAqIDE3NjsKICAgICAgICAgICAgY29uc3QgcmFkID0gMTggKyBNYXRoLnJhbmRvbSgpICogNTU7CiAgICAgICAgICAgIGNvbnN0IGcgPSB4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGN4LCBjeSwgMCwgY3gsIGN5LCByYWQpOwogICAgICAgICAgICBjb25zdCBhbHBoYSA9IDAuMDIgKyBNYXRoLnJhbmRvbSgpICogMC4wNjsKICAgICAgICAgICAgZy5hZGRDb2xvclN0b3AoMCwgYGhzbGEoJHtodWV9LCA3MCUsIDcwJSwgJHthbHBoYX0pYCk7CiAgICAgICAgICAgIGcuYWRkQ29sb3JTdG9wKDAuNSwgYGhzbGEoJHtodWV9LCA2MCUsIDUwJSwgJHthbHBoYSAqIDAuNX0pYCk7CiAgICAgICAgICAgIGcuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwwLDApJyk7CiAgICAgICAgICAgIHguZmlsbFN0eWxlID0gZzsgeC5maWxsUmVjdCgwLCAwLCAyNTYsIDI1Nik7CiAgICAgICAgfQogICAgICAgIHJldHVybiBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjKTsKICAgIH0KICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVidWxhQ291bnQ7IGkrKykgewogICAgICAgIGNvbnN0IHRleCA9IGNyZWF0ZU5lYnVsYVRleHR1cmUobmVidWxhSHVlc1tpXSk7CiAgICAgICAgY29uc3Qgc3ByID0gbmV3IFRIUkVFLlNwcml0ZShuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwoewogICAgICAgICAgICBtYXA6IHRleCwgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsCiAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC4yMiwKICAgICAgICB9KSk7CiAgICAgICAgY29uc3QgYW5nbGUgPSAoaSAvIG5lYnVsYUNvdW50KSAqIE1hdGguUEkgKiAyICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC42OwogICAgICAgIGNvbnN0IGRpc3QgPSA4MCArIE1hdGgucmFuZG9tKCkgKiAyMjA7CiAgICAgICAgc3ByLnBvc2l0aW9uLnNldChNYXRoLmNvcyhhbmdsZSkgKiBkaXN0LCAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA3MCwgTWF0aC5zaW4oYW5nbGUpICogZGlzdCk7CiAgICAgICAgc3ByLnNjYWxlLnNldCgxNjAgKyBNYXRoLnJhbmRvbSgpICogMjIwLCA4MCArIE1hdGgucmFuZG9tKCkgKiAxMjAsIDEpOwogICAgICAgIHNwci5yZW5kZXJPcmRlciA9IC04OwogICAgICAgIHNwci51c2VyRGF0YSA9IHsKICAgICAgICAgICAgYmFzZVg6IHNwci5wb3NpdGlvbi54LCBiYXNlWTogc3ByLnBvc2l0aW9uLnksIGJhc2VaOiBzcHIucG9zaXRpb24ueiwKICAgICAgICAgICAgZHJpZnRTcGVlZDogMC4wOCArIE1hdGgucmFuZG9tKCkgKiAwLjIsIGRyaWZ0QW1wOiAxOCArIE1hdGgucmFuZG9tKCkgKiAzNSwKICAgICAgICAgICAgcGhhc2U6IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMiwKICAgICAgICB9OwogICAgICAgIGdhbGF4eUdyb3VwLmFkZChzcHIpOwogICAgICAgIG5lYnVsYVNwcml0ZXMucHVzaChzcHIpOwogICAgfQoKICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAogICAgLy8gIDUuIEFVUk9SQSBDVVJUQUlOUyDigJQgSU5ESVZJRFVBTCBVTklGT1JNUyArIEVOSEFOQ0VEIFNIQURFUlMKICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAogICAgY29uc3QgZmJtT2N0YXZlcyA9IGlzTW9iaWxlID8gNSA6IDY7CgogICAgZnVuY3Rpb24gYnVpbGRBdXJvcmFWZXJ0ZXhTaGFkZXIoKSB7CiAgICAgICAgcmV0dXJuIC8qIGdsc2wgKi9gCiAgICAgICAgICAgIHZhcnlpbmcgdmVjMiB2VXY7CiAgICAgICAgICAgIHZhcnlpbmcgdmVjMyB2UG9zaXRpb247CiAgICAgICAgICAgIHZhcnlpbmcgZmxvYXQgdkVkZ2VGYWRlOwogICAgICAgICAgICB1bmlmb3JtIGZsb2F0IHVUaW1lOwogICAgICAgICAgICB2b2lkIG1haW4oKSB7CiAgICAgICAgICAgICAgICB2VXYgPSB1djsKICAgICAgICAgICAgICAgIHZlYzMgcG9zID0gcG9zaXRpb247CiAgICAgICAgICAgICAgICBwb3MueSArPSBzaW4ocG9zLnggKiAwLjAwNiArIHVUaW1lICogMC43KSAqIDEyLjA7CiAgICAgICAgICAgICAgICBwb3MueSArPSBjb3MocG9zLnggKiAwLjAxMiArIHVUaW1lICogMC41KSAqIDguMDsKICAgICAgICAgICAgICAgIHBvcy55ICs9IHNpbihwb3MueSAqIDAuMDA4ICsgdVRpbWUgKiAwLjM1KSAqIDYuMDsKICAgICAgICAgICAgICAgIHBvcy55ICs9IGNvcyhwb3MueCAqIDAuMDIgKyB1VGltZSAqIDAuOCkgKiA1LjA7CiAgICAgICAgICAgICAgICB2UG9zaXRpb24gPSBwb3M7CiAgICAgICAgICAgICAgICB2RWRnZUZhZGUgPSAoMS4wIC0gYWJzKHV2LnggLSAwLjUpICogMi4zKSAqICgxLjAgLSBhYnModXYueSAtIDAuNSkgKiAyLjMpOwogICAgICAgICAgICAgICAgdkVkZ2VGYWRlID0gY2xhbXAodkVkZ2VGYWRlLCAwLjAsIDEuMCk7CiAgICAgICAgICAgICAgICB2RWRnZUZhZGUgPSBzbW9vdGhzdGVwKDAuMCwgMS4wLCB2RWRnZUZhZGUpOwogICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3MsIDEuMCk7CiAgICAgICAgICAgIH0KICAgICAgICBgOwogICAgfQoKICAgIGZ1bmN0aW9uIGJ1aWxkQXVyb3JhRnJhZ21lbnRTaGFkZXIoKSB7CiAgICAgICAgcmV0dXJuIC8qIGdsc2wgKi9gCiAgICAgICAgICAgIHZhcnlpbmcgdmVjMiB2VXY7CiAgICAgICAgICAgIHZhcnlpbmcgdmVjMyB2UG9zaXRpb247CiAgICAgICAgICAgIHZhcnlpbmcgZmxvYXQgdkVkZ2VGYWRlOwogICAgICAgICAgICB1bmlmb3JtIGZsb2F0IHVUaW1lOwogICAgICAgICAgICB1bmlmb3JtIGZsb2F0IHVPcGFjaXR5OwoKICAgICAgICAgICAgZmxvYXQgaGFzaCh2ZWMyIHApIHsKICAgICAgICAgICAgICAgIHJldHVybiBmcmFjdChzaW4oZG90KHAsIHZlYzIoMTI3LjEsIDMxMS43KSkpICogNDM3NTguNTQ1Myk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZmxvYXQgbm9pc2UodmVjMiBwKSB7CiAgICAgICAgICAgICAgICB2ZWMyIGkgPSBmbG9vcihwKTsKICAgICAgICAgICAgICAgIHZlYzIgZiA9IGZyYWN0KHApOwogICAgICAgICAgICAgICAgZiA9IGYgKiBmICogKDMuMCAtIDIuMCAqIGYpOwogICAgICAgICAgICAgICAgcmV0dXJuIG1peCgKICAgICAgICAgICAgICAgICAgICBtaXgoaGFzaChpKSwgaGFzaChpICsgdmVjMigxLjAsIDAuMCkpLCBmLngpLAogICAgICAgICAgICAgICAgICAgIG1peChoYXNoKGkgKyB2ZWMyKDAuMCwgMS4wKSksIGhhc2goaSArIHZlYzIoMS4wLCAxLjApKSwgZi54KSwKICAgICAgICAgICAgICAgICAgICBmLnkKICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZmxvYXQgZmJtKHZlYzIgcCkgewogICAgICAgICAgICAgICAgZmxvYXQgdiA9IDAuMDsKICAgICAgICAgICAgICAgIGZsb2F0IGEgPSAwLjU7CiAgICAgICAgICAgICAgICB2ZWMyIHNoaWZ0ID0gdmVjMigxMDAuMCk7CiAgICAgICAgICAgICAgICBtYXQyIHJvdCA9IG1hdDIoY29zKDAuNSksIHNpbigwLjUpLCAtc2luKDAuNSksIGNvcygwLjUpKTsKICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgJHtmYm1PY3RhdmVzfTsgaSsrKSB7CiAgICAgICAgICAgICAgICAgICAgdiArPSBhICogbm9pc2UocCk7CiAgICAgICAgICAgICAgICAgICAgcCA9IHJvdCAqIHAgKiAyLjAgKyBzaGlmdDsKICAgICAgICAgICAgICAgICAgICBhICo9IDAuNTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHJldHVybiB2OwogICAgICAgICAgICB9CgogICAgICAgICAgICB2b2lkIG1haW4oKSB7CiAgICAgICAgICAgICAgICAvLyBEb21haW4gd2FycGluZwogICAgICAgICAgICAgICAgZmxvYXQgd2FycCA9IGZibSh2ZWMyKHZVdi54ICogMy41LCB2VXYueSAqIDIuMCArIHVUaW1lICogMC4wOCkpOwogICAgICAgICAgICAgICAgdmVjMiB3YXJwZWRVViA9IHZVdiArIHZlYzIod2FycCAqIDAuMywgd2FycCAqIDAuMik7CgogICAgICAgICAgICAgICAgLy8gTWFpbiBGQk0KICAgICAgICAgICAgICAgIGZsb2F0IG4xID0gZmJtKHZlYzIod2FycGVkVVYueCAqIDMuNSArIHVUaW1lICogMC4xNSwgd2FycGVkVVYueSAqIDIuNSArIHNpbih3YXJwZWRVVi54ICogMi4wICsgdVRpbWUgKiAwLjYpICogMC40KSk7CiAgICAgICAgICAgICAgICBmbG9hdCBuMiA9IGZibSh2ZWMyKHdhcnBlZFVWLnggKiA1LjAgLSB1VGltZSAqIDAuMSwgd2FycGVkVVYueSAqIDEuOCArIGNvcyh3YXJwZWRVVi54ICogMy4wICsgdVRpbWUgKiAwLjQpICogMC4zKSk7CgogICAgICAgICAgICAgICAgZmxvYXQgaCA9IHZVdi55OwogICAgICAgICAgICAgICAgZmxvYXQgYmFuZDEgPSBzbW9vdGhzdGVwKDAuMTUsIDAuNTUsIGgpICogc21vb3Roc3RlcCgwLjg1LCAwLjQ1LCBoKTsKICAgICAgICAgICAgICAgIGZsb2F0IGJhbmQyID0gc21vb3Roc3RlcCgwLjQsIDAuNywgaCkgKiBzbW9vdGhzdGVwKDAuOTUsIDAuNjUsIGgpOwogICAgICAgICAgICAgICAgZmxvYXQgYmFuZDMgPSBzbW9vdGhzdGVwKDAuMCwgMC4yNSwgaCkgKiBzbW9vdGhzdGVwKDAuNDUsIDAuMTUsIGgpOwogICAgICAgICAgICAgICAgZmxvYXQgc3RyZW5ndGggPSAoYmFuZDEgKiAwLjg1ICsgYmFuZDIgKiAwLjUgKyBiYW5kMyAqIDAuMzUpICogKG4xICogMC42ICsgbjIgKiAwLjQpOwoKICAgICAgICAgICAgICAgIC8vIEhlYXQtbWFwOiBkZWVwIHB1cnBsZSAtPiBjeWFuIC0+IHZpb2xldCAtPiB3YXJtIHdoaXRlCiAgICAgICAgICAgICAgICBmbG9hdCBub2lzZVZhbCA9IG4xICogMC43ICsgbjIgKiAwLjM7CiAgICAgICAgICAgICAgICB2ZWMzIGRlZXBQdXJwbGUgPSB2ZWMzKDAuMTUsIDAuMDIsIDAuMzUpOwogICAgICAgICAgICAgICAgdmVjMyBjeWFuQyAgICAgID0gdmVjMygwLjMxNCwgMC44MTYsIDAuNjkwKTsKICAgICAgICAgICAgICAgIHZlYzMgdmlvbGV0QyAgICA9IHZlYzMoMC43MjIsIDAuNTY1LCAwLjg3OCk7CiAgICAgICAgICAgICAgICB2ZWMzIHdhcm1XaGl0ZSAgPSB2ZWMzKDEuMCwgMC45MywgMC44NSk7CiAgICAgICAgICAgICAgICB2ZWMzIGNvbG9yOwogICAgICAgICAgICAgICAgaWYgKG5vaXNlVmFsIDwgMC4zMykgewogICAgICAgICAgICAgICAgICAgIGNvbG9yID0gbWl4KGRlZXBQdXJwbGUsIGN5YW5DLCBub2lzZVZhbCAvIDAuMzMpOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2lzZVZhbCA8IDAuNjYpIHsKICAgICAgICAgICAgICAgICAgICBjb2xvciA9IG1peChjeWFuQywgdmlvbGV0QywgKG5vaXNlVmFsIC0gMC4zMykgLyAwLjMzKTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBtaXgodmlvbGV0Qywgd2FybVdoaXRlLCAobm9pc2VWYWwgLSAwLjY2KSAvIDAuMzQpOwogICAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgICAgIGZsb2F0IGFscGhhID0gc3RyZW5ndGggKiB1T3BhY2l0eSAqICgwLjI1ICsgbjEgKiAwLjc1KSAqIHZFZGdlRmFkZTsKICAgICAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IsIGFscGhhKTsKICAgICAgICAgICAgfQogICAgICAgIGA7CiAgICB9CgogICAgY29uc3QgYXVyb3JhVmVydGV4U2hhZGVyID0gYnVpbGRBdXJvcmFWZXJ0ZXhTaGFkZXIoKTsKICAgIGNvbnN0IGF1cm9yYUZyYWdtZW50U2hhZGVyID0gYnVpbGRBdXJvcmFGcmFnbWVudFNoYWRlcigpOwoKICAgIGZ1bmN0aW9uIGNyZWF0ZUF1cm9yYVJpYmJvbihhcm1JbmRleCwgYXJtQW5nbGUpIHsKICAgICAgICBjb25zdCB3aWR0aCA9IDMwMDsKICAgICAgICBjb25zdCBoZWlnaHQgPSA1MDsKICAgICAgICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSh3aWR0aCwgaGVpZ2h0LCA1MCwgMTApOwogICAgICAgIGNvbnN0IHVuaWZvcm1zID0gewogICAgICAgICAgICB1VGltZTogeyB2YWx1ZTogYXJtSW5kZXggKiAyLjAgfSwKICAgICAgICAgICAgdU9wYWNpdHk6IHsgdmFsdWU6IDAuNCB9LAogICAgICAgIH07CiAgICAgICAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHsKICAgICAgICAgICAgdmVydGV4U2hhZGVyOiBhdXJvcmFWZXJ0ZXhTaGFkZXIsCiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyOiBhdXJvcmFGcmFnbWVudFNoYWRlciwKICAgICAgICAgICAgdW5pZm9ybXM6IHVuaWZvcm1zLAogICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSwKICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsCiAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLAogICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLAogICAgICAgIH0pOwogICAgICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdCk7CiAgICAgICAgbWVzaC5yb3RhdGlvbi54ID0gLTAuMzsKICAgICAgICBtZXNoLnJvdGF0aW9uLnkgPSBhcm1BbmdsZTsKICAgICAgICBtZXNoLnBvc2l0aW9uLnkgPSBNYXRoLmNvcyhhcm1BbmdsZSkgKiAxMDsKICAgICAgICBtZXNoLnJlbmRlck9yZGVyID0gMTsKICAgICAgICBtZXNoLnVzZXJEYXRhID0geyB1bmlmb3JtcywgYXJtOiBhcm1JbmRleCwgYXJtQW5nbGUsIHBhcmFsbGF4RmFjdG9yOiAwLjYgKyBhcm1JbmRleCAqIDAuMiB9OwogICAgICAgIHJldHVybiBtZXNoOwogICAgfQoKICAgIGNvbnN0IEFVUk9SQV9SSUJCT05fQ09VTlQgPSA1OwogICAgY29uc3QgYXVyb3JhUmliYm9ucyA9IFtdOwogICAgZm9yIChsZXQgYXJtID0gMDsgYXJtIDwgQVVST1JBX1JJQkJPTl9DT1VOVDsgYXJtKyspIHsKICAgICAgICBjb25zdCBhcm1BbmdsZSA9IChhcm0gLyBBVVJPUkFfUklCQk9OX0NPVU5UKSAqIE1hdGguUEkgKiAyOwogICAgICAgIGNvbnN0IHJpYmJvbiA9IGNyZWF0ZUF1cm9yYVJpYmJvbihhcm0sIGFybUFuZ2xlKTsKICAgICAgICBzY2VuZS5hZGQocmliYm9uKTsKICAgICAgICBhdXJvcmFSaWJib25zLnB1c2gocmliYm9uKTsKICAgIH0KCiAgICBjb25zdCBhdXJvcmFNaXN0Q291bnQgPSBpc01vYmlsZSA/IDUwMCA6IDE1MDA7CiAgICBjb25zdCBtaXN0R2VvID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7CiAgICBjb25zdCBtaXN0UG9zID0gbmV3IEZsb2F0MzJBcnJheShhdXJvcmFNaXN0Q291bnQgKiAzKTsKICAgIGNvbnN0IG1pc3RDb2wgPSBuZXcgRmxvYXQzMkFycmF5KGF1cm9yYU1pc3RDb3VudCAqIDMpOwogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdXJvcmFNaXN0Q291bnQ7IGkrKykgewogICAgICAgIGNvbnN0IGFybSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEFVUk9SQV9SSUJCT05fQ09VTlQpOwogICAgICAgIGNvbnN0IGFybUFuZ2xlID0gKGFybSAvIEFVUk9SQV9SSUJCT05fQ09VTlQpICogTWF0aC5QSSAqIDI7CiAgICAgICAgY29uc3QgdCA9IDAuMSArIE1hdGgucmFuZG9tKCkgKiAwLjg7CiAgICAgICAgY29uc3QgcmFkaXVzID0gQ09SRV9SQURJVVMgKyB0ICogKEdBTEFYWV9SQURJVVMgLSBDT1JFX1JBRElVUyk7CiAgICAgICAgY29uc3QgYW5nbGUgPSB0ICogTWF0aC5QSSAqIDIuNSArIGFybUFuZ2xlICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC40OwogICAgICAgIG1pc3RQb3NbaSAqIDNdID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNDA7CiAgICAgICAgbWlzdFBvc1tpICogMyArIDFdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNTA7CiAgICAgICAgbWlzdFBvc1tpICogMyArIDJdID0gTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNDA7CiAgICAgICAgbWlzdENvbFtpICogM10gPSAwLjIgKyBNYXRoLnJhbmRvbSgpICogMC4zOwogICAgICAgIG1pc3RDb2xbaSAqIDMgKyAxXSA9IDAuNiArIE1hdGgucmFuZG9tKCkgKiAwLjQ7CiAgICAgICAgbWlzdENvbFtpICogMyArIDJdID0gMC41ICsgTWF0aC5yYW5kb20oKSAqIDAuNTsKICAgIH0KICAgIG1pc3RHZW8uc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobWlzdFBvcywgMykpOwogICAgbWlzdEdlby5zZXRBdHRyaWJ1dGUoJ2NvbG9yJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShtaXN0Q29sLCAzKSk7CiAgICBjb25zdCBtaXN0VGV4ID0gKCgpID0+IHsKICAgICAgICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGMud2lkdGggPSA2NDsgYy5oZWlnaHQgPSA2NDsKICAgICAgICBjb25zdCB4ID0gYy5nZXRDb250ZXh0KCcyZCcpOwogICAgICAgIGNvbnN0IGcgPSB4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KDMyLCAzMiwgMCwgMzIsIDMyLCAzMik7CiAgICAgICAgZy5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LDI1NSwyNTUsMC4zNSknKTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgwLjMsICdyZ2JhKDI1NSwyNTUsMjU1LDAuMSknKTsKICAgICAgICBnLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwwKScpOwogICAgICAgIHguZmlsbFN0eWxlID0gZzsgeC5maWxsUmVjdCgwLCAwLCA2NCwgNjQpOwogICAgICAgIHJldHVybiBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjKTsKICAgIH0pKCk7CiAgICBjb25zdCBtaXN0TWF0ID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHsKICAgICAgICBzaXplOiAxOCwgbWFwOiBtaXN0VGV4LCB2ZXJ0ZXhDb2xvcnM6IHRydWUsCiAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsIGRlcHRoV3JpdGU6IGZhbHNlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC4zLAogICAgfSk7CiAgICBjb25zdCBtaXN0UG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyhtaXN0R2VvLCBtaXN0TWF0KTsKICAgIGdhbGF4eUdyb3VwLmFkZChtaXN0UG9pbnRzKTsKCiAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKICAgIC8vICA2LiBTSE9PVElORyBTVEFSUyDigJQgU1BBUktMRSBUUkFJTCArIEdMT1cgSEFMTwogICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACiAgICBjb25zdCBzaG9vdGluZ1N0YXJzM0QgPSBbXTsKICAgIGNvbnN0IE1BWF9TSE9PVEVSUyA9IDY7CiAgICBjb25zdCBtZXRlb3JIdWVzID0gWzB4ZmZmZmZmLCAweGFhZGRmZiwgMHhmZmNjZmYsIDB4ZmZkZGFhLCAweGNjZGRmZl07CgogICAgZnVuY3Rpb24gY3JlYXRlU2hvb3RpbmdTdGFyM0QoKSB7CiAgICAgICAgY29uc3Qgc3RhcnRBbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjsKICAgICAgICBjb25zdCBzdGFydERpc3QgPSA0MDAgKyBNYXRoLnJhbmRvbSgpICogMzUwOwogICAgICAgIGNvbnN0IHN4ID0gTWF0aC5jb3Moc3RhcnRBbmdsZSkgKiBzdGFydERpc3Q7CiAgICAgICAgY29uc3Qgc3kgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA1MDA7CiAgICAgICAgY29uc3Qgc3ogPSAtMTIwICsgTWF0aC5yYW5kb20oKSAqIDIwMDsKCiAgICAgICAgY29uc3QgdHJhaWxMZW4gPSAzNTsKICAgICAgICBjb25zdCBhbmdsZSA9IC1NYXRoLlBJIC8gNiArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuNTsKICAgICAgICBjb25zdCBzcGVlZCA9IDE0ICsgTWF0aC5yYW5kb20oKSAqIDIyOwogICAgICAgIGNvbnN0IGh1ZSA9IG1ldGVvckh1ZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWV0ZW9ySHVlcy5sZW5ndGgpXTsKICAgICAgICBjb25zdCBodWVSID0gKChodWUgPj4gMTYpICYgMHhmZikgLyAyNTU7CiAgICAgICAgY29uc3QgaHVlRyA9ICgoaHVlID4+IDgpICAmIDB4ZmYpIC8gMjU1OwogICAgICAgIGNvbnN0IGh1ZUIgPSAoIGh1ZSAgICAgICAgJiAweGZmKSAvIDI1NTsKCiAgICAgICAgLy8gVHJhaWwKICAgICAgICBjb25zdCBwb2ludHMgPSBbXTsKICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWlsTGVuOyBpKyspIHsKICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoCiAgICAgICAgICAgICAgICBzeCAtIE1hdGguY29zKGFuZ2xlKSAqIGkgKiA5LAogICAgICAgICAgICAgICAgc3kgLSBNYXRoLnNpbihhbmdsZSkgKiBpICogOSwKICAgICAgICAgICAgICAgIHN6LAogICAgICAgICAgICApKTsKICAgICAgICB9CiAgICAgICAgY29uc3QgdHJhaWxHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKS5zZXRGcm9tUG9pbnRzKHBvaW50cyk7CiAgICAgICAgY29uc3QgdHJhaWxDb2wgPSBuZXcgRmxvYXQzMkFycmF5KHRyYWlsTGVuICogMyk7CiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFpbExlbjsgaSsrKSB7CiAgICAgICAgICAgIGNvbnN0IGEgPSAxIC0gaSAvIHRyYWlsTGVuOwogICAgICAgICAgICB0cmFpbENvbFtpICogM10gICAgID0gaHVlUiAqIGE7CiAgICAgICAgICAgIHRyYWlsQ29sW2kgKiAzICsgMV0gPSBodWVHICogYTsKICAgICAgICAgICAgdHJhaWxDb2xbaSAqIDMgKyAyXSA9IGh1ZUIgKiBhOwogICAgICAgIH0KICAgICAgICB0cmFpbEdlby5zZXRBdHRyaWJ1dGUoJ2NvbG9yJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSh0cmFpbENvbCwgMykpOwogICAgICAgIGNvbnN0IHRyYWlsTWF0ID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHsKICAgICAgICAgICAgc2l6ZTogMS44LCBtYXA6IHRleFNwYXJrbGUsIHZlcnRleENvbG9yczogdHJ1ZSwKICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsIGRlcHRoV3JpdGU6IGZhbHNlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC45LAogICAgICAgIH0pOwogICAgICAgIGNvbnN0IHRyYWlsTGluZSA9IG5ldyBUSFJFRS5Qb2ludHModHJhaWxHZW8sIHRyYWlsTWF0KTsKCiAgICAgICAgLy8gSGVhZAogICAgICAgIGNvbnN0IGhlYWRHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTsKICAgICAgICBoZWFkR2VvLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoW3N4LCBzeSwgc3pdKSwgMykpOwogICAgICAgIGNvbnN0IGhlYWRNYXQgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoewogICAgICAgICAgICBzaXplOiA3LCBjb2xvcjogaHVlLAogICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZywgZGVwdGhXcml0ZTogZmFsc2UsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OiAxLAogICAgICAgIH0pOwogICAgICAgIGNvbnN0IGhlYWQgPSBuZXcgVEhSRUUuUG9pbnRzKGhlYWRHZW8sIGhlYWRNYXQpOwoKICAgICAgICAvLyBTcGFya2xlIHRyYWlsIGFyb3VuZCBoZWFkCiAgICAgICAgY29uc3Qgc3BhcmtsZUNvdW50ID0gaXNNb2JpbGUgPyA4IDogMjA7CiAgICAgICAgY29uc3Qgc3BHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTsKICAgICAgICBjb25zdCBzcFBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoc3BhcmtsZUNvdW50ICogMyk7CiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzcGFya2xlQ291bnQ7IGorKykgewogICAgICAgICAgICBzcFBvc1tqICogM10gICAgID0gc3ggKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA4OwogICAgICAgICAgICBzcFBvc1tqICogMyArIDFdID0gc3kgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA4OwogICAgICAgICAgICBzcFBvc1tqICogMyArIDJdID0gc3o7CiAgICAgICAgfQogICAgICAgIHNwR2VvLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHNwUG9zLCAzKSk7CiAgICAgICAgY29uc3Qgc3BNYXQgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoewogICAgICAgICAgICBzaXplOiAyLjUsIG1hcDogdGV4U3BhcmtsZSwgY29sb3I6IGh1ZSwKICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsIGRlcHRoV3JpdGU6IGZhbHNlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC44LAogICAgICAgIH0pOwogICAgICAgIGNvbnN0IHNwYXJrbGVzID0gbmV3IFRIUkVFLlBvaW50cyhzcEdlbywgc3BNYXQpOwoKICAgICAgICAvLyBIZWFkIGdsb3cgaGFsbyAoNSBkb3RzKQogICAgICAgIGNvbnN0IGhhbG9Db3VudCA9IDU7CiAgICAgICAgY29uc3QgaGFsb0dlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpOwogICAgICAgIGNvbnN0IGhhbG9Qb3MgPSBuZXcgRmxvYXQzMkFycmF5KGhhbG9Db3VudCAqIDMpOwogICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGFsb0NvdW50OyBqKyspIHsKICAgICAgICAgICAgaGFsb1Bvc1tqICogM10gICAgID0gc3g7CiAgICAgICAgICAgIGhhbG9Qb3NbaiAqIDMgKyAxXSA9IHN5OwogICAgICAgICAgICBoYWxvUG9zW2ogKiAzICsgMl0gPSBzejsKICAgICAgICB9CiAgICAgICAgaGFsb0dlby5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShoYWxvUG9zLCAzKSk7CiAgICAgICAgY29uc3QgaGFsb01hdCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7CiAgICAgICAgICAgIHNpemU6IDE4LCBtYXA6IHRleFN0YXJTbWFsbCwgY29sb3I6IGh1ZSwKICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsIGRlcHRoV3JpdGU6IGZhbHNlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC4yNSwKICAgICAgICB9KTsKICAgICAgICBjb25zdCBoZWFkR2xvdyA9IG5ldyBUSFJFRS5Qb2ludHMoaGFsb0dlbywgaGFsb01hdCk7CgogICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7CiAgICAgICAgZ3JvdXAuYWRkKHRyYWlsTGluZSk7CiAgICAgICAgZ3JvdXAuYWRkKGhlYWQpOwogICAgICAgIGdyb3VwLmFkZChzcGFya2xlcyk7CiAgICAgICAgZ3JvdXAuYWRkKGhlYWRHbG93KTsKICAgICAgICBncm91cC5yZW5kZXJPcmRlciA9IDM7CiAgICAgICAgc2NlbmUuYWRkKGdyb3VwKTsKCiAgICAgICAgc2hvb3RpbmdTdGFyczNELnB1c2goewogICAgICAgICAgICBncm91cCwgaGVhZCwgdHJhaWw6IHRyYWlsTGluZSwgc3BhcmtsZXMsIGhlYWRHbG93LAogICAgICAgICAgICBzeCwgc3ksIHN6LCBhbmdsZSwgc3BlZWQsIGh1ZSwgbGlmZTogMS4wLCB0cmFpbExlbiwgcG9pbnRzLAogICAgICAgICAgICBzcGFya2xlQ291bnQsIGhhbG9Db3VudCwKICAgICAgICB9KTsKCiAgICAgICAgaWYgKHNob290aW5nU3RhcnMzRC5sZW5ndGggPiBNQVhfU0hPT1RFUlMpIHsKICAgICAgICAgICAgY29uc3Qgb2xkID0gc2hvb3RpbmdTdGFyczNELnNoaWZ0KCk7CiAgICAgICAgICAgIHNjZW5lLnJlbW92ZShvbGQuZ3JvdXApOwogICAgICAgICAgICBvbGQuZ3JvdXAuY2hpbGRyZW4uZm9yRWFjaChjID0+IHsgYy5nZW9tZXRyeS5kaXNwb3NlKCk7IGMubWF0ZXJpYWwuZGlzcG9zZSgpOyB9KTsKICAgICAgICB9CiAgICB9CgogICAgLy8gU2NoZWR1bGluZzogaW5pdGlhbCBidXJzdCBvZiAyLCB0aGVuIHJhbmRvbSBpbnRlcnZhbHMgd2l0aCBvY2Nhc2lvbmFsIGJ1cnN0cwogICAgZnVuY3Rpb24gc2NoZWR1bGVTaG9vdGluZ1N0YXIoKSB7CiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjcmVhdGVTaG9vdGluZ1N0YXIzRCgpLCAzMDApOwogICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY3JlYXRlU2hvb3RpbmdTdGFyM0QoKSwgNzAwKTsKICAgICAgICBmdW5jdGlvbiBzY2hlZHVsZU5leHQoKSB7CiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gMjAwMCArIE1hdGgucmFuZG9tKCkgKiA1MDAwOwogICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsKICAgICAgICAgICAgICAgIGNyZWF0ZVNob290aW5nU3RhcjNEKCk7CiAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMzUpIHsKICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNyZWF0ZVNob290aW5nU3RhcjNEKCksIDIwMCArIE1hdGgucmFuZG9tKCkgKiA0MDApOwogICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC40KSBzZXRUaW1lb3V0KCgpID0+IGNyZWF0ZVNob290aW5nU3RhcjNEKCksIDUwMCArIE1hdGgucmFuZG9tKCkgKiAzMDApOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgc2NoZWR1bGVOZXh0KCk7CiAgICAgICAgICAgIH0sIGRlbGF5KTsKICAgICAgICB9CiAgICAgICAgc2NoZWR1bGVOZXh0KCk7CiAgICB9CiAgICBzY2hlZHVsZVNob290aW5nU3RhcigpOwoKICAgIGNvbnN0IGNsaWNrV2F2ZXMgPSBbXTsKICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7CiAgICAgICAgY29uc3QgbXggPSAoZS5jbGllbnRYIC8gd2luZG93LmlubmVyV2lkdGgpICogMiAtIDE7CiAgICAgICAgY29uc3QgbXkgPSAtKGUuY2xpZW50WSAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiAyICsgMTsKICAgICAgICBjb25zdCBtdyA9IG5ldyBUSFJFRS5WZWN0b3IzKG14ICogMzAwLCBteSAqIDIwMCwgMCk7CiAgICAgICAgZ2FsYXh5R3JvdXAudXBkYXRlTWF0cml4V29ybGQoKTsKICAgICAgICBjb25zdCBsYyA9IGdhbGF4eUdyb3VwLndvcmxkVG9Mb2NhbChtdyk7CiAgICAgICAgY2xpY2tXYXZlcy5wdXNoKHsgeDogbGMueCwgejogbGMueiwgcmFkaXVzOiA1LCBzdHJlbmd0aDogMS4wIH0pOwogICAgfSk7CgogICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACiAgICAvLyAgNy4gRkxPQVRJTkcgRFVTVCDigJQgVkVSVEVYIENPTE9SUyArIERFUFRIIFBBUkFMTEFYCiAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKICAgIGNvbnN0IERVU1RfQ09VTlQgPSBpc01vYmlsZSA/IDUwIDogMTAwOwogICAgY29uc3QgZHVzdEdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpOwogICAgY29uc3QgZHVzdFBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoRFVTVF9DT1VOVCAqIDMpOwogICAgY29uc3QgZHVzdENvbG9ycyA9IG5ldyBGbG9hdDMyQXJyYXkoRFVTVF9DT1VOVCAqIDMpOwogICAgY29uc3QgZHVzdERhdGEgPSBbXTsKCiAgICBmb3IgKGxldCBpID0gMDsgaSA8IERVU1RfQ09VTlQ7IGkrKykgewogICAgICAgIGNvbnN0IHogPSA1MCArIE1hdGgucmFuZG9tKCkgKiAyMDA7CiAgICAgICAgZHVzdFBvc2l0aW9uc1tpICogM10gICAgID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNTAwOwogICAgICAgIGR1c3RQb3NpdGlvbnNbaSAqIDMgKyAxXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDQwMDsKICAgICAgICBkdXN0UG9zaXRpb25zW2kgKiAzICsgMl0gPSB6OwoKICAgICAgICAvLyBWZXJ0ZXggY29sb3JzOiA0MCAlIHdhcm0gd2hpdGUsIDMwICUgY3lhbiwgMjAgJSB2aW9sZXQsIDEwICUgcGFsZSBnb2xkCiAgICAgICAgY29uc3QgY3IgPSBNYXRoLnJhbmRvbSgpOwogICAgICAgIGlmIChjciA8IDAuNCkgewogICAgICAgICAgICBkdXN0Q29sb3JzW2kgKiAzXSAgICAgPSAwLjggKyBNYXRoLnJhbmRvbSgpICogMC4yOwogICAgICAgICAgICBkdXN0Q29sb3JzW2kgKiAzICsgMV0gPSAwLjc1ICsgTWF0aC5yYW5kb20oKSAqIDAuMjU7CiAgICAgICAgICAgIGR1c3RDb2xvcnNbaSAqIDMgKyAyXSA9IDAuNyArIE1hdGgucmFuZG9tKCkgKiAwLjM7CiAgICAgICAgfSBlbHNlIGlmIChjciA8IDAuNykgewogICAgICAgICAgICBkdXN0Q29sb3JzW2kgKiAzXSAgICAgPSAwLjMgKyBNYXRoLnJhbmRvbSgpICogMC4zOwogICAgICAgICAgICBkdXN0Q29sb3JzW2kgKiAzICsgMV0gPSAwLjYgKyBNYXRoLnJhbmRvbSgpICogMC40OwogICAgICAgICAgICBkdXN0Q29sb3JzW2kgKiAzICsgMl0gPSAwLjcgKyBNYXRoLnJhbmRvbSgpICogMC4zOwogICAgICAgIH0gZWxzZSBpZiAoY3IgPCAwLjkpIHsKICAgICAgICAgICAgZHVzdENvbG9yc1tpICogM10gICAgID0gMC41ICsgTWF0aC5yYW5kb20oKSAqIDAuNDsKICAgICAgICAgICAgZHVzdENvbG9yc1tpICogMyArIDFdID0gMC4zICsgTWF0aC5yYW5kb20oKSAqIDAuMzsKICAgICAgICAgICAgZHVzdENvbG9yc1tpICogMyArIDJdID0gMC42ICsgTWF0aC5yYW5kb20oKSAqIDAuNDsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBkdXN0Q29sb3JzW2kgKiAzXSAgICAgPSAwLjggKyBNYXRoLnJhbmRvbSgpICogMC4yOwogICAgICAgICAgICBkdXN0Q29sb3JzW2kgKiAzICsgMV0gPSAwLjYgKyBNYXRoLnJhbmRvbSgpICogMC4yNTsKICAgICAgICAgICAgZHVzdENvbG9yc1tpICogMyArIDJdID0gMC4zICsgTWF0aC5yYW5kb20oKSAqIDAuMjsKICAgICAgICB9CgogICAgICAgIGR1c3REYXRhLnB1c2goewogICAgICAgICAgICBiYXNlWDogZHVzdFBvc2l0aW9uc1tpICogM10sCiAgICAgICAgICAgIGJhc2VZOiBkdXN0UG9zaXRpb25zW2kgKiAzICsgMV0sCiAgICAgICAgICAgIGJhc2VaOiB6LAogICAgICAgICAgICBzcGVlZFg6IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMjUsCiAgICAgICAgICAgIHNwZWVkWTogKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4yLAogICAgICAgICAgICBwaGFzZTogTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyLAogICAgICAgICAgICBhbXBsaXR1ZGU6IDEwICsgTWF0aC5yYW5kb20oKSAqIDM1LAogICAgICAgIH0pOwogICAgfQoKICAgIGR1c3RHZW8uc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoZHVzdFBvc2l0aW9ucywgMykpOwogICAgZHVzdEdlby5zZXRBdHRyaWJ1dGUoJ2NvbG9yJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShkdXN0Q29sb3JzLCAzKSk7CgogICAgY29uc3QgZHVzdE1hdCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7CiAgICAgICAgc2l6ZTogMy41LCBtYXA6IHRleFN0YXJTbWFsbCwgdmVydGV4Q29sb3JzOiB0cnVlLAogICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLCBkZXB0aFdyaXRlOiBmYWxzZSwgdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDAuNDUsCiAgICB9KTsKICAgIGNvbnN0IGR1c3RQYXJ0aWNsZXMgPSBuZXcgVEhSRUUuUG9pbnRzKGR1c3RHZW8sIGR1c3RNYXQpOwogICAgZHVzdFBhcnRpY2xlcy5yZW5kZXJPcmRlciA9IDI7CiAgICBzY2VuZS5hZGQoZHVzdFBhcnRpY2xlcyk7CgogICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACiAgICAvLyAgOC4gRklSRUZMWSBQQVJUSUNMRVMKICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAogICAgY29uc3QgRklSRUZMWV9DT1VOVCA9IGlzTW9iaWxlID8gMjUgOiA1MDsKICAgIGNvbnN0IGZseUdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpOwogICAgY29uc3QgZmx5UG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShGSVJFRkxZX0NPVU5UICogMyk7CiAgICBjb25zdCBmbHlDb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KEZJUkVGTFlfQ09VTlQgKiAzKTsKICAgIGNvbnN0IGZpcmVmbHlEYXRhID0gW107CgogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBGSVJFRkxZX0NPVU5UOyBpKyspIHsKICAgICAgICBjb25zdCB4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNjAwOwogICAgICAgIGNvbnN0IHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA0MDA7CiAgICAgICAgY29uc3QgeiA9IDMwICsgTWF0aC5yYW5kb20oKSAqIDE4MDsKICAgICAgICBmbHlQb3NpdGlvbnNbaSAqIDNdICAgICA9IHg7CiAgICAgICAgZmx5UG9zaXRpb25zW2kgKiAzICsgMV0gPSB5OwogICAgICAgIGZseVBvc2l0aW9uc1tpICogMyArIDJdID0gejsKCiAgICAgICAgZmx5Q29sb3JzW2kgKiAzXSAgICAgPSAxLjA7CiAgICAgICAgZmx5Q29sb3JzW2kgKiAzICsgMV0gPSAwLjg1ICsgTWF0aC5yYW5kb20oKSAqIDAuMTU7CiAgICAgICAgZmx5Q29sb3JzW2kgKiAzICsgMl0gPSAwLjUgKyBNYXRoLnJhbmRvbSgpICogMC4zOwoKICAgICAgICBmaXJlZmx5RGF0YS5wdXNoKHsKICAgICAgICAgICAgYmFzZVg6IHgsIGJhc2VZOiB5LCBiYXNlWjogeiwKICAgICAgICAgICAgc3BlZWRZOiAwLjMgKyBNYXRoLnJhbmRvbSgpICogMC42LAogICAgICAgICAgICB3b2JibGVBbXA6IDE1ICsgTWF0aC5yYW5kb20oKSAqIDMwLAogICAgICAgICAgICB3b2JibGVGcmVxOiAwLjMgKyBNYXRoLnJhbmRvbSgpICogMC41LAogICAgICAgICAgICBwdWxzZUZyZXE6IDAuOCArIE1hdGgucmFuZG9tKCkgKiAxLjIsCiAgICAgICAgICAgIHBoYXNlOiBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIsCiAgICAgICAgfSk7CiAgICB9CgogICAgZmx5R2VvLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGZseVBvc2l0aW9ucywgMykpOwogICAgZmx5R2VvLnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGZseUNvbG9ycywgMykpOwoKICAgIGNvbnN0IGZpcmVmbHlNYXQgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoewogICAgICAgIHNpemU6IDQsIG1hcDogdGV4RmlyZWZseSwgdmVydGV4Q29sb3JzOiB0cnVlLAogICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLCBkZXB0aFdyaXRlOiBmYWxzZSwgdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDAuNywKICAgIH0pOwogICAgY29uc3QgZmlyZWZseVBhcnRpY2xlcyA9IG5ldyBUSFJFRS5Qb2ludHMoZmx5R2VvLCBmaXJlZmx5TWF0KTsKICAgIGZpcmVmbHlQYXJ0aWNsZXMucmVuZGVyT3JkZXIgPSAyOwogICAgc2NlbmUuYWRkKGZpcmVmbHlQYXJ0aWNsZXMpOwoKICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAogICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACiAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKICAgIC8vICAxMC4gRElBUlkgQ0FSRCBTQ1JPTEwgUEFSQUxMQVgKICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAogICAgY29uc3QgZGlhcnlJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW1lbGluZS1pdGVtJyk7CiAgICBsZXQgcGFyYWxsYXhUaWNraW5nID0gZmFsc2U7CgogICAgZnVuY3Rpb24gdXBkYXRlQ2FyZFBhcmFsbGF4KCkgewogICAgICAgIGNvbnN0IHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTsKICAgICAgICBkaWFyeUl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkgewogICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMDQgKyAoaSAlIDMpICogMC4wMTU7CiAgICAgICAgICAgIGl0ZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoJyArICgtc2Nyb2xsWSAqIHNwZWVkICogMC4zNSkgKyAncHgpJzsKICAgICAgICB9KTsKICAgICAgICBwYXJhbGxheFRpY2tpbmcgPSBmYWxzZTsKICAgIH0KCiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7CiAgICAgICAgaWYgKCFwYXJhbGxheFRpY2tpbmcpIHsKICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUNhcmRQYXJhbGxheCk7CiAgICAgICAgICAgIHBhcmFsbGF4VGlja2luZyA9IHRydWU7CiAgICAgICAgfQogICAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pOwoKICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAogICAgLy8gIDExLiBBTklNQVRJT04gTE9PUAogICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACgogICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHsKICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7CiAgICAgICAgaWYgKCFpc1Zpc2libGUpIHJldHVybjsKCiAgICAgICAgY29uc3QgdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICogMC4wMDE7CgogICAgICAgIC8vIDEuIE1vdXNlIGxlcnAKICAgICAgICBtb3VzZS54ICs9IChtb3VzZS50eCAtIG1vdXNlLngpICogbGVycFNwZWVkOwogICAgICAgIG1vdXNlLnkgKz0gKG1vdXNlLnR5IC0gbW91c2UueSkgKiBsZXJwU3BlZWQ7CgogICAgICAgIC8vIDIuIEdhbGF4eSByb3RhdGlvbiDigJQgbW91c2UgaG9yaXpvbnRhbCBvbmx5CiAgICAgICAgZ2FsYXh5R3JvdXAucm90YXRpb24ueiArPSBtb3VzZS54ICogMC4wMDI7CgogICAgICAgIC8vIDMuIEdhbGF4eSBwYXJ0aWNsZSBtaWNyby1kcmlmdCArIHNtb290aCByZWNvdmVyeQogICAgICAgIGNvbnN0IGdQb3MgPSBnYWxheHlQb2ludHMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTsKICAgICAgICBjb25zdCBnQ29sID0gZ2FsYXh5UG9pbnRzLmdlb21ldHJ5LmF0dHJpYnV0ZXMuY29sb3IuYXJyYXk7CiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHQUxBWFlfUEFSVElDTEVfQ09VTlQ7IGkrKykgewogICAgICAgICAgICBjb25zdCBkID0gZ2FsYXh5RGF0YVtpXTsKICAgICAgICAgICAgY29uc3QgdHggPSBkLmJhc2VYICsgTWF0aC5zaW4odGltZSAqIGQuZHJpZnRGcmVxICsgZC5kcmlmdFBoYXNlKSAqIGQuZHJpZnRBbXA7CiAgICAgICAgICAgIGNvbnN0IHR5ID0gZC5iYXNlWSArIE1hdGguY29zKHRpbWUgKiBkLmRyaWZ0RnJlcSArIGQuZHJpZnRQaGFzZSkgKiBkLmRyaWZ0QW1wICogMC42OwogICAgICAgICAgICBjb25zdCB0eiA9IGQuYmFzZVo7CiAgICAgICAgICAgIGNvbnN0IHJzID0gMC4wNjsKICAgICAgICAgICAgZ1Bvc1tpICogM10gKz0gKHR4IC0gZ1Bvc1tpICogM10pICogcnM7CiAgICAgICAgICAgIGdQb3NbaSAqIDMgKyAxXSArPSAodHkgLSBnUG9zW2kgKiAzICsgMV0pICogcnM7CiAgICAgICAgICAgIGdQb3NbaSAqIDMgKyAyXSArPSAodHogLSBnUG9zW2kgKiAzICsgMl0pICogcnM7CiAgICAgICAgICAgIGdDb2xbaSAqIDNdICs9IChkLmJhc2VSIC0gZ0NvbFtpICogM10pICogMC4xOwogICAgICAgICAgICBnQ29sW2kgKiAzICsgMV0gKz0gKGQuYmFzZUcgLSBnQ29sW2kgKiAzICsgMV0pICogMC4xOwogICAgICAgICAgICBnQ29sW2kgKiAzICsgMl0gKz0gKGQuYmFzZUIgLSBnQ29sW2kgKiAzICsgMl0pICogMC4xOwogICAgICAgIH0KICAgICAgICBnYWxheHlQb2ludHMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7CgogICAgICAgIC8vIDQuIENvcmUgcHVsc2FyIGFuaW1hdGlvbgogICAgICAgIGNvbnN0IHB1bHNlID0gMSArIE1hdGguc2luKHRpbWUgKiAwLjgpICogMC4xNSArIE1hdGguc2luKHRpbWUgKiAxLjMpICogMC4xOwogICAgICAgIGNvcmVTcHJpdGUuc2NhbGUuc2V0KDkwICogcHVsc2UsIDkwICogcHVsc2UsIDEpOwogICAgICAgIGNvcmVTcHJpdGUubWF0ZXJpYWwub3BhY2l0eSA9IDAuOCArIE1hdGguc2luKHRpbWUgKiAwLjYpICogMC4yOwogICAgICAgIGNvcmVTcHJpdGUyLnNjYWxlLnNldCgyMTAgKiBwdWxzZSwgMjEwICogcHVsc2UsIDEpOwoKICAgICAgICAvLyA0Yi4gTmVidWxhIGRyaWZ0CiAgICAgICAgZm9yIChjb25zdCBuZWIgb2YgbmVidWxhU3ByaXRlcykgewogICAgICAgICAgICBjb25zdCBuZCA9IG5lYi51c2VyRGF0YTsKICAgICAgICAgICAgbmViLnBvc2l0aW9uLnggPSBuZC5iYXNlWCArIE1hdGguc2luKHRpbWUgKiBuZC5kcmlmdFNwZWVkICsgbmQucGhhc2UpICogbmQuZHJpZnRBbXA7CiAgICAgICAgICAgIG5lYi5wb3NpdGlvbi55ID0gbmQuYmFzZVkgKyBNYXRoLmNvcyh0aW1lICogbmQuZHJpZnRTcGVlZCAqIDAuNyArIG5kLnBoYXNlKSAqIG5kLmRyaWZ0QW1wICogMC42OwogICAgICAgICAgICBuZWIubWF0ZXJpYWwub3BhY2l0eSA9IDAuMTggKyBNYXRoLnNpbih0aW1lICogMC4zICsgbmQucGhhc2UpICogMC4wNjsKICAgICAgICB9CgogICAgICAgIC8vIDUuIENhbWVyYSBwYXJhbGxheAogICAgICAgIGNhbWVyYS5wb3NpdGlvbi54ICs9IChtb3VzZS54ICogMTIgLSBjYW1lcmEucG9zaXRpb24ueCkgKiAwLjAxMjsKICAgICAgICBjYW1lcmEucG9zaXRpb24ueSArPSAobW91c2UueSAqIDggLSBjYW1lcmEucG9zaXRpb24ueSkgKiAwLjAxMjsKICAgICAgICBjYW1lcmEubG9va0F0KHNjZW5lLnBvc2l0aW9uKTsKCiAgICAgICAgLy8gNS4gQXVyb3JhIHRpbWUgKyBwZXItY3VydGFpbiBwYXJhbGxheAogICAgICAgIGZvciAoY29uc3QgcmliYm9uIG9mIGF1cm9yYVJpYmJvbnMpIHsKICAgICAgICAgICAgY29uc3QgdWQgPSByaWJib24udXNlckRhdGE7CiAgICAgICAgICAgIHVkLnVuaWZvcm1zLnVUaW1lLnZhbHVlICs9IDAuMDA4OwogICAgICAgICAgICBjb25zdCBmID0gdWQucGFyYWxsYXhGYWN0b3I7CiAgICAgICAgICAgIHJpYmJvbi5wb3NpdGlvbi54ICs9IChtb3VzZS54ICogMjIgKiBmIC0gcmliYm9uLnBvc2l0aW9uLngpICogMC4wMTU7CiAgICAgICAgICAgIHJpYmJvbi5wb3NpdGlvbi55ICs9IChtb3VzZS55ICogMTAgKiBmIC0gcmliYm9uLnBvc2l0aW9uLnkpICogMC4wMTU7CiAgICAgICAgfQoKICAgICAgICAvLyA2LiBTaG9vdGluZyBzdGFycyArIHNwYXJrbGVzIHVwZGF0ZQogICAgICAgIGZvciAobGV0IGkgPSBzaG9vdGluZ1N0YXJzM0QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHsKICAgICAgICAgICAgY29uc3Qgc3MgPSBzaG9vdGluZ1N0YXJzM0RbaV07CiAgICAgICAgICAgIHNzLmxpZmUgLT0gMC4wMDU7CiAgICAgICAgICAgIHNzLnN4ICs9IE1hdGguY29zKHNzLmFuZ2xlKSAqIHNzLnNwZWVkOwogICAgICAgICAgICBzcy5zeSArPSBNYXRoLnNpbihzcy5hbmdsZSkgKiBzcy5zcGVlZDsKCiAgICAgICAgICAgIGZvciAobGV0IGogPSBzcy50cmFpbExlbiAtIDE7IGogPiAwOyBqLS0pIHsKICAgICAgICAgICAgICAgIHNzLnBvaW50c1tqXS5jb3B5KHNzLnBvaW50c1tqIC0gMV0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNzLnBvaW50c1swXS5zZXQoc3Muc3gsIHNzLnN5LCBzcy5zeik7CiAgICAgICAgICAgIHNzLnRyYWlsLmdlb21ldHJ5LnNldEZyb21Qb2ludHMoc3MucG9pbnRzKTsKICAgICAgICAgICAgc3MudHJhaWwubWF0ZXJpYWwub3BhY2l0eSA9IHNzLmxpZmUgKiAwLjk7CgogICAgICAgICAgICBjb25zdCBocGEgPSBzcy5oZWFkLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7CiAgICAgICAgICAgIGhwYVswXSA9IHNzLnN4OyBocGFbMV0gPSBzcy5zeTsgaHBhWzJdID0gc3Muc3o7CiAgICAgICAgICAgIHNzLmhlYWQuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7CiAgICAgICAgICAgIHNzLmhlYWQubWF0ZXJpYWwub3BhY2l0eSA9IHNzLmxpZmU7CgogICAgICAgICAgICBjb25zdCBzcGEgPSBzcy5zcGFya2xlcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5OwogICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNzLnNwYXJrbGVDb3VudDsgaisrKSB7CiAgICAgICAgICAgICAgICBzcGFbaiAqIDNdICAgICA9IHNzLnN4ICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTA7CiAgICAgICAgICAgICAgICBzcGFbaiAqIDMgKyAxXSA9IHNzLnN5ICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTA7CiAgICAgICAgICAgICAgICBzcGFbaiAqIDMgKyAyXSA9IHNzLnN6OwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNzLnNwYXJrbGVzLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlOwogICAgICAgICAgICBzcy5zcGFya2xlcy5tYXRlcmlhbC5vcGFjaXR5ID0gc3MubGlmZSAqIDAuODsKCiAgICAgICAgICAgIGNvbnN0IGdwYSA9IHNzLmhlYWRHbG93Lmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7CiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3MuaGFsb0NvdW50OyBqKyspIHsKICAgICAgICAgICAgICAgIGdwYVtqICogM10gICAgID0gc3Muc3g7CiAgICAgICAgICAgICAgICBncGFbaiAqIDMgKyAxXSA9IHNzLnN5OwogICAgICAgICAgICAgICAgZ3BhW2ogKiAzICsgMl0gPSBzcy5zejsKICAgICAgICAgICAgfQogICAgICAgICAgICBzcy5oZWFkR2xvdy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTsKICAgICAgICAgICAgc3MuaGVhZEdsb3cubWF0ZXJpYWwub3BhY2l0eSA9IHNzLmxpZmUgKiAwLjI1OwoKICAgICAgICAgICAgaWYgKHNzLmxpZmUgPD0gMCkgewogICAgICAgICAgICAgICAgc2NlbmUucmVtb3ZlKHNzLmdyb3VwKTsKICAgICAgICAgICAgICAgIHNzLmdyb3VwLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7IGMuZ2VvbWV0cnkuZGlzcG9zZSgpOyBjLm1hdGVyaWFsLmRpc3Bvc2UoKTsgfSk7CiAgICAgICAgICAgICAgICBzaG9vdGluZ1N0YXJzM0Quc3BsaWNlKGksIDEpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICAvLyA3LiBEdXN0IHVwZGF0ZSAod2l0aCBaLWRlcHRoIHBhcmFsbGF4KQogICAgICAgIGNvbnN0IGR1c3RQb3MgPSBkdXN0UGFydGljbGVzLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7CiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBEVVNUX0NPVU5UOyBpKyspIHsKICAgICAgICAgICAgY29uc3QgZCA9IGR1c3REYXRhW2ldOwogICAgICAgICAgICBkdXN0UG9zW2kgKiAzXSAgICAgPSBkLmJhc2VYICsgTWF0aC5zaW4odGltZSAqIGQuc3BlZWRYICsgZC5waGFzZSkgKiBkLmFtcGxpdHVkZTsKICAgICAgICAgICAgZHVzdFBvc1tpICogMyArIDFdID0gZC5iYXNlWSArIE1hdGguY29zKHRpbWUgKiBkLnNwZWVkWSArIGQucGhhc2UpICogZC5hbXBsaXR1ZGUgKiAwLjc7CiAgICAgICAgICAgIGNvbnN0IGRlcHRoRmFjdG9yID0gMS4wIC0gKGQuYmFzZVogLSA1MCkgLyAyMDA7CiAgICAgICAgICAgIGR1c3RQb3NbaSAqIDNdICAgICArPSBtb3VzZS54ICogNDAgKiAoMC41ICsgZGVwdGhGYWN0b3IgKiAwLjUpOwogICAgICAgICAgICBkdXN0UG9zW2kgKiAzICsgMV0gKz0gbW91c2UueSAqIDMwICogKDAuNSArIGRlcHRoRmFjdG9yICogMC41KTsKICAgICAgICB9CiAgICAgICAgZHVzdFBhcnRpY2xlcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTsKCiAgICAgICAgLy8gOC4gRmlyZWZseSB1cGRhdGUgKGRyaWZ0ICsgd3JhcCArIHB1bHNlKQogICAgICAgIGNvbnN0IGZseVBvcyA9IGZpcmVmbHlQYXJ0aWNsZXMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTsKICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEZJUkVGTFlfQ09VTlQ7IGkrKykgewogICAgICAgICAgICBjb25zdCBmID0gZmlyZWZseURhdGFbaV07CiAgICAgICAgICAgIGxldCB0cnVlWSA9IGYuYmFzZVkgKyBmLnNwZWVkWSAqIDAuMDI1OwogICAgICAgICAgICBpZiAodHJ1ZVkgPiAyMDApIHRydWVZID0gLTIwMDsKICAgICAgICAgICAgZi5iYXNlWSA9IHRydWVZOwogICAgICAgICAgICBjb25zdCB3b2JYID0gZi5iYXNlWCArIE1hdGguc2luKHRpbWUgKiBmLndvYmJsZUZyZXEgKyBmLnBoYXNlKSAqIGYud29iYmxlQW1wOwogICAgICAgICAgICBmbHlQb3NbaSAqIDNdICAgICA9IHdvYlggKyBtb3VzZS54ICogODA7CiAgICAgICAgICAgIGZseVBvc1tpICogMyArIDFdID0gdHJ1ZVkgKyBtb3VzZS55ICogNjA7CiAgICAgICAgICAgIGZseVBvc1tpICogMyArIDJdID0gZi5iYXNlWjsKICAgICAgICB9CiAgICAgICAgZmlyZWZseVBhcnRpY2xlcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTsKICAgICAgICBmaXJlZmx5UGFydGljbGVzLm1hdGVyaWFsLm9wYWNpdHkgPSAwLjcgKyBNYXRoLnNpbih0aW1lICogMS41KSAqIDAuMTsKCiAgICAgICAgLy8gOS4gTW91c2UgcmVwdWxzaW9uIGZpZWxkICsgaG92ZXIgZ2xvdyBvbiBnYWxheHkKICAgICAgICBnYWxheHlHcm91cC51cGRhdGVNYXRyaXhXb3JsZCgpOwogICAgICAgIGNvbnN0IG1vdXNlV29ybGQgPSBuZXcgVEhSRUUuVmVjdG9yMyhtb3VzZS54ICogMzUwLCBtb3VzZS55ICogMjUwLCAwKTsKICAgICAgICBjb25zdCBsb2NhbE1vdXNlID0gZ2FsYXh5R3JvdXAud29ybGRUb0xvY2FsKG1vdXNlV29ybGQpOwogICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FMQVhZX1BBUlRJQ0xFX0NPVU5UOyBpKyspIHsKICAgICAgICAgICAgY29uc3QgZCA9IGdhbGF4eURhdGFbaV07CiAgICAgICAgICAgIGNvbnN0IHB4ID0gZ1Bvc1tpICogM10sIHB6ID0gZ1Bvc1tpICogMyArIDJdOwogICAgICAgICAgICBjb25zdCBkeCA9IHB4IC0gbG9jYWxNb3VzZS54LCBkeiA9IHB6IC0gbG9jYWxNb3VzZS56OwogICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeiAqIGR6KTsKICAgICAgICAgICAgY29uc3QgaW5mbHVlbmNlUmFkaXVzID0gMTIwOwogICAgICAgICAgICBpZiAoZGlzdCA8IGluZmx1ZW5jZVJhZGl1cykgewogICAgICAgICAgICAgICAgY29uc3QgZm9yY2UgPSAoMSAtIGRpc3QgLyBpbmZsdWVuY2VSYWRpdXMpICogMTA7CiAgICAgICAgICAgICAgICBjb25zdCBueCA9IGR4IC8gKGRpc3QgKyAwLjAxKSwgbnogPSBkeiAvIChkaXN0ICsgMC4wMSk7CiAgICAgICAgICAgICAgICBnUG9zW2kgKiAzXSAtPSBueCAqIGZvcmNlOwogICAgICAgICAgICAgICAgZ1Bvc1tpICogMyArIDJdIC09IG56ICogZm9yY2U7CiAgICAgICAgICAgICAgICBjb25zdCBnbG93ID0gKDEgLSBkaXN0IC8gaW5mbHVlbmNlUmFkaXVzKTsKICAgICAgICAgICAgICAgIGdDb2xbaSAqIDNdID0gTWF0aC5taW4oMSwgZC5iYXNlUiArIGdsb3cgKiAwLjUpOwogICAgICAgICAgICAgICAgZ0NvbFtpICogMyArIDFdID0gTWF0aC5taW4oMSwgZC5iYXNlRyArIGdsb3cgKiAwLjUpOwogICAgICAgICAgICAgICAgZ0NvbFtpICogMyArIDJdID0gTWF0aC5taW4oMSwgZC5iYXNlQiArIGdsb3cgKiAwLjQpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGdhbGF4eVBvaW50cy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTsKICAgICAgICBnYWxheHlQb2ludHMuZ2VvbWV0cnkuYXR0cmlidXRlcy5jb2xvci5uZWVkc1VwZGF0ZSA9IHRydWU7CgogICAgICAgIC8vIDEwLiBTY3JvbGwgcGFyYWxsYXgKICAgICAgICBzY3JvbGxZICs9ICh0YXJnZXRTY3JvbGxZIC0gc2Nyb2xsWSkgKiAwLjA1OwogICAgICAgIGdhbGF4eUdyb3VwLnBvc2l0aW9uLnogPSAtc2Nyb2xsWSAqIDI1MDsKICAgICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDUwMCAtIHNjcm9sbFkgKiAyMDA7CiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAtc2Nyb2xsWSAqIDYwOwoKICAgICAgICAvLyAxMS4gQ2xpY2sgd2F2ZSB1cGRhdGUKICAgICAgICBmb3IgKGxldCB3ID0gY2xpY2tXYXZlcy5sZW5ndGggLSAxOyB3ID49IDA7IHctLSkgewogICAgICAgICAgICBjbGlja1dhdmVzW3ddLnJhZGl1cyArPSAzOwogICAgICAgICAgICBjbGlja1dhdmVzW3ddLnN0cmVuZ3RoIC09IDAuMDI1OwogICAgICAgICAgICBpZiAoY2xpY2tXYXZlc1t3XS5zdHJlbmd0aCA8PSAwKSB7CiAgICAgICAgICAgICAgICBjbGlja1dhdmVzLnNwbGljZSh3LCAxKTsKICAgICAgICAgICAgICAgIGNvbnRpbnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FMQVhZX1BBUlRJQ0xFX0NPVU5UOyBpKyspIHsKICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0gZ1Bvc1tpICogM10gLSBjbGlja1dhdmVzW3ddLng7CiAgICAgICAgICAgICAgICBjb25zdCBkeiA9IGdQb3NbaSAqIDMgKyAyXSAtIGNsaWNrV2F2ZXNbd10uejsKICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR6ICogZHopOwogICAgICAgICAgICAgICAgY29uc3QgcmluZ0Rpc3QgPSBNYXRoLmFicyhkaXN0IC0gY2xpY2tXYXZlc1t3XS5yYWRpdXMpOwogICAgICAgICAgICAgICAgaWYgKHJpbmdEaXN0IDwgMjApIHsKICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JjZSA9ICgxIC0gcmluZ0Rpc3QgLyAyMCkgKiBjbGlja1dhdmVzW3ddLnN0cmVuZ3RoICogODsKICAgICAgICAgICAgICAgICAgICBnUG9zW2kgKiAzXSArPSAoZHggLyAoZGlzdCArIDAuMDEpKSAqIGZvcmNlOwogICAgICAgICAgICAgICAgICAgIGdQb3NbaSAqIDMgKyAyXSArPSAoZHogLyAoZGlzdCArIDAuMDEpKSAqIGZvcmNlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGdhbGF4eVBvaW50cy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTsKICAgICAgICB9CgogICAgICAgIGNvbXBvc2VyLnJlbmRlcigpOwogICAgfQogICAgYW5pbWF0ZSgpOw==");
    document.body.appendChild(modScript);
})();
