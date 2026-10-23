---
permalink: /
layout: academic-home
sitemap: false
redirect_from:
  - /about/
  - /about.html
---
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Junyao Yang — graduate student at NUS and research intern at Tencent Hy Frontier. Research on terminal agents, recursive self-improvement, reinforcement learning, and trustworthy AI.">
<meta name="theme-color" content="#ffffff">
<title>Junyao Yang · AI Research</title>
<link rel="canonical" href="{{ '/' | absolute_url }}">
<link rel="icon" href="{{ '/images/favicon.ico' | relative_url }}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;650;700;800&display=swap" rel="stylesheet">
<style>
  :root { --bg: #ffffff; --surface: #f9fafb; --ink: #111827; --text: #374151; --muted: #6b7280; --accent: #2563eb; --accent-hover: #1d4ed8; --line: #e5e7eb; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; scroll-padding-top: 100px; }
  body { margin: 0; background: var(--bg); color: var(--text); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.65; -webkit-font-smoothing: antialiased; }
  a { color: var(--accent); text-decoration: none; transition: color .18s ease, background .18s ease, border-color .18s ease, transform .18s ease; }
  a:hover { color: var(--accent-hover); }
  button, summary { font: inherit; cursor: pointer; }
  button { color: inherit; }
  a:focus-visible, button:focus-visible, summary:focus-visible { outline: 3px solid #93c5fd; outline-offset: 4px; border-radius: 4px; }
  ::selection { background: #dbeafe; color: var(--ink); }
  h1, h2, h3, p { margin: 0; }
  h1, h2, h3, strong { color: var(--ink); }
  img { display: block; max-width: 100%; }
  [hidden] { display: none !important; }
  .container { width: min(1080px, calc(100% - 80px)); margin-inline: auto; }
  .skip-link { position: fixed; z-index: 100; top: 12px; left: 12px; padding: 10px 16px; background: var(--ink); color: white; transform: translateY(-160%); }
  .skip-link:focus { transform: translateY(0); color: white; }
  .site-header { position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,.95); border-bottom: 1px solid rgba(229,231,235,.8); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; min-height: 76px; }
  .wordmark { color: var(--ink); font-size: 15px; font-weight: 700; letter-spacing: -.5px; white-space: nowrap; }
  .wordmark span { color: var(--accent); }
  .nav-links { display: flex; flex-wrap: wrap; align-items: center; gap: 22px; }
  .nav-links a { color: var(--muted); font-size: 12px; font-weight: 500; padding-block: 8px; }
  .nav-links a:hover, .nav-links a[aria-current="location"] { color: var(--accent); }
  .menu-toggle { display: none; border: 1px solid var(--line); background: white; border-radius: 8px; padding: 7px 12px; font-size: 13px; }
  .hero { padding: 86px 0 65px; border-bottom: 1px solid var(--line); }
  .eyebrow { font-size: 11px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
  .hero h1 { font-size: clamp(40px, 6vw, 64px); line-height: 1.12; letter-spacing: -.055em; font-weight: 800; margin: 16px 0 23px; }
  .affiliations { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 0; margin-bottom: 25px; font-size: 13px; color: #4b5563; }
  .affiliations span + span { border-left: 1px solid #d1d5db; padding-left: 16px; margin-left: 16px; }
  .hero-bio { max-width: 850px; font-size: 17px; line-height: 1.7; }
  .hero-bio + .hero-bio { margin-top: 12px; }
  .name-note { color: var(--muted); font-size: 13px; margin-top: 16px; }
  .social-links, .action-links { display: flex; flex-wrap: wrap; gap: 8px; }
  .social-links { margin-top: 26px; }
  .pill { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 38px; border: 1px solid var(--line); border-radius: 999px; background: white; color: var(--text); font-size: 12px; font-weight: 500; padding: 7px 14px; }
  .pill:hover { border-color: #bfdbfe; background: #eff6ff; color: var(--accent); }
  .link-icon { display: inline-block; width: 15px; height: 15px; flex-shrink: 0; vertical-align: -.18em; margin-right: 5px; }
  .pill .link-icon { width: 16px; height: 16px; margin-right: 0; }
  .social-links .link-icon { width: 20px; height: 20px; }
  .pill--small { min-height: 32px; padding: 4px 11px; font-size: 11px; }
  .action-links .pill { color: var(--accent); font-weight: 700; }
  .action-links .pill:hover { color: var(--accent-hover); }
  .research-topics { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 26px; }
  .research-topics span { background: var(--surface); padding: 5px 10px; border-radius: 5px; color: var(--muted); font-size: 11px; }
  .section { padding-top: 58px; scroll-margin-top: 95px; }
  .section-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 23px; }
  .section-heading h2 { font-size: 25px; letter-spacing: -.035em; line-height: 1.3; font-weight: 700; }
  .section-heading .eyebrow { display: block; margin-bottom: 8px; }
  .section-aside { color: var(--muted); font-size: 12px; }
  .section-intro { font-size: 13px; color: var(--muted); margin: -10px 0 22px; }
  .news-list { list-style: none; padding: 0; margin: 0; }
  .news-list li { display: grid; grid-template-columns: 84px minmax(0,1fr); gap: 22px; padding: 11px 0; font-size: 13px; }
  .news-list time { color: var(--muted); font-size: 12px; font-variant-numeric: tabular-nums; padding-top: 1px; }
  .news-more { margin-top: 10px; }
  .news-more summary { display: inline-flex; align-items: center; color: var(--accent); font-size: 12px; font-weight: 600; padding: 8px 0; list-style: none; }
  .news-more summary::-webkit-details-marker { display: none; }
  .news-more .when-open, .news-more[open] .when-closed { display: none; }
  .news-more[open] .when-open { display: inline; }
  .publications-section { position: relative; }
  .anchor-alias { position: absolute; top: 0; scroll-margin-top: 95px; }
  .publication-radio { position: absolute; width: 1px; height: 1px; clip-path: inset(50%); }
  .publication-switch { display: inline-flex; padding: 4px; gap: 3px; border: 1px solid var(--line); background: var(--surface); border-radius: 999px; }
  .publication-switch label { padding: 8px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; color: var(--muted); cursor: pointer; }
  .publication-switch label span { font-size: 10px; opacity: .65; }
  .pub-full, .full-title { display: none; }
  #pub-view-full:checked ~ .pub-panels .pub-selected, #pub-view-full:checked ~ .publication-heading .selected-title { display: none; }
  #pub-view-full:checked ~ .pub-panels .pub-full, #pub-view-full:checked ~ .publication-heading .full-title { display: block; }
  #pub-view-selected:checked ~ .publication-heading label[for='pub-view-selected'], #pub-view-full:checked ~ .publication-heading label[for='pub-view-full'] { background: white; color: var(--accent); }
  .publication-radio:focus-visible ~ .publication-heading .publication-switch { outline: 3px solid #93c5fd; }
  .reveal-pending { opacity: 0; transform: translateY(24px); }
  .reveal-ready { transition: opacity .65s ease, transform .65s ease; }
  .reveal-visible { opacity: 1; transform: none; }
  .paper-list { display: grid; gap: 18px; }
  .paper-card { display: grid; grid-template-columns: 232px minmax(0,1fr); align-items: start; gap: 25px; padding: 24px; background: white; border: 1px solid var(--line); border-radius: 12px; }
  .paper-card--featured { border-color: #93b7f5; background: linear-gradient(120deg, #eff6ff 0%, #fafcff 48%, white 100%); box-shadow: 0 5px 24px rgba(37,99,235,.055); }
  .paper-teaser { overflow: hidden; aspect-ratio: 8 / 5; border: 1px solid var(--line); border-radius: 8px; background: white; display: flex; align-items: center; justify-content: center; }
  .paper-teaser img { width: 100%; height: 100%; object-fit: contain; padding: 8px; transition: transform .25s ease; }
  .paper-teaser:hover img { transform: scale(1.025); }
  .paper-body { min-width: 0; }
  .paper-title { font-size: 17px; font-weight: 650; line-height: 1.45; letter-spacing: -.02em; }
  .paper-title a { color: var(--ink); }
  .paper-title a:hover { color: var(--accent); }
  .paper-authors { color: #4b5563; font-size: 12px; line-height: 1.7; margin-top: 9px; overflow-wrap: anywhere; }
  .author-self { color: var(--ink); font-weight: 700; }
  sup { line-height: 0; font-size: .8em; }
  .paper-status { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .badge { display: inline-flex; align-items: center; border-radius: 5px; background: #f3f4f6; color: #4b5563; font-size: 10px; font-weight: 600; padding: 3px 8px; letter-spacing: .01em; }
  .badge--venue { background: #eff6ff; color: #1d4ed8; }
  .badge--accepted { color: #047857; background: #ecfdf5; }
  .featured-label { display: inline-flex; margin-bottom: 9px; font-size: 10px; font-weight: 700; letter-spacing: .04em; color: var(--accent); }
  .author-note { font-size: 10px; color: var(--muted); line-height: 1.6; margin-top: 7px; }
  .paper-tldr { font-size: 12px; line-height: 1.7; color: #6b7280; margin-top: 11px; }
  .paper-tldr > span { color: #4b5563; font-size: 10px; font-weight: 700; margin-right: 4px; }
  .action-links { margin-top: 14px; }
  .contributor-details { margin-top: 8px; font-size: 11px; color: #4b5563; }
  .contributor-details summary { color: var(--muted); }
  .contributor-details p { margin-top: 9px; }
  .year-heading { font-size: 14px; color: var(--muted); font-weight: 600; margin: 28px 0 14px; font-variant-numeric: tabular-nums; }
  .year-heading:first-child { margin-top: 0; }
  .record-list { display: grid; gap: 12px; }
  .record { display: grid; grid-template-columns: 42px minmax(0,1fr) auto; gap: 18px; align-items: center; border: 1px solid var(--line); border-radius: 10px; padding: 20px 22px; }
  .record-logo { width: 42px; height: 42px; border-radius: 8px; object-fit: contain; padding: 4px; background: white; }
  .record h3 { font-size: 14px; font-weight: 600; line-height: 1.5; }
  .record p { font-size: 12px; color: var(--muted); margin-top: 3px; }
  .record-meta { text-align: right; font-size: 11px; color: var(--muted); white-space: nowrap; }
  .record-meta span { display: block; margin-top: 4px; }
  .record-icon { width: 42px; height: 42px; border-radius: 8px; background: var(--surface); display: grid; place-items: center; color: #9ca3af; }
  .record-icon svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 1.5; }
  .writing-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px; }
  .writing-card { border: 1px solid var(--line); border-radius: 10px; padding: 22px; background: var(--surface); }
  .writing-card h3 { font-size: 14px; line-height: 1.5; margin-top: 13px; }
  .writing-card p { font-size: 12px; color: var(--muted); margin: 10px 0 15px; }
  .writing-card > a { font-size: 12px; font-weight: 600; }
  .site-footer { margin-top: 64px; padding: 28px 0 34px; border-top: 1px solid var(--line); }
  .footer-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; color: var(--muted); font-size: 11px; }
  .copy-toast { position: fixed; bottom: 24px; left: 50%; transform: translate(-50%, 15px); background: var(--ink); color: white; padding: 11px 18px; border-radius: 8px; font-size: 12px; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; z-index: 30; max-width: calc(100% - 32px); }
  .copy-toast.show { opacity: 1; transform: translate(-50%, 0); }
  @media (max-width: 980px) {
    .container { width: calc(100% - 48px); }
    .header-inner { gap: 16px; }
    .nav-links { gap: 13px; }
    .nav-links a { font-size: 11px; }
    .paper-card { grid-template-columns: 200px minmax(0,1fr); gap: 22px; padding: 22px; }
  }
  @media (max-width: 760px) {
    html { scroll-padding-top: 82px; }
    .container { width: calc(100% - 36px); }
    .header-inner { flex-wrap: wrap; min-height: 64px; padding-block: 16px; }
    .nav-links { width: 100%; gap: 4px 18px; }
    .js-enabled .menu-toggle { display: block; }
    .js-enabled .nav-links:not(.is-open) { display: none; }
    .hero { padding: 50px 0 40px; }
    .hero h1 { margin-top: 14px; }
    .hero-bio { font-size: 15px; }
    .affiliations { font-size: 12px; }
    .section { padding-top: 42px; }
    .section-heading h2 { font-size: 22px; }
    .section-heading { align-items: flex-start; }
    .section-aside { font-size: 10px; text-align: right; }
    .paper-card { grid-template-columns: minmax(0,1fr); padding: 18px; gap: 18px; }
    .paper-teaser { width: 100%; max-width: 480px; margin-inline: auto; }
    .paper-title { font-size: 16px; }
    .news-list li { grid-template-columns: 63px minmax(0,1fr); gap: 13px; font-size: 12px; }
    .news-list time { font-size: 11px; }
    .record { grid-template-columns: 36px minmax(0,1fr); padding: 16px; gap: 12px; }
    .record-logo, .record-icon { width: 36px; height: 36px; }
    .record-meta { grid-column: 2; text-align: left; white-space: normal; }
    .record-meta span { display: inline; margin-left: 8px; }
    .writing-list { grid-template-columns: minmax(0,1fr); }
  }
  @media (max-width: 400px) {
    .affiliations { flex-direction: column; align-items: flex-start; gap: 5px; }
    .affiliations span + span { border: 0; padding: 0; margin: 0; }
    .section-heading { flex-wrap: wrap; }
    .section-aside { text-align: left; }
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { transition: none !important; }
    .paper-teaser:hover img { transform: none; }
    .reveal-pending { opacity: 1; transform: none; }
  }
  @media (max-width: 760px) {
    .publication-heading { flex-wrap: wrap; }
    .publication-switch label { padding: 7px 12px; }
  }
</style>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="wordmark" href="#about" aria-label="Junyao Yang, home">Junyao Yang<span>.</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
    <nav class="nav-links" id="primary-nav" aria-label="Main navigation">
      <a href="#about">About</a><a href="#news">News</a><a href="#selected-publications">Selected Publications</a><a href="#full-publications">Full Publications</a><a href="#experience">Experience</a><a href="#honors">Awards</a><a href="#blogs">Writing</a>
    </nav>
  </div>
</header>
<main id="main" class="container">
  <section class="hero" id="about" aria-labelledby="hero-name">
    <h1 id="hero-name">Junyao Yang</h1>
    <div class="affiliations"><span>National University of Singapore</span></div>
    <p class="hero-bio">Hi, I'm Junyao. I am a first-year graduate student at the School of Computing, <strong>National University of Singapore</strong>, specializing in Artificial Intelligence, and a research intern at <strong>Tencent Hy Frontier Lab</strong>.</p>
    <p class="hero-bio">My current research interests focus on <strong>Agentic AI</strong>, including Agentic RL, Recursive Self-Improving, and Long-Horizon Terminus Agents; <strong>Reinforcement Learning</strong>, with a focus on RL Stability; and <strong>Trustworthy Artificial Intelligence</strong>.</p>
    <p class="name-note">杨竣尧 <span lang="en">/jɑːŋ dʒuːn jaʊ/</span></p>
    <div class="social-links" aria-label="Contact and academic profiles">
      <a class="pill" href="mailto:junyaoyang@u.nus.edu">{% include link-icon.html icon='email' %}Email</a>
      <a class="pill" href="https://scholar.google.com/citations?hl=en&amp;user=oY6uhJQAAAAJ">{% include link-icon.html icon='scholar' %}Google Scholar</a>
      <a class="pill" href="https://github.com/jyyang26">{% include link-icon.html icon='github' %}GitHub</a>
      <a class="pill" href="https://x.com/TonyworldLove">{% include link-icon.html icon='x' %}X</a>
      <a class="pill" href="https://xhslink.cn/o/998NlpzZrFE">{% include link-icon.html icon='rednote' %}Rednote · 小红书</a>
      <a class="pill" href="https://www.linkedin.com/in/junyao-yang-371282301/">{% include link-icon.html icon='linkedin' %}LinkedIn</a>
      <a class="pill" href="https://drive.google.com/file/d/1wTeBg7zFGLGaUFitWrxp_FEvvMH-8nw9/view?usp=drive_link">{% include link-icon.html icon='document' %}CV · EN</a>
      <a class="pill" href="https://drive.google.com/file/d/1C2bD366Qj5I_hCi5HpAY-v_Ra-Lp110_/view?usp=drive_link">{% include link-icon.html icon='document' %}CV · 中文</a>
      <button class="pill wechat-copy" type="button" data-wechat-id="FrWorld_LuvAndPeaze" hidden>{% include link-icon.html icon='wechat' %}WeChat</button>
    </div>
    <div class="research-topics" aria-label="Research interests"><span>Agentic RL</span><span>Recursive Self-Improvement</span><span>Long-Horizon Agents</span><span>RL Stability</span><span>Explainable AI</span></div>
  </section>

  <section class="section" id="news" aria-labelledby="news-heading">
    <div class="section-heading"><div><span class="eyebrow">Latest updates</span><h2 id="news-heading">News</h2></div></div>
    <ul class="news-list">
      <li><time datetime="2026-10">10/2026</time><div>We release <strong><a href="https://arxiv.org/abs/2610.22192">Terminal-RSI</a></strong>: recursive trajectory rewriting and critic-inheriting policy refinement for terminal agents. <a href="https://jyyang26.github.io/terminal-rsi">Project page ↗</a></div></li>
      <li><time datetime="2026-09">09/2026</time><div>Tech report: <strong><a href="https://arxiv.org/abs/2609.11042">T1</a></strong>, a terminal agent for long-horizon tasks with stable RL training and dense verification rewards.</div></li>
      <li><time datetime="2026-08">08/2026</time><div>Conducting my dissertation under the guidance of Professor <a href="https://scholar.google.com/citations?user=DNuiPHwAAAAJ&amp;hl=en">Shuicheng Yan</a>.</div></li>
      <li><time datetime="2026-04">04/2026</time><div>Joined <strong>Tencent Hy LLM Team</strong>, working on agentic RL stability and self-evolving long-horizon terminal agents.</div></li>
      <li><time datetime="2026-04">04/2026</time><div>First-author paper <a href="https://arxiv.org/abs/2601.05560">ReasonAny</a> accepted to <strong>ACL 2026 Main</strong>.</div></li>
    </ul>
    <details class="news-more">
      <summary><span class="when-closed">Show more ↓</span><span class="when-open">Show less ↑</span></summary>
      <ul class="news-list">
        <li><time datetime="2026-01">01/2026</time><div>Tech report: <strong><a href="https://arxiv.org/abs/2601.18491">AgentDoG</a></strong>, a diagnostic guardrail framework with an agentic attribution module.</div></li>
        <li><time datetime="2025-11">11/2025</time><div>First-author paper <a href="https://arxiv.org/abs/2508.03140">RCP-Merging</a> accepted to <strong>AAAI 2026 Main Track</strong>.</div></li>
        <li><time datetime="2025-08">08/2025</time><div><a href="https://arxiv.org/abs/2502.18517">RewardDS</a> accepted to <strong>EMNLP 2025 Main</strong>.</div></li>
        <li><time datetime="2025-08">08/2025</time><div>Joined <a href="https://ai45.shlab.org.cn/">Shanghai AI Lab</a> as a research intern, working with <a href="https://shenqildr.github.io/">Dongrui Liu</a>.</div></li>
        <li><time datetime="2025-05">05/2025</time><div>Co-first-author paper <a href="https://arxiv.org/abs/2406.01394">PrivacyRestore</a> accepted to <strong>ACL 2025 Main</strong>.</div></li>
        <li><time datetime="2024-07">07/2024</time><div>Joined <a href="https://github.com/ZeroNLP">ZeroNLP</a> as a research assistant, advised by Professor <a href="https://ziqianzeng.github.io/">Ziqian Zeng</a>.</div></li>
        <li><time datetime="2024-07">07/2024</time><div><strong>Contextless CS</strong> reached <strong>20,000 daily active users</strong>.</div></li>
        <li><time datetime="2024-04">04/2024</time><div>Joined Tencent as a machine learning intern.</div></li>
        <li><time datetime="2024-03">03/2024</time><div>Completed my machine learning internship at Shenzhen Stock Exchange.</div></li>
      </ul>
    </details>
  </section>

  {% assign all_papers = site.publications | where_exp: 'paper', 'paper.paper_id != nil' | sort: 'order' %}
  {% assign selected_papers = all_papers | where: 'selected', true | sort: 'selected_order' %}
  {% assign terminal_rsi = all_papers | where: 'paper_id', 'terminal-rsi' | first %}
  <section class="section publications-section" id="publications" aria-labelledby="publications-heading">
    <span class="anchor-alias" id="selected-publications"></span><span class="anchor-alias" id="full-publications"></span>
    <input class="publication-radio" type="radio" name="publication-view" id="pub-view-selected" value="selected" aria-controls="pub-selected" checked>
    <input class="publication-radio" type="radio" name="publication-view" id="pub-view-full" value="full" aria-controls="pub-full">
    <div class="section-heading publication-heading">
      <div><span class="eyebrow">Research highlights</span><h2 id="publications-heading"><span class="selected-title">Selected Publications</span><span class="full-title">Full Publications</span></h2></div>
      <div class="publication-switch" role="group" aria-label="Choose publications to display">
        <label for="pub-view-selected">Selected <span>{{ selected_papers.size }}</span></label>
        <label for="pub-view-full">Full <span>{{ all_papers.size }}</span></label>
      </div>
    </div>
    <p class="section-intro">Work on agents, learning, and trustworthy AI. Author contribution markers are explained per paper.</p>
    <div class="pub-panels">
      <div class="pub-selected" id="pub-selected" aria-label="Selected Publications">
        <div class="paper-list">
          {% if terminal_rsi %}{% include academic-paper.html paper=terminal_rsi highlight=true %}{% endif %}
          {% for paper in selected_papers %}{% unless paper.paper_id == 'terminal-rsi' %}{% include academic-paper.html paper=paper highlight=true %}{% endunless %}{% endfor %}
        </div>
      </div>
      <div class="pub-full" id="pub-full" aria-label="Full Publications">
        {% assign previous_year = '' %}
        {% for paper in all_papers %}
          {% if paper.year != previous_year %}{% unless forloop.first %}</div>{% endunless %}<h3 class="year-heading">{{ paper.year }}</h3><div class="paper-list">{% assign previous_year = paper.year %}{% endif %}
          {% include academic-paper.html paper=paper highlight=true %}
          {% if forloop.last %}</div>{% endif %}
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="section" id="education" aria-labelledby="education-heading">
    <div class="section-heading"><div><span class="eyebrow">Academic background</span><h2 id="education-heading">Education</h2></div></div>
    <div class="record-list">
      <article class="record"><img class="record-logo" src="{{ '/images/NUS.jpg' | relative_url }}" alt="National University of Singapore" width="42" height="42" loading="lazy"><div><h3>National University of Singapore</h3><p>MComp · Artificial Intelligence</p></div><div class="record-meta">2025 – 2027 (Expected)<span>Singapore</span></div></article>
      <article class="record"><img class="record-logo" src="{{ '/images/South_China_University_of_Technology_Logo_(Since_2022).svg.png' | relative_url }}" alt="South China University of Technology" width="42" height="42" loading="lazy"><div><h3>South China University of Technology</h3><p>B.S. in Computer Science · With honor</p></div><div class="record-meta">2021 – 2025<span>Guangzhou, China</span></div></article>
    </div>
  </section>

  <section class="section" id="experience" aria-labelledby="experience-heading">
    <div class="section-heading"><div><span class="eyebrow">Research &amp; industry</span><h2 id="experience-heading">Experience</h2></div></div>
    <div class="record-list">
      <article class="record"><img class="record-logo" src="{{ '/images/tencent_hunyuan.png' | relative_url }}" alt="Tencent Hy" width="42" height="42" loading="lazy"><div><h3>Tencent Hy Frontier</h3><p>Research Intern · 青云计划</p></div><div class="record-meta">04/2026 – Present<span>Singapore</span></div></article>
      <article class="record"><img class="record-logo" src="{{ '/images/ailab.png' | relative_url }}" alt="Shanghai AI Lab" width="42" height="42" loading="lazy"><div><h3>Shanghai AI Lab</h3><p>Research Intern</p></div><div class="record-meta">06/2025 – 04/2026<span>Shanghai, China</span></div></article>
      <article class="record"><img class="record-logo" src="{{ '/images/South_China_University_of_Technology_Logo_(Since_2022).svg.png' | relative_url }}" alt="South China University of Technology" width="42" height="42" loading="lazy"><div><h3>South China University of Technology</h3><p>Research Intern</p></div><div class="record-meta">07/2024 – 06/2025<span>Guangzhou, China</span></div></article>
      <article class="record"><img class="record-logo" src="{{ '/images/Tencent.png' | relative_url }}" alt="Tencent" width="42" height="42" loading="lazy"><div><h3>Tencent</h3><p>Machine Learning Intern</p></div><div class="record-meta">04/2024 – 07/2024</div></article>
      <article class="record"><img class="record-logo" src="{{ '/images/SZSE.png' | relative_url }}" alt="Shenzhen Stock Exchange" width="42" height="42" loading="lazy"><div><h3>Shenzhen Stock Exchange</h3><p>Machine Learning Intern</p></div><div class="record-meta">01/2024 – 04/2024<span>Shenzhen, China</span></div></article>
    </div>
  </section>

  <section class="section" id="honors" aria-labelledby="honors-heading">
    <div class="section-heading"><div><span class="eyebrow">Recognition</span><h2 id="honors-heading">Honors &amp; Awards</h2></div></div>
    <div class="record-list">
      {% assign award_names = 'Excellent Graduation Thesis|Outstanding Student Leader|Second-Class Scholarship of SCUT|Second-Class Award · CUMCM|Second Prize · Olympic Mathematics Competition|Second Prize · Olympic Physics Competition' | split: '|' %}
      {% assign award_dates = '06/2025|2022 – 2024|10/2024|09/2022|05/2020|02/2020' | split: '|' %}
      {% for award in award_names %}<article class="record"><span class="record-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/></svg></span><div><h3>{{ award }}</h3>{% if forloop.index0 == 3 %}<p>Guangdong Province</p>{% endif %}</div><div class="record-meta">{{ award_dates[forloop.index0] }}</div></article>{% endfor %}
    </div>
  </section>

  <section class="section" id="blogs" aria-labelledby="writing-heading">
    <div class="section-heading"><div><span class="eyebrow">Beyond the paper</span><h2 id="writing-heading">Writing</h2></div></div>
    <div class="writing-list">
      <article class="writing-card"><span class="eyebrow">Recursive self-improvement</span><h3>Terminal-RSI: Recursive Self-Improving Terminal Agents</h3><p>Verified trajectory rewriting and critic-inheriting policy refinement for long-horizon terminal agents.</p><a href="https://jyyang26.github.io/terminal-rsi/">{% include link-icon.html icon='globe' %}Read article ↗</a></article>
      <article class="writing-card"><span class="eyebrow">Terminal agents</span><h3>T1: Learning for Long-Horizon Tasks</h3><p>Stable MoE reinforcement learning and dense verification rewards for a 122B terminal agent.</p><a href="https://jyyang26.github.io/t1/">{% include link-icon.html icon='globe' %}Read article ↗</a></article>
      <article class="writing-card"><span class="eyebrow">Reinforcement learning</span><h3>Stale but Stable</h3><p>Understanding rollout staleness in asynchronous RL: origins, diagnostics, and mitigations.</p><a href="https://jyyang26.github.io/stable_async_analysis/">{% include link-icon.html icon='globe' %}Read article ↗</a></article>
      <article class="writing-card"><span class="eyebrow">Reasoning</span><h3>Entropy-Gradient Inversion</h3><p>A geometric perspective on the internal mechanisms of large reasoning models.</p><a href="{{ '/blogs/reasoning_token.html' | relative_url }}">{% include link-icon.html icon='document' %}Read article ↗</a></article>
    </div>
  </section>
</main>
<footer class="site-footer"><div class="container footer-inner"><span>© {{ 'now' | date: '%Y' }} Junyao Yang</span><a href="#about">Back to top ↑</a></div></footer>
<div id="copy-toast" class="copy-toast" role="status" aria-live="polite"></div>
<script>
(function () {
  document.body.classList.add('js-enabled');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const setMenu = open => {
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  const selectedView = document.getElementById('pub-view-selected');
  const fullView = document.getElementById('pub-view-full');
  const publications = document.getElementById('publications');
  const links = Array.from(nav.querySelectorAll('a'));
  const setPublicationView = view => {
    selectedView.checked = view === 'selected';
    fullView.checked = view === 'full';
    links.filter(link => link.hash.endsWith('-publications')).forEach(link => {
      if (link.hash === '#' + view + '-publications') link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const viewFromHash = () => {
    if (location.hash === '#full-publications') setPublicationView('full');
    else if (location.hash === '#selected-publications' || location.hash === '#publications') setPublicationView('selected');
  };
  selectedView.addEventListener('change', () => setPublicationView('selected'));
  fullView.addEventListener('change', () => setPublicationView('full'));
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !link.hash.endsWith('-publications')) return;
    setPublicationView(link.hash === '#full-publications' ? 'full' : 'selected');
  });
  window.addEventListener('hashchange', viewFromHash);
  viewFromHash();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const hash = entry.target === publications ? (fullView.checked ? '#full-publications' : '#selected-publications') : '#' + entry.target.id;
        links.forEach(link => { if (link.hash === hash) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    new Set(links.map(link => link.hash.endsWith('-publications') ? publications : document.querySelector(link.hash))).forEach(section => { if (section) observer.observe(section); });
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const blocks = document.querySelectorAll('.section-heading, .paper-card, .record, .writing-card, .news-list li');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    blocks.forEach(block => {
      const bounds = block.getBoundingClientRect();
      if (bounds.height > 0 && bounds.top < innerHeight - 24) return;
      block.classList.add('reveal-pending');
      requestAnimationFrame(() => block.classList.add('reveal-ready'));
      revealObserver.observe(block);
    });
    document.addEventListener('focusin', event => {
      const block = event.target.closest('.reveal-pending');
      if (block) {
        block.classList.remove('reveal-pending');
        block.classList.add('reveal-visible');
        revealObserver.unobserve(block);
      }
    });
    reducedMotion.addEventListener('change', event => {
      if (!event.matches) return;
      revealObserver.disconnect();
      blocks.forEach(block => { block.classList.remove('reveal-pending'); block.classList.add('reveal-visible'); });
    });
  }
  const copy = document.querySelector('.wechat-copy');
  const toast = document.getElementById('copy-toast');
  let toastTimer;
  const showToast = message => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  };
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    const id = copy.dataset.wechatId;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(id);
      else {
        const input = document.createElement('textarea');
        input.value = id;
        input.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(input);
        input.select();
        let copied = false;
        try { copied = document.execCommand('copy'); } finally { input.remove(); copy.focus(); }
        if (!copied) throw new Error('Copy unavailable');
      }
      showToast('WeChat ID copied');
    } catch (error) { showToast('WeChat: ' + id); }
  });
})();
</script>
</body>
</html>
