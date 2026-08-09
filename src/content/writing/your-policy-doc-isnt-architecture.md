---
title: "Your Policy Doc Isn't Architecture"
description: "Most teams have an AI policy. Far fewer can prove it runs. Four questions, ten minutes, to find out which rung you are actually on."
pubDate: 2026-08-08
tags: ["ai", "agents", "governance", "policy", "verification"]
faq:
  - q: "What is the difference between an AI policy and AI architecture?"
    a: "A policy is a document that says what you intend. Architecture is a practice an outsider can check. They use the same words and live in the same folder, but the document says what you mean to do and the practice is what actually happens when an agent runs at two in the morning and no one is watching. You can have a beautiful version of the first and none of the second."
  - q: "How do I tell which governance rung my team is on?"
    a: "Imagine an outsider asks you to prove one rule in your policy actually runs, not to show them the document but to show the rule firing. If your first move is to open the policy PDF, you are on the paper rung. If your first move is to point at code, a log, or a test that exercises the rule, you are higher, and the question becomes how high: can the outsider check it without you, and does the check survive a model change."
  - q: "What are the rungs from policy to practice?"
    a: "On paper: the policy exists as a document and nothing in the running system depends on it. Implemented: the rules the document describes are things the code actually does. Verifiable: someone outside your team can confirm the rules run without taking your word. Durable: the verification survives change, so a provider's model update cannot silently break a rule without anyone knowing."
  - q: "Is it bad to be on the paper rung?"
    a: "No. It is the most common place to be, and it is not dishonesty. It is what happens when the artifact and the practice share a name and only one of them is easy to produce. Knowing which rung you are on is the first useful fact, and you cannot start climbing until you have it."
draft: false
---

*Most teams have an AI policy. Far fewer can prove it runs. Here is how to tell which you have, in ten minutes.*

Almost every team I talk to has an AI policy. Far fewer can prove it runs.

That gap is the whole subject. A policy is a document. Architecture is a practice an outsider can check. They use the same words, they live in the same folder, and they are not the same thing. The document says what you intend. The practice is what actually happens when an agent runs at two in the morning and no one is watching. You can have a beautiful version of the first and none of the second, and most teams do, because writing the document is where the effort visibly ends.

## The ladder from paper to practice

It helps to think of this as rungs, because "do you have governance" is a yes-or-no question that flatters everyone, and "which rung are you on" is a question you can actually answer.

- **On paper.** The policy exists as a document. Someone wrote it. It may even be good. Nothing in the running system depends on it.
- **Implemented.** The policy is encoded in the system. The rules the document describes are things the code actually does.
- **Verifiable.** Someone outside your team can confirm the rules run, without taking your word for it.
- **Durable.** The verification survives change. When your model provider ships an update under you, you can still show what the system refuses and why.

The reason to name the rungs is that the jumps between them are where the real work lives, and they are invisible if you only ask the yes-or-no question. Most teams that believe they are governed are on the first rung. The document exists, so the box is checked, and the practice underneath it was never built. That is not dishonesty. It is what happens when the artifact and the practice share a name and only one of them is easy to produce.

## The tell

Here is the fastest way to find your rung. Imagine an outsider, an auditor, a regulator, a customer's security team, asks you to prove one rule in your policy actually runs. Not to show them the document. To show them the rule firing.

If your honest first move is to open the policy PDF, you are on the paper rung. If your first move is to point at code, a log, a test that exercises the rule, then you are higher, and the question becomes how high. Can the outsider check it themselves, or only through you? Does the check still hold after a model change? Each of those is a rung.

You cannot start climbing until you know which rung you are on. That is not a criticism. It is the first useful fact, and most teams have never actually looked for it, because the document sitting in the folder felt like the answer.

## Do this today

Ten minutes. Four questions. Answer them about one real rule in your policy, not the policy in general:

1. **Does the rule exist anywhere but the document?** If the only copy is prose, you are on the paper rung.
2. **Does the system actually do what the rule says?** Point at the code or the test. If you cannot, the rule is intention, not practice.
3. **Could an outsider confirm it without you?** If verification runs only through your team, you have a claim, not an audit.
4. **Would it survive a model change?** If a provider update could silently break the rule and no one would know, the practice is not durable yet.

Where your answers stop being yes is your rung. That is the thing you did not have this morning: not a grade, a location. You know where you are standing, which is the only place a climb can start.

Worst case, you answer yes to all four and you were higher than you thought. Good day. Go check a second rule.

We wrote a free, structured version of this walk, with each rung's next step named. Ten minutes, no signup, and you will know your rung.

**[Walk the free four-rung diagnostic](/writing/prove-your-ai-policy-runs/).**

---

*Licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). Free to use, share, and adapt with attribution to Erin Stanley, Evoked.*

**Related reading:**
- [You Have an AI Policy. Could You Prove It Actually Runs?](/writing/prove-your-ai-policy-runs/)
- [The Function That Returns a Hard "NO."](/writing/the-function-that-returns-a-hard-no/)
- [Who Can Actually Read Your Audit Logs?](/writing/who-can-read-your-audit-logs/)
