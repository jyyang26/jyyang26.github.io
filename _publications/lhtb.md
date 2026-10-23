---
paper_id: lhtb
title: 'Long-Horizon-Terminal-Bench: Testing the Limits of Agents on Long-Horizon Terminal Tasks with Dense Reward-Based Grading'
authors:
  - {name: Zongxia Li, marks: '‡'}
  - {name: Zhongzhi Li, marks: '‡'}
  - {name: Yucheng Shi, marks: '‡'}
  - {name: Ruhan Wang}
  - {name: Junyao Yang}
  - {name: Zhichao Liu}
  - {name: Xiyang Wu}
  - {name: Anhao Li}
  - {name: Chengsong Huang}
  - {name: Ergan Shang}
  - {name: Yue Yu}
  - {name: Ninghao Liu}
  - {name: Lichao Sun}
  - {name: Haitao Mi}
  - {name: Leowei Liang}
author_note: '‡ Core contribution (marked † in the source paper)'
venue: arXiv Preprint
accepted: false
selected: true
featured: false
selected_order: 8
order: 9
year: 2026
tldr: 'A benchmark of 46 long-horizon terminal tasks evaluates sustained agent execution using dense subtask-level rewards. Partial-credit grading exposes intermediate progress that binary task-completion metrics miss.'
paperurl: https://arxiv.org/abs/2607.08964
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2607.08964'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2607.08964'}
  - {label: Code, url: 'https://github.com/zli12321/LHTB'}
image: /images/publications/lhtb.webp
image_alt: 'LHTB task construction, terminal execution and dense reward grading pipeline'
source_path: _publications/arXiv-2607.08964v3/paper.tex
category: manuscripts
layout: single
permalink: /publications/lhtb/
---

{% for author in page.authors %}{% if author.name == 'Junyao Yang' %}**{{ author.name }}**{% else %}{{ author.name }}{% endif %}{{ author.marks }}{% unless forloop.last %}, {% endunless %}{% endfor %}

{{ page.author_note }}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
