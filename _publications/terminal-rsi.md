---
paper_id: terminal-rsi
title: 'Terminal-RSI: Recursive Self-Improving Terminal Agents via Recursive Self-Rewrite and Policy-Refine'
authors:
  - {name: 'Junyao Yang', marks: '*'}
  - {name: 'Zongxia Li', marks: '*'}
  - {name: 'Yucheng Shi', marks: '*'}
  - {name: 'Zhongzhi Li'}
  - {name: 'Ruhan Wang'}
  - {name: 'Ruiwen Zhou'}
  - {name: 'Haitao Mi'}
  - {name: 'Shuicheng Yan', marks: '†'}
  - {name: 'Leowei Liang'}
author_note: '* Equal contribution · † Corresponding author'
venue: arXiv Preprint
accepted: false
selected: true
featured: true
selected_order: 0
order: 0
year: 2026
tldr: 'Alternating verified trajectory rewriting with critic-inheriting policy refinement, using turn-boundary credit assignment and stage-specific rewards to advance terminal agents from partial progress to strict task completion. Terminal-RSI-27B achieves 19.84% on Terminal-Bench 4.0 and 86.52% on Terminal-Bench 2.1.'
paperurl: https://arxiv.org/abs/2610.22192
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2610.22192'}
  - {label: 'Project Page', url: 'https://jyyang26.github.io/terminal-rsi'}
  - {label: Code, url: 'https://github.com/jyyang26/Terminal-RSI'}
  - {label: Model, url: 'https://huggingface.co/Teriminal-RSI'}
image: /images/publications/terminal-rsi-abstract.webp
image_alt: 'Terminal-RSI abstract-page results across Terminal-Bench 4.0, 3.0, 2.1, Hard, LHTB and SWR100'
image_source: '_publications/arXiv-2610.22192v1 (1)/figures/RSI_main_3x2_2to1.pdf'
source_path: '_publications/arXiv-2610.22192v1 (1)/main.tex'
category: manuscripts
layout: single
permalink: /publications/terminal-rsi/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
