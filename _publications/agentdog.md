---
paper_id: agentdog
title: 'AgentDoG: A Diagnostic Guardrail Framework for AI Agent Safety and Security'
authors:
  - {name: Shanghai Artificial Intelligence Laboratory}
role: Contributor
contributor_groups:
  - label: Scientific Directors
    names: [Xia Hu, Chaochao Lu]
  - label: Project Co-Leaders (Corresponding authors)
    names: [Dongrui Liu, Jing Shao]
  - label: Core Contributors
    names: [Dongrui Liu, Qihan Ren, Chen Qian, Shuai Shao, Yuejin Xie, Yu Li, Zhonghao Yang, Haoyu Luo, Peng Wang, Qingyu Liu]
  - label: Contributors
    names: [Binxin Hu, Ling Tang, Jilin Mei, Dadi Guo, Leitao Yuan, Junyao Yang, Guanxu Chen, Qihao Lin, Yi Yu, Bo Zhang, Jiaxuan Guo, Jie Zhang, Wenqi Shao, Huiqi Deng, Zhiheng Xi, Wenjie Wang, Wenxuan Wang, Wen Shen]
  - label: Technical Acknowledgements
    names: [Zhikai Chen, Haoyu Xie, Jialing Tao, Juntao Dai, Jiaming Ji, Zhongjie Ba, Linfeng Zhang, Yong Liu, Quanshi Zhang, Lei Zhu, Zhihua Wei, Hui Xue]
venue: Technical Report
accepted: false
selected: true
featured: false
selected_order: 5
order: 11
year: 2026
tldr: 'A diagnostic guardrail framework uses a unified three-dimensional risk taxonomy to monitor agent trajectories. Fine-grained attribution identifies the causes of unsafe behavior and supports root-cause analysis.'
paperurl: https://arxiv.org/abs/2601.18491
links:
  - {label: Paper, url: 'https://arxiv.org/abs/2601.18491'}
  - {label: arXiv, url: 'https://arxiv.org/abs/2601.18491'}
  - {label: Code, url: 'https://github.com/AI45Lab/AgentDoG'}
  - {label: Model, url: 'https://huggingface.co/collections/AI45Research/agentdog'}
  - {label: '#1 Paper of the day', url: 'https://huggingface.co/papers/date/2026-01-28'}
  - {label: 机器之心, url: 'https://mp.weixin.qq.com/s/gGcM_fBGnRCoGe4mxZZePw'}
image: /images/publications/agentdog.webp
image_alt: 'AgentDoG data synthesis pipeline with planning, trajectory generation and filtering'
source_path: _publications/arXiv-2601.18491v2/main.tex
category: manuscripts
layout: single
permalink: /publications/agentdog/
---

{{ page.authors.first.name }}

{% for group in page.contributor_groups %}
**{{ group.label }}:** {% for name in group.names %}{% if name == 'Junyao Yang' %}**{{ name }}**{% else %}{{ name }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}

{% endfor %}

![{{ page.image_alt }}]({{ page.image | relative_url }})

{{ page.tldr }}

{% for link in page.links %}[{{ link.label }}]({{ link.url }}) {% endfor %}
