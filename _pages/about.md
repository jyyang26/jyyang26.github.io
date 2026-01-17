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
       1. 暴力覆盖主题默认样式 & 隐藏自带导航栏
       ========================================= */
    
    /* 隐藏主题自带的顶部导航栏 */
    .masthead {
        display: none !important;
    }

    /* 扩大容器宽度，让右侧内容更宽 */
    .page__inner-wrap {
        max-width: 1600px !important; /* 增加最大宽度 */
        width: 96% !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-top: 0 !important;
        padding-bottom: 40px !important;
    }

    /* 隐藏默认标题 */
    .page__header, .page__title {
        display: none !important;
        margin-bottom: 0 !important;
        height: 0 !important;
    }
    
    .page__content {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }

    /* =========================================
       2. 自定义导航栏 (Navbar)
       ========================================= */
    .custom-nav {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.85); /* 半透明白底 */
        backdrop-filter: blur(10px);           /* 磨砂效果 */
        -webkit-backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0,0,0,0.05);
        padding: 15px 20px;
        margin-bottom: 30px;
        display: flex;
        justify-content: center; /* 居中排列 */
        gap: 30px;
        border-radius: 0 0 16px 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }

    .nav-link {
        color: #555;
        text-decoration: none !important;
        font-weight: 600;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: color 0.2s;
    }
    
    .nav-link:hover {
        color: #4361ee; /* 主题蓝 */
    }

    /* 修正锚点跳转被导航栏遮挡的问题 */
    section {
        scroll-margin-top: 80px; 
    }

    /* =========================================
       3. 核心布局系统 (Flexbox)
       ========================================= */
    
    :root {
        --primary-btn: #4361ee;
        --bg-body: #f8f9fa;
        --card-bg: #ffffff;
        --text-main: #1f2937;
        --text-sub: #6b7280;
        --radius: 20px;
        --shadow: 0 10px 30px -5px rgba(0,0,0,0.06);
    }

    body {
        background-color: var(--bg-body);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* 主容器 */
    .profile-wrapper {
        display: flex;
        flex-direction: column; /* 移动端默认竖向 */
        gap: 30px;
        position: relative;
    }

    /* 桌面端样式 (宽度 > 1024px) */
    @media (min-width: 1024px) {
        .profile-wrapper {
            flex-direction: row; /* 变为横向双栏 */
            align-items: flex-start;
        }

        /* 左侧固定宽度 */
        .custom-sidebar {
            width: 340px;
            flex-shrink: 0;
            position: sticky;
            top: 90px; /* 留出导航栏高度 */
        }

        /* 右侧自动填满剩余空间 */
        .custom-content {
            flex: 1; 
            min-width: 0; /* 防止内容溢出 */
        }
    }

    /* =========================================
       4. 左侧栏样式
       ========================================= */
    .custom-sidebar {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 40px 30px;
        box-shadow: var(--shadow);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .avatar-area {
        width: 160px;
        height: 160px;
        margin-bottom: 20px;
    }

    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid #fff;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    .name-title {
        font-size: 24px;
        font-weight: 800;
        color: var(--text-main);
        margin: 5px 0;
        line-height: 1.2;
    }
    
    .role-text {
        color: var(--primary-btn);
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 8px;
    }
    
    .affil-text {
        color: var(--text-sub);
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 20px;
    }

    /* 图标栏 (含 CV) */
    .social-icons {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }
    
    .s-icon {
        width: 40px;
        height: 40px;
        background: #f3f4f6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4b5563;
        transition: all 0.2s;
        text-decoration: none !important;
        position: relative;
    }
    
    /* 图标提示文字 Tooltip */
    .s-icon:hover::after {
        content: attr(title);
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0.9;
    }

    .s-icon:hover {
        background: var(--primary-btn);
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
    }
    
    .s-icon svg { width: 20px; height: 20px; fill: currentColor; }

    /* =========================================
       5. 右侧内容样式
       ========================================= */
    
    .custom-content {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .content-box {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 35px;
        box-shadow: var(--shadow);
    }
    
    .box-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f0f0;
    }
    .box-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--text-main);
        margin: 0;
    }

    /* News 列表 */
    .news-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 350px;
        overflow-y: auto;
    }
    .news-list li {
        padding: 12px 0;
        border-bottom: 1px dashed #e5e7eb;
        font-size: 15px;
        color: #4b5563;
        line-height: 1.6;
    }
    .news-tag {
        display: inline-block;
        background: #eff6ff;
        color: var(--primary-btn);
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        margin-right: 8px;
    }

    /* --- Publications (图片加大) --- */
    .paper-entry {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid #f3f4f6;
    }
    @media (min-width: 768px) {
        .paper-entry { flex-direction: row; }
    }
    .paper-entry:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    
    /* 图片容器宽度调整为原来的1.3倍 (160px * 1.3 ≈ 210px) */
    .paper-thumb {
        width: 100%; 
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #eee;
        flex-shrink: 0;
    }
    
    @media (min-width: 768px) {
        .paper-thumb {
            width: 220px; /* 增加宽度的核心代码 */
        }
    }

    .paper-thumb img { width: 100%; height: auto; display: block; transition: transform 0.3s;}
    .paper-thumb:hover img { transform: scale(1.03); }
    
    /* 介绍内容占满剩余空间 */
    .paper-info { 
        flex: 1; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .paper-venue {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #6b7280;
        font-weight: 700;
        margin-bottom: 6px;
    }
    .paper-title { font-size: 17px; font-weight: 700; color: var(--primary-btn); text-decoration: none; display: block; margin-bottom: 8px; line-height: 1.4; }
    .paper-auth { font-size: 15px; color: #374151; margin-bottom: 10px; }
    .paper-tldr {
        background: #f8fafc;
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 14px;
        color: #4b5563;
        line-height: 1.5;
        border-left: 4px solid #cbd5e1;
    }
    .paper-links { margin-top: 10px; font-size: 14px; }
    .paper-links a { margin-right: 15px; color: var(--text-sub); text-decoration: none; border-bottom: 1px dotted #ccc; font-weight: 500;}
    .paper-links a:hover { color: var(--primary-btn); border-bottom: 1px solid var(--primary-btn);}

    /* --- Education (横向卡片) --- */
    .edu-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
    }
    .edu-card {
        background: #f9fafb;
        border: 1px solid #f3f4f6;
        border-radius: 16px;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
    .edu-logo { width: 48px; height: 48px; margin-bottom: 15px; object-fit: contain;}
    .edu-deg { font-weight: 700; font-size: 16px; color: var(--text-main); }
    .edu-sch { font-size: 14px; color: var(--text-sub); margin-bottom: auto;}
    .edu-yr { font-size: 13px; color: #9ca3af; margin-top: 10px; font-weight: 500;}

    /* --- Experience --- */
    .exp-item {
        display: flex;
        gap: 15px;
        align-items: flex-start;
        padding: 15px;
        border-radius: 12px;
        transition: background 0.2s;
    }
    .exp-item:hover { background: #f8f9fa; }
    .exp-logo { width: 52px; height: 52px; object-fit: contain; border-radius: 8px; border: 1px solid #eee; background: #fff; padding: 2px; flex-shrink: 0;}

</style>

<nav class="custom-nav">
    <a href="#about" class="nav-link">About Me</a>
    <a href="#news" class="nav-link">News</a>
    <a href="#publications" class="nav-link">Publications</a>
    <a href="#education" class="nav-link">Education</a>
    <a href="#experience" class="nav-link">Experience</a>
    <a href="#honors" class="nav-link">Honors</a>
</nav>

<div class="profile-wrapper">

    <aside class="custom-sidebar">
        <div class="avatar-area">
             <img src="../images/IMG_9317.jpeg" alt="Avatar" class="avatar-img"> 
        </div>

        <h1 class="name-title">Junyao Yang<br><span style="font-size: 0.6em; color: #888; font-weight: 500;">(杨竣尧)</span></h1>
        
        <div class="role-text">AI Graduate Student</div>
        <div class="affil-text">School of Computing<br>National University of Singapore</div>

        <div class="social-icons">
            <a href="mailto:your-email@u.nus.edu" class="s-icon" title="Email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
            
            <a href="https://scholar.google.com" class="s-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg></a>
            
            <a href="https://github.com/jyyang26" class="s-icon" title="Github"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>

            <a href="https://drive.google.com/file/d/17UEE4NB9HbyNba8TwQ5oO3y3Tu7hwhZm/view?usp=sharing" class="s-icon" title="Curriculum Vitae">
                <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            </a>
        </div>
        
        <div style="margin-top: 20px; width: 100%; opacity: 0.8;">
             <script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=fHE-8Jdi8dG4h8kH9bKTC8OPRf52B9shV3EzW7J6MMc&cl=ffffff&w=a"></script>
        </div>
    </aside>

    <main class="custom-content">

        <section id="about" class="content-box">
            <div class="box-header">
                <span style="font-size: 24px;">👋</span>
                <h2 class="box-title">Professional Summary</h2>
            </div>
            <div style="font-size: 16px; line-height: 1.8; color: #374151;">
                Hi there, my name is Junyao Yang. I am a graduate student at the School of Computing, National University of Singapore (NUS), where I am pursuing a specialization in Artificial Intelligence. My research interests lie in <strong>Natural Language Processing</strong>, <strong>Explainable Artificial Intelligence</strong> and <strong>Trustworthy Machine Learning</strong>.
                <br><br>
                My research story revolves around <strong>the Underlying Principles and Understanding of Artificial Intelligence</strong>, focusing on <strong>"Robustness"</strong>, <strong>"Safety"</strong>, and <strong>Interpretability</strong>. This connects to areas such as <strong>Trustworthy LLM</strong>, <strong>Reasoning Model Merging</strong>, and <strong>Malicious Attacks</strong>.
            </div>
        </section>

        <section id="news" class="content-box">
             <div class="box-header">
                <span style="font-size: 24px;">🔥</span>
                <h2 class="box-title">News</h2>
            </div>
            <ul class="news-list">
                <li><span class="news-tag">2026.01</span> 🏄‍♂️ I will attend <strong>AAAI 2026 at Singapore</strong> (Jan 20-27). Let’s connect!</li>
                <li><span class="news-tag">2026.01</span> 🚀 New paper <strong><a href="https://arxiv.org/abs/2601.05560">ReasonAny</a></strong> is out! Resolving performance collapse in model merging.</li>
                <li><span class="news-tag">2025.11</span> 🎉 <strong>RCP-Merging</strong> accepted to <strong>AAAI 2026 Main Track</strong>!</li>
                <li><span class="news-tag">2025.08</span> 🎉 <strong>RewardDS</strong> accepted to <strong>EMNLP 2025 Main</strong>!</li>
                <li><span class="news-tag">2025.08</span> Joined <strong>Shanghai AI Lab</strong> as Research Intern.</li>
                <li><span class="news-tag">2025.05</span> 🎉 <strong>PrivacyRestore</strong> accepted to <strong>ACL 2025 Main</strong>!</li>
            </ul>
        </section>

        <section id="publications" class="content-box">
            <div class="box-header">
                <span style="font-size: 24px;">📝</span>
                <h2 class="box-title">Selected Publications</h2>
            </div>

            <div class="paper-entry">
                <div class="paper-thumb">
                    <a href="https://arxiv.org/abs/2601.05560"><img src="images/ReasonAny_main_fig.png" alt="Paper Image"></a>
                </div>
                <div class="paper-info">
                    <span class="paper-venue">arXiv Preprint</span>
                    <a href="https://arxiv.org/abs/2601.05560" class="paper-title">ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging</a>
                    <div class="paper-auth">
                        <strong>Junyao Yang</strong>, Chen Qian, Dongrui Liu*, Wen Shen, Yong Liu*, Jing Shao*
                    </div>
                    <div class="paper-tldr">
                        <strong>TL;DR:</strong> Merging robust chain-of-thought capabilities into domain-specific models (Safety, Biomedicine) using Contrastive Gradient Identification.
                    </div>
                    <div class="paper-links">
                        <a href="https://arxiv.org/abs/2601.05560">Paper</a>
                        <a href="https://github.com/jyyang26/ReasonAny">Code</a>
                    </div>
                </div>
            </div>

            <div class="paper-entry">
                <div class="paper-thumb">
                    <a href="https://arxiv.org/abs/2508.03140"><img src="images/rcp.png" alt="Paper Image"></a>
                </div>
                <div class="paper-info">
                    <span class="paper-venue">AAAI 2026 Main Track</span>
                    <a href="https://arxiv.org/abs/2508.03140" class="paper-title">RCP-Merging: Merging Long CoT Models with Domain-Specific Models</a>
                    <div class="paper-auth">
                        <strong>Junyao Yang</strong>, Jianwei Wang, Huiping Zhuang, Cen Chen, Ziqian Zeng*
                    </div>
                    <div class="paper-tldr">
                        <strong>TL;DR:</strong> Enhancing domain performance while preserving chain-of-thought reasoning abilities by treating reasoning as a prior.
                    </div>
                    <div class="paper-links">
                        <a href="https://arxiv.org/abs/2508.03140">Paper</a>
                        <a href="https://github.com/ZeroNLP/RCP-Merging">Code</a>
                    </div>
                </div>
            </div>

            <div class="paper-entry">
                <div class="paper-thumb">
                    <a href="https://arxiv.org/abs/2406.01394"><img src="images/restore.png" alt="Paper Image"></a>
                </div>
                <div class="paper-info">
                    <span class="paper-venue">ACL 2025 Main</span>
                    <a href="https://arxiv.org/abs/2406.01394" class="paper-title">PrivacyRestore: Privacy-Preserving Inference in LLMs</a>
                    <div class="paper-auth">
                        Ziqian Zeng*, Jianwei Wang*, <strong>Junyao Yang*</strong>, et al.
                    </div>
                    <div class="paper-tldr">
                        <strong>TL;DR:</strong> Protecting privacy via activation steering using a protected meta-vector without retraining.
                    </div>
                    <div class="paper-links">
                        <a href="https://arxiv.org/abs/2406.01394">Paper</a>
                        <a href="https://github.com/ZeroNLP/PrivacyRestore">Code</a>
                    </div>
                </div>
            </div>

            <div class="paper-entry">
                <div class="paper-thumb">
                    <a href="https://arxiv.org/abs/2502.18517"><img src="images/rewardds.png" alt="Paper Image"></a>
                </div>
                <div class="paper-info">
                    <span class="paper-venue">EMNLP 2025 Main</span>
                    <a href="https://arxiv.org/abs/2502.18517" class="paper-title">RewardDS: Privacy-Preserving Fine-Tuning via Reward Driven Data Synthesis</a>
                    <div class="paper-auth">
                         Jianwei Wang, Chengming Shi, <strong>Junyao Yang</strong>, et al.
                    </div>
                    <div class="paper-tldr">
                        <strong>TL;DR:</strong> Using client-side reward models to filter synthetic data, mitigating noise while protecting privacy.
                    </div>
                    <div class="paper-links">
                         <a href="https://arxiv.org/abs/2502.18517">Paper</a>
                         <a href="https://github.com/wjw136/RewardDS">Code</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="education" class="content-box">
            <div class="box-header">
                <span style="font-size: 24px;">🎓</span>
                <h2 class="box-title">Education</h2>
            </div>
            <div class="edu-row">
                <div class="edu-card">
                    <img src="images/NUS.jpg" alt="NUS" class="edu-logo">
                    <div class="edu-deg">M.S. in AI</div>
                    <div class="edu-sch">National University of Singapore</div>
                    <span class="edu-yr">2025 - 2027 (Expected)</span>
                </div>
                <div class="edu-card">
                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" alt="SCUT" class="edu-logo">
                    <div class="edu-deg">B.E. in CS</div>
                    <div class="edu-sch">South China University of Technology</div>
                    <span class="edu-yr">2021 - 2025</span>
                </div>
                <div class="edu-card">
                    <img src="images/SZSY_Logo.png" alt="SZSY" class="edu-logo">
                    <div class="edu-deg">High School</div>
                    <div class="edu-sch">Shenzhen Experimental School</div>
                    <span class="edu-yr">2018 - 2021</span>
                </div>
            </div>
        </section>

        <section id="experience" class="content-box">
             <div class="box-header">
                <span style="font-size: 24px;">💻</span>
                <h2 class="box-title">Experience</h2>
            </div>
             <div style="display: flex; flex-direction: column; gap: 10px;">
                <div class="exp-item">
                    <img src="images/ailab.png" class="exp-logo">
                    <div>
                        <div style="font-weight: 700; font-size: 16px;">Shanghai AI Lab</div>
                        <div style="font-size: 14px; color: #555;">Research Intern | 2025.06 - Present</div>
                    </div>
                </div>
                <div class="exp-item">
                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" class="exp-logo">
                    <div>
                        <div style="font-weight: 700; font-size: 16px;">South China University of Technology</div>
                        <div style="font-size: 14px; color: #555;">Research Intern | 2024.07 - Present</div>
                    </div>
                </div>
                <div class="exp-item">
                    <img src="images/Tencent.png" class="exp-logo">
                    <div>
                        <div style="font-weight: 700; font-size: 16px;">Tencent</div>
                        <div style="font-size: 14px; color: #555;">Machine Learning Intern | 2024.04 - 2024.07</div>
                    </div>
                </div>
                <div class="exp-item">
                    <img src="images/SZSE.png" class="exp-logo">
                    <div>
                        <div style="font-weight: 700; font-size: 16px;">SZSE</div>
                        <div style="font-size: 14px; color: #555;">Machine Learning Intern | 2024.01 - 2024.04</div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="honors" class="content-box">
            <div class="box-header">
                <span style="font-size: 24px;">🏆</span>
                <h2 class="box-title">Honor & Awards</h2>
            </div>
            <ul style="font-size: 15px; line-height: 2; color: #4b5563; padding-left: 20px;">
                <li>Excellent Graduation Thesis (2025.06)</li>
                <li>Outstanding Student Leader (2022-2024)</li>
                <li>Second-Class Scholarship of SCUT (2024.10)</li>
                <li>Second-Class Award in CUMCM at Guangdong Province (2022.09)</li>
            </ul>
        </section>

    </main>
</div>
