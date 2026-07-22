---
permalink: /
layout: null
sitemap: false
redirect_from:
  - /about/
  - /about.html
---
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Junyao Yang</title>
<meta name="description" content="Junyao Yang's personal homepage. Graduate student at NUS, researcher at Tencent HY. NLP, XAI, Representation Learning.">
<link rel="icon" href="{{ '/images/favicon.ico' | relative_url }}">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background-color: #faf9f6;
    color: #201d18;
    font-family: 'Source Serif 4', 'Iowan Old Style', Georgia, 'Times New Roman', serif;
    font-weight: 400;
    font-size: 17px;
    line-height: 1.72;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a { color: #1c5cab; text-decoration: none; }
  a:hover { color: #2a78d6; text-decoration: underline; }
  a:active { color: #2a78d6; }

  /* Selection: blue background + white text + underline */
  ::selection { background-color: #2a78d6; color: #ffffff; text-decoration: underline; }
  ::-moz-selection { background-color: #2a78d6; color: #ffffff; text-decoration: underline; }

  /* Theme Toggle */
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
  .theme-toggle svg { width: 18px; height: 18px; transition: fill 0.2s; }
  .theme-toggle .icon-sun { fill: #f5b400; }
  .theme-toggle .icon-moon { fill: #8b949e; display: none; }
  body.dark-mode .theme-toggle .icon-sun { display: none; }
  body.dark-mode .theme-toggle .icon-moon { display: block; fill: #6c5ce7; }

  /* ---------- Navigation ---------- */
  .custom-nav {
    position: sticky;
    top: 0;
    z-index: 9999;
    background: #faf9f6;
    border-bottom: 1px solid #e6e2d8;
    padding: 12px 0;
    margin-bottom: 28px;
  }
  .nav-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }
  .nav-link {
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
    color: #6f6a61;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
  }
  .nav-link:hover { color: #2a78d6; text-decoration: underline; }
  section { scroll-margin-top: 60px; }

  /* ---------- Layout ---------- */
  .profile-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px 60px;
  }

  .custom-sidebar {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 35px;
    padding-bottom: 28px;
    border-bottom: 1px solid #e6e2d8;
  }
  .name-title {
    font-size: 28px;
    font-weight: 600;
    color: #201d18;
    margin: 0 0 5px 0;
  }
  .name-title span { font-size: 20px; color: #4a463f; }
  .role-text  { color: #6f6a61; font-size: 14px; margin-bottom: 5px; }
  .affil-text { color: #6f6a61; font-size: 14px; }

  .social-icons {
    display: flex;
    gap: 15px;
    margin-top: 15px;
    justify-content: flex-start;
  }
  .s-icon { color: #6f6a61; transition: color 0.2s; }
  .s-icon:hover { color: #2a78d6; }
  .s-icon svg { width: 20px; height: 20px; fill: currentColor; }

  /* ---------- Content Sections ---------- */
  .custom-content { display: flex; flex-direction: column; gap: 28px; }
  .content-box   { background: transparent; }
  .box-header    { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .box-title     { font-size: 18px; font-weight: 600; color: #201d18; margin: 0; border: none; padding: 0; }

  /* News */
  .news-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 250px;
    overflow-y: auto;
  }
  .news-list li {
    padding: 7px 0;
    border-bottom: 1px solid #e6e2d8;
    font-size: 14px;
    color: #4a463f;
  }
  .news-list li:last-child { border-bottom: none; }
  .news-list a { color: #201d18; text-decoration: none; }
  .news-list a:hover { color: #2a78d6; text-decoration: underline; }
  .news-tag { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; color: #6f6a61; font-size: 12px; }

  /* Papers */
  .paper-entry {
    line-height: 1.28;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e6e2d8;
  }
  .paper-entry:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .paper-venue {
    display: block;
    font-size: 14px;
    color: #2a78d6;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
  }
  .paper-venue.venue-conf { color: #B1642B; }
  .paper-venue.venue-arxiv { color: #5A574F; }
  .paper-venue.venue-tech { color: #755CC1; }

  /* Publications section title (Selected Publications) - blue & bold */
  #publications .box-title {
    color: #2a78d6;
    font-weight: 700;
  }

  /* Resume inline links in About Me - light blue, serif body font */
  .about-text a.resume-link {
    color: #2a78d6;
    font-family: inherit;
    font-weight: inherit;
    text-decoration: none;
  }
  .about-text a.resume-link:hover { color: #2a78d6; text-decoration: underline; }
  body.dark-mode .about-text a.resume-link { color: #4e92e6; }
  body.dark-mode .about-text a.resume-link:hover { color: #4e92e6; text-decoration: underline; }

  /* Publications tabs */
  .pub-tabs {
    display: flex;
    gap: 20px;
    margin-left: auto;
    align-items: center;
  }
  .pub-tab {
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
    background: none;
    border: none;
    padding: 4px 0;
    font-size: 14px;
    color: #6f6a61;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }
  .pub-tab:hover { color: #2a78d6; }
  .pub-tab.active {
    color: #2a78d6;
    border-bottom-color: #2a78d6;
    font-weight: 600;
  }
  .pub-list { display: none; }
  .pub-list.active { display: block; }

  /* GitHub star badge */
  .gh-star {
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    margin-left: 8px;
    font-size: 12px;
    color: #201d18;
    background: #f2f0e9;
    border: 1px solid #e6e2d8;
    border-radius: 10px;
    text-decoration: none;
    vertical-align: middle;
  }
  .gh-star:hover { color: #2a78d6; border-color: #2a78d6; text-decoration: none; }
  .gh-star svg { width: 12px; height: 12px; fill: #f5b400; }
  .paper-title {
    font-size: 14px;
    font-weight: 600;
    color: #201d18;
    text-decoration: none;
    display: block;
    margin-bottom: 6px;
  }
  .paper-title:hover { color: #2a78d6; text-decoration: underline; }
  /* Row that keeps title and inline badges (e.g. GitHub star) on the same line */
  .paper-title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 6px;
  }
  .paper-title-row .paper-title {
    display: inline;
    margin-bottom: 0;
  }
  .paper-auth  { font-size: 14px; color: #4a463f; margin-bottom: 8px; }
  .paper-tldr  { font-size: 14px; color: #4a463f; background: transparent; padding: 0; }
  .paper-links { margin-top: 8px; font-size: 14px; }
  .paper-links a { color: #6f6a61; text-decoration: none; margin-right: 15px; }
  .paper-links a:hover { color: #2a78d6; text-decoration: underline; }

  /* Education */
  .edu-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
  .edu-card { padding: 15px; border: 1px solid #e6e2d8; border-radius: 0; }
  .edu-logo {
    width: 40px; height: 40px; object-fit: contain;
    margin-bottom: 10px; background: #f2f0e9; padding: 4px;
  }
  .edu-deg { font-size: 14px; font-weight: 600; color: #201d18; }
  .edu-sch { font-size: 13px; color: #4a463f; }
  .edu-yr  { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 12px; color: #6f6a61; margin-top: 8px; }

  /* Experience */
  .exp-item {
    display: flex; align-items: center; gap: 15px;
    padding: 8px 0; border-bottom: 1px solid #e6e2d8;
  }
  .exp-item:last-child { border-bottom: none; }
  .exp-logo {
    width: 36px; height: 36px; object-fit: contain;
    border: 1px solid #e6e2d8; padding: 2px; background: #f2f0e9;
  }

  /* Honors */
  ul.honors-list { font-size: 14px; color: #4a463f; padding-left: 20px; }
  ul.honors-list li { padding: 5px 0; }

  /* About text block */
  .about-text { font-size: 17px; line-height: 1.72; color: #4a463f; }

  /* Footer */
  .site-footer {
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
    text-align: center;
    padding: 30px 20px 40px;
    font-size: 12px;
    color: #8d887e;
    border-top: 1px solid #e6e2d8;
  }

  /* Mobile */
  @media (max-width: 600px) {
    .custom-sidebar { flex-direction: column; text-align: center; }
    .social-icons   { justify-content: center; }
  }

  /* ---------- Dark Mode ---------- */
  body.dark-mode {
    background-color: #131311;
    color: #eae8e1;
  }
  body.dark-mode a { color: #86b6ef; }
  body.dark-mode a:hover { color: #4e92e6; text-decoration: underline; }
  body.dark-mode .custom-nav { background: #131311; border-bottom-color: #2b2a26; }
  body.dark-mode .nav-link { color: #9b968b; }
  body.dark-mode .nav-link:hover { color: #4e92e6; }
  body.dark-mode .name-title { color: #eae8e1; }
  body.dark-mode .name-title span { color: #9b968b; }
  body.dark-mode .affil-text,
  body.dark-mode .role-text { color: #9b968b; }
  body.dark-mode .box-title { color: #eae8e1; }
  body.dark-mode .paper-venue { color: #4e92e6; }
  body.dark-mode .paper-venue.venue-conf { color: #D8894A; }
  body.dark-mode .paper-venue.venue-arxiv { color: #A8A498; }
  body.dark-mode .paper-venue.venue-tech { color: #9C86E0; }
  body.dark-mode .paper-title { color: #eae8e1; }
  body.dark-mode .paper-title:hover { color: #4e92e6; }
  body.dark-mode .paper-auth,
  body.dark-mode .paper-tldr { color: #c3c0b6; }
  body.dark-mode .paper-links a { color: #9b968b; }
  body.dark-mode .paper-links a:hover { color: #4e92e6; }
  body.dark-mode .paper-entry { border-bottom-color: #2b2a26; }
  body.dark-mode .custom-sidebar { border-bottom-color: #2b2a26; }
  body.dark-mode .news-list li { color: #c3c0b6; border-bottom-color: #2b2a26; }
  body.dark-mode .news-list a { color: #eae8e1; }
  body.dark-mode .news-list a:hover { color: #4e92e6; }
  body.dark-mode .news-tag { color: #9b968b; }
  body.dark-mode .edu-card { border-color: #2b2a26; }
  body.dark-mode .edu-deg { color: #eae8e1; }
  body.dark-mode .edu-sch,
  body.dark-mode .edu-yr { color: #c3c0b6; }
  body.dark-mode .edu-logo { background: #ffffff; }
  body.dark-mode .exp-item { border-bottom-color: #2b2a26; }
  body.dark-mode .exp-logo { border-color: #2b2a26; background: #ffffff; }
  body.dark-mode .exp-item > div > div { color: #c3c0b6 !important; }
  body.dark-mode .exp-item > div > div:first-of-type { color: #eae8e1 !important; }
  body.dark-mode ul.honors-list { color: #c3c0b6; }
  body.dark-mode .about-text { color: #c3c0b6; }
  body.dark-mode .about-text strong { color: #eae8e1; }
  body.dark-mode .site-footer { border-top-color: #2b2a26; color: #7c786e; }
  body.dark-mode .gh-star { background: #22211d; border-color: #2b2a26; color: #eae8e1; }
  body.dark-mode .gh-star:hover { color: #4e92e6; border-color: #4e92e6; }
  body.dark-mode .pub-tab { color: #9b968b; }
  body.dark-mode .pub-tab.active { color: #4e92e6; border-bottom-color: #4e92e6; }
  body.dark-mode .pub-tab:hover { color: #4e92e6; }
  body.dark-mode .s-icon { color: #9b968b; }
  body.dark-mode .s-icon:hover { color: #4e92e6; }
  body.dark-mode ::selection { background-color: #4e92e6; color: #131311; }
  body.dark-mode ::-moz-selection { background-color: #4e92e6; color: #131311; }
</style>
</head>
<body>

<nav class="custom-nav">
  <div class="nav-container">
    <a href="#about" class="nav-link">About Me</a>
    <a href="#news" class="nav-link">News</a>
    <a href="#publications" class="nav-link">Publications</a>
    <a href="#blogs" class="nav-link">Blogs</a>
    <a href="#education" class="nav-link">Education</a>
    <a href="#experience" class="nav-link">Experience</a>
    <a href="#honors" class="nav-link">Honors</a>
    <button class="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
      <svg class="icon-sun" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>
      <svg class="icon-moon" viewBox="0 0 24 24"><path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1H12z"/></svg>
    </button>
  </div>
</nav>

<div class="profile-wrapper">

  <aside class="custom-sidebar">
    <div>
      <h1 class="name-title">Junyao Yang</h1>
      <div class="affil-text">National University of Singapore</div>
      <div class="role-text">Tencent Hy</div>
      <div class="social-icons">
        <a href="mailto:junyaoyang@u.nus.edu" class="s-icon" title="Email"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
        <a href="https://scholar.google.com/citations?hl=en&user=oY6uhJQAAAAJ" class="s-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg></a>
        <a href="https://github.com/jyyang26" class="s-icon" title="GitHub"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
        <a href="https://drive.google.com/file/d/1wTeBg7zFGLGaUFitWrxp_FEvvMH-8nw9/view?usp=drive_link" class="s-icon" title="Curriculum Vitae"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg></a>
        <a href="https://www.linkedin.com/in/junyao-yang-371282301/" class="s-icon" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>
        <a href="https://x.com/TonyworldLove" class="s-icon" title="X (Twitter)"><svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      </div>
    </div>
  </aside>

  <main class="custom-content">

    <section id="about" class="content-box">
      <div class="box-header"><h2 class="box-title">About Me</h2></div>
      <div class="about-text">
        Hi there, this is Junyao. I am a first-year graduate student at the School of Computing, <strong>National University of Singapore</strong> (NUS), where I am pursuing a specialization in Artificial Intelligence. I am currently at <strong>Tencent Hy</strong>, working on <strong>Agentic RL Stability</strong> and <strong>Long-Horizon Terminus Agent</strong>. My research interests lie in <strong>Agentic AI</strong>, <strong>Large Language Models</strong>, <strong>Reinforcement Learning</strong> and <strong>Explainable Artificial Intelligence</strong>.
        <br>
        My Chinese name is 杨竣尧 (/jɑːŋ dʒuːn jaʊ/).
        <br>
        CVs: <a href="https://drive.google.com/file/d/1wTeBg7zFGLGaUFitWrxp_FEvvMH-8nw9/view?usp=drive_link" class="resume-link">EN</a>,&nbsp;<a href="https://drive.google.com/file/d/1C2bD366Qj5I_hCi5HpAY-v_Ra-Lp110_/view?usp=drive_link" class="resume-link">中文</a>
        <!-- <br><br>
        My research story revolves around <strong>the Underlying Principles and Understanding of Artificial Intelligence</strong>, which connects to related areas such as <strong>Reinforcement Learning</strong> [<strong><a href="https://arxiv.org/abs/2605.17770">CorR-PO</a></strong>], <strong>Reasoning</strong> [<strong><a href="https://arxiv.org/abs/2508.03140">AAAI 2026</a></strong>, <strong><a href="https://arxiv.org/abs/2601.18491">ACL 2026 Main</a></strong>], <strong>Trustworthy LLM</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>, <strong><a href="https://arxiv.org/abs/2502.18517">EMNLP 2025 Main</a></strong>] and <strong>Agent</strong> [<strong><a href="https://arxiv.org/abs/2601.15075">Agentic Attribution</a></strong>, <strong><a href="https://arxiv.org/abs/2601.15075">AgentDoG</a></strong>], and <strong>Model Malicious Attacks</strong> [<strong><a href="https://arxiv.org/abs/2406.01394">ACL 2025 Main</a></strong>]. -->
      </div>
    </section>

    <section id="news" class="content-box">
      <div class="box-header"><h2 class="box-title">News</h2></div>
      <ul class="news-list">
        <li><span class="news-tag">2026.07</span> New paper: <strong><a href="https://arxiv.org/abs/2607.18722">Stale but Stable</a></strong>! Staleness-adaptive trust regions stabilize asynchronous RL by tightening high-mismatch updates while preserving ordinary-token behavior.</li>
        <li><span class="news-tag">2026.07</span> New paper: <strong><a href="https://arxiv.org/abs/2607.13285">Harness Handbook</a></strong>! A behavior-centric representation and BGPD framework that help agents localize implementation sites and plan edits for evolving agent harnesses.</li>
        <li><span class="news-tag">2026.07</span> New paper: <strong><a href="https://arxiv.org/abs/2607.08964">Long-Horizon-Terminal-Bench</a></strong>! A long-horizon terminal benchmark of 46 tasks with dense subtask-level rewards for partial-credit evaluation of frontier agents.</li>
        <li><span class="news-tag">2026.05</span> First-Author paper: <strong><a href="https://arxiv.org/abs/2605.17770v1">Entropy-Gradient Inversion</a></strong>! Leverage entropy gradient inversion to enhance reinforcement learning for reasoning models.</li>
        <li><span class="news-tag">2026.04</span> Joined <strong>Tencent Hy LLM Team</strong>, working on <strong>Agentic RL Stability</strong> and <strong>Long-Horizon Terminus Agent</strong>.</li>
        <li><span class="news-tag">2026.04</span> First-Author paper <a href="https://arxiv.org/abs/2601.05560">ReasonAny</a> accepted to <strong>ACL 2026 Main</strong>.</li>
        <li><span class="news-tag">2026.02</span> Blog post: <strong><a href="{{ '/blogs/reasoning_token.html' | relative_url }}">The Entropy-Gradient Inversion</a></strong>. R1/o1-like reasoning models exhibit significant negative correlations between gradient strength and token entropy, emerging rapidly within the first 200 steps of SFT.</li>
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
        <h2 class="box-title" id="pub-heading">Selected Publications</h2>
        <div class="pub-tabs" role="tablist">
          <button type="button" class="pub-tab active" data-target="pub-selected" role="tab" aria-selected="true">Selected</button>
          <button type="button" class="pub-tab" data-target="pub-full" role="tab" aria-selected="false">Full</button>
        </div>
      </div>

      <!-- Selected Publications (accepted only, incl. Tech Report) -->
      <div id="pub-selected" class="pub-list active">

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">ACL 2026</span>
            <a href="https://arxiv.org/abs/2601.05560" class="paper-title">ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging</a>
            <div class="paper-auth"><strong><u>Junyao Yang</u></strong>, Chen Qian, Dongrui Liu<sup>&dagger;</sup>, Wen Shen, Yong Liu<sup>&dagger;</sup>, Jing Shao<sup>&dagger;</sup></div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Merging robust chain-of-thought capabilities into domain-specific models (Safety, Biomedicine) using Contrastive Gradient Identification.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2601.05560">Paper</a>
              <a href="https://github.com/jyyang26/ReasonAny">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">AAAI 2026</span>
            <a href="https://arxiv.org/abs/2508.03140" class="paper-title">RCP-Merging: Merging Long Chain-of-Thought Models with Domain-Specific Models by Considering Reasoning Capability as Prior</a>
            <div class="paper-auth"><strong><u>Junyao Yang</u></strong>, Jianwei Wang, Huiping Zhuang, Cen Chen, Ziqian Zeng*<sup>&dagger;</sup></div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Enhancing domain performance while preserving chain-of-thought reasoning abilities by treating reasoning as a prior.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2508.03140">Paper</a>
              <a href="https://github.com/ZeroNLP/RCP-Merging">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/abs/2607.18722" class="paper-title">Stale but Stable: Staleness-Adaptive Trust Regions for Stabilizing Asynchronous Reinforcement Learning</a>
            <div class="paper-auth"><strong><u>Junyao Yang</u></strong>, Yucheng Shi, Zongxia Li, Zhongzhi Li, Ruhan Wang, Xiangxin Zhou, Kishan Panaganti, Haitao Mi, Leowei Liang</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Stabilizing asynchronous RL by adapting trust regions to rollout staleness, tightening high-mismatch updates while preserving ordinary-token behavior.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2607.18722">Paper</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">ACL 2025</span>
            <a href="https://arxiv.org/abs/2406.01394" class="paper-title">PrivacyRestore: Privacy-Preserving Inference in Large Language Models via Privacy Removal and Restoration</a>
            <div class="paper-auth">Ziqian Zeng*<sup>&dagger;</sup>, Jianwei Wang*, <strong><u>Junyao Yang</u>*</strong>, Zhengdong Lu, Haoran Li, Huiping Zhuang, Cen Chen</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Protecting privacy via activation steering using a protected meta-vector without retraining.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2406.01394">Paper</a>
              <a href="https://github.com/ZeroNLP/PrivacyRestore">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-tech">Tech Report</span>
            <div class="paper-title-row">
              <a href="https://arxiv.org/abs/2601.18491" class="paper-title">AgentDoG: A Diagnostic Guardrail Framework for AI Agent Safety and Security</a>
            </div>
            <div class="paper-auth">Shanghai Artificial Intelligence Laboratory (Contributor)</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> A state-of-the-art diagnostic guardrail framework utilizing a unified three-dimensional taxonomy to provide fine-grained monitoring and root-cause analysis of AI agent safety risks.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2601.18491">Paper</a>
              <a href="https://github.com/AI45Lab/AgentDoG">Code</a>
              <a href="https://huggingface.co/collections/AI45Research/agentdog">Model</a>
              <a href="https://huggingface.co/papers/date/2026-01-28">#1 Paper of the day</a>
              <a href="https://mp.weixin.qq.com/s/gGcM_fBGnRCoGe4mxZZePw">机器之心</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/abs/2607.08964" class="paper-title">Long-Horizon-Terminal-Bench: Testing the Limits of Agents on Long-Horizon Terminal Tasks with Dense Reward-Based Grading</a>
            <div class="paper-auth">Zongxia Li, Zhongzhi Li, Yucheng Shi, Ruhan Wang, <strong><u>Junyao Yang</u></strong>, Zhichao Liu, Xiyang Wu, Anhao Li, Yue Yu, Ninghao Liu, Lichao Sun, Haotao Mi, Leowei Liang</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> A dense-reward terminal benchmark for measuring how far agents can progress on long, complex terminal workflows.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2607.08964">Paper</a>
              <a href="https://github.com/zli12321/LHTB">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/abs/2607.13285" class="paper-title">Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable</a>
            <div class="paper-auth">Ruhan Wang, Yucheng Shi, Zongxia Li, Zhongzhi Li, Yue Yu, <strong><u>Junyao Yang</u></strong>, Kishan Panaganti, Haitao Mi, Dongruo Zhou, Leoweiliang</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> A behavior-centric map and BGPD framework that help agents find code and plan harness edits.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2607.13285">Paper</a>
              <a href="https://ruhan-wang.github.io/Harness-Handbook/">Project</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">EMNLP 2025</span>
            <a href="https://arxiv.org/abs/2502.18517" class="paper-title">RewardDS: Privacy-Preserving Fine-Tuning for Large Language Models via Reward Driven Data Synthesis</a>
            <div class="paper-auth">Jianwei Wang, Chengming Shi, <strong><u>Junyao Yang</u></strong>, Haoran Li, Qianli Ma, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>&dagger;</sup></div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Using client-side reward models to filter synthetic data, mitigating noise while protecting privacy.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2502.18517">Paper</a>
              <a href="https://github.com/wjw136/RewardDS">Code</a>
            </div>
          </div>
        </div>

      </div>

      <!-- Full Publications (all, incl. arXiv preprints & Tech Report) -->
      <div id="pub-full" class="pub-list">

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">ACL 2026</span>
            <a href="https://arxiv.org/abs/2601.05560" class="paper-title">ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging</a>
            <div class="paper-auth"><strong><u>Junyao Yang</u></strong>, Chen Qian, Dongrui Liu<sup>&dagger;</sup>, Wen Shen, Yong Liu<sup>&dagger;</sup>, Jing Shao<sup>&dagger;</sup></div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Merging robust chain-of-thought capabilities into domain-specific models (Safety, Biomedicine) using Contrastive Gradient Identification.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2601.05560">Paper</a>
              <a href="https://github.com/jyyang26/ReasonAny">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">AAAI 2026</span>
            <a href="https://arxiv.org/abs/2508.03140" class="paper-title">RCP-Merging: Merging Long Chain-of-Thought Models with Domain-Specific Models by Considering Reasoning Capability as Prior</a>
            <div class="paper-auth"><strong><u>Junyao Yang</u></strong>, Jianwei Wang, Huiping Zhuang, Cen Chen, Ziqian Zeng*<sup>&dagger;</sup></div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Enhancing domain performance while preserving chain-of-thought reasoning abilities by treating reasoning as a prior.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2508.03140">Paper</a>
              <a href="https://github.com/ZeroNLP/RCP-Merging">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/abs/2607.18722" class="paper-title">Stale but Stable: Staleness-Adaptive Trust Regions for Stabilizing Asynchronous Reinforcement Learning</a>
            <div class="paper-auth"><strong><u>Junyao Yang</u></strong>, Yucheng Shi, Zongxia Li, Zhongzhi Li, Ruhan Wang, Xiangxin Zhou, Kishan Panaganti, Haitao Mi, Leowei Liang</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Stabilizing asynchronous RL by adapting trust regions to rollout staleness, tightening high-mismatch updates while preserving ordinary-token behavior.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2607.18722">Paper</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">ACL 2025</span>
            <a href="https://arxiv.org/abs/2406.01394" class="paper-title">PrivacyRestore: Privacy-Preserving Inference in Large Language Models via Privacy Removal and Restoration</a>
            <div class="paper-auth">Ziqian Zeng*<sup>&dagger;</sup>, Jianwei Wang*, <strong><u>Junyao Yang</u>*</strong>, Zhengdong Lu, Haoran Li, Huiping Zhuang, Cen Chen</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Protecting privacy via activation steering using a protected meta-vector without retraining.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2406.01394">Paper</a>
              <a href="https://github.com/ZeroNLP/PrivacyRestore">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/abs/2607.08964" class="paper-title">Long-Horizon-Terminal-Bench: Testing the Limits of Agents on Long-Horizon Terminal Tasks with Dense Reward-Based Grading</a>
            <div class="paper-auth">Zongxia Li, Zhongzhi Li, Yucheng Shi, Ruhan Wang, <strong><u>Junyao Yang</u></strong>, Zhichao Liu, Xiyang Wu, Anhao Li, Yue Yu, Ninghao Liu, Lichao Sun, Haotao Mi, Leowei Liang</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> A dense-reward terminal benchmark for measuring how far agents can progress on long, complex terminal workflows.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2607.08964">Paper</a>
              <a href="https://github.com/zli12321/LHTB">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/abs/2607.13285" class="paper-title">Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable</a>
            <div class="paper-auth">Ruhan Wang, Yucheng Shi, Zongxia Li, Zhongzhi Li, Yue Yu, <strong><u>Junyao Yang</u></strong>, Kishan Panaganti, Haitao Mi, Dongruo Zhou, Leoweiliang</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> A behavior-centric map and BGPD framework that help agents find code and plan harness edits.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2607.13285">Paper</a>
              <a href="https://ruhan-wang.github.io/Harness-Handbook/">Project</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-tech">Tech Report</span>
            <div class="paper-title-row">
              <a href="https://arxiv.org/abs/2601.18491" class="paper-title">AgentDoG: A Diagnostic Guardrail Framework for AI Agent Safety and Security</a>
            </div>
            <div class="paper-auth">Shanghai Artificial Intelligence Laboratory (Contributor)</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> A state-of-the-art diagnostic guardrail framework utilizing a unified three-dimensional taxonomy to provide fine-grained monitoring and root-cause analysis of AI agent safety risks.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2601.18491">Paper</a>
              <a href="https://github.com/AI45Lab/AgentDoG">Code</a>
              <a href="https://huggingface.co/collections/AI45Research/agentdog">Model</a>
              <a href="https://huggingface.co/papers/date/2026-01-28">#1 Paper of the day</a>
              <a href="https://mp.weixin.qq.com/s/gGcM_fBGnRCoGe4mxZZePw">机器之心</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/pdf/2605.17770v1" class="paper-title">Entropy-Gradient Inversion: Moving Toward Internal Mechanism of Large Reasoning Models</a>
            <div class="paper-auth"><strong><u>Junyao Yang</u></strong>, Chen Qian, Kun Wang, Linfeng Zhang, Quanshi Zhang, Yong Liu, Dongrui Liu<sup>&dagger;</sup></div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Identifying <em>Entropy-Gradient Inversion</em>&mdash;a robust negative correlation between token entropy and logit gradients&mdash;as a geometric fingerprint of LRM reasoning capability, and proposing <strong>CorR-PO</strong> that embeds this signature into RL reward regularization to stabilize reasoning optimization without costly external verifiers.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/pdf/2605.17770v1">Paper</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-arxiv">arXiv Preprint</span>
            <a href="https://arxiv.org/pdf/2601.15075" class="paper-title">The Why Behind the Action: Unveiling Internal Drivers via Agentic Attribution</a>
            <div class="paper-auth">Chen Qian, Peng Wang, Dongrui Liu<sup>&dagger;</sup>, <strong><u>Junyao Yang</u></strong>, Dadi Guo, Ling Tang, Jilin Mei, Qihan Ren, Shuai Shao, Yong Liu, Jie Fu, Jing Shao, Xia Hu</div>
            <div class="paper-tldr"><strong>TL;DR:</strong> A hierarchical framework for agentic attribution, using temporal likelihood and perturbation-based analysis to unveil internal factors driving LLM-based agent actions.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/pdf/2601.15075">Paper</a>
            <a href="https://arxiv.org/pdf/2601.15075">Code</a>
            </div>
          </div>
        </div>

        <div class="paper-entry">
          <div class="paper-info">
            <span class="paper-venue venue-conf">EMNLP 2025</span>
            <a href="https://arxiv.org/abs/2502.18517" class="paper-title">RewardDS: Privacy-Preserving Fine-Tuning for Large Language Models via Reward Driven Data Synthesis</a>
            <div class="paper-auth">Jianwei Wang, Chengming Shi, <strong><u>Junyao Yang</u></strong>, Haoran Li, Qianli Ma, Huiping Zhuang, Cen Chen, Ziqian Zeng<sup>&dagger;</sup></div>
            <div class="paper-tldr"><strong>TL;DR:</strong> Using client-side reward models to filter synthetic data, mitigating noise while protecting privacy.</div>
            <div class="paper-links">
              <a href="https://arxiv.org/abs/2502.18517">Paper</a>
              <a href="https://github.com/wjw136/RewardDS">Code</a>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section id="blogs" class="content-box">
      <div class="box-header"><h2 class="box-title">Blogs</h2></div>
      <div class="paper-entry">
        <div class="paper-info">
          <a href="https://zli12321.github.io/LHTB/index.html" class="paper-title">Long-Horizon Terminal-Bench: Measuring the Progress Agents Can Sustain, Not Just What They Can Finish</a>
          <div class="paper-tldr"><strong>TL;DR:</strong> LHTB evaluates agent progress on long terminal tasks in Docker with hidden dense-reward grading, not just final completion.</div>
        </div>
      </div>
      <div class="paper-entry">
        <div class="paper-info">
          <a href="https://ruhan-wang.github.io/Harness-Handbook/" class="paper-title">Harness Handbook: Making Agent Harnesses Understandable, Auditable, and Editable</a>
          <div class="paper-tldr"><strong>TL;DR:</strong> Harness Handbook maps behavior to implementation, making agent harnesses easier to inspect, navigate, and edit.</div>
        </div>
      </div>
      <div class="paper-entry">
        <div class="paper-info">
          <a href="{{ '/blogs/reasoning_token.html' | relative_url }}" class="paper-title">The Entropy-Gradient Inversion: A New Perspective on LLM Reasoning Capabilities</a>
          <div class="paper-tldr"><strong>TL;DR:</strong> We discover that reasoning models exhibit a unique "fingerprint": a significant negative correlation between gradient strength and token entropy, which contradicts traditional base models. This capability emerges rapidly within the first 200 steps of SFT.</div>
        </div>
      </div>
    </section>

    <section id="education" class="content-box">
      <div class="box-header"><h2 class="box-title">Education</h2></div>
      <div class="edu-row">
        <div class="edu-card">
          <img src="{{ '/images/NUS.jpg' | relative_url }}" alt="NUS" class="edu-logo">
          <div class="edu-deg">M.S. in AI</div>
          <div class="edu-sch">National University of Singapore</div>
          <span class="edu-yr">2025 - 2027 (Expected)</span>
        </div>
        <div class="edu-card">
          <img src="{{ '/images/South_China_University_of_Technology_Logo_(Since_2022).svg.png' | relative_url }}" alt="SCUT" class="edu-logo">
          <div class="edu-deg">B.S. in CS (with honor)</div>
          <div class="edu-sch">South China University of Technology</div>
          <span class="edu-yr">2021 - 2025</span>
        </div>
        <div class="edu-card">
          <img src="{{ '/images/SZSY_Logo.png' | relative_url }}" alt="SZSY" class="edu-logo">
          <div class="edu-deg">High School</div>
          <div class="edu-sch">Shenzhen Experimental School</div>
          <span class="edu-yr">2018 - 2021</span>
        </div>
      </div>
    </section>

    <section id="experience" class="content-box">
      <div class="box-header"><h2 class="box-title">Experience</h2></div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div class="exp-item">
          <img src="{{ '/images/tencent_hunyuan.png' | relative_url }}" class="exp-logo" alt="Tencent HY">
          <div>
            <div style="font-weight: 600; font-size: 15px; color: #201d18;">Tencent Hy</div>
            <div style="font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; color: #6f6a61;">Research Intern | 2026.04 - Present</div>
          </div>
        </div>
        <div class="exp-item">
          <img src="{{ '/images/ailab.png' | relative_url }}" class="exp-logo" alt="Shanghai AI Lab">
          <div>
            <div style="font-weight: 600; font-size: 15px; color: #201d18;">Shanghai AI Lab</div>
            <div style="font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; color: #6f6a61;">Research Intern | 2025.06 - 2026.04</div>
          </div>
        </div>
        <div class="exp-item">
          <img src="{{ '/images/South_China_University_of_Technology_Logo_(Since_2022).svg.png' | relative_url }}" class="exp-logo" alt="SCUT">
          <div>
            <div style="font-weight: 600; font-size: 15px; color: #201d18;">South China University of Technology</div>
            <div style="font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; color: #6f6a61;">Research Intern | 2024.07 - 2025.06</div>
          </div>
        </div>
        <div class="exp-item">
          <img src="{{ '/images/Tencent.png' | relative_url }}" class="exp-logo" alt="Tencent">
          <div>
            <div style="font-weight: 600; font-size: 15px; color: #201d18;">Tencent</div>
            <div style="font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 14px; color: #6f6a61;">Machine Learning Intern | 2024.04 - 2024.07</div>
          </div>
        </div>
        <div class="exp-item">
          <img src="{{ '/images/SZSE.png' | relative_url }}" class="exp-logo" alt="SZSE">
          <div>
            <div style="font-weight: 600; font-size: 15px; color: #201d18;">SZSE</div>
            <div style="font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; font-size: 13px; color: #6f6a61;">Machine Learning Intern | 2024.01 - 2024.04</div>
          </div>
        </div>
      </div>
    </section>

    <section id="honors" class="content-box">
      <div class="box-header"><h2 class="box-title">Honor &amp; Awards</h2></div>
      <ul class="honors-list">
        <li>Excellent Graduation Thesis (2025.06)</li>
        <li>Outstanding Student Leader (2022-2024)</li>
        <li>Second-Class Scholarship of SCUT (2024.10)</li>
        <li>Second-Class Award in CUMCM at Guangdong Province (2022.09)</li>
        <li>Second-Prize of Olympic Mathematics Competition (2020.05)</li>
        <li>Second-Prize of Olympic Physics Competition (2020.02)</li>
      </ul>
    </section>

  </main>
</div>

<footer class="site-footer">
  &copy; <span id="year"></span> Junyao Yang. All rights reserved.
</footer>

<script>
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Publication tabs (Selected / Full)
  (function () {
    var tabs = document.querySelectorAll('.pub-tab');
    var lists = document.querySelectorAll('.pub-list');
    var heading = document.getElementById('pub-heading');
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-target');
        tabs.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        lists.forEach(function (l) {
          l.classList.toggle('active', l.id === target);
        });
        if (heading) {
          heading.textContent = target === 'pub-full' ? 'Full Publications' : 'Selected Publications';
        }
      });
    });
  })();

  // Live GitHub star count (fallback to hard-coded number on failure)
  (function () {
    var badges = document.querySelectorAll('.gh-star[data-repo]');
    if (!badges.length || !window.fetch) return;
    var cache = {};
    badges.forEach(function (badge) {
      var repo = badge.getAttribute('data-repo');
      if (!repo) return;
      var countEl = badge.querySelector('.gh-star-count');
      if (!countEl) return;
      var render = function (n) {
        if (typeof n !== 'number' || isNaN(n)) return;
        countEl.textContent = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
      };
      if (cache[repo] != null) { render(cache[repo]); return; }
      fetch('https://api.github.com/repos/' + repo, {
        headers: { 'Accept': 'application/vnd.github+json' }
      })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (data && typeof data.stargazers_count === 'number') {
            cache[repo] = data.stargazers_count;
            render(data.stargazers_count);
          }
        })
        .catch(function () { /* keep fallback */ });
    });
  })();

  // Dark mode toggle
  (function () {
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
    toggle.addEventListener('click', function () {
      var isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  })();
</script>

</body>
</html>
