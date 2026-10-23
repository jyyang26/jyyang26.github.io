---
paper_id: swr
title: 'SWR: Self-Supervised Scaling of Terminal Environments for Scientific Domains'
authors:
  - {name: Zhongzhi Li, marks: '*'}
  - {name: Yucheng Shi, marks: '*‡'}
  - {name: Zongxia Li, marks: '*'}
  - {name: Junyao Yang}
  - {name: Ruhan Wang}
  - {name: Yu Wang}
  - {name: Jingyuan Huang}
  - {name: Jichao Yu}
  - {name: Ninghao Liu, marks: '†'}
  - {name: Haitao Mi}
  - {name: Leowei Liang}
author_note: '* Equal contribution · † Corresponding author · ‡ Project lead; source role symbols normalized'
venue: arXiv Preprint
accepted: false
selected: true
featured: false
selected_order: 7
order: 4
year: 2026
tldr: 'Software-in-the-loop reconstruction derives reference behavior and verifiers from scientific software workflows. Scaling to 500 workflows across 46 software families and six domains improves Qwen3.8-27B on Terminal-Bench 2 from 47.94% to 53.56%.'
paperurl: https://arxiv.org/abs/2610.02710
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2610.02710'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2610.02710'}
image: /images/publications/swr.webp
image_alt: 'SWR observe, reconstruct and verify workflow for scientific terminal environments'
source_path: _publications/arXiv-2610.02710v1/iclr2027_conference.tex
category: manuscripts
layout: single
permalink: /publications/swr/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
