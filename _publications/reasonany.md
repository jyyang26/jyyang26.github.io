---
paper_id: reasonany
title: 'ReasonAny: Incorporating Reasoning Capability to Any Model via Simple and Effective Model Merging'
authors:
  - {name: Junyao Yang}
  - {name: Chen Qian, marks: '‡'}
  - {name: Dongrui Liu, marks: '†'}
  - {name: Wen Shen}
  - {name: Yong Liu, marks: '†'}
  - {name: Jing Shao, marks: '†'}
author_note: '† Corresponding authors · ‡ Project lead; work conducted during an internship at Shanghai AI Lab'
venue: ACL 2026 Main
accepted: true
selected: true
featured: false
selected_order: 2
order: 13
year: 2026
tldr: 'Contrastive Gradient Identification separates reasoning-related parameters from task-specific knowledge to prevent destructive collapse during model merging. The method transfers robust chain-of-thought capabilities into domain-specific models without additional training.'
paperurl: https://arxiv.org/abs/2601.05560
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2601.05560'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2601.05560'}
  - {label: Code, url: 'https://github.com/jyyang26/ReasonAny'}
image: /images/publications/reasonany.webp
image_alt: 'ReasonAny model-merging workflow and performance across safety, biomedicine and finance'
source_path: _publications/arXiv-2601.05560v1/latex/acl_latex.tex
category: conferences
layout: single
permalink: /publications/reasonany/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
