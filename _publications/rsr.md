---
paper_id: rsr
title: 'RSR: Scaling Trajectories for Complex Tasks through Recursive Self-Rewrite'
authors:
  - {name: Zongxia Li, marks: '‡'}
  - {name: Yucheng Shi, marks: '‡'}
  - {name: Zhongzhi Li, marks: '‡'}
  - {name: Junyao Yang}
  - {name: Ruhan Wang}
  - {name: Chengsong Huang}
  - {name: Fuxiao Liu}
  - {name: Haitao Mi}
  - {name: Jordan Boyd-Graber}
  - {name: Leowei Liang}
author_note: '‡ Core contribution (marked † in the source paper)'
venue: arXiv Preprint
accepted: false
selected: true
featured: false
selected_order: 6
order: 3
year: 2026
tldr: 'Recursive Self-Rewrite turns successful trajectories discovered under diverse harnesses into reusable capabilities under a general harness. It expands 2,001 trajectories to 11,094 and improves Qwen-3.8-27B pass@3 from 57.0% to 74.2% on Terminal-Bench 2.'
paperurl: https://arxiv.org/abs/2610.02826
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2610.02826'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2610.02826'}
  - {label: Model, url: 'https://huggingface.co/IntelligenceLab/RSR-27B'}
image: /images/publications/rsr.webp
image_alt: 'RSR planner, critic and executor pipeline for rewriting verified trajectories'
source_path: _publications/arXiv-2610.02826v1/paper.tex
category: manuscripts
layout: single
permalink: /publications/rsr/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
