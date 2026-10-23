---
paper_id: harness-self-evolution
title: 'Harness Self-Evolution for Long-Horizon Terminal Agents'
authors:
  - {name: Ruhan Wang}
  - {name: Yucheng Shi, marks: '‡'}
  - {name: Zongxia Li}
  - {name: Junyao Yang}
  - {name: Zhongzhi Li}
  - {name: Yue Yu}
  - {name: Haitao Mi}
  - {name: Dongruo Zhou}
  - {name: Leowei Liang}
author_note: '‡ Internship mentor (marked † in the source paper) · Work conducted during an internship at Tencent'
venue: arXiv Preprint
accepted: false
selected: false
featured: false
order: 1
year: 2026
tldr: 'RiseHarness iteratively improves agent harnesses while keeping model weights fixed. Successful and failed trajectories, internal execution traces, and a Harness Handbook guide behavior-level edits that are validated through repeated task evaluation.'
paperurl: https://arxiv.org/abs/2610.27435
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2610.27435'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2610.27435'}
image: /images/publications/harness-self-evolution.webp
image_alt: 'RiseHarness workflow for runtime monitoring, behavioral diagnosis, external research and harness evolution'
source_path: _publications/arXiv-2610.27435v1/rsi_harness.tex
category: manuscripts
layout: single
permalink: /publications/harness-self-evolution/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
