---
paper_id: entropy-gradient-inversion
title: 'Entropy-Gradient Inversion: Moving Toward Internal Mechanism of Large Reasoning Models'
authors:
  - {name: Junyao Yang, marks: '*'}
  - {name: Chen Qian, marks: '*'}
  - {name: Kun Wang}
  - {name: Linfeng Zhang}
  - {name: Quanshi Zhang}
  - {name: Yong Liu, marks: '†'}
  - {name: Dongrui Liu, marks: '†'}
author_note: '* Equal contribution · † Corresponding authors'
venue: arXiv Preprint
accepted: false
selected: false
featured: false
order: 10
year: 2026
tldr: 'Entropy-Gradient Inversion identifies a robust negative correlation between token entropy and logit gradients as a geometric signature of reasoning capability. CorR-PO incorporates this signature into reward regularization to stabilize reasoning-model reinforcement learning.'
paperurl: https://arxiv.org/abs/2605.17770
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2605.17770'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2605.17770'}
image: /images/publications/entropy-gradient-inversion.webp
image_alt: 'Entropy-gradient inversion contrasts high-entropy reasoning models with low-entropy non-reasoning models'
source_path: _publications/arXiv-2605.17770v4/neurips_2026.tex
category: manuscripts
layout: single
permalink: /publications/entropy-gradient-inversion/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
