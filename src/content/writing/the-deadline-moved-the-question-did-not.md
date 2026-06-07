---
title: "The August 2 Deadline Moved. The Architecture Question Did Not."
description: "The EU's Digital Omnibus pushed the use-based high-risk deadline to December 2027. Sixteen months of runway. The teams that read that as a pause are the teams that will be sixteen months further behind when the standards land. What moved, what did not, and what that means for the architecture work that does not get a delay."
pubDate: 2026-06-06
tags: ["eu-ai-act", "ai-governance", "digital-omnibus", "regulatory-update", "agent-governance", "architecture"]
draft: false
---

> **Current Status (verified 2026-06-06).** The amendments described in this article are a *provisional political agreement* reached on 7 May 2026, not yet binding law. The consolidated text has not been published. Formal adoption by Parliament, Council, and Official Journal publication is expected before 2 August 2026, specifically to prevent the original use-based deadline from triggering during the adoption window. The dates below reflect what was provisionally agreed; they remain subject to change until the Official Journal publishes the text. This article will be re-verified and republished when the consolidated text lands.

Sixteen months ago, the EU AI Act enforcement window was a deadline you could schedule against. On 7 May 2026, the EU Council Presidency and European Parliament negotiators reached a provisional political agreement on targeted amendments to the Act under the Digital Omnibus initiative. The provisionally-agreed shifts: the use-based high-risk deadline moves from 2 August 2026 to 2 December 2027. The product-regulated high-risk deadline moves from 2 August 2027 to 2 August 2028. The synthetic-content watermarking deadline moves from 2 August 2026 to 2 December 2026. The agreement also adds two new prohibited practices under Article 5 with provisional effect 2 December 2026: generation or manipulation of non-consensual intimate material, and generation or manipulation of child sexual abuse material.

Sixteen months of runway, if the Omnibus adopts as expected. The teams reading that as a pause are the teams that will be sixteen months further behind when the standards land.

This post documents what changed, what did not, and what the change means for the architecture work that did not get a delay.

---

## What Moved (Provisional)

| Provision | Original deadline | Provisional new deadline | Deferral |
|---|---|---|---|
| Use-based high-risk obligations (Annex III: credit, recruitment, education, essential services, law enforcement, migration, justice) | 2 August 2026 | **2 December 2027** | 16 months |
| Product-regulated high-risk obligations (Annex I: medical devices, lifts, radio equipment, vehicles) | 2 August 2027 | **2 August 2028** | 12 months |
| Synthetic-content marking under Article 50, for systems placed on market before 2 August 2026 | 2 August 2026 | **2 December 2026** | 4 months |

The delay was driven by harmonised standards not being ready (CEN-CENELEC work is still in progress) and by industry feedback on operational readiness. The EU rejected the broader "stop the clock" two-year moratorium. This was targeted, not a pause.

## What Got Added (Provisional)

The Omnibus also adds two new prohibited practices to Article 5, both with provisional effect 2 December 2026:

- **Generation or manipulation of non-consensual intimate material** using AI systems
- **Generation or manipulation of child sexual abuse material (CSAM)** using AI systems

These sit alongside the existing Article 5 prohibitions and carry the same penalty ceiling (35 million euros or 7% of global annual turnover, whichever is higher).

## What Did Not Move

- **The existing Article 5 prohibitions.** Live since 2 February 2025. Subliminal manipulation. Exploitation of vulnerabilities. Social scoring. Predictive policing on profiling alone. Untargeted facial-recognition database scraping. Emotion recognition in workplaces and schools. Biometric categorisation by sensitive attributes. Real-time remote biometric identification in public spaces. Penalty ceiling: 35 million euros or 7% of global annual turnover.

- **General-Purpose AI obligations (Articles 53, 55).** Live since 2 August 2025. Technical documentation. Training-data summary. Copyright compliance policy. For systemic-risk models above the 10^25 FLOPs threshold: model evaluations, systemic-risk assessment, incident reporting, cybersecurity protection.

- **Governance, penalties, AI literacy (Article 4).** Unchanged. The institutional architecture - the AI Office inside the European Commission, the AI Board, the Scientific Panel, national competent authorities - remains in place. The penalty ceilings remain in place. The duty to ensure staff have a "sufficient level of AI literacy" remains in place.

The Act is still binding. The cliffs moved. The structure did not.

---

## What This Means

The 16-month deferral is real. It is also misread by most teams who hear it.

Three readings, in order of usefulness.

**Misreading.** "The deadline moved. We have more time. We can defer the work." This is the reading that produces sixteen months of further drift. Companies that defer architecture work during a standards window inherit standards they did not help shape. When the standards land in 2027, the companies who engaged during the runway will have already aligned to where the standards are going. The companies who waited will have to retrofit.

**Half-reading.** "The deadline moved. We should adjust our compliance plan." This is the reading that keeps the work moving but treats it as compliance work rather than architecture work. The substantive question - what is your AI system structurally required to refuse, who decided that, where is it written, how does it survive a model change - is not about compliance. It is about whether the system you operate can describe what it is. Compliance plans built on top of architectures that cannot answer that question are policy applied to a substrate it cannot reach.

**Useful reading.** "The deadline moved. The standards work continues. The architecture work was never about the deadline." The architecture question - the four questions a regulator's audit room will ask - did not get a delay. The use-based high-risk obligations under Annex III still demand a Fundamental Rights Impact Assessment. Article 14's human-oversight requirement still demands that the override authority be specified rather than implied. Article 50's transparency obligation still demands that what your system generates be identifiable as machine-generated, with the watermarking obligation landing in December of this year for systems already on the market.

The runway is for architecting properly. The standards window is for engaging with the bodies that will define what compliant systems look like. The companies that engage in 2026 will help shape what counts as compliant. The companies that wait until 2027 will inherit the answer.

---

## The Architecture Question Was Never About the Deadline

The four questions a regulator's audit room will ask:

1. **What does your AI refuse to do?** Not what it does not do by accident when prompts are written carefully. What it refuses by design, with the refusal documented, the documentation versioned, and the version verifiable.

2. **Who decided what it refuses?** Not the prompt engineer. The decision authority. Article 26(1) requires "appropriate technical and organisational measures." Organisational measures begin with a named accountable role.

3. **Where is that decision written?** Not in the system prompt. In the refusal specification. The system prompt expresses the decision. It does not record the decision.

4. **How does that decision survive a model change?** The refusal lives in the prompt. The prompt is calibrated to the model. The model changes. The refusal behaviour changes. Nobody notices until an audit.

Sixteen months of additional time does not change which questions the audit room will ask. It changes how much time you have to be able to answer them well.

---

## What This Means for the Three Cliffs You Still Have

**Live now.** Article 5 prohibitions and General-Purpose AI obligations are in force today. If your system uses subliminal manipulation, exploits vulnerabilities by age or disability or socioeconomic situation, conducts social scoring, performs predictive policing on profiling alone, scrapes faces from the internet to build facial-recognition databases, performs emotion recognition in workplaces or schools, categorises by sensitive biometric attributes, or conducts real-time remote biometric identification in public spaces, you are in breach today. If you provide a general-purpose model and have not authored the technical documentation, copyright compliance policy, and training-data summary required under Article 53, you are in breach today.

**December 2026.** The watermarking obligation under Article 50 for synthetic-content systems placed on market before 2 August 2026 lands in six months. If your system generates or manipulates synthetic content - image, audio, video, text - and was deployed before August 2026, the obligation to mark that output as artificially generated in a machine-readable format applies in December.

**December 2027.** The use-based high-risk obligations under Annex III land in eighteen months. Credit scoring. Recruitment and worker management. Education and admissions. Access to essential public and private services. Law enforcement. Migration. Justice. If your AI system makes or substantially influences decisions in any of these categories, the full Annex III provider-and-deployer obligation stack applies. The Fundamental Rights Impact Assessment under Article 27 is load-bearing. The technical documentation under Annex IV is load-bearing. The post-market monitoring under Article 72 is load-bearing.

These cliffs do not arrive in waves of equal severity. They arrive in order. The companies architecting for the December 2027 cliff have to be ready for the December 2026 watermarking obligation first. The companies architecting for the December 2026 obligation have to be in compliance with Article 5 today.

---

## What We Are Doing About It at Evoked

The Evoked frameworks were authored to the four-question test. The Refusal Specification, the Trust Architecture Blueprint, the Sovereignty Assessment, the Governance Implementation Guide, the Agent Restraint Specification - all of them work the layer that the regulator's audit room will probe first.

The architecture work does not get a delay. The Digital Omnibus did not move the four-question test. It moved the date by which the answers have to be defensible to a regulator.

For companies whose AI systems sit in Annex III categories, the runway is for getting the architecture right while the standards are still being authored. We work that layer. We do not write your Annex IV technical documentation. We do not generate your bias audit. We specify the governance, restraint, and human-oversight architecture that gives the documentation and the bias audit something defensible to describe.

If you are sixteen months out from the new deadline and the four questions are not answered yet, this is what we do. [evoked.dev/engage](https://evoked.dev/engage).

---

## Sources

- [Council of the EU press release, 7 May 2026](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/)
- [Inside Privacy / Covington analysis](https://www.insideprivacy.com/artificial-intelligence/eu-ai-act-update-timeline-relief-targeted-simplification-and-new-prohibitions/)
- [Hogan Lovells legal alert](https://www.hoganlovells.com/en/publications/eu-legislators-agree-to-delay-for-highrisk-ai-rules)
- [Travers Smith summary](https://www.traverssmith.com/knowledge/knowledge-container/eu-agrees-to-delay-key-ai-act-compliance-deadlines/)
- [Latham Watkins update](https://www.lw.com/en/insights/ai-act-update-eu-resolves-to-change-rules-and-extend-deadlines)
- [Pinsent Masons Out-Law brief](https://www.pinsentmasons.com/out-law/news/rules-high-risk-ai-delayed-under-eu-omnibus-deal)
- [TechPolicy.Press analysis](https://www.techpolicy.press/what-the-eu-ai-omnibus-deal-changes-for-the-ai-act-and-what-lies-ahead/)
- [Published EU AI Act text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)

---

**Related reading:**
- [The August 2 Question Your Agents Cannot Answer Yet](/writing/the-august-2-question/) - authored before the Omnibus shift. The four questions hold. The deadline framing in that article is superseded by this one.
- [Architecture as Ethics: What the Patent Refuses](/writing/architecture-as-ethics/)
- [Constraints, Constitutions, and the Question Nobody's Asking](/writing/constraints-constitutions/)

---

*Erin Stanley is the founder of Evoked and the sole inventor on two provisional patent applications covering AI agent governance certification architecture. The frameworks referenced in this article are at [evoked.dev](https://evoked.dev). Public pricing for current engagements is at [evoked.dev/engage](https://evoked.dev/engage).*
