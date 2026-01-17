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
       1. 解决宽度和空白问题的核心覆盖代码
       (针对 Minimal Mistakes 主题的暴力修正)
       ========================================= */
    
    /* 扩大容器宽度，解决“内容太窄”的问题 */
    .page__inner-wrap {
        max-width: 1400px !important; /* 强制加宽容器 */
        width: 95% !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-top: 0 !important;
    }

    /* 隐藏主题默认的标题和空白，解决“顶部空白”问题 */
    .page__header, .page__title {
        display: none !important;
        margin-bottom: 0 !important;
        height: 0 !important;
    }
    
    /* 消除顶部的默认内边距 */
    .page__content {
        margin-top: 0 !important;
        padding-top: 10px !important;
    }

    /* 如果有 archive 元素，也去掉间距 */
    .archive {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }

    /* =========================================
       2. 自定义布局样式 (模仿 Alex Johnson 风格)
       ========================================= */
    
    :root {
        --primary-btn: #4361ee;
        --bg-body: #f8f9fa; /* 更干净的背景色 */
        --card-bg: #ffffff;
        --text-main: #1f2937;
        --text-sub: #6b7280;
        --radius: 24px;
        --shadow: 0 20px 40px -10px rgba(0,0,0,0.08); /* 悬浮感阴影 */
    }

    body {
        background-color: var(--bg-body);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* 主容器：模拟整个大卡片效果 */
    .profile-wrapper {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-top: 20px;
        position: relative;
    }

    /* 桌面端双栏布局 */
    @media (min-width: 1024px) {
        .profile-wrapper {
            flex-direction: row;
            align-items: flex-start;
        }
    }

    /* --- 左侧边栏 (Sidebar) --- */
    .custom-sidebar {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 40px 30px;
        box-shadow: var(--shadow);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: relative;
        z-index: 10;
    }

    /* 桌面端侧边栏固定宽度和粘性定位 */
    @media (min-width: 1024px) {
        .custom-sidebar {
            width: 340px;
            flex-shrink: 0;
            position: sticky;
            top: 20px;
        }
    }

    /* 头像区域 */
    .avatar-area {
        width: 140px;
        height: 140px;
        margin-bottom: 20px;
        position: relative;
    }

    /* 使用图片作为头像，如果没有图片则显示圆圈 */
    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid #fff;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }
    
    /* 如果没有头像图片，用这个占位符 */
    .avatar-placeholder {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 40px;
        font-weight: bold;
    }

    .name-title {
        font-size: 26px;
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

    /* 社交图标栏 (模仿图片中的圆圈图标) */
    .social-icons {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }
    
    .s-icon {
        width: 36px;
        height: 36px;
        background: #f3f4f6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4b5563;
        transition: all 0.2s;
        text-decoration: none !important;
    }
    .s-icon:hover {
        background: var(--primary-btn);
        color: white;
        transform: translateY(-2px);
    }
    .s-icon svg { width: 18px; height: 18px; fill: currentColor; }

    /* Download CV 按钮 */
    .btn-cv {
        background-color: var(--primary-btn);
        color: white !important;
        padding: 12px 0;
        width: 100%;
        border-radius: 12px;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        display: block;
        box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        transition: transform 0.2s;
    }
    .btn-cv:hover {
        transform: translateY(-2px);
        text-decoration: none;
    }

    /* --- 右侧内容区域 (Main Content) --- */
    .custom-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 25px;
        /* 防止内容溢出 */
        min-width: 0; 
    }

    /* 通用内容卡片 */
    .content-box {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 35px;
        box-shadow: var(--shadow);
    }
    
    /* 标题样式 (带图标) */
    .box-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    .box-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--text-main);
        margin: 0;
    }
    .box-icon {
        background: #eef2ff;
        color: var(--primary-btn);
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }

    /* Bio 文本 */
    .bio-text {
        font-size: 16px;
        line-height: 1.7;
        color: #374151;
    }
    .bio-text a { color: var(--primary-btn); text-decoration: none; font-weight: 500; }
    .bio-text a:hover { text-decoration: underline; }

    /* --- Education (横向卡片布局 - 解决窄的问题) --- */
    .edu-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
    }
    
    .edu-card {
        background: #f9fafb;
        border: 1px solid #f3f4f6;
        border-radius: 16px;
        padding: 20px;
        transition: transform 0.2s;
    }
    .edu-card:hover {
        transform: translateY(-3px);
        border-color: #e5e7eb;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    
    .edu-logo {
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 8px;
        padding: 4px;
        margin-bottom: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        object-fit: contain;
    }
    .edu-deg { font-weight: 700; font-size: 15px; color: var(--text-main); margin-bottom: 4px; line-height: 1.3;}
    .edu-sch { font-size: 13px; color: var(--text-sub); }
    .edu-yr { font-size: 12px; color: #9ca3af; margin-top: 8px; display: block;}

    /* --- News 列表 --- */
    .news-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 300px;
        overflow-y: auto;
    }
    .news-list li {
        padding: 10px 0;
        border-bottom: 1px dashed #e5e7eb;
        font-size: 14px;
        color: #4b5563;
        line-height: 1.5;
    }
    .news-list li:last-child { border-bottom: none; }
    .news-tag {
        display: inline-block;
        background: #eff6ff;
        color: var(--primary-btn);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        margin-right: 6px;
    }

    /* --- Paper 列表 --- */
    .paper-entry {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px solid #f3f4f6;
    }
    @media (min-width: 768px) {
        .paper-entry { flex-direction: row; }
    }
    .paper-entry:last-child { border-bottom: none; margin-bottom: 0; }
    
    .paper-thumb {
        width: 100%;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #eee;
        flex-shrink: 0;
    }
    .paper-thumb img { width: 100%; height: auto; display: block; }
    
    .paper-info { flex: 1; }
    .paper-venue {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #6b7280;
        font-weight: 700;
        margin-bottom: 4px;
        display: block;
    }
    .paper-title { font-size: 16px; font-weight: 700; color: var(--primary-btn); text-decoration: none; display: block; margin-bottom: 6px; }
    .paper-auth { font-size: 14px; color: #374151; margin-bottom: 8px; }
    .paper-tldr {
        background: #f3f4f6;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 13px;
        color: #4b5563;
        line-height: 1.4;
    }
    .paper-links { margin-top: 8px; font-size: 13px; }
    .paper-links a { margin-right: 10px; color: var(--text-sub); text-decoration: none; border-bottom: 1px dotted #ccc;}
    .paper-links a:hover { color: var(--primary-btn); border-bottom: 1px solid var(--primary-btn);}

</style>

<div class="profile-wrapper">

    <aside class="custom-sidebar">
        <div class="avatar-area">
             <div class="avatar-placeholder">JY</div>
        </div>

        <h1 class="name-title">Junyao Yang<br><span style="font-size: 0.6em; color: #888; font-weight: 500;">(杨竣尧)</span></h1>
        
        <div class="role-text">AI Graduate Student</div>
        <div class="affil-text">School of Computing<br>National University of Singapore</div>

        <div class="social-icons">
            <a href="mailto:your-email@u.nus.edu" class="s-icon" title="Email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
            <a href="https://scholar.google.com" class="s-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg></a>
            <a href="https://github.com/jyyang26" class="s-icon" title="Github"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
        </div>

        <a href="https://drive.google.com/file/d/17UEE4NB9HbyNba8TwQ5oO3y3Tu7hwhZm/view?usp=sharing" class="btn-cv">
            Download CV
        </a>
        
        <div style="margin-top: 30px; width: 100%; opacity: 0.7;">
             <script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=fHE-8Jdi8dG4h8kH9bKTC8OPRf52B9shV3EzW7J6MMc&cl=ffffff&w=a"></script>
        </div>
    </aside>

    <main class="custom-content">

        <div class="content-box">
            <div class="box-header">
                <span class="box-icon">👋</span>
                <h2 class="box-title">Professional Summary</h2>
            </div>
            <div class="bio-text">
                Hi there, my name is Junyao Yang. I am a graduate student at the School of Computing, National University of Singapore (NUS), where I am pursuing a specialization in Artificial Intelligence. My research interests lie in <strong>Natural Language Processing</strong>, <strong>Explainable Artificial Intelligence</strong> and <strong>Trustworthy Machine Learning</strong>.
                <br><br>
                My research story revolves around <strong>the Underlying Principles and Understanding of Artificial Intelligence</strong>, focusing on <strong>"Robustness"</strong>, <strong>"Safety"</strong>, and <strong>Interpretability</strong>. This connects to areas such as <strong>Trustworthy LLM</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025</a></strong>], <strong>Reasoning Model Merging</strong> [<strong><a href="https://arxiv.org/abs/2508.03140">AAAI 2026</a></strong>, <strong><a href="https://arxiv.org/abs/2601.05560">ReasonAny</a></strong>] and <strong>Malicious Attacks</strong>.
                <br><br>
                <span style="color: #6b7280; font-size: 0.9em;">Core Focus: Trustworthy AI & LLM Reasoning</span>
            </div>
        </div>

        <div class="content-box">
            <div class="box-header">
                <span class="box-icon">🎓</span>
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
        </div>

        <div class="content-box">
             <div class="box-header">
                <span class="box-icon">🔥</span>
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
        </div>

        <div class="content-box">
            <div class="box-header">
                <span class="box-icon">📝</span>
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
        </div>

        <div class="content-box">
             <div class="box-header">
                <span class="box-icon">💻</span>
                <h2 class="box-title">Experience</h2>
            </div>
             <div style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; gap: 15px; align-items: center;">
                    <img src="images/ailab.png" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; border: 1px solid #eee;">
                    <div>
                        <div style="font-weight: 700; color: var(--text-main);">Shanghai AI Lab</div>
                        <div style="font-size: 14px; color: var(--text-sub);">Research Intern | 2025.06 - Present</div>
                    </div>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; border: 1px solid #eee;">
                    <div>
                        <div style="font-weight: 700; color: var(--text-main);">South China University of Technology</div>
                        <div style="font-size: 14px; color: var(--text-sub);">Research Intern | 2024.07 - Present</div>
                    </div>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <img src="images/Tencent.png" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; border: 1px solid #eee;">
                    <div>
                        <div style="font-weight: 700; color: var(--text-main);">Tencent</div>
                        <div style="font-size: 14px; color: var(--text-sub);">Machine Learning Intern | 2024.04 - 2024.07</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content-box">
            <div class="box-header">
                <span class="box-icon">🏆</span>
                <h2 class="box-title">Honor & Awards</h2>
            </div>
            <ul style="font-size: 14px; line-height: 1.8; color: #4b5563;">
                <li>Excellent Graduation Thesis (2025.06)</li>
                <li>Outstanding Student Leader (2022-2024)</li>
                <li>Second-Class Scholarship of SCUT (2024.10)</li>
                <li>Second-Class Award in CUMCM at Guangdong Province (2022.09)</li>
            </ul>
        </div>

    </main>
</div>
