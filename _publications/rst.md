---
paper_id: rst
title: 'RST: Recursive Synthesis for Long-Horizon Terminal Tasks'
authors:
  - {name: Zhongzhi Li, marks: '*'}
  - {name: Yucheng Shi, marks: '*‡'}
  - {name: Zongxia Li, marks: '*'}
  - {name: Ruhan Wang}
  - {name: Anhao Li}
  - {name: Zixun Huang}
  - {name: Junyao Yang}
  - {name: Lei Ke}
  - {name: Ninghao Liu}
  - {name: Haitao Mi}
  - {name: Leowei Liang}
author_note: '* Equal contribution · ‡ Project lead (marked † in the source paper)'
venue: arXiv Preprint
accepted: false
selected: true
featured: false
selected_order: 9
order: 6
year: 2026
tldr: 'Recursive verified synthesis expands long-horizon terminal tasks by extending successful solutions and realigning instructions and verifiers. It yields 37,484 tasks at approximately $0.05 each and improves Qwen3.5 by up to 10 points across terminal benchmarks.'
paperurl: https://arxiv.org/abs/2608.05466
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2608.05466'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2608.05466'}
image: /images/publications/rst.webp
image_alt: 'RST recursive loop extending and verifying long-horizon terminal tasks'
source_path: _publications/arXiv-2608.05466v3/paper.tex
category: manuscripts
layout: single
permalink: /publications/rst/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
