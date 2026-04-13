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
       Font Definitions
       ========================================= */
    
    :root {
        --font-serif: "Charter", "Bitstream Charter", "Sitka Text", "Cambria", "Georgia", serif;
        --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        --font-zh-serif: "SimSun", "STSong", "Songti SC", serif;
        
        --bg-body: #0a0a0a;
        --bg-card: #141414;
        --text-main: #e5e5e5;
        --text-sub: #888888;
        --accent: #ffffff;
        --border: #2a2a2a;
    }

    [data-theme="light"] {
        --bg-body: #ffffff;
        --bg-card: #f5f5f5;
        --text-main: #1a1a1a;
        --text-sub: #555555;
        --accent: #000000;
        --border: #e0e0e0;
    }

    /* Serif for body text */
    body, p, div, li, .paper-auth, .paper-tldr, .affil-text, .role-text, .paper-info {
        font-family: var(--font-serif);
    }

    /* Sans-serif for headers, nav, sidebar */
    .custom-nav, .nav-link, .custom-sidebar, .name-title, .box-title, 
    .paper-venue, .paper-title, .edu-deg, .edu-sch, .news-tag {
        font-family: var(--font-sans) !important;
    }

    /* Chinese name uses serif */
    .name-title span {
        font-family: var(--font-zh-serif) !important;
    }

    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        padding: 0;
        background-color: var(--bg-body);
        color: var(--text-main);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
    }

    /* Hide default theme elements */
    .masthead, .page__header, .page__title, .page__footer, footer {
        display: none !important;
    }

    #main, .initial-content, .page__inner-wrap {
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100% !important;
    }

    /* =========================================
       Navigation
       ========================================= */
    
    .custom-nav {
        position: sticky;
        top: 0;
        z-index: 9999;
        background: var(--bg-body);
        border-bottom: 1px solid var(--border);
        padding: 15px 0;
        margin-bottom: 40px;
    }

    .nav-container {
        display: flex;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
    }

    .nav-link {
        color: var(--text-sub);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: color 0.2s;
    }

    .nav-link:hover {
        color: var(--accent);
    }

    section { scroll-margin-top: 60px; }

    /* =========================================
       Main Layout
       ========================================= */
    
    .profile-wrapper {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 20px 60px;
    }

    /* Sidebar (Avatar + Basic Info) */
    .custom-sidebar {
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 50px;
        padding-bottom: 40px;
        border-bottom: 1px solid var(--border);
    }

    .avatar-area {
        flex-shrink: 0;
        margin: 0;
        padding: 0;
    }

    .avatar-img {
        width: 120px;
        height: 120px;
        border-radius: 0;
        object-fit: contain;
    }

    .name-title {
        font-size: 28px;
        font-weight: 600;
        color: var(--accent);
        margin: 0 0 5px 0;
    }

    .name-title span {
        font-size: 20px;
        color: var(--text-sub);
    }

    .role-text {
        color: var(--text-sub);
        font-size: 14px;
        margin-bottom: 5px;
    }

    .affil-text {
        color: var(--text-sub);
        font-size: 14px;
    }

    .social-icons {
        display: flex;
        gap: 15px;
        margin-top: 15px;
        justify-content: flex-start;
    }

    .s-icon {
        color: var(--text-sub);
        transition: color 0.2s;
    }

    .s-icon:hover {
        color: var(--accent);
    }

    .s-icon svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
    }

    /* =========================================
       Content Sections
       ========================================= */
    
    .custom-content {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    .content-box {
        background: transparent;
    }

    .box-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .box-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--accent);
        margin: 0;
        border: none;
        padding: 0;
    }

    /* News List */
    .news-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 250px;
        overflow-y: auto;
    }

    .news-list li {
        padding: 10px 0;
        border-bottom: 1px solid var(--border);
        font-size: 14px;
        color: var(--text-sub);
    }

    .news-list li:last-child {
        border-bottom: none;
    }

    .news-list a {
        color: var(--text-main);
        text-decoration: none;
    }

    .news-list a:hover {
        text-decoration: underline;
    }

    .news-tag {
        color: var(--text-sub);
        font-size: 12px;
    }

    /* Paper Entry */
    .paper-entry {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid var(--border);
    }

    .paper-entry:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .paper-thumb {
        width: 200px;
        height: 200px;
        flex-shrink: 0;
        border: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-card);
    }

    .paper-thumb img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .paper-info {
        flex: 1;
        min-width: 0;
    }

    .paper-venue {
        font-size: 15px;
        font-family: var(--font-serif);
        color: #87CEEB;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
    }

    .paper-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-main);
        text-decoration: none;
        display: block;
        margin-bottom: 6px;
    }

    .paper-title:hover {
        text-decoration: underline;
    }

    .paper-auth {
        font-size: 13px;
        color: var(--text-sub);
        margin-bottom: 8px;
    }

    .paper-tldr {
        font-size: 13px;
        color: var(--text-sub);
        background: transparent;
        padding: 0;
    }

    .paper-links {
        margin-top: 8px;
        font-size: 13px;
    }

    .paper-links a {
        color: var(--text-sub);
        text-decoration: none;
        margin-right: 15px;
    }

    .paper-links a:hover {
        color: var(--accent);
        text-decoration: underline;
    }
    
    a:active {
        color: #87CEEB;
    }

    /* Education */
    .edu-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }

    .edu-card {
        padding: 15px;
        border: 1px solid var(--border);
        border-radius: 0;
    }

    .edu-logo {
        width: 40px;
        height: 40px;
        object-fit: contain;
        margin-bottom: 10px;
        background: #ffffff;
        padding: 4px;
    }

    .edu-deg {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-main);
    }

    .edu-sch {
        font-size: 13px;
        color: var(--text-sub);
    }

    .edu-yr {
        font-size: 12px;
        color: var(--text-sub);
        margin-top: 8px;
    }

    /* Experience */
    .exp-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
    }

    .exp-item:last-child {
        border-bottom: none;
    }

    .exp-logo {
        width: 36px;
        height: 36px;
        object-fit: contain;
        border: 1px solid var(--border);
        padding: 2px;
        background: #ffffff;
    }

    /* Honors */
    ul.honors-list {
        font-size: 14px;
        color: var(--text-sub);
        padding-left: 20px;
    }

    ul.honors-list li {
        padding: 5px 0;
    }

    /* Map */
    .map-widget-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    /* Mobile */
    @media (max-width: 600px) {
        .custom-sidebar {
            flex-direction: column;
            text-align: center;
        }
        
        .paper-entry {
            flex-direction: column;
        }
        
        .paper-thumb {
            width: 100%;
            height: auto;
        }
        
        .social-icons {
            justify-content: center;
        }
    }

    /* Theme Toggle Button in Nav */
    #theme-toggle {
        cursor: pointer;
        font-size: 16px;
        transition: transform 0.2s;
    }

    #theme-toggle:hover {
        transform: scale(1.1);
    }

    [data-theme="light"] .avatar-img {
        background: #f0f0f0;
        padding: 5px;
    }

    [data-theme="light"] .edu-logo, 
    [data-theme="light"] .exp-logo {
        background: #f0f0f0;
    }

    [data-theme="light"] .paper-thumb {
        background: var(--bg-card);
    }

</style>

<nav class="custom-nav">

    <div class="nav-container">

        <a href="#about" class="nav-link">About Me</a>

        <a href="#news" class="nav-link">News</a>

        <a href="#publications" class="nav-link">Publications</a>

        <a href="#techreport" class="nav-link">Tech Reports</a>

        <a href="#blogs" class="nav-link">Blogs</a>

        <a href="#education" class="nav-link">Education</a>

        <a href="#experience" class="nav-link">Experience</a>

        <a href="#honors" class="nav-link">Honors</a>


    </div>

</nav>



<div class="profile-wrapper">



    <aside class="custom-sidebar">

        <div class="avatar-area">

             <img src="images/Junyao_dark_photo.jpg" alt="Avatar" class="avatar-img"> 

        </div>



        <div>

            <h1 class="name-title">Junyao Yang <span>(杨竣尧)</span></h1>

            

            <div class="affil-text">National University of Singapore</div>

            <div class="role-text">Tencent Hunyuan</div>

            <div class="social-icons">

                <a href="mailto:junyaoyang@u.nus.edu" class="s-icon" title="Email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>

                <a href="https://scholar.google.com/citations?hl=en&user=oY6uhJQAAAAJ&view_op=list_works&gmla=ALUCkoUMJix6T2_HpNHTL2p0tzdO_cjIn2_g4yK4169HrMlRbB-6PBgqJdjKVdGzpgXbn_3VnFGz80T7gHxAhts9XVq_C6FFhRN_6UcK5C8lpfBpi4oVz3q6s-41w6FwOLc_YJSkE7SWFP8" class="s-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg></a>

                <a href="https://github.com/jyyang26" class="s-icon" title="Github"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>

                <a href="https://drive.google.com/file/d/17UEE4NB9HbyNba8TwQ5oO3y3Tu7hwhZm/view?usp=sharing" class="s-icon" title="Curriculum Vitae">

                    <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>

                </a>

                <a href="https://www.linkedin.com/in/junyao-yang-371282301/" class="s-icon" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>

            </div>

        </div>

    </aside>



    <main class="custom-content">



        <section id="about" class="content-box">

            <div class="box-header">
                <h2 class="box-title">About Me</h2>
            </div>

            <div style="font-size: 14px; line-height: 1.8; color: var(--text-sub);">

                Hi there, this is Junyao Yang. I am a graduate student at the School of Computing, National University of Singapore (NUS), where I am pursuing a specialization in Artificial Intelligence. My research interests lie in <strong>Natural Language Processing</strong>, <strong>Explainable Artificial Intelligence</strong> and <strong>Trustworthy Machine Learning</strong>.

                <br><br>

                My research story revolves around <strong>the Underlying Principles and Understanding of Artificial Intelligence</strong>, particularly focusing on how to enhance the <strong>"Robustness"</strong> and <strong>"Safety"</strong> of LLM-generated information and understand the <strong>Interpretability</strong> of model mechanisms, which connects to related areas such as <strong>Trustworthy LLM</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>, <strong><a href="https://arxiv.org/abs/2502.18517">EMNLP 2025 Main</a></strong>] and <strong>Agent</strong> [<strong><a href="https://arxiv.org/abs/2601.15075">Agentic Attribution</a></strong>, <strong><a href="https://arxiv.org/abs/2601.15075">AgentDoG</a></strong>], <strong>Reasoning Model Merging</strong> [<strong><a href="https://arxiv.org/abs/2508.03140">AAAI 2026</a></strong>, <strong><a href="https://arxiv.org/abs/2601.18491">ACL 2026 Main</a></strong>] and <strong>Malicious Attacks</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>].

            </div>

        </section>



        <section id="news" class="content-box">

             <div class="box-header">
                <h2 class="box-title">News</h2>
            </div>

            <ul class="news-list">

            <li><span class="news-tag">2026.04</span> First-Author paper <a href="https://arxiv.org/abs/2601.05560">ReasonAny</a> accepted to <strong>ACL 2026 Main</strong>.</li>
            
            <li><span class="news-tag">2026.02</span> Blog post: <strong><a href="blogs/reasoning_token.html">The Entropy-Gradient Inversion</a></strong>. R1/o1-like reasoning models exhibit significant negative correlations between gradient strength and token entropy, emerging rapidly within the first 200 steps of SFT.</li>

            <li><span class="news-tag">2026.01</span> Tech report: <strong><a href="https://arxiv.org/abs/2601.18491">AgentDoG</a></strong>! State-of-the-art diagnostic guardrail framework with an Agentic XAI attribution module.</li>

            <li><span class="news-tag">2026.01</span> Paper: <strong><a href="https://arxiv.org/pdf/2601.15075">Agentic Attribution</a></strong>! A hierarchical framework to unveil internal factors driving LLM-based agent actions.</li>

                <li><span class="news-tag">2026.01</span> Attending <strong>AAAI 2026 at Singapore during Jan 20-27, 2026</strong>.</li>

                <li><span class="news-tag">2026.01</span> Paper: <strong><a href="https://arxiv.org/abs/2601.05560">ReasonAny</a></strong>! Contrastive gradient identification to resolve destructive performance collapse in model merging.</li>

                <li><span class="news-tag">2025.11</span> First-Author paper <a href="https://arxiv.org/abs/2508.03140">RCP-Merging</a> accepted to <strong>AAAI 2026 Main Track</strong>.</li>

                <li><span class="news-tag">2025.08</span> <a href="https://arxiv.org/abs/2502.18517">RewardDS</a> accepted to <strong>EMNLP 2025 Main</strong>.</li>

                <li><span class="news-tag">2025.08</span> Joined <a href="https://ai45.shlab.org.cn/">Shanghai AI Lab</a> as a Research Intern, advised by <a href="https://shenqildr.github.io/">Dongrui Liu</a>.</li>

                <li><span class="news-tag">2025.08</span> New work: <a href="https://arxiv.org/abs/2508.03140">RCP-Merging</a>! Integrating long CoT capability into domain-specific LLMs.</li>

                <li><span class="news-tag">2025.05</span> Passed undergraduate thesis defense.</li>

                <li><span class="news-tag">2025.05</span> Co-First-Author paper <a href="https://arxiv.org/abs/2406.01394">PrivacyRestore</a> accepted to <strong>ACL 2025 Main</strong>.</li>

                <li><span class="news-tag">2025.02</span> New papers: <strong><a href="https://arxiv.org/abs/2502.18517">RewardDS</a></strong> and <strong><a href="https://arxiv.org/abs/2406.01394">PrivacyRestore</a></strong>.</li>

                <li><span class="news-tag">2024.07</span> Joined <a href="https://github.com/ZeroNLP">ZeroNLP</a> as a Research Assistant, advised by Prof. <a href="https://ziqianzeng.github.io/">Ziqian Zeng</a>.</li>

                <li><span class="news-tag">2024.07</span> Completed internship at Tencent as a machine learning intern.</li>

                <li><span class="news-tag">2024.07</span> <strong>Contextless CS</strong> reached <strong>20,000 DAU</strong>.</li>

                <li><span class="news-tag">2024.04</span> Joined Tencent as a machine learning intern.</li>

                <li><span class="news-tag">2024.03</span> Completed internship at ShenZhen Stock Exchange as a machine learning intern.</li>

            </ul>

        </section>



        <section id="publications" class="content-box">

            <div class="box-header">
                <h2 class="box-title">Publications & Preprints</h2>
            </div>



            <div class="paper-entry">

                <div class="paper-thumb">

                    <a href="https://arxiv.org/abs/2601.05560"><img src="images/ReasonAny_main_fig.png" alt="Paper Image"></a>

                </div>

                <div class="paper-info">

                    <span class="paper-venue">ACL 2026 Main</span>

                    <a href="https://arxiv.org/abs/2601.05560" class="paper-title">ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging</a>

                    <div class="paper-auth">

                        <strong><u>Junyao Yang</u></strong>, Chen Qian, Dongrui Liu<sup>&dagger;</sup>, Wen Shen, Yong Liu<sup>&dagger;</sup>, Jing Shao<sup>&dagger;</sup>

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

                        Chen Qian, Peng Wang, Dongrui Liu<sup>&dagger;</sup>, <strong><u>Junyao Yang</u></strong>, Dadi Guo, Ling Tang, Jilin Mei, Qihan Ren, Shuai Shao, Yong Liu, Jie Fu, Jing Shao, Xia Hu

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

                        <strong><u>Junyao Yang</u></strong>, Jianwei Wang, Huiping Zhuang, Cen Chen, Ziqian Zeng*<sup>&dagger;</sup>

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

                         Jianwei Wang, Chengming Shi, <strong><u>Junyao Yang</u></strong>, Haoran Li, Qianli Ma, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>&dagger;</sup>

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

                          <a href="https://huggingface.co/papers/date/2026-01-28">#1 Paper of the day</a>

                          <a href="https://mp.weixin.qq.com/s/gGcM_fBGnRCoGe4mxZZePw">机器之心</a>

                      </div>

                  </div>

              </div>

              

              
            

        </section>

        

        <section id="blogs" class="content-box">
            <div class="box-header">
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
                <h2 class="box-title">Experience</h2>
            </div>


             <div style="display: flex; flex-direction: column; gap: 10px;">

                    <div class="exp-item">

                    <img src="images/tencent_hunyuan.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 600; font-size: 15px; color: var(--text-main);">Tencent Hunyuan</div>

                        <div style="font-size: 14px; color: var(--text-sub);">Research Intern | 2026.04 - Present</div>

                    </div>

                </div>

                <div class="exp-item">

                    <img src="images/ailab.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 600; font-size: 15px; color: var(--text-main);">Shanghai AI Lab</div>

                        <div style="font-size: 14px; color: var(--text-sub);">Research Intern | 2025.06 - 2026.04</div>

                    </div>

                </div>

                <div class="exp-item">

                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 600; font-size: 15px; color: var(--text-main);">South China University of Technology</div>

                        <div style="font-size: 14px; color: var(--text-sub);">Research Intern | 2024.07 - 2025.06</div>

                    </div>

                </div>

                <div class="exp-item">

                    <img src="images/Tencent.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 600; font-size: 15px; color: var(--text-main);">Tencent</div>

                        <div style="font-size: 14px; color: var(--text-sub);">Machine Learning Intern | 2024.04 - 2024.07</div>

                    </div>

                </div>



                <div class="exp-item">

                    <img src="images/SZSE.png" class="exp-logo">

                    <div>

                        <div style="font-weight: 600; font-size: 15px; color: var(--text-main);">SZSE</div>

                        <div style="font-size: 13px; color: var(--text-sub);">Machine Learning Intern | 2024.01 - 2024.04</div>

                    </div>

                </div>

            </div>

        </section>

        

        <section id="honors" class="content-box">

            <div class="box-header">
                <h2 class="box-title">Honor & Awards</h2>
            </div>

            <ul class="honors-list">

                <li>Excellent Graduation Thesis (2025.06)</li>

                <li>Outstanding Student Leader (2022-2024)</li>

                <li>Second-Class Scholarship of SCUT (2024.10)</li>

                <li>Second-Class Award in CUMCM at Guangdong Province (2022.09)</li>

                <li>Second-Prize of Olympic Mathematics Competition (2020.05)</li>

                <li>Second-Prize of Olympic Physics Competition (2020.02)</li>
            </ul>

        </section>



        <section id="visitor-map" class="content-box">

            <div class="box-header">
                <h2 class="box-title">Page Views</h2>
            </div>

            <div class="map-widget-container" style="width: 33.33%; display: flex; justify-content: center;">
                <script type='text/javascript' id='clstr_globe' src='//clustrmaps.com/globe.js?d=fHE-8Jdi8dG4h8kH9bKTC8OPRf52B9shV3EzW7J6MMc'></script>
            </div>

        </section>



    </main>

</div>

<script>
    // Theme toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
        }
        
        toggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeIcon.textContent = '☀️';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.textContent = '🌙';
            }
        });
    });
</script>
