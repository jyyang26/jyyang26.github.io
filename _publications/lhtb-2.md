---
paper_id: lhtb-2
title: 'Long-Horizon-Terminal-Bench 2.0: Automating Diverse Task Construction and Measuring Sustained Agent Progress'
authors:
  - {name: Zongxia Li, marks: '‡'}
  - {name: Zhongzhi Li, marks: '‡'}
  - {name: Yucheng Shi, marks: '‡'}
  - {name: Ruhan Wang}
  - {name: Junyao Yang}
  - {name: Chengsong Huang}
  - {name: Zhichao Liu}
  - {name: Xiyang Wu}
  - {name: Anhao Li}
  - {name: Yue Yu}
  - {name: Ergan Shang}
  - {name: Fuxiao Liu}
  - {name: Tong Zheng}
  - {name: Ninghao Liu}
  - {name: Lichao Sun}
  - {name: Haitao Mi}
  - {name: Leowei Liang}
author_note: '‡ Core contribution (marked † in the source paper)'
venue: arXiv Preprint
accepted: false
selected: false
featured: false
order: 2
year: 2026
tldr: 'LHTB 2.0 expands process-aware terminal evaluation to 77 tasks across 13 domains, including systematically reconstructed scientific and engineering workflows. Three-hour runs and verifier checkpoints measure sustained progress rather than only binary final outcomes.'
paperurl: https://arxiv.org/abs/2610.14146
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2610.14146'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2610.14146'}
  - {label: 'Project Page', url: 'https://zli12321.github.io/LHTB/'}
image: /images/publications/lhtb-2.webp
image_alt: 'LHTB 2.0 cost and reward comparison across frontier models on 77 tasks'
source_path: _publications/arXiv-2610.14146v1/paper.tex
category: manuscripts
layout: single
permalink: /publications/lhtb-2/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
