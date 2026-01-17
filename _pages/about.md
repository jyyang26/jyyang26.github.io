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
    /* 全局变量与基础设置 - 营造高级感的关键 */
    :root {
        --accent-color: #4a729a; /* 替换原本刺眼的亮色，使用沉稳的蓝灰色 */
        --text-color: #333333;
        --bg-secondary: #f8f9fa; /* 极淡的灰背景 */
        --border-color: #eaeaea;
        --card-shadow: 0 8px 24px rgba(0, 0, 0, 0.04); /* 弥散阴影 */
        --hover-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: var(--text-color);
        line-height: 1.6;
    }

    a {
        color: var(--accent-color);
        text-decoration: none;
        transition: color 0.2s;
    }
    
    a:hover {
        color: #2c4a68;
        text-decoration: underline;
    }

    /* 标题样式微调 */
    h1, h2, h3 {
        font-weight: 600;
        letter-spacing: -0.02em;
        margin-top: 1.5em;
        margin-bottom: 0.8em;
    }

    /* --- News 模块美化 (时间轴风格) --- */
    .news-container {
        max-height: 350px;
        overflow-y: auto;
        padding-right: 10px;
        /* 自定义滚动条样式 */
        scrollbar-width: thin; 
        scrollbar-color: #ccc #f0f0f0;
    }
    
    .news-container::-webkit-scrollbar {
        width: 4px;
    }
    .news-container::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }
    .news-container::-webkit-scrollbar-track {
        background-color: #f0f0f0;
    }

    .news-list {
        list-style: none;
        padding-left: 15px;
        border-left: 2px solid #eee; /* 左侧时间轴线 */
        margin: 0;
    }

    .news-list li {
        position: relative;
        margin-bottom: 18px;
        padding-left: 15px;
        font-size: 0.95em;
    }

    /* 时间轴上的小圆点 */
    .news-list li::before {
        content: '';
        position: absolute;
        left: -20px; /* 调整圆点位置以对齐线 */
        top: 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--accent-color);
        border: 2px solid #fff;
    }

    /* --- 论文卡片 (Paper Card) --- */
    .paper-card {
        display: flex;
        flex-direction: column; /* 移动端优先 */
        margin-bottom: 24px;
        padding: 20px;
        border-radius: 12px;
        background-color: #fff;
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;
    }

    @media (min-width: 768px) {
        .paper-card {
            flex-direction: row;
        }
    }

    .paper-card:hover {
        box-shadow: var(--card-shadow);
        transform: translateY(-2px);
        border-color: transparent;
    }

    .paper-img-box {
        width: 100%;
        margin-bottom: 15px;
        flex-shrink: 0;
    }
    
    @media (min-width: 768px) {
        .paper-img-box {
            width: 180px;
            margin-bottom: 0;
            margin-right: 24px;
        }
    }

    .paper-img {
        width: 100%;
        height: auto;
        border-radius: 6px;
        border: 1px solid #f0f0f0;
        display: block;
    }

    .paper-content {
        flex: 1;
    }

    .paper-title {
        font-size: 1.05em;
        font-weight: 700;
        color: var(--accent-color) !important;
        display: block;
        margin-bottom: 6px;
    }

    .tldr-box {
        background-color: var(--bg-secondary);
        border-radius: 6px;
        padding: 10px 14px;
        color: #666;
        font-size: 0.85em;
        margin-top: 10px;
        line-height: 1.5;
    }
    
    .link-row {
        margin-top: 10px;
        font-size: 0.85em;
    }
    
    .link-sep {
        margin: 0 8px;
        color: #ddd;
    }

    /* --- 教育与经历卡片 (Flex布局替代Float) --- */
    .info-card {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 15px 0;
        border-bottom: 1px dashed #eee;
    }
    
    .info-card:last-child {
        border-bottom: none;
    }

    .info-text {
        flex: 1;
        padding-right: 20px;
    }
    
    .info-logo {
        flex-shrink: 0;
        width: 70px; /* 稍微调小Logo显得更精致 */
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 8px;
        padding: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        border: 1px solid #fafafa;
    }

    .info-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>

👋 Hi there, my name is Junyao Yang. I am a graduate student at the School of Computing, National University of Singapore (NUS), where I am pursuing a specialization in Artificial Intelligence. My research interests lie in **Natural Language Processing**, **Explainable Artificial Intelligence** and **Trustworthy Machine Learning**. Here is my **[CV](https://drive.google.com/file/d/17UEE4NB9HbyNba8TwQ5oO3y3Tu7hwhZm/view?usp=sharing)**.

My research story revolves around **the Underlying Principles and Understanding of Artificial Intelligence**, particularly focusing on how to enhance the **"Robustness"** and **"Safety"** of LLM-generated information and understand the **Interpretability** of model mechanisms, which connects to related areas such as **Trustworthy LLM** [**[ACL 2025 Main](https://arxiv.org/abs/2406.01394)**, **[EMNLP 2025 Main](https://arxiv.org/abs/2502.18517)**], **Reasoning Model Merging** [**[AAAI 2026](https://arxiv.org/abs/2508.03140)**, **[ReasonAny](https://arxiv.org/abs/2601.05560)**] and **Malicious Attacks** [**[ACL 2025 Main](https://arxiv.org/abs/2406.01394)**], of LLMs and so on:

- **Trustworthy Artificial Intelligence**
- **Large Language Models Reasoning**

 # 🔥 News {#news}

<div class="news-container">
  <ul class="news-list">
    <li>
    [2026.01]  🏄‍♂️🏄‍♂️ I will attend <strong>AAAI 2026 at Singapore during Jan 20-27</strong>, 2026. Let’s connect!
      </li>
    <li>
      [2026.01] 🚀🚀 Please check our latest paper: <strong><a href="https://arxiv.org/abs/2601.05560">ReasonAny</a></strong>! ReasonAny employs contrastive gradient identification to resolve destructive performance collapse, effectively merging reasoning capabilities into domain-specific models.
    </li>
    <li>
      [2025.11] 🎉🎉 <strong>First-Author paper</strong> <a href="https://arxiv.org/abs/2508.03140"><strong>RCP-Merging</strong></a> has been accepted to <strong>AAAI 2026 Main Track</strong>! See you in Singapore!
    </li>
    <li>
      [2025.08] 🎉🎉 <a href="https://arxiv.org/abs/2502.18517"><strong>RewardDS</strong></a> has been accepted to <strong>EMNLP 2025 Main</strong>!
    </li>
    <li>
      [2025.08] I joined <a href="https://ai45.shlab.org.cn/">Shanghai AI Lab</a> as a Research Intern, advised by <a href="https://shenqildr.github.io/">Dongrui Liu</a>.
    </li>
    <li>
      [2025.08] 🚀🚀 Check out my latest work: <strong><a href="https://arxiv.org/abs/2508.03140"><strong>RCP-Merging</strong></a></strong>! This novel framework integrates long CoT capability into domain-specific LLMs without sacrificing their performance in the original domain!
    </li>
    <li>
      [2025.05] 🎉🎉 Successfully passed my undergraduate thesis defense!
    </li>
    <li>
      [2025.05] 🎉🎉 <strong>Co-First-Author paper</strong> <a href="https://arxiv.org/abs/2406.01394"><strong>PrivacyRestore</strong></a> has been accepted to <strong>ACL 2025 Main</strong>! Deeply grateful to my mentor Ziqian and collaborator Jianwei! See you in Vienna!
    </li>
    <li>
      [2025.02] 🚀🚀 Please check our newest papers: <strong><a href="https://arxiv.org/abs/2502.18517">RewardDS</a></strong> and <strong><a href="https://arxiv.org/abs/2406.01394">PrivacyRestore</a></strong>! Thanks to the help of other collaborators.
    </li>
    <li>
      [2024.07] I joined <a href="https://github.com/ZeroNLP">ZeroNLP</a> as a Research Assistant, advised by Prof. <a href="https://ziqianzeng.github.io/">Ziqian Zeng</a>.
    </li>
    <li>
      [2024.07] I spent a wonderful time at Tencent as a machine learning intern!
    </li>
    <li>
      [2024.07] <strong>Contextless CS</strong> is available now, which reaches <strong>20,000 DAU</strong>! Check my work <strong><a href="https://kf.qq.com/">here</a></strong>!
    </li>
    <li>
      [2024.04] I joined Tencent as a machine learning intern.
    </li>
    <li>
      [2024.03] I spent a wonderful time at ShenZhen Stock Exchange as a machine learning intern!
    </li>
  </ul>
</div>

<br>

# 🧐 Publications {#research}

<div class="paper-card">
  <div class="paper-img-box">
    <a href="https://arxiv.org/abs/2601.05560" style="display: block;">
      <img src="images/ReasonAny_main_fig.png" alt="ReasonAny" class="paper-img">
    </a>
  </div>
  <div class="paper-content">
    <span style="font-size: 0.9em; color: #888;"><strong><em>[arXiv Preprint]</em></strong></span><br>
    <a href="https://arxiv.org/abs/2601.05560" class="paper-title">ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging</a>
    <strong>Junyao Yang</strong>, <em>Chen Qian, Dongrui Liu<sup>*#</sup>, Wen Shen, Yong Liu<sup>*#</sup>, Jing Shao<sup>*#</sup></em><br>

    <div class="tldr-box">
      <strong>TL;DR:</strong> A training-free framework that resolves "destructive performance collapse" by identifying that reasoning relies on low-gradient parameters. It employs Contrastive Gradient Identification to successfully merge robust chain-of-thought capabilities into domain-specific models (Safety, Biomedicine, Finance) without compromising their specialized utility.
    </div>
    
    <div class="link-row">
      <a href="https://arxiv.org/abs/2601.05560">arXiv</a>
      <span class="link-sep">/</span>
      <a href="https://github.com/jyyang26/ReasonAny">Code</a>
    </div>
  </div>
</div>

<div class="paper-card">
  <div class="paper-img-box">
    <a href="https://arxiv.org/abs/2508.03140" style="display: block;">
      <img src="images/rcp.png" alt="rcp" class="paper-img">
    </a>
  </div>
  <div class="paper-content">
    <span style="font-size: 0.9em; color: #888;"><strong>[AAAI 2026 Main Track]</strong></span><br>
    <a href="https://arxiv.org/abs/2508.03140" class="paper-title">RCP-Merging: Merging Long Chain-of-Thought Models with Domain-Specific Models by Considering Reasoning Capability as Prior</a>
    <strong>Junyao Yang</strong>, <em>Jianwei Wang, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>*#</sup></em><br>

    <div class="tldr-box">
      <strong>TL;DR:</strong> A model merging framework that integrates domain-specific models with reasoning models by treating reasoning capabilities as a prior, enhancing domain performance while preserving chain-of-thought reasoning abilities.
    </div>
    
    <div class="link-row">
      <a href="https://arxiv.org/abs/2508.03140">arXiv</a>
      <span class="link-sep">/</span>
      <a href="https://github.com/ZeroNLP/RCP-Merging">Code</a>
    </div>
  </div>
</div>

<div class="paper-card">
  <div class="paper-img-box">
    <a href="https://arxiv.org/abs/2406.01394" style="display: block;">
      <img src="images/restore.png" alt="restore" class="paper-img">
    </a>
  </div>
  <div class="paper-content">
    <span style="font-size: 0.9em; color: #888;"><strong>[ACL 2025 Main]</strong></span><br>
    <a href="https://arxiv.org/abs/2406.01394" class="paper-title">PrivacyRestore: Privacy-Preserving Inference in Large Language Models via Privacy Removal and Restoration</a>
    <em>Ziqian Zeng<sup>*#</sup>, Jianwei Wang<sup>*</sup>, <strong>Junyao Yang<sup>*</sup></strong>, Zhengdong Lu, Haoran Li, Huiping Zhuang, Cen Chen</em><br>

    <div class="tldr-box">
      <strong>TL;DR:</strong> A privacy-preserving inference framework that removes privacy information from user inputs and restores them on the server via activation steering using a protected meta-vector, ensuring data privacy without retraining.
    </div>
    
    <div class="link-row">
      <a href="https://arxiv.org/abs/2406.01394">arXiv</a>
      <span class="link-sep">/</span>
      <a href="https://github.com/ZeroNLP/PrivacyRestore">Code</a>
    </div>
  </div>
</div>

<div class="paper-card">
  <div class="paper-img-box">
    <a href="https://arxiv.org/abs/2502.18517" style="display: block;">
      <img src="images/rewardds.png" alt="rewardds" class="paper-img">
    </a>
  </div>
  <div class="paper-content">
    <span style="font-size: 0.9em; color: #888;"><strong>[EMNLP 2025 Main]</strong></span><br>
    <a href="https://arxiv.org/abs/2502.18517" class="paper-title">RewardDS: Privacy-Preserving Fine-Tuning for Large Language Models via Reward Driven Data Synthesis</a>
    <em>Jianwei Wang, Chengming Shi, <strong>Junyao Yang</strong>, Haoran Li, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>#</sup></em><br>
    
    <div class="tldr-box">
      <strong>TL;DR:</strong> A privacy-preserving fine-tuning framework that improves synthetic data quality by using a client-side reward model to filter and refine generated data, mitigating noise while protecting private information.
    </div>
    
    <div class="link-row">
      <a href="https://arxiv.org/abs/2502.18517">arXiv</a>
      <span class="link-sep">/</span>
      <a href="https://github.com/wjw136/RewardDS">Code</a>
    </div>
  </div>
</div>

<span style="color: #999; font-size: 0.85em;"><sub>(<sup>\*</sup> co-author, <sup>#</sup> correspondence author)</sub></span>


✏️ Education {#education}
======

<div class="info-card">
    <div class="info-text">
        - **National University of Singapore**, Singapore <br>
          M.S. in Artificial Intelligence <br>
          2025 ~ 2027 (expected) <br>
    </div>
    <div class="info-logo">
        <img src="images/NUS.jpg" alt="NUS">
    </div>
</div>

<div class="info-card">
    <div class="info-text">
        - **South China University of Technology**, Guangzhou, China  <br>
          B.E. in Computer Science Union Class (top 30 students in undergraduates)  <br>
          2021 ~ 2025
    </div>
    <div class="info-logo">
        <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" alt="SCUT">
    </div>
</div>

<div class="info-card">
    <div class="info-text">
        - **Shenzhen Experimental School**, Shenzhen, China  <br>
          High School Diploma  <br>
          2018 ~ 2021
    </div>
    <div class="info-logo">
        <img src="images/SZSY_Logo.png" alt="SZSY">
    </div>
</div>


💻 Experience {#experience}
======

<div class="info-card">
    <div class="info-text">
        - 2025.06 ~ Present, Research Intern, Shanghai AI Lab <br>
          Supervisor: [Dongrui Liu](https://shenqildr.github.io/), Collaborator: [Chen Qian](https://scholar.google.com/citations?user=knR4ZusAAAAJ&hl=en), Shanghai, China. <br>
          Topics: Trustworthy Machine Learning & LLM Reasoning <br>
    </div>
    <div class="info-logo">
        <img src="images/ailab.png" alt="ailab">
    </div>
</div>

<div class="info-card">
    <div class="info-text">
        - 2024.07 ~ Present, Research Intern, South China University of Technology <br>
          Supervisor: Prof. [Ziqian Zeng](https://ziqianzeng.github.io/), Collaborator: [Jianwei Wang](https://scholar.google.com/citations?user=eRFVxQ8AAAAJ&hl=zh-CN), [Haoran Li](https://hlibt.student.ust.hk/), Guangzhou, China. <br>
          Topics: LLM Privacy & Reasoning <br>
    </div>
    <div class="info-logo">
        <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" alt="SCUT">
    </div>
</div>

<div class="info-card">
    <div class="info-text">
        - 2024.04 ~ 2024.07, Machine Learning Intern, **[Tencent](https://kf.qq.com/)**, Shenzhen, China. <br>
          Topics: LLM Deployment & Fine-Tuning <br>
    </div>
    <div class="info-logo">
        <img src="images/Tencent.png" alt="Tencent">
    </div>
</div>

<div class="info-card">
    <div class="info-text">
        - 2024.01 ~ 2024.04, Machine Learning Intern, **[SZSE](https://www.szse.cn/English/index.html)**, Shenzhen, China. <br>
          Topics: LLM Acceleration & Memory Optimizing  <br>
    </div>
    <div class="info-logo">
        <img src="images/SZSE.png" alt="szse">
    </div>
</div>

<div class="info-card">
    <div class="info-text">
        - 2023.06 ~ 2024.08, Research Intern, South China University of Technology <br>
          Supervisor: Prof. [Guanglong Du](https://www2.scut.edu.cn/duguanglong/), Guangzhou, China. <br>
          Topics: Reinforcement Learning & UAV Navigation <br>
    </div>
    <div class="info-logo">
        <img src="images/South_China_University_of_Technology_Logo_(Since_2022).svg.png" alt="SCUT">
    </div>
</div>


🎖️ Honor and Awards {#honor}
======
- [2025.06] Excellent Graduation Thesis
-	[2024.10] Second-Class Scholarship of South China University of Technology
- [2024.11 & 2023.11 & 2022.11] Outstanding Student Leader 
- [2024.11 & 2023.11 & 2022.11] Merit Student 
- [2023.05] Outstanding Student Union Member
- [2022.10] Third-Class Scholarship of South China University of Technology
- [2022.09] Second-Class Award in CUMCM at Guangdong Province 

📘 Patents
======
**An Intelligent Obstacle Avoidance and Destination Landing Unmanned Aerial Vehicles Based on Multi-Layer Neural Networks**<br>
*Guanglong Du, Xiaojian Qiu, **Junyao Yang**, Jiancheng Li, Xueqian Wang, Xiaojun Zhu* (Student First Author)<br>
2023.08  Publication Number: CN117170403A  


<br>
<div style="width: 180px; margin: 40px auto; text-align: center; opacity: 0.8;">
  <script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=fHE-8Jdi8dG4h8kH9bKTC8OPRf52B9shV3EzW7J6MMc&cl=ffffff&w=a"></script>
</div>
