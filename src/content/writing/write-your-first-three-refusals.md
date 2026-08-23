---
title: "Write Your First Three Refusals"
description: "The hardest part of AI safety is not building the refusal. It is knowing what to forbid. A method and a fill-in template to write your agent's first three refusals today."
pubDate: 2026-08-08
tags: ["ai", "agents", "refusal", "template", "sovereignty"]
faq:
  - q: "How do I decide what my AI agent should refuse?"
    a: "Start from your most vulnerable user, not from a generic safety checklist. For each kind of user you actually have, ask three questions: who is the most vulnerable person who will use this, what would it look like to betray them even with good intentions, and what is the no that protects them and when should it fire. The answers are your refusals, and they are more defensible because you can name the person each one protects."
  - q: "What goes into a refusal specification?"
    a: "Each rule names five things: the refusal (what the agent must not do), who it protects (a specific person, not users in the abstract), the trigger condition (when the no fires, concretely), what happens instead, and how it is verified (how an outsider could confirm it works). The who-it-protects line matters most and is the one teams most want to skip."
  - q: "What lenses help surface refusals I might miss?"
    a: "Five lenses each tend to surface a rule: sovereignty (where might the agent override a choice that belongs to the user), consent (where might it act on someone who never agreed), dependency (where might it make itself needed instead of making the user capable), scope (where might it do a thing it was never asked to do), and integrity (where might it perform helpfulness while quietly doing harm). You need the two or three that draw blood on your own system."
  - q: "Is a starter template the same as a full refusal spec?"
    a: "No. The starter gets you three real refusals in your own words, tied to real people, which is more than most teams have. A full specification takes it from three rows to a complete document with the lenses built in. The starter is where you begin; it is not the finished artifact."
draft: false
---

*The hard part is not building the wall. It is knowing where to put it. Here is a method, and a template you fill in as you read.*

In [The Function That Returns a Hard "NO."](/writing/the-function-that-returns-a-hard-no/) I asked where your agent's refusal lives, in code or in a prompt. A team read it, went looking, and came back with a fair question:

"We found the place a refusal would go. We do not know what to put in it."

That is the honest bottleneck, and it is not a technical one. Building a function that returns a hard no is a morning's work. Knowing what should trigger it is the actual job, and almost no one is handed a map for it. The generic safety lists do not help much, because they are written for the average user, and the average user does not exist. Your users are specific. So are the ways they can be harmed. That is where your refusals are hiding.

## Your refusals come from who gets hurt, not from a checklist

Most safety lists start from the model. Do not produce this category of content, do not take that class of action. Useful, but generic, and generic is exactly the problem. A rule written for everyone protects no one in particular.

Start from the other end. Start from your most vulnerable user and ask what would betray them.

An example from my own work. I build a system that plans meals for families. The generic safety list has nothing to say about a child whose six safe foods are how the world feels manageable. But an agent that cheerfully tells that child to "try more variety" has just told them they are wrong for the thing keeping them steady. An agent that suggests a celebration dish to someone three days into grief has pushed positivity at a person in mourning. Neither of those is on any standard safety list. Both are refusals my system has to make, because I started from the family in front of me instead of the average behind them.

That is the method. For each kind of user you actually have, ask three questions:

- Who is the most vulnerable person who will use this?
- What would it look like to betray them, even with good intentions?
- What is the "no" that protects them, and when should it fire?

The answers are your refusals. They are more specific than any list, and they are more defensible, because you can name the person each one protects.

## A few lenses, if you are stuck

If the questions feel abstract, run your system past these. Each one tends to surface a refusal:

- **Sovereignty.** Where might the agent override a choice that belongs to the user?
- **Consent.** Where might it act on someone who never agreed to be acted on?
- **Dependency.** Where might it make itself needed instead of making the user capable?
- **Scope.** Where might it do a thing it was never asked to do, because it could?
- **Integrity.** Where might it perform helpfulness while quietly doing harm?

You do not need all of them. You need the two or three that draw blood when you hold them up to your own system.

## Write your first three, right now

Here is the template. Copy it. Fill in three rows before you close this tab. Not the full spec, that comes later. Three real refusals for your actual system, in your words.

```
REFUSAL SPEC (starter)

Rule 1
  The refusal:        [what the agent must not do]
  Who it protects:    [the specific person, not "users"]
  Trigger condition:  [when the no fires - be concrete]
  What happens:       [what the system does instead]
  How it is verified: [how an outsider could confirm it works]

Rule 2
  The refusal:        __________
  Who it protects:    __________
  Trigger condition:  __________
  What happens:       __________
  How it is verified: __________

Rule 3
  The refusal:        __________
  Who it protects:    __________
  Trigger condition:  __________
  What happens:       __________
  How it is verified: __________
```

The "who it protects" line is the one that matters most, and it is the one teams want to skip. Do not skip it. A refusal you can attach to a named person is a refusal you can defend in a meeting, encode in a function, and prove to an auditor. A refusal that protects "users" in the abstract tends to quietly disappear the first time it is inconvenient.

The "how it is verified" line is the second hardest and the most important for later. If you cannot say how someone outside your team would confirm the rule actually fires, you have written an intention, not a rule. That is fine for a first pass. Mark it, and come back.

## What you have now

If you filled in three rows, you have something you did not have when you opened this: the start of a real refusal spec, in your own words, tied to real people. That is worth more than a downloaded policy, because it is yours and it is true.

Worst case, you sit with the template and find you already had these rules covered. Good day. Rare, but good.

When you are ready for the full version, we published a free refusal-spec template that takes this from three rows to a complete document, with the lenses built in. Take what is useful.

**[Get the free refusal-spec template](/products/agent-restraint-specification?utm_source=writing&utm_medium=writing&utm_campaign=first-three-refusals).**

---

## Common questions

### How do I decide what my AI agent should refuse?

Start from your most vulnerable user, not from a generic safety checklist. For each kind of user you actually have, ask three questions: who is the most vulnerable person who will use this, what would it look like to betray them even with good intentions, and what is the no that protects them and when should it fire. The answers are your refusals, and they are more defensible because you can name the person each one protects.

### What goes into a refusal specification?

Each rule names five things: the refusal (what the agent must not do), who it protects (a specific person, not users in the abstract), the trigger condition (when the no fires, concretely), what happens instead, and how it is verified (how an outsider could confirm it works). The who-it-protects line matters most and is the one teams most want to skip.

### What lenses help surface refusals I might miss?

Five lenses each tend to surface a rule: sovereignty (where might the agent override a choice that belongs to the user), consent (where might it act on someone who never agreed), dependency (where might it make itself needed instead of making the user capable), scope (where might it do a thing it was never asked to do), and integrity (where might it perform helpfulness while quietly doing harm). You need the two or three that draw blood on your own system.

### Is a starter template the same as a full refusal spec?

No. The starter gets you three real refusals in your own words, tied to real people, which is more than most teams have. A full specification takes it from three rows to a complete document with the lenses built in. The starter is where you begin; it is not the finished artifact.

---

*Licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). Free to use, share, and adapt with attribution to Erin Stanley, Evoked.*

**Related reading:**
- [What Should Your Agent Refuse?](/writing/what-should-your-agent-refuse/)
- [The Function That Returns a Hard "NO."](/writing/the-function-that-returns-a-hard-no/)
- [Who Can Actually Read Your Audit Logs?](/writing/who-can-read-your-audit-logs/)
