---
permalink: /
title: "Junyao Yang(杨竣尧) @AAAI 2026"
layout: single
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---


<style>
    /* --- 核心变量定义：模仿目标图片的配色与质感 --- */
    :root {
        --primary-color: #4361ee; /* 图片中的亮蓝色按钮 */
        --bg-color: #f3f6fc;      /* 柔和的淡蓝灰背景 */
        --card-bg: #ffffff;
        --text-main: #2b2d42;
        --text-secondary: #6c757d;
        --border-radius: 20px;    /* 大圆角 */
        --shadow: 0 10px 30px -10px rgba(0,0,0,0.08); /* 柔和的高级阴影 */
        --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* 容器设置：打破默认Jekyll宽度限制（如果是宽屏）并设定背景 */
    body {
        background-color: var(--bg-color);
        font-family: var(--font-family);
        color: var(--text-main);
    }

    /* 主布局容器 */
    .profile-container {
        display: flex;
        flex-direction: column;
        gap: 40px;
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
    }

    /* 桌面端切换为双栏布局 */
    @media (min-width: 960px) {
        .profile-container {
            flex-direction: row;
            align-items: flex-start;
        }
    }

    /* --- 左侧边栏 (Sidebar) --- */
    .sidebar {
        width: 100%;
        background: var(--card-bg);
        border-radius: var(--border-radius);
        padding: 40px 30px;
        box-shadow: var(--shadow);
        text-align: center;
        position: sticky;
        top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    @media (min-width: 960px) {
        .sidebar {
            width: 320px;
            flex-shrink: 0;
        }
    }

    /* 模拟头像 (使用首字母，因为原内容没有个人头像) */
    .avatar-placeholder {
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
        box-shadow: 0 8px 20px rgba(67, 97, 238, 0.2);
    }

    .sidebar-name {
        font-size: 24px;
        font-weight: 800;
        margin: 0;
        color: #1a1a1a;
    }

    .sidebar-role {
        font-size: 15px;
        color: var(--primary-color);
        font-weight: 600;
        margin-bottom: 5px;
    }

    .sidebar-affil {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.4;
    }

    /* 模仿图片中的 Download CV 按钮 */
    .btn-cv {
        margin-top: 15px;
        background-color: var(--primary-color);
        color: white !important;
        padding: 12px 30px;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .btn-cv:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
        text-decoration: none;
    }

    /* 访客地图容器 */
    .map-widget {
        margin-top: 30px;
        opacity: 0.8;
        width: 100%;
        overflow: hidden;
    }

    /* --- 右侧内容区 (Main Content) --- */
    .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 30px;
        min-width: 0; /* 防止Flex子项溢出 */
    }

    /* 通用卡片样式 */
    .content-card {
        background: var(--card-bg);
        padding: 30px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
    }

    .section-title {
        font-size: 18px;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #1a1a1a;
    }

    .section-title::before {
        content: '';
        display: block;
        width: 6px;
        height: 24px;
        background: var(--primary-color);
        border-radius: 3px;
    }

    /* Bio 文本 */
    .bio-text {
        font-size: 16px;
        line-height: 1.7;
        color: #4a4a4a;
    }
    
    .bio-text a {
        color: var(--primary-color);
        font-weight: 500;
        text-decoration: none;
    }
    .bio-text a:hover { text-decoration: underline; }

    /* --- 教育卡片 (Grid布局) - 模仿图片中的 Education --- */
    .edu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
    }

    .edu-item {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 16px;
        border: 1px solid #eee;
        transition: transform 0.2s;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .edu-item:hover {
        transform: translateY(-3px);
        border-color: var(--primary-color);
    }

    .edu-icon {
        width: 48px;
        height: 48px;
        margin-bottom: 15px;
        object-fit: contain;
        background: white;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .edu-degree {
        font-weight: 700;
        font-size: 15px;
        color: #2b2d42;
        margin-bottom: 5px;
        line-height: 1.3;
    }

    .edu-school {
        font-size: 13px;
        color: #6c757d;
        margin-bottom: 5px;
    }
    
    .edu-date {
        font-size: 12px;
        color: #adb5bd;
        margin-top: auto;
    }

    /* --- News 模块 --- */
    .news-box {
        max-height: 300px;
        overflow-y: auto;
        padding-right: 10px;
        scrollbar-width: thin;
    }
    .news-box ul {
        padding-left: 20px;
        margin: 0;
        list-style: none;
        border-left: 2px solid #e9ecef;
    }
    .news-box li {
        position: relative;
        margin-bottom: 15px;
        font-size: 14px;
        color: #555;
    }
    .news-box li::before {
        content: '';
        position: absolute;
        left: -26px;
        top: 6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--primary-color);
        border: 2px solid white;
    }

    /* --- 论文列表 (Paper) --- */
    .paper-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px dashed #eee;
    }
    
    .paper-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

    @media (min-width: 768px) {
        .paper-item { flex-direction: row; gap: 20px; }
    }

    .paper-img-container {
        width: 100%;
        max-width: 160px;
        flex-shrink: 0;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #eee;
    }
    
    .paper-img {
        width: 100%;
        height: auto;
        display: block;
    }

    .paper-details { flex: 1; }
    
    .paper-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--primary-color) !important;
        text-decoration: none;
        display: block;
        margin-bottom: 5px;
    }

    .paper-venue {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #2b2d42;
        background: #e9ecef;
        padding: 2px 6px;
        border-radius: 4px;
        margin-right: 8px;
    }

    .tldr {
        background: #f8f9fa;
        padding: 10px;
        border-radius: 8px;
        font-size: 13px;
        color: #666;
        margin-top: 8px;
        line-height: 1.5;
    }

    /* --- 经历列表 (Experience) --- */
    .exp-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .exp-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px;
        border-radius: 10px;
        transition: background 0.2s;
    }
    
    .exp-item:hover {
        background: #f8f9fa;
    }

    .exp-logo {
        width: 50px;
        height: 50px;
        object-fit: contain;
        background: white;
        padding: 4px;
        border-radius: 8px;
        border: 1px solid #eee;
        flex-shrink: 0;
    }

    .exp-content { font-size: 14px; color: #444; }
    .exp-content strong { color: #1a1a1a; display: block; font-size: 15px; margin-bottom: 2px;}

    /* 荣誉和专利 */
    .simple-list li {
        margin-bottom: 8px;
        color: #555;
        font-size: 14px;
    }

</style>

<div class="profile-container">

    <aside class="sidebar">
        <div class="avatar-placeholder">JY</div>
        
        <h1 class="sidebar-name">Junyao Yang<br>(杨竣尧)</h1>
        
        <div class="sidebar-role">AI Graduate Student</div>
        <div class="sidebar-affil">
            School of Computing<br>
            National University of Singapore (NUS)
        </div>

        <a href="https://drive.google.com/file/d/17UEE4NB9HbyNba8TwQ5oO3y3Tu7hwhZm/view?usp=sharing" class="btn-cv">
            Download CV
        </a>

        <div style="margin-top: 20px; font-size: 13px; color: #888;">
            Research Interests:<br>
            <span style="color: #4361ee; font-weight: 500;">NLP, XAI, Trustworthy ML</span>
        </div>

        <div class="map-widget">
             <script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=fHE-8Jdi8dG4h8kH9bKTC8OPRf52B9shV3EzW7J6MMc&cl=ffffff&w=a"></script>
        </div>
    </aside>

    <main class="main-content">

        <div class="content-card">
            <h2 class="section-title">Professional Summary</h2>
            <div class="bio-text">
                👋 Hi there, my name is Junyao Yang. I am a graduate student at the School of Computing, National University of Singapore (NUS), where I am pursuing a specialization in Artificial Intelligence. My research interests lie in <strong>Natural Language Processing</strong>, <strong>Explainable Artificial Intelligence</strong> and <strong>Trustworthy Machine Learning</strong>.
                <br><br>
                My research story revolves around <strong>the Underlying Principles and Understanding of Artificial Intelligence</strong>, particularly focusing on how to enhance the <strong>"Robustness"</strong> and <strong>"Safety"</strong> of LLM-generated information and understand the <strong>Interpretability</strong> of model mechanisms, which connects to related areas such as <strong>Trustworthy LLM</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>, <strong><a href="https://arxiv.org/abs/2502.18517">EMNLP 2025 Main</a></strong>], <strong>Reasoning Model Merging</strong> [<strong><a href="https://arxiv.org/abs/2508.03140">AAAI 2026</a></strong>, <strong><a href="https://arxiv.org/abs/2601.05560">ReasonAny</a></strong>] and <strong>Malicious Attacks</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>], of LLMs and so on:
                <ul>
                    <li>Trustworthy Artificial Intelligence</li>
                    <li>Large Language Models Reasoning</li>
                </ul>
            </div>
        </div>

        <div class="content-card">
            <h2 class="section-title">Education</h2>
            <div class="edu-grid">
                <div class="edu-item">
                    <img src="images/NUS.jpg" alt="NUS" class="edu-icon">
                    <div class="edu-degree">M.S. in Artificial Intelligence</div>
                    <div class="edu-school">National University of Singapore</div>
                    <div class="edu-date">2025 ~ 2027 (expected)</div>
                </div>
                <div class="edu-item">
                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" alt="SCUT" class="edu-icon">
                    <div class="edu-degree">B.E. in Computer Science</div>
                    <div class="edu-school">South China University of Technology</div>
                    <div class="edu-date">2021 ~ 2025</div>
                </div>
                <div class="edu-item">
                    <img src="images/SZSY_Logo.png" alt="SZSY" class="edu-icon">
                    <div class="edu-degree">High School Diploma</div>
                    <div class="edu-school">Shenzhen Experimental School</div>
                    <div class="edu-date">2018 ~ 2021</div>
                </div>
            </div>
        </div>

        <div class="content-card">
            <h2 class="section-title">News</h2>
            <div class="news-box">
                <ul>
                    <li>[2026.01] 🏄‍♂️🏄‍♂️ I will attend <strong>AAAI 2026 at Singapore during Jan 20-27</strong>, 2026. Let’s connect!</li>
                    <li>[2026.01] 🚀🚀 Please check our latest paper: <strong><a href="https://arxiv.org/abs/2601.05560" style="text-decoration: underline; color: #52ADC8;">ReasonAny</a></strong>! ReasonAny employs contrastive gradient identification to resolve destructive performance collapse, effectively merging reasoning capabilities into domain-specific models.</li>
                    <li>[2025.11] 🎉🎉 <strong>First-Author paper</strong> <a href="https://arxiv.org/abs/2508.03140" style="text-decoration: underline; color: #52ADC8;"><strong>RCP-Merging</strong></a> has been accepted to <strong>AAAI 2026 Main Track</strong>! See you in Singapore!</li>
                    <li>[2025.08] 🎉🎉 <a href="https://arxiv.org/abs/2502.18517" style="text-decoration: underline; color: #52ADC8;"><strong>RewardDS</strong></a> has been accepted to <strong>EMNLP 2025 Main</strong>!</li>
                    <li>[2025.08] I joined <a href="https://ai45.shlab.org.cn/" style="text-decoration: underline; color: #52ADC8;">Shanghai AI Lab</a> as a Research Intern, advised by <a href="https://shenqildr.github.io/" style="text-decoration: underline; color: #52ADC8;">Dongrui Liu</a>.</li>
                    <li>[2025.08] 🚀🚀 Check out my latest work: <strong><a href="https://arxiv.org/abs/2508.03140" style="text-decoration: underline; color: #52ADC8;"><strong>RCP-Merging</strong></a></strong>! This novel framework integrates long CoT capability into domain-specific LLMs without sacrificing their performance in the original domain!</li>
                    <li>[2025.05] 🎉🎉 Successfully passed my undergraduate thesis defense!</li>
                    <li>[2025.05] 🎉🎉 <strong>Co-First-Author paper</strong> <a href="https://arxiv.org/abs/2406.01394" style="text-decoration: underline; color: #52ADC8;"><strong>PrivacyRestore</strong></a> has been accepted to <strong>ACL 2025 Main</strong>! Deeply grateful to my mentor Ziqian and collaborator Jianwei! See you in Vienna!</li>
                    <li>[2025.02] 🚀🚀 Please check our newest papers: <strong><a href="https://arxiv.org/abs/2502.18517" style="text-decoration: underline; color: #52ADC8;">RewardDS</a></strong> and <strong><a href="https://arxiv.org/abs/2406.01394" style="text-decoration: underline; color: #52ADC8;">PrivacyRestore</a></strong>! Thanks to the help of other collaborators.</li>
                    <li>[2024.07] I joined <a href="https://github.com/ZeroNLP" style="text-decoration: underline; color: #52ADC8;">ZeroNLP</a> as a Research Assistant, advised by Prof. <a href="https://ziqianzeng.github.io/" style="text-decoration: underline; color: #52ADC8;">Ziqian Zeng</a>.</li>
                    <li>[2024.07] I spent a wonderful time at Tencent as a machine learning intern!</li>
                    <li>[2024.07] <strong>Contextless CS</strong> is available now, which reaches <strong>20,000 DAU</strong>! Check my work <strong><a href="https://kf.qq.com/" style="text-decoration: underline; color: #52ADC8;">here</a></strong>!</li>
                    <li>[2024.04] I joined Tencent as a machine learning intern.</li>
                    <li>[2024.03] I spent a wonderful time at ShenZhen Stock Exchange as a machine learning intern!</li>
                </ul>
            </div>
        </div>

        <div class="content-card">
            <h2 class="section-title">Publications</h2>
            
            <div class="paper-item">
                <div class="paper-img-container">
                    <a href="https://arxiv.org/abs/2601.05560"><img src="images/ReasonAny_main_fig.png" alt="ReasonAny" class="paper-img"></a>
                </div>
                <div class="paper-details">
                    <span class="paper-venue">arXiv Preprint</span>
                    <a href="https://arxiv.org/abs/2601.05560" class="paper-title">ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging</a>
                    <div style="font-size: 14px; margin-bottom: 5px;">
                        <strong>Junyao Yang</strong>, <em>Chen Qian, Dongrui Liu<sup>*#</sup>, Wen Shen, Yong Liu<sup>*#</sup>, Jing Shao<sup>*#</sup></em>
                    </div>
                    <div class="tldr">
                        <strong>TL;DR:</strong> A training-free framework that resolves "destructive performance collapse" by identifying that reasoning relies on low-gradient parameters.
                    </div>
                    <div style="margin-top: 5px; font-size: 13px;">
                        <a href="https://arxiv.org/abs/2601.05560">arXiv</a> / <a href="https://github.com/jyyang26/ReasonAny">Code</a>
                    </div>
                </div>
            </div>

            <div class="paper-item">
                <div class="paper-img-container">
                    <a href="https://arxiv.org/abs/2508.03140"><img src="images/rcp.png" alt="rcp" class="paper-img"></a>
                </div>
                <div class="paper-details">
                    <span class="paper-venue">AAAI 2026 Main</span>
                    <a href="https://arxiv.org/abs/2508.03140" class="paper-title">RCP-Merging: Merging Long Chain-of-Thought Models with Domain-Specific Models by Considering Reasoning Capability as Prior</a>
                    <div style="font-size: 14px; margin-bottom: 5px;">
                        <strong>Junyao Yang</strong>, <em>Jianwei Wang, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>*#</sup></em>
                    </div>
                    <div class="tldr">
                        <strong>TL;DR:</strong> A model merging framework that integrates domain-specific models with reasoning models by treating reasoning capabilities as a prior.
                    </div>
                    <div style="margin-top: 5px; font-size: 13px;">
                        <a href="https://arxiv.org/abs/2508.03140">arXiv</a> / <a href="https://github.com/ZeroNLP/RCP-Merging">Code</a>
                    </div>
                </div>
            </div>

            <div class="paper-item">
                <div class="paper-img-container">
                    <a href="https://arxiv.org/abs/2406.01394"><img src="images/restore.png" alt="restore" class="paper-img"></a>
                </div>
                <div class="paper-details">
                    <span class="paper-venue">ACL 2025 Main</span>
                    <a href="https://arxiv.org/abs/2406.01394" class="paper-title">PrivacyRestore: Privacy-Preserving Inference in Large Language Models via Privacy Removal and Restoration</a>
                    <div style="font-size: 14px; margin-bottom: 5px;">
                         <em>Ziqian Zeng<sup>*#</sup>, Jianwei Wang<sup>*</sup>, <strong>Junyao Yang<sup>*</sup></strong>, Zhengdong Lu, Haoran Li, Huiping Zhuang, Cen Chen</em>
                    </div>
                    <div class="tldr">
                        <strong>TL;DR:</strong> Privacy-preserving inference via activation steering using a protected meta-vector.
                    </div>
                    <div style="margin-top: 5px; font-size: 13px;">
                        <a href="https://arxiv.org/abs/2406.01394">arXiv</a> / <a href="https://github.com/ZeroNLP/PrivacyRestore">Code</a>
                    </div>
                </div>
            </div>

            <div class="paper-item">
                <div class="paper-img-container">
                    <a href="https://arxiv.org/abs/2502.18517"><img src="images/rewardds.png" alt="rewardds" class="paper-img"></a>
                </div>
                <div class="paper-details">
                    <span class="paper-venue">EMNLP 2025 Main</span>
                    <a href="https://arxiv.org/abs/2502.18517" class="paper-title">RewardDS: Privacy-Preserving Fine-Tuning for Large Language Models via Reward Driven Data Synthesis</a>
                    <div style="font-size: 14px; margin-bottom: 5px;">
                         <em>Jianwei Wang, Chengming Shi, <strong>Junyao Yang</strong>, Haoran Li, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>#</sup></em>
                    </div>
                    <div class="tldr">
                        <strong>TL;DR:</strong> Privacy-preserving fine-tuning framework that improves synthetic data quality by using a client-side reward model.
                    </div>
                    <div style="margin-top: 5px; font-size: 13px;">
                        <a href="https://arxiv.org/abs/2502.18517">arXiv</a> / <a href="https://github.com/wjw136/RewardDS">Code</a>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px; font-size: 12px; color: #999;">(<sup>*</sup> co-author, <sup>#</sup> correspondence author)</div>
        </div>

        <div class="content-card">
            <h2 class="section-title">Experience</h2>
            <div class="exp-list">
                <div class="exp-item">
                    <img src="images/ailab.png" alt="ailab" class="exp-logo">
                    <div class="exp-content">
                        <strong>Research Intern @ Shanghai AI Lab</strong>
                        2025.06 ~ Present | Shanghai, China <br>
                        Topic: Trustworthy ML & LLM Reasoning
                    </div>
                </div>
                 <div class="exp-item">
                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" alt="SCUT" class="exp-logo">
                    <div class="exp-content">
                        <strong>Research Intern @ SCUT</strong>
                        2024.07 ~ Present | Guangzhou, China <br>
                        Topic: LLM Privacy & Reasoning
                    </div>
                </div>
                <div class="exp-item">
                    <img src="images/Tencent.png" alt="Tencent" class="exp-logo">
                    <div class="exp-content">
                        <strong>Machine Learning Intern @ Tencent</strong>
                        2024.04 ~ 2024.07 | Shenzhen, China <br>
                        Topic: LLM Deployment & Fine-Tuning
                    </div>
                </div>
                <div class="exp-item">
                    <img src="images/SZSE.png" alt="SZSE" class="exp-logo">
                    <div class="exp-content">
                        <strong>Machine Learning Intern @ SZSE</strong>
                        2024.01 ~ 2024.04 | Shenzhen, China <br>
                        Topic: LLM Acceleration & Memory Optimizing
                    </div>
                </div>
                <div class="exp-item">
                    <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" alt="SCUT" class="exp-logo">
                    <div class="exp-content">
                        <strong>Research Intern @ SCUT</strong>
                        2023.06 ~ 2024.08 | Guangzhou, China <br>
                        Topic: Reinforcement Learning & UAV Navigation
                    </div>
                </div>
            </div>
        </div>

        <div class="content-card">
            <h2 class="section-title">Honor & Awards</h2>
            <ul class="simple-list">
                <li>[2025.06] Excellent Graduation Thesis</li>
                <li>[2024.10] Second-Class Scholarship of South China University of Technology</li>
                <li>[2024.11 & 2023.11 & 2022.11] Outstanding Student Leader</li>
                <li>[2024.11 & 2023.11 & 2022.11] Merit Student</li>
                <li>[2023.05] Outstanding Student Union Member</li>
                <li>[2022.10] Third-Class Scholarship of South China University of Technology</li>
                <li>[2022.09] Second-Class Award in CUMCM at Guangdong Province</li>
            </ul>
            
            <br>
            <h2 class="section-title">Patents</h2>
            <div style="font-size: 14px; color: #555;">
                <strong>An Intelligent Obstacle Avoidance and Destination Landing Unmanned Aerial Vehicles Based on Multi-Layer Neural Networks</strong><br>
                <em>Guanglong Du, Xiaojian Qiu, <strong>Junyao Yang</strong>, Jiancheng Li, Xueqian Wang, Xiaojun Zhu</em> (Student First Author)<br>
                2023.08 | Publication Number: CN117170403A
            </div>
        </div>

    </main>
</div>
