---
paper_id: stale-but-stable
title: 'Stale but Stable: Staleness-Adaptive Trust Regions for Stabilizing Asynchronous Reinforcement Learning'
authors:
  - {name: Junyao Yang, marks: '†'}
  - {name: Yucheng Shi, marks: '‡'}
  - {name: Zongxia Li}
  - {name: Zhongzhi Li}
  - {name: Ruhan Wang}
  - {name: Xiangxin Zhou}
  - {name: Kishan Panaganti}
  - {name: Haitao Mi}
  - {name: Leowei Liang}
author_note: '† Corresponding author · ‡ Project lead; source role symbols normalized'
venue: arXiv Preprint
accepted: false
selected: false
featured: false
order: 7
year: 2026
tldr: 'Staleness-adaptive trust regions stabilize asynchronous reinforcement learning by contracting high-mismatch outward updates. The method preserves ordinary-token behavior while controlling heterogeneous rollout staleness.'
paperurl: https://arxiv.org/abs/2607.18722
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2607.18722'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2607.18722'}
  - {label: 'Project Page', url: 'https://jyyang26.github.io/stable_async_analysis/'}
image: /images/publications/stale-but-stable.webp
image_alt: 'Asynchronous reinforcement-learning workflow with policy lag and training-inference mismatch'
source_path: _publications/arXiv-2607.18722v3/paper.tex
category: manuscripts
layout: single
permalink: /publications/stale-but-stable/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
