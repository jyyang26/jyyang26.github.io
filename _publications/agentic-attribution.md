---
paper_id: agentic-attribution
title: 'The Why Behind the Action: Unveiling Internal Drivers via Agentic Attribution'
authors:
  - {name: Chen Qian}
  - {name: Peng Wang}
  - {name: Dongrui Liu, marks: '†'}
  - {name: Junyao Yang}
  - {name: Dadi Guo}
  - {name: Ling Tang}
  - {name: Jilin Mei}
  - {name: Qihan Ren}
  - {name: Shuai Shao}
  - {name: Yong Liu}
  - {name: Jie Fu}
  - {name: Jing Shao}
  - {name: Xia Hu}
author_note: '† Corresponding author'
venue: arXiv Preprint
accepted: false
selected: false
featured: false
order: 12
year: 2026
tldr: 'A hierarchical attribution framework explains the historical factors driving LLM-based agent actions, independent of task success or failure. Temporal likelihood identifies critical interaction components, and perturbation analysis localizes influential sentences.'
paperurl: https://arxiv.org/abs/2601.15075
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2601.15075'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2601.15075'}
  - {label: Code, url: 'https://github.com/AI45Lab/AgentDoG'}
image: /images/publications/agentic-attribution.webp
image_alt: 'Agentic attribution pipeline combining temporal likelihood, agent trajectory and sentence-level attribution'
source_path: _publications/arXiv-2601.15075v2/example_paper.tex
category: manuscripts
layout: single
permalink: /publications/agentic-attribution/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
