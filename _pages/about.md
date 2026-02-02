---
permalink: /
title: "Junyao Yang(杨竣尧)"
layout: single
author_profile: false
redirect_from: 
  - /about/
  - /about.html
---

<style>
    /* =========================================
       1. 全局字体与基础样式
       ========================================= */
    
    :root {
        --primary-btn: #4361ee;
        --bg-body: #f8f9fa;
        --card-bg: #ffffff;
        --text-main: #1f2937;
        --text-sub: #6b7280;
        --radius: 16px;
        --shadow: 0 4px 20px rgba(0,0,0,0.04);
        
        /* 字体变量定义 */
        --font-serif: "Charter", "Bitstream Charter", "Sitka Text", "Cambria", "Georgia", serif;
        --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        --font-zh-serif: "SimSun", "STSong", "Songti SC", serif;
    }

    html, body {
        margin: 0 !important;
        padding: 0 !important;
        background-color: var(--bg-body);
        /* 默认正文使用 Serif 字体 */
        font-family: var(--font-serif);
        color: var(--text-main);
        -webkit-font-smoothing: antialiased;
    }

    /* 标题与导航默认使用 Sans-serif */
    h1, h2, h3, .custom-nav, .custom-sidebar, .box-title, .news-tag, .paper-venue, .edu-deg, .exp-item {
        font-family: var(--font-sans);
    }

    /* 暴力清除主题默认空白 */
    .masthead, .page__header, .page__title, .archive, .page__footer {
        display: none !important;
    }

    #main, .initial-content, .page__inner-wrap, .page__content {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }

    /* =========================================
       2. 自定义导航栏
       ========================================= */
    .custom-nav {
        position: sticky;
        top: 0;
        z-index: 9999;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 15px 0;
        margin-bottom: 40px;
        background: transparent;
    }
    
    .nav-container {
        display: flex;
        gap: 10px;
        align-items: center;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        padding: 8px 20px;
        border-radius: 50px;
        width: fit-content;
        max-width: 95vw;
    }

    .nav-link {
        color: #4b5563;
        text-decoration: none !important;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
        padding: 6px 12px;
        border-radius: 8px;
        white-space: nowrap; 
    }

    section { scroll-margin-top: 80px; }

    /* =========================================
       3. 核心布局系统
       ========================================= */
    .profile-wrapper {
        display: flex;
        flex-direction: column; 
        gap: 30px;
        width: 100%;
        padding-bottom: 60px;
    }

    @media (min-width: 1024px) {
        .profile-wrapper {
            flex-direction: row; 
            align-items: flex-start;
            justify-content: center;
            gap: 40px; 
        }
        .custom-sidebar {
            width: 320px;
            flex-shrink: 0; 
            position: sticky;
            top: 90px; 
        }
        .custom-content {
            width: 50vw; 
            flex-shrink: 0; 
        }
    }
    
    @media (max-width: 1023px) {
        .profile-wrapper { padding: 0 15px; box-sizing: border-box; }
        .custom-sidebar, .custom-content { width: 100%; }
    }

    /* =========================================
       4. 组件样式细节
       ========================================= */
    .custom-sidebar {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 35px 20px;
        box-shadow: var(--shadow);
        text-align: center;
    }

    .avatar-area {
        width: 150px;
        height: 150px;
        margin: 0 auto 15px auto;
    }

    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid #fff;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    /* 姓名处使用默认宋体 */
    .name-title {
        font-size: 26px;
        font-weight: 800;
        color: var(--text-main);
        margin: 10px 0 5px 0;
        line-height: 1.2;
    }
    .name-zh {
        font-family: var(--font-zh-serif);
        font-size: 0.7em;
        color: #666;
        font-weight: 500;
        display: block;
        margin-top: 4px;
    }
    
    .role-text { color: var(--primary-btn); font-weight: 700; font-size: 15px; margin-bottom: 5px; }
    .affil-text { color: var(--text-sub); font-size: 14px; line-height: 1.5; margin-bottom: 20px; }

    .social-icons { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
    .s-icon {
        width: 38px; height: 38px; background: #f3f4f6; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        color: #4b5563; transition: all 0.2s; text-decoration: none !important;
    }
    .s-icon:hover { background: var(--primary-btn); color: white; transform: translateY(-2px); }
    .s-icon svg { width: 18px; height: 18px; fill: currentColor; }

    /* 内容卡片 */
    .content-box {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 35px;
        box-shadow: var(--shadow);
    }
    
    .box-header {
        display: flex; align-items: center; gap: 12px;
        margin-bottom: 25px; padding-bottom: 15px;
        border-bottom: 1px solid #f0f0f0;
    }
    .box-title { font-size: 22px; font-weight: 700; color: var(--text-main); margin: 0; }

    /* 列表与文字细节 */
    .news-list { list-style: none; padding: 0; margin: 0; }
    .news-list li { padding: 12px 0; border-bottom: 1px dashed #e5e7eb; font-size: 15px; line-height: 1.6; }
    .news-tag { display: inline-block; background: #eff6ff; color: var(--primary-btn); padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600; margin-right: 10px; }

    .paper-entry { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #f3f4f6; }
    @media (min-width: 768px) { .paper-entry { flex-direction: row; } }
    
    .paper-thumb {
        width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid #eee; flex-shrink: 0; background: #fafafa;
        display: flex; align-items: center; justify-content: center; padding: 10px; box-sizing: border-box;
    }
    @media (min-width: 768px) { .paper-thumb { width: 220px; height: 220px; } }
    .paper-thumb img { max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s; }
    .paper-thumb:hover img { transform: scale(1.03); }

    .paper-info { flex: 1; }
    .paper-venue { font-size: 12px; font-weight: 800; color: var(--primary-btn); text-transform: uppercase; margin-bottom: 6px; display: block; }
    .paper-title { font-size: 18px; font-weight: 700; color: #1f2937; text-decoration: none; display: block; margin-bottom: 8px; font-family: var(--font-sans); }
    .paper-auth { font-size: 15px; color: #4b5563; margin-bottom: 12px; }
    .paper-tldr { background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 14px; color: #64748b; border-left: 3px solid #cbd5e1; }
    .paper-links { margin-top: 12px; font-size: 14px; font-family: var(--font-sans); }
    .paper-links a { margin-right: 15px; color: #6b7280; text-decoration: none; border-bottom: 1px dotted #9ca3af; }
    .paper-links a:hover { color: var(--primary-btn); border-bottom: 1px solid var(--primary-btn); }

    .edu-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .edu-card { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px; }
    .edu-logo { width: 44px; height: 44px; margin-bottom: 12px; object-fit: contain; }
    .edu-deg { font-weight: 700; font-size: 16px; margin-bottom: 4px; }
    .edu-sch { font-size: 14px; color: var(--text-sub); }
    .edu-yr { font-size: 13px; color: #9ca3af; display: block; margin-top: 10px; }

    .exp-item { display: flex; gap: 15px; padding: 12px; border-radius: 12px; transition: background 0.2s; }
    .exp-item:hover { background: #f8f9fa; }
    .exp-logo { width: 48px; height: 48px; object-fit: contain; border-radius: 8px; border: 1px solid #eee; background: #fff; padding: 4px; flex-shrink: 0; }

    .map-widget-container { width: 100%; display: flex; justify-content: center; }
</style>

<nav class="custom-nav">
    <div class="nav-container">
        <a href="#about" class="nav-link"><span>👋</span> About</a>
        <a href="#news" class="nav-link"><span>🔥</span> News</a>
        <a href="#publications" class="nav-link"><span>📝</span> Publications</a>
        <a href="#techreport" class="nav-link"><span>📁</span> Projects</a>
        <a href="#education" class="nav-link"><span>🎓</span> Edu</a>
        <a href="#experience" class="nav-link"><span>💻</span> Exp</a>
        <a href="#honors" class="nav-link"><span>🏆</span> Honors</a>
    </div>
</nav>

<div class="profile-wrapper">

    <aside class="custom-sidebar">
        <div class="avatar-area">
             <img src="../images/IMG_9317.jpeg" alt="Avatar" class="avatar-img"> 
        </div>

        <h1 class="name-title">
            Junyao Yang
            <span class="name-zh">(杨竣尧)</span>
        </h1>
        
        <div class="role-text">AI Graduate Student</div>
        <div class="affil-text">National University of Singapore<br>Shanghai AI Lab</div>

        <div class="social-icons">
            <a href="mailto:junyaoyang@u.nus.edu" class="s-icon" title="Email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
            <a href="https://scholar.google.com/citations?user=oY6uhJQAAAAJ" class="s-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg></a>
            <a href="https://github.com/jyyang26" class="s-icon" title="Github"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            <a href="https://www.linkedin.com/in/junyao-yang-371282301/" class="s-icon" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>
        </div>
    </aside>

    <main class="custom-content">

        <section id="about" class="content-box">
            <div class="box-header">
                <span style="font-size: 24px;">👋</span>
                <h2 class="box-title">About Me</h2>
            </div>
            <div style="font-size: 16px; line-height: 1.8; color: #374151;">
                🤠 Hi there, this is Junyao Yang. I am a graduate student at the School of Computing, National University of Singapore (NUS), where I am pursuing a specialization in Artificial Intelligence. My research interests lie in <strong>Natural Language Processing</strong>, <strong>Explainable Artificial Intelligence</strong> and <strong>Trustworthy Machine Learning</strong>.
                <br><br>
                🧐 My research story revolves around <strong>the Underlying Principles and Understanding of Artificial Intelligence</strong>, particularly focusing on how to enhance the <strong>"Robustness"</strong> and <strong>"Safety"</strong> of LLM-generated information and understand the <strong>Interpretability</strong> of model mechanisms.
            </div>
        </section>

        </main>
</div>
