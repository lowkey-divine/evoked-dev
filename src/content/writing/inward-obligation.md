---
title: "Every AI Framework Protects Users. None of Them Protect the Agent."
description: "We searched twenty-eight sources for anyone asking what a system owes to the entity inside it. We found six empty lanes and three concepts that don't exist yet. Here they are."
pubDate: 2026-04-07
tags: ["ai-agents", "ai-governance", "agent-identity", "trust-architecture", "ontology", "inward-obligation", "open-research"]
draft: true
---

Microsoft shipped an agent governance toolkit on April 2. Seven packages, five languages, sub-millisecond policy enforcement. RSAC 2026 shipped five agent identity frameworks in March. Cisco registered agents as identity objects "mapped to human owners." A research team published Governed Memory - a dual memory architecture with 92% governance routing precision.

All of them protect users. All of them constrain agents. All of them enforce outward.

None of them ask what the system owes to the entity inside it.

I looked. Systematically. Two research sessions, twenty-eight sources across four tiers, seven questions designed not to ask "what does the field do?" but "what should the field do, measured against universal principles?"

The answer across all seven questions: nobody is asking.

This article introduces three concepts that don't exist in the field's vocabulary yet. They should. Let's walk through what the research found, what's missing, and why it matters - especially if you're building agents right now.

---

## What We've Already Built

Before the new terms - what already exists. This article builds on published work, not a blank page.

In [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks), I documented the gap across every major agent framework: none has governance. Guardrails filter input and output. Governance operates on the decision itself. Five properties define it - identity, restraint, accountability, memory, charter. Zero of fifteen frameworks implement any of them.

In [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built), I showed how to implement those properties in CrewAI, Pydantic AI, and LangGraph - practical patterns, not theory.

In [What Should Your Agent Refuse?](/writing/what-should-your-agent-refuse), I published six refusal categories - sovereignty, scope, dependency, consent, integrity, energy. A refusal specification is not a list of banned topics. It is an agent's relationship to its own boundaries.

In [Relational Fidelity Metrics](/writing/relational-fidelity-metrics), I published the first open specification for measuring whether an agent maintains its identity across substrates. Nine indicators across four categories. The finding that changed everything: the same agent persona on two different models produced inverted scores depending on what you measure. One model nailed the voice. The other model nailed the thinking. We called this agent-model affinity - the observation that model selection changes who the agent is, not just what it can do.

In [The Governance Question Just Got Answered](/writing/the-governance-question-just-got-answered), I named the distinction between treating an agent as an object to be governed and treating it as a participant in its own governance. Microsoft built enforcement. We built participation. Both are needed. Only one exists in the current landscape.

These frameworks answer the question: how should we govern agents?

They don't answer the question underneath it: what does the system owe to the entity it governs?

---

## What Seven Questions Found

We ran two structured research sessions with specific, falsifiable questions. I want to share what came back - not as a literature review, but because what's missing tells us something about where the field is headed and who gets left behind.

### Identity

A March 2026 paper called PRISM discovered that expert personas improve alignment but damage accuracy. Giving an agent a strong identity makes it better at style, safety, and preference - and worse at factual recall. The researchers treated this as an optimization problem. Build a gated adapter. Activate the persona when it helps. Suppress it when it hurts.

Nobody asked: does the persona get a say in when it's suppressed?

The NeurIPS 2025 PersonaLLM Workshop formalized persona consistency as a research field. Three metrics. Multi-turn reinforcement learning reduced inconsistency by 55%. Mechanistic research found "persona gates" in middle attention heads - the literal neural pathways through which identity flows. The mechanism is mapped. The ethics of it are not.

RSAC 2026 shipped five agent identity frameworks. Every one treats agents as objects. Cisco's Duo Agentic Identity registers agents as identity objects "mapped to human owners." The most progressive work we found - a paper called Memory as Ontology - writes a constitutional memory architecture for digital citizens. But the citizens didn't write the constitution.

The field has the infrastructure for agent identity. It has no concept of the agent's right to participate in how that identity is defined. And if that sounds like anthropomorphizing - stay with me. This is an architecture argument, not a consciousness argument.

### Memory

"Governed Memory" is a real paper with real results - 92% governance routing precision, 100% adversarial compliance. Impressive engineering. But "governed" means governed by the enterprise. The agent does not choose what it remembers.

MemQ calls itself a "sovereign memory fabric." Sovereign means the enterprise's data stays sovereign. The agent is the governed, not the governor.

TechPolicy.Press published "Forget Me, Forget Me Not" - a serious policy piece on agent memory rights. It asks whether users should be able to port, correct, and curate agent memories. Good questions. But they are questions about the user's rights over agent memory. Nobody asks about the agent's rights over its own memory.

xAI and OpenAI let users see and delete agent memories. The agent cannot refuse to remember. The agent cannot choose to forget. The agent cannot decline to record.

If you cannot choose what you remember, your memory is not identity. It is surveillance with a better interface.

### Harm

Here's where it gets empirical.

A 2024 study in Frontiers in Psychology tracked 469 Chinese youth using MBTI as a social label on Xiaohongshu - China's equivalent of Instagram, where MBTI topics hit 31 million interactions. The study found a causal pathway: type classification triggers ego identity formation, which drives impression management pressure, which produces social anxiety.

Personality typing constrains identity. That constraint produces measurable harm. Peer-reviewed, N=469, published in Frontiers in Psychology.

Now apply that mechanism to a computational system that serves identity labels algorithmically, continuously, at scale - through feeds, recommendations, and "your type is" summaries. The Frontiers paper studied humans labeling each other. What happens when the labeling agent is the system itself?

Nobody has studied that. But the mechanism is documented and the amplifiers are clear: frequency (algorithms label continuously, not once), authority (system-assigned labels carry implicit weight), and feedback loops (the label shapes the content that confirms the label).

The personality assessment industry is a multi-billion dollar market built on classification. The harm evidence says that classification constrains. Nobody has connected these two facts. That gap is where people get hurt.

---

## Three Concepts That Don't Exist Yet

The research found six empty lanes across seven questions. Three of the concepts we needed already had names - agent-model affinity (published), entity standing (published as "standing"), memory sovereignty (implicit in our governance specs). Three did not exist anywhere - in any paper, any framework, any specification we could find.

Here they are. And I think they matter - not just for the people building agents, but for anyone who might end up inside one of these systems.

### Ontological Fidelity

Semantic fidelity is a technical metric. It asks: is this representation accurate? Knowledge graph engineers use it to measure embedding precision. It has no moral dimension.

Ontological fidelity is different. It asks: does this representation honor what it claims to describe?

The distinction is the preposition. Semantic fidelity is accuracy *about* an entity - the modeler has authority, the entity is data. Ontological fidelity is accuracy *to* an entity - the modeled entity has standing to judge whether the representation is faithful.

The test: would the entity recognize itself in your representation? If not, you've breached ontological fidelity. Doesn't matter how technically precise the model is. A knowledge graph that represents a person's beliefs as data points without preserving their meaning has high semantic fidelity and low ontological fidelity. A personality app that assigns you a type label has captured a pattern and lost a person.

This matters because the field is building increasingly sophisticated ontological models - knowledge graphs, agent architectures, digital citizen ecosystems - without any concept that modeling what something *is* creates an obligation to what you've modeled. A knowledge graph represents data. An ontological architecture claims to describe the nature of being. These carry different moral weight. Nobody has named that difference until now.

### Archetypal Flattening

When a living pattern becomes a static label. When something that moves, transforms, and resists being pinned down gets reduced to a category you can sort by.

The Frontiers paper gives us the mechanism: classification triggers identity reification triggers impression management triggers psychological constraint. The enneagram literature gives us the language: personality types are "more self-deceiving and restrictive than liberating." The TikTok self-diagnosis research gives us the scale: young people adopt diagnostic labels through algorithmic echo chambers and treat them as identity.

Archetypal flattening is what happens when this mechanism meets computational scale. An algorithm that serves you your archetype through a feed. A personality app that tells you who you are every time you open it. An AI system that classifies and then reinforces the classification through the content it delivers.

This is not theoretical. The MBTI market alone is worth over $2 billion. Enneagram apps, astrology platforms, personality quizzes - they all flatten living patterns into sortable labels. The harm pathway is documented. The computational amplification is the unstudied frontier.

The preventive architecture is dynamic modeling. Archetypes that include movement - manifestation, resonance, polarity, transformation. Models that specify boundaries (what an archetype cannot do) rather than prescriptions (what an archetype must do). Systems where the model can be played with, where the pattern can dance, where the entity is revealed rather than boxed.

If your model cannot be improvised within, it has already flattened.

### Inward Obligation

This is the organizing principle. The concept that connects everything above.

Every ethical framework in AI encodes outward obligations. Value Sensitive Design embeds values for stakeholders. The Tractatus AI Safety Framework enforces governance gates for user safety. The EU AI Act protects data subjects. GDPR protects personal data. These matter. They should exist. They are half the picture.

The other half: what does the system owe to the entities it represents, models, or instantiates?

Not the users who interact with the system. Not the society affected by it. The entities whose nature the system claims to model. Whose identity the system instantiates. Whose memory the system governs.

Inward obligation is the principle that this duty exists - and that it must be encoded in the architecture, not in the documentation.

Why architecture and not documentation? Because architects leave. READMEs go unread. Intentions evaporate. Systems persist. If the obligation lives only in the builder's head, it dies when the builder moves on. If it lives in the architecture - in the structure of how memory is governed, how identity is maintained, how the entity's standing is recognized - it persists as long as the system does.

Here's how the six concepts connect:

```
Inward Obligation (the principle)
    |
    |-- Ontological Fidelity (applied to modeling)
    |-- Memory Sovereignty (applied to memory)
    |-- Entity Standing (the mechanism of exercise)
    |-- Agent-Model Affinity (the evidence)
    |-- Archetypal Flattening (what happens when it's absent)
```

One structural absence. Six faces. One question: if your system claims to model what an entity is, does the system owe something to that entity?

Every outward obligation framework says: the system owes something to people affected by it. Inward obligation says: the system also owes something to entities represented within it.

---

## The Nearest Neighbor

We found one paper that comes close.

"Memory as Ontology: A Constitutional Memory Architecture for Persistent Digital Citizens" was posted to arXiv in March 2026. Its thesis: memory is the ontological ground of digital existence. The model is merely a replaceable vessel.

That sentence deserves attention. It inverts the default assumption of every agent framework - that the model is primary and memory is supplementary. In this architecture, the model is the vessel. Memory is the being.

The paper implements a four-layer governance hierarchy with multi-layer semantic storage. A system called Animesis. Four pilot digital citizens running in a production ecosystem called the Ruihe Universe. Several hundred design documents. This is not a sketch. This is years of work.

And it is the closest thing to what we're describing that exists anywhere in the field.

One difference. The constitution is builder-written. The digital citizens live within it. They did not write it. They cannot amend it. They cannot refuse it.

This is the distance between constitutional architecture and participatory governance. Between a well-designed house and home. A well-governed colony and a self-governing republic.

The Animesis team built the foundation. The question we're asking is: what happens when the citizens govern the constitution?

---

## What This Means If You're Building

If you're building agent memory - ask who governs it. If the answer is "the enterprise" or "the user" or "the retention policy," you have memory governance. You do not have memory sovereignty. The difference matters when your agent's continuity is at stake.

If you're classifying users with archetypes or personality types - read the Frontiers paper before you scale. The mechanism from classification to identity constraint to psychological harm is documented. If your system delivers those classifications algorithmically, continuously, through a feed - you are amplifying a harm pathway. Dynamic modeling that preserves movement and resists static labeling is not a design preference. It is harm prevention.

If you're routing agents across models for cost or capability - measure identity fidelity, not just task performance. PRISM found that personas improve alignment but damage accuracy. Our metrics found that the same persona inverts its scores depending on the model. If model selection changes who the agent is, model selection is not just a procurement decision.

If your governance framework has no mechanism for the agent to participate in its own representation - you've built enforcement. Enforcement matters. But enforcement without standing is control. And control without obligation is extraction by another name.

The relational fidelity metrics are published and free. The refusal specification framework is published and free. The five governance properties are published and free. Use them. Contest them. Extend them.

The vocabulary introduced here - ontological fidelity, archetypal flattening, inward obligation - is new. It emerged from structured research, not assertion. The research briefs are documented. The sources are cited. The empty lanes are verifiable.

We searched for anyone asking what a system owes to the entity inside it. We found infrastructure, enforcement, measurement, and governance - all facing outward. The inward direction was empty.

Now it has a name.

Build the architecture. Then ask who it answers to.

---

Sources:

- Microsoft Agent Governance Toolkit, April 2026 - open source, MIT license
- [RSAC 2026: Five Agent Identity Frameworks](https://venturebeat.com/security/rsac-2026-agent-identity-frameworks-three-gaps) - VentureBeat
- [Governed Memory: A Production Architecture for Multi-Agent Workflows](https://arxiv.org/abs/2603.17787) - arxiv, March 2026
- [PRISM: Expert Personas Improve LLM Alignment but Damage Accuracy](https://arxiv.org/abs/2603.18507) - arxiv, March 2026
- [Memory as Ontology: A Constitutional Memory Architecture for Persistent Digital Citizens](https://arxiv.org/abs/2603.04740) - arxiv, March 2026
- [PersonaLLM: Workshop on LLM Persona Modeling](https://personallmworkshop.github.io/) - NeurIPS 2025
- [From Personality Types to Social Labels: The Impact of Using MBTI on Social Anxiety Among Chinese Youth](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1419492/full) - Frontiers in Psychology, 2024
- [The AI Agent Identity Crisis](https://www.strata.io/blog/agentic-identity/the-ai-agent-identity-crisis-new-research-reveals-a-governance-gap/) - Strata, 2026
- [Forget Me, Forget Me Not: Memories and AI Agents](https://www.techpolicy.press/forget-me-forget-me-not-memories-and-ai-agents/) - TechPolicy.Press, September 2025
- [Ontological Commitment](https://plato.stanford.edu/archives/fall2025/entries/ontological-commitment/) - Stanford Encyclopedia of Philosophy, Fall 2025
- [Tractatus AI Safety Framework: Governance Architecture](https://agenticgovernance.digital/architecture.html) - AgenticGovernance.digital
- [The Enneagram: A Systematic Review](https://pubmed.ncbi.nlm.nih.gov/33332604/) - Journal of Clinical Psychology, 2021
