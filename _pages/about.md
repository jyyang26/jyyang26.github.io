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

       0. 字体定义与全局分配

       ========================================= */

    

    /* 定义衬线字体 (用于正文) */

    :root {

        --font-serif: "Charter", "Bitstream Charter", "Sitka Text", "Cambria", "Georgia", serif;

        --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

        --font-zh-serif: "SimSun", "STSong", "Songti SC", serif;

    }



    /* 全局正文默认使用 Serif */

    body, p, div, li, .paper-auth, .paper-tldr, .affil-text, .role-text {

        font-family: var(--font-serif);

    }



    /* 标题、导航栏、侧边栏强制使用 Sans-serif */

    .custom-nav, 

    .nav-link, 

    .custom-sidebar, 

    .name-title, 

    .box-title, 

    .paper-venue, 

    .paper-title,

    .edu-deg,

    .edu-sch,

    .news-tag {

        font-family: var(--font-sans) !important;

    }



    /* 姓名处的中文字体 (宋体) */

    .name-title span {

        font-family: var(--font-zh-serif) !important;

    }



    /* =========================================

       1. 暴力清除顶部空白

       ========================================= */

    

    html, body {

        margin: 0 !important;

        padding: 0 !important;

    }



    /* 隐藏主题默认 Header */

    .masthead, .page__header, .page__title, .archive, .page__footer {

        display: none !important;

        height: 0 !important;

        margin: 0 !important;

        padding: 0 !important;

        overflow: hidden !important;

        visibility: hidden !important;

    }



    #main, .initial-content, .page__inner-wrap, .page__content {

        margin-top: 0 !important;

        padding-top: 0 !important;

        padding-bottom: 0 !important;

    }



    .page__inner-wrap {

        max-width: 100% !important;

        width: 100% !important;

        margin-left: 0 !important;

        margin-right: 0 !important;

    }



    /* =========================================

       2. 自定义导航栏 (方框包裹优化)

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

        justify-content: center;

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



    @media (min-width: 768px) {

        .nav-container {

            flex-wrap: nowrap;

        }

    }

    

    @media (max-width: 767px) {

        .nav-container {

            flex-wrap: wrap;

            gap: 10px;

            border-radius: 16px;

            justify-content: space-around;

        }

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

       3. 核心布局系统 (桌面端右侧 50vw)

       ========================================= */

    :root {

        --primary-btn: #4361ee;

        --bg-body: #f8f9fa;

        --card-bg: #ffffff;

        --text-main: #1f2937;

        --text-sub: #6b7280;

        --radius: 16px;

        --shadow: 0 4px 20px rgba(0,0,0,0.04);

    }



    body {

        background-color: var(--bg-body);

        color: var(--text-main);

    }



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

            min-width: 0; 

        }

    }

    

    @media (max-width: 1023px) {

        .profile-wrapper {

            padding-left: 15px;

            padding-right: 15px;

            box-sizing: border-box;

        }

        .custom-sidebar, .custom-content {

            width: 100%; 

        }

    }



    /* =========================================

       4. 组件样式细节

       ========================================= */

    

    .custom-sidebar {

        background: var(--card-bg);

        border-radius: var(--radius);

        padding: 30px 20px;

        box-shadow: var(--shadow);

        text-align: center;

        display: flex;

        flex-direction: column;

        align-items: center;

    }



    .avatar-area {

        width: 150px;

        height: 150px;

        margin-bottom: 15px;

    }



    .avatar-img {

        width: 100%;

        height: 100%;

        object-fit: cover;

        border-radius: 50%;

        border: 4px solid #fff;

        box-shadow: 0 8px 16px rgba(0,0,0,0.1);

    }



    .name-title {

        font-size: 24px;

        font-weight: 800;

        color: var(--text-main);

        margin: 10px 0 5px 0;

        line-height: 1.2;

    }

    

    .role-text {

        color: #4361ee;

        font-weight: 700;

        font-size: 15px;

        margin-bottom: 5px;

    }

    

    .affil-text {

        color: var(--text-sub);

        font-size: 14px;

        line-height: 1.5;

        margin-bottom: 20px;

    }



    .social-icons {

        display: flex;

        justify-content: center;

        gap: 15px;

        margin-bottom: 10px; 

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

    

    .s-icon:hover {

        background: var(--primary-btn);

        color: white;

        transform: translateY(-2px);

    }

    .s-icon svg { width: 20px; height: 20px; fill: currentColor; }



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

        gap: 12px;

        margin-bottom: 20px;

        padding-bottom: 15px;

        border-bottom: 1px solid #f0f0f0;

    }

    .box-title {

        font-size: 20px;

        font-weight: 700;

        color: var(--text-main);

        margin: 0;

    }



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

    

    .news-list a {

        color: var(--primary-btn) !important;

        text-decoration: none !important;

        font-weight: 600;

    }

    .news-list a:hover {

        text-decoration: underline !important;

    }



    .news-tag {

        display: inline-block;

        background: #eff6ff;

        color: var(--primary-btn);

        padding: 2px 8px;

        border-radius: 4px;

        font-size: 13px;

        font-weight: 600;

        margin-right: 10px;

    }



    .paper-entry {

        display: flex;

        flex-direction: column;

        gap: 20px;

        margin-bottom: 30px;

        padding-bottom: 30px;

        border-bottom: 1px solid #f3f4f6;

    }

    

    @media (min-width: 768px) {

        .paper-entry { 

            flex-direction: row; 

            align-items: flex-start;

        }

    }

    .paper-entry:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

    

    .paper-thumb {

        width: 100%; 

        border-radius: 12px;

        overflow: hidden;

        border: 1px solid #eee;

        flex-shrink: 0; 

        background: #fafafa;

        display: flex;

        align-items: center;

        justify-content: center;

        padding: 10px;

        box-sizing: border-box;

    }

    

    @media (min-width: 768px) {

        .paper-thumb {

            width: 250px;

            height: 250px; 

        }

    }



    .paper-thumb img { 

        max-width: 100%;      

        max-height: 100%;     

        width: auto;          

        height: auto; 

        display: block; 

        transition: transform 0.3s;

        object-fit: contain;  

    }

    .paper-thumb:hover img { transform: scale(1.03); }

    

    .paper-info { 

        flex: 1; 

        min-width: 0; 

        display: flex;

        flex-direction: column;

    }



    .paper-venue {

        font-size: 12px;

        font-weight: 800;

        color: #4361ee;

        text-transform: uppercase;

        margin-bottom: 6px;

        letter-spacing: 0.5px;

    }

    .paper-title { font-size: 17px; font-weight: 700; color: #1f2937; text-decoration: none; display: block; margin-bottom: 8px; line-height: 1.4; }

    .paper-title:hover { color: #4361ee; text-decoration: underline; }

    .paper-auth { font-size: 15px; color: #4b5563; margin-bottom: 12px; line-height: 1.5; }

    .paper-tldr {

        background: #f8fafc;

        padding: 10px 15px;

        border-radius: 8px;

        font-size: 14px;

        color: #64748b;

        line-height: 1.6;

        border-left: 3px solid #cbd5e1;

    }

    .paper-links { margin-top: 10px; font-size: 14px; }

    .paper-links a { margin-right: 15px; color: #6b7280; text-decoration: none; border-bottom: 1px dotted #9ca3af; font-weight: 500;}

    .paper-links a:hover { color: #4361ee; border-bottom: 1px solid #4361ee;}



    .edu-row {

        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

        gap: 20px;

    }

    .edu-card {

        background: #f9fafb;

        border: 1px solid #f3f4f6;

        border-radius: 12px;

        padding: 20px;

        display: flex;

        flex-direction: column;

    }

    .edu-logo { width: 48px; height: 48px; margin-bottom: 12px; object-fit: contain;}

    .edu-deg { font-weight: 700; font-size: 16px; color: var(--text-main); margin-bottom: 4px;}

    .edu-sch { font-size: 14px; color: var(--text-sub); margin-bottom: auto;}

    .edu-yr { font-size: 13px; color: #9ca3af; margin-top: 10px; }



    .exp-item {

        display: flex;

        gap: 15px;

        align-items: flex-start;

        padding: 15px;

        border-radius: 12px;

        transition: background 0.2s;

    }

    .exp-item:hover { background: #f8f9fa; }

    .exp-logo { width: 50px; height: 50px; object-fit: contain; border-radius: 8px; border: 1px solid #eee; background: #fff; padding: 4px; flex-shrink: 0;}



    .map-widget-container {

        width: 100%;

        display: flex;

        justify-content: center;

        overflow: hidden; 

    }



</style>



<nav class="custom-nav">

    <div class="nav-container">

        <a href="#about" class="nav-link"><span>👋</span> About Me</a>

        <a href="#news" class="nav-link"><span>🔥</span> News</a>

        <a href="#publications" class="nav-link"><span>📝</span> Publications & Preprints</a>

        <a href="#techreport" class="nav-link"><span>📁</span> Tech Reports & Projects</a>

        <a href="#blogs" class="nav-link"><span>📖</span> Blogs</a>

        <a href="#education" class="nav-link"><span>🎓</span> Education</a>

        <a href="#experience" class="nav-link"><span>💻</span> Experience</a>

        <a href="#honors" class="nav-link"><span>🏆</span> Honors</a>

    </div>

</nav>



<div class="profile-wrapper">



    <aside class="custom-sidebar">

        <div class="avatar-area">

             <img src="../images/IMG_9317.jpeg" alt="Avatar" class="avatar-img"> 

        </div>



        <h1 class="name-title">Junyao Yang<br><span style="font-size: 0.6em; color: #888; font-weight: 500;">(杨竣尧)</span></h1>

        

        <div class="role-text">AI Graduate Student</div>

        <div class="affil-text">National University of Singapore<br>Shanghai AI Lab</div>



        <div class="social-icons">

            <a href="mailto:junyaoyang@u.nus.edu" class="s-icon" title="Email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>

            <a href="https://scholar.google.com/citations?hl=en&user=oY6uhJQAAAAJ&view_op=list_works&gmla=ALUCkoUMJix6T2_HpNHTL2p0tzdO_cjIn2_g4yK4169HrMlRbB-6PBgqJdjKVdGzpgXbn_3VnFGz80T7gHxAhts9XVq_C6FFhRN_6UcK5C8lpfBpi4oVz3q6s-41w6FwOLc_YJSkE7SWFP8" class="s-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg></a>

            <a href="https://github.com/jyyang26" class="s-icon" title="Github"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>

            <a href="https://drive.google.com/file/d/17UEE4NB9HbyNba8TwQ5oO3y3Tu7hwhZm/view?usp=sharing" class="s-icon" title="Curriculum Vitae">

                <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>

            </a>

            <a href="https://www.linkedin.com/in/junyao-yang-371282301/" class="s-icon" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>

        </div>

    </aside>



    <main class="custom-content">



        <section id="about" class="content-box">

            <div class="box-header">

                <span style="font-size: 24px;">👋</span>

                <h2 class="box-title">About Me</h2>

            </div>

            <div style="font-size: 15px; line-height: 1.8; color: #374151;">

                🤠 Hi there, this is Junyao Yang. I am a graduate student at the School of Computing, National University of Singapore (NUS), where I am pursuing a specialization in Artificial Intelligence. My research interests lie in <strong>Natural Language Processing</strong>, <strong>Explainable Artificial Intelligence</strong> and <strong>Trustworthy Machine Learning</strong>.

                <br><br>

                🧐 My research story revolves around <strong>the Underlying Principles and Understanding of Artificial Intelligence</strong>, particularly focusing on how to enhance the <strong>"Robustness"</strong> and <strong>"Safety"</strong> of LLM-generated information and understand the <strong>Interpretability</strong> of model mechanisms, which connects to related areas such as <strong>Trustworthy LLM</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>, <strong><a href="https://arxiv.org/abs/2502.18517">EMNLP 2025 Main</a></strong>] and <strong>Agent</strong> [<strong><a href="https://arxiv.org/abs/2601.15075">Agentic Attribution</a></strong>, <strong><a href="https://arxiv.org/abs/2601.15075">AgentDoG</a></strong>], <strong>Reasoning Model Merging</strong> [<strong><a href="https://arxiv.org/abs/2508.03140">AAAI 2026</a></strong>, <strong><a href="https://arxiv.org/abs/2601.18491">ReasonAny</a></strong>] and <strong>Malicious Attacks</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>].

             

            </div>

        </section>



        <section id="news" class="content-box">

             <div class="box-header">

                <span style="font-size: 24px;">🔥</span>

                <h2 class="box-title">News</h2>

            </div>

            <ul class="news-list">

            <li><span class="news-tag">2026.02</span> 🚀 New blog post: <strong><a href="blogs/reasoning_token.html">The Entropy-Gradient Inversion</a></strong>! We discover that reasoning models exhibit a unique "fingerprint" — a significant negative correlation between gradient strength and token entropy, emerging rapidly within the first 200 steps of SFT.</li>

            <li><span class="news-tag">2026.01</span> 🚀 Please check our latest tech report: <strong><a href="https://arxiv.org/abs/2601.18491">AgentDoG</a></strong>! It introduces a state-of-the-art diagnostic guardrail framework utilizing a three-dimensional taxonomy, featuring an Agentic XAI attribution module I contributed to for diagnosing the internal drivers of risky actions.</li>

            <li><span class="news-tag">2026.01</span> 🚀 Please check our latest paper: <strong><a href="https://arxiv.org/pdf/2601.15075">Agentic Attribution</a></strong>! A hierarchical framework utilize temporal likelihood and perturbation-based analysis to unveil internal factors driving LLM-based agent actions.</li>

                <li><span class="news-tag">2026.01</span> 🏄‍♂️ I will attend <strong>AAAI 2026 at Singapore during Jan 20-27, 2026</strong>. Let’s have fun!</li>

                <li><span class="news-tag">2026.01</span> 🚀 Please check our latest paper: <strong><a href="https://arxiv.org/abs/2601.05560">ReasonAny</a></strong>! ReasonAny employs contrastive gradient identification to resolve destructive performance collapse, effectively merging reasoning capabilities into domain-specific models!</li>

                <li><span class="news-tag">2025.11</span> 🎉 First-Author paper <a href="https://arxiv.org/abs/2508.03140">RCP-Merging</a> has been accepted to <strong>AAAI 2026 Main Track</strong>! See you in Singapore!</li>

                <li><span class="news-tag">2025.08</span> 🎉 <a href="https://arxiv.org/abs/2502.18517">RewardDS</a> has been accepted to <strong>EMNLP 2025 Main</strong>!</li>

                <li><span class="news-tag">2025.08</span> 🥳 I joined <a href="https://ai45.shlab.org.cn/">Shanghai AI Lab</a> as a Research Intern, advised by <a href="https://shenqildr.github.io/">Dongrui Liu</a>.</li>

                <li><span class="news-tag">2025.08</span> 🚀 Check out my latest work: <a href="https://arxiv.org/abs/2508.03140">RCP-Merging</a>! This novel framework integrates long CoT capability into domain-specific LLMs without sacrificing their performance in the original domain!</li>

                <li><span class="news-tag">2025.05</span> 🎉 Successfully passed my undergraduate thesis defense!</li>

                <li><span class="news-tag">2025.05</span> 🎉 <strong>Co-First-Author paper</strong> <a href="https://arxiv.org/abs/2406.01394">PrivacyRestore</a> has been accepted to <strong>ACL 2025 Main</strong>! Deeply grateful to my mentor Ziqian and collaborator Jianwei! See you in Vienna!</li>

                <li><span class="news-tag">2025.02</span> 🚀 Please check our newest papers: <strong><a href="https://arxiv.org/abs/2502.18517">RewardDS</a></strong> and <strong><a href="https://arxiv.org/abs/2406.01394">PrivacyRestore</a></strong>! Thanks to the help of other collaborators.</li>

                <li><span class="news-tag">2024.07</span> 🥳 I joined <a href="https://github.com/ZeroNLP">ZeroNLP</a> as a Research Assistant, advised by Prof. <a href="https://ziqianzeng.github.io/">Ziqian Zeng</a>.</li>

                <li><span class="news-tag">2024.07</span> 🥳 I spent a wonderful time at Tencent as a machine learning intern!</li>

                <li><span class="news-tag">2024.07</span> 🚀 <strong>Contextless CS</strong> is available now, which reaches <strong>20,000 DAU</strong>! Check my work <strong><a href="https://kf.qq.com/">here</a></strong>!</li>

                <li><span class="news-tag">2024.04</span> 🥳 I joined Tencent as a machine learning intern.</li>

                <li><span class="news-tag">2024.03</span> 🥳 I spent a wonderful time at ShenZhen Stock Exchange as a machine learning intern!</li>

            </ul>

        </section>



        <section id="publications" class="content-box">

            <div class="box-header">

                <span style="font-size: 24px;">📝</span>

                <h2 class="box-title">Publications & Preprints</h2>

            </div>



            <div class="paper-entry">

                <div class="paper-thumb">

                    <a href="https://arxiv.org/abs/2601.05560"><img src="images/ReasonAny_main_fig.png" alt="Paper Image"></a>

                </div>

                <div class="paper-info">

                    <span class="paper-venue">arXiv Preprint</span>

                    <a href="https://arxiv.org/abs/2601.05560" class="paper-title">ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging</a>

                    <div class="paper-auth">

                        <strong>Junyao Yang</strong>, Chen Qian, Dongrui Liu<sup>&dagger;</sup>, Wen Shen, Yong Liu<sup>&dagger;</sup>, Jing Shao<sup>&dagger;</sup>

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

                    <a href="https://arxiv.org/pdf/2601.15075"><img src="images/agent_xai_main_fig_final_v2.png" alt="Paper Image"></a>

                </div>

                <div class="paper-info">

                    <span class="paper-venue">arXiv Preprint</span>

                    <a href="https://arxiv.org/pdf/2601.15075" class="paper-title">The Why Behind the Action: Unveiling Internal Drivers via Agentic Attribution</a>

                    <div class="paper-auth">

                        Chen Qian, Peng Wang, Dongrui Liu<sup>&dagger;</sup>, <strong>Junyao Yang</strong>, Dadi Guo, Ling Tang, Jilin Mei, Qihan Ren, Shuai Shao, Yong Liu, Jie Fu, Jing Shao, Xia Hu

                    </div>

                    <div class="paper-tldr">

                        <strong>TL;DR:</strong> A hierarchical framework for agentic attribution, using temporal likelihood and perturbation-based analysis to unveil internal factors driving LLM-based agent actions.

                    </div>

                    <div class="paper-links">

                        <a href="https://arxiv.org/pdf/2601.15075">Paper</a>

                        <a href="https://arxiv.org/pdf/2601.15075">Code</a>

                    </div>

                </div>

            </div>





            <div class="paper-entry">

                <div class="paper-thumb">

                    <a href="https://arxiv.org/abs/2508.03140"><img src="images/rcp.png" alt="Paper Image"></a>

                </div>

                <div class="paper-info">

                    <span class="paper-venue">AAAI 2026 Main Track</span>

                    <a href="https://arxiv.org/abs/2508.03140" class="paper-title">RCP-Merging: Merging Long Chain-of-Thought Models with Domain-Specific Models by Considering Reasoning Capability as Prior</a>

                    <div class="paper-auth">

                        <strong>Junyao Yang</strong>, Jianwei Wang, Huiping Zhuang, Cen Chen, Ziqian Zeng*<sup>&dagger;</sup>

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

                    <a href="https://arxiv.org/abs/2406.01394" class="paper-title">PrivacyRestore: Privacy-Preserving Inference in Large Language Models via Privacy Removal and Restoration</a>

                    <div class="paper-auth">

                        Ziqian Zeng*<sup>&dagger;</sup>, Jianwei Wang*, <strong>Junyao Yang*</strong>, Zhengdong Lu, Haoran Li, Huiping Zhuang, Cen Chen

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

                    <a href="https://arxiv.org/abs/2502.18517" class="paper-title">RewardDS: Privacy-Preserving Fine-Tuning for Large Language Models via Reward Driven Data Synthesis</a>

                    <div class="paper-auth">

                         Jianwei Wang, Chengming Shi, <strong>Junyao Yang</strong>, Haoran Li, Qianli Ma, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>&dagger;</sup>

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



        <section id="techreport" class="content-box">

            <div class="box-header">

                <span style="font-size: 24px;">📁</span>

                <h2 class="box-title">Tech Reports & Projects</h2>

            </div>

                

              <div class="paper-entry">

                  <div class="paper-thumb">

                      <a href="https://arxiv.org/abs/2601.18491"><img src="images/agentdog.png" alt="Paper Image"></a>

                  </div>

                  <div class="paper-info">

                      <span class="paper-venue">Tech Report</span>

                      <a href="https://arxiv.org/abs/2601.18491" class="paper-title">AgentDoG: A Diagnostic Guardrail Framework for AI Agent Safety and Security</a>

                      <div class="paper-auth">

                          Shanghai Artificial Intelligence Laboratory (Contributor)

                      </div>

                      <div class="paper-tldr">

                          <strong>TL;DR:</strong> A state-of-the-art diagnostic guardrail framework utilizing a unified three-dimensional taxonomy to provide fine-grained monitoring and root-cause analysis of AI agent safety risks.

                      </div>

                      <div class="paper-links">

                          <a href="https://arxiv.org/abs/2601.18491">Paper</a>

                          <a href="https://github.com/AI45Lab/AgentDoG">Code</a>

                          <a href="https://huggingface.co/collections/AI45Research/agentdog">Model</a>

                      </div>

<div class="paper-links">

    <a href="https://huggingface.co/papers/date/2026-01-28">🤗#1 Paper of the day</a>

<a href="https://mp.weixin.qq.com/s/gGcM_fBGnRCoGe4mxZZePw">⚙️机器之心</a>

    <a href="http://xhslink.com/o/5qySfXc7xCu">📕小红书</a>

    <a href="https://x.com/dong_rui39501/status/2018980996528685464?s=46" style="display:inline-flex; align-items:center; gap:4px;">

        <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>

        Twitter

    </a>

</div>

                  </div>

              </div>

              

              
            

        </section>

        

        <section id="blogs" class="content-box">

            <div class="box-header">

                <span style="font-size: 24px;">📖</span>

                <h2 class="box-title">Blogs</h2>

            </div>

            <div class="paper-entry">

                <div class="paper-info">

          

                    <a href="blogs/reasoning_token.html" class="paper-title">The Entropy-Gradient Inversion: A New Perspective on LLM Reasoning Capabilities</a>

                    <div class="paper-tldr">

                        <strong>TL;DR:</strong> We discover that reasoning models exhibit a unique "fingerprint": a significant negative correlation between gradient strength and token entropy, which contradicts traditional base models. This capability emerges rapidly within the first 200 steps of SFT.

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

                    <div class="edu-deg">B.S. in CS (with honor)</div>

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

                        <div style="font-weight: 700; font-size: 15px;">Shanghai AI Lab</div>

                        <div style="font-size: 14px; color: #555;">Research Intern | 2025.06 - Present</div>

                    </div>

                </div>

                <div class="exp-item">

                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 700; font-size: 15px;">South China University of Technology</div>

                        <div style="font-size: 14px; color: #555;">Research Intern | 2024.07 - 2025.06</div>

                    </div>

                </div>

                <div class="exp-item">

                    <img src="images/Tencent.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 700; font-size: 15px;">Tencent</div>

                        <div style="font-size: 14px; color: #555;">Machine Learning Intern | 2024.04 - 2024.07</div>

                    </div>

                </div>

                <div class="exp-item">

                    <img src="images/SZSE.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 700; font-size: 15px;">SZSE</div>

                        <div style="font-size: 13px; color: #555;">Machine Learning Intern | 2024.01 - 2024.04</div>

                    </div>

                </div>

            </div>

        </section>

        

        <section id="honors" class="content-box">

            <div class="box-header">

                <span style="font-size: 24px;">🏆</span>

                <h2 class="box-title">Honor & Awards</h2>

            </div>

            <ul style="font-size: 14px; line-height: 2; color: #4b5563; padding-left: 20px;">

                <li>Excellent Graduation Thesis (2025.06)</li>

                <li>Outstanding Student Leader (2022-2024)</li>

                <li>Second-Class Scholarship of SCUT (2024.10)</li>

                <li>Second-Class Award in CUMCM at Guangdong Province (2022.09)</li>

            </ul>

        </section>



        <section id="visitor-map" class="content-box">

            <div class="box-header">

                <span style="font-size: 24px;">🌏</span>

                <h2 class="box-title">Page Views</h2>

            </div>

            <div class="map-widget-container">

                  <script type='text/javascript' id='clustrmaps' src='//cdn.clustrmaps.com/map_v2.js?cl=eff9f2&w=a&t=tt&d=fHE-8Jdi8dG4h8kH9bKTC8OPRf52B9shV3EzW7J6MMc&co=98b1e0&cmo=535cff&ct=f7f7f7'></script>

            </div>

        </section>



    </main>

</div>
