---
paper_id: privacyrestore
title: 'PrivacyRestore: Privacy-Preserving Inference in Large Language Models via Privacy Removal and Restoration'
authors:
  - {name: Ziqian Zeng, marks: '*†'}
  - {name: Jianwei Wang, marks: '*'}
  - {name: Junyao Yang, marks: '*'}
  - {name: Zhengdong Lu}
  - {name: Haoran Li}
  - {name: Huiping Zhuang}
  - {name: Cen Chen}
author_note: '* Equal contribution · † Corresponding author'
venue: ACL 2025 Main
accepted: true
selected: true
featured: false
selected_order: 4
order: 16
year: 2025
tldr: 'A plug-and-play privacy-preserving inference framework removes sensitive spans before sending inputs to an LLM service. Protected restoration vectors recover useful information through activation steering without retraining the model.'
paperurl: https://arxiv.org/abs/2406.01394
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2406.01394'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2406.01394'}
  - {label: Code, url: 'https://github.com/ZeroNLP/PrivacyRestore'}
image: /images/publications/privacyrestore.webp
image_alt: 'PrivacyRestore client-server workflow for privacy removal and activation-based restoration'
source_path: _publications/arXiv-2406.01394v5/acl.tex
category: conferences
layout: single
permalink: /publications/privacyrestore/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
