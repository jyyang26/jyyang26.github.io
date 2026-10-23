---
paper_id: rewardds
title: 'RewardDS: Privacy-Preserving Fine-Tuning for Large Language Models via Reward Driven Data Synthesis'
authors:
  - {name: Jianwei Wang}
  - {name: Chengming Shi}
  - {name: Junyao Yang}
  - {name: Haoran Li}
  - {name: Qianli Ma}
  - {name: Huiping Zhuang}
  - {name: Cen Chen}
  - {name: Ziqian Zeng, marks: '†'}
author_note: '† Corresponding author'
venue: EMNLP 2025 Main
accepted: true
selected: false
featured: false
selected_order: 11
order: 15
year: 2025
tldr: 'Reward proxy models guide the filtering and self-optimizing refinement of synthetic data for privacy-preserving LLM fine-tuning. This reduces noise in generated supervision while protecting sensitive training data.'
paperurl: https://arxiv.org/abs/2502.18517
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2502.18517'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2502.18517'}
  - {label: Code, url: 'https://github.com/wjw136/RewardDS'}
image: /images/publications/rewardds.webp
image_alt: 'RewardDS synthetic-data generation, reward-guided filtering, refinement and fine-tuning pipeline'
source_path: _publications/arXiv-2502.18517v2/acl_latex.tex
category: conferences
layout: single
permalink: /publications/rewardds/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
