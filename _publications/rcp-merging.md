---
paper_id: rcp-merging
title: 'RCP-Merging: Merging Long Chain-of-Thought Models with Domain-Specific Models by Considering Reasoning Capability as Prior'
authors:
  - {name: Junyao Yang}
  - {name: Jianwei Wang}
  - {name: Huiping Zhuang}
  - {name: Cen Chen}
  - {name: Ziqian Zeng, marks: '†'}
author_note: '† Corresponding author'
venue: AAAI 2026 Main Track
accepted: true
selected: true
featured: false
selected_order: 3
order: 14
year: 2026
tldr: 'Treating reasoning capability as a prior identifies and preserves reasoning-sensitive parameters during model merging. This enhances domain-specific performance while retaining long chain-of-thought abilities.'
paperurl: https://arxiv.org/abs/2508.03140
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2508.03140'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2508.03140'}
  - {label: Code, url: 'https://github.com/ZeroNLP/RCP-Merging'}
image: /images/publications/rcp-merging.webp
image_alt: 'Three stages of RCP-Merging for preserving reasoning capability while adding domain knowledge'
source_path: _publications/arXiv-2508.03140v2/aaai24.tex
category: conferences
layout: single
permalink: /publications/rcp-merging/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
