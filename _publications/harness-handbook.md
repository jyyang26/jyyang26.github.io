---
paper_id: harness-handbook
title: 'Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable'
authors:
  - {name: Ruhan Wang}
  - {name: Yucheng Shi, marks: '‡'}
  - {name: Zongxia Li}
  - {name: Zhongzhi Li}
  - {name: Yue Yu}
  - {name: Junyao Yang}
  - {name: Kishan Panaganti}
  - {name: Haitao Mi}
  - {name: Dongruo Zhou}
  - {name: Leowei Liang}
author_note: '‡ Lead project collaborator (marked † in the source paper) · Ruhan Wang conducted this work during an internship at Tencent Seattle'
venue: arXiv Preprint
accepted: false
selected: false
featured: false
selected_order: 10
order: 8
year: 2026
tldr: 'A behavior-centric representation maps agent harness responsibilities to their implementations. The BGPD framework uses this handbook to localize code and plan edits as harnesses evolve.'
paperurl: https://arxiv.org/abs/2607.13285
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2607.13285'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2607.13285'}
  - {label: 'Project Page', url: 'https://ruhan-wang.github.io/Harness-Handbook/'}
image: /images/publications/harness-handbook.webp
image_alt: 'Harness Handbook maps behavior inventory to implementation and code-edit planning'
source_path: '_publications/arXiv-2607.13285v1 (2)/main.tex'
category: manuscripts
layout: single
permalink: /publications/harness-handbook/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
