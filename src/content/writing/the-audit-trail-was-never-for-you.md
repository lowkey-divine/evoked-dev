---
title: "The Audit Trail Was Never For You"
description: "Audit trails are built for regulators and companies, not for the person a system decides about. Here are the three questions to carry to any automated decision made about you: can you verify the record, read it, and reach someone who can change it?"
pubDate: 2026-09-01
tags: ["ai-governance", "audit-trails", "automated-decisions", "algorithmic-accountability", "sovereignty", "ai-transparency", "right-to-explanation", "recourse"]
draft: false
sovereign: true
faq:
  - q: "Who is an AI audit trail actually for?"
    a: "In most systems the audit trail - the record of how an automated decision was made - is built for regulators, auditors, and the company that deployed the system so it can defend its decisions. The person the decision was made about is the subject of the record, not a reader of it. They usually cannot see it, understand it, or use it to contest what happened."
  - q: "What are the three questions to ask about an automated decision made about you?"
    a: "Verify, read, reach. Can you verify the record of the decision is the real, unaltered one; read what was actually decided and why, in language you can follow; and reach a human with the authority to change it? Most automated decisions fail all three for the affected person while satisfying a regulator perfectly."
  - q: "Can you contest an automated decision made about you by AI?"
    a: "It depends where you are. In the EU, a person subject to a solely automated decision with significant effects has a right to contest it and to obtain human intervention, and courts have held that a rubber-stamp review with no real power to overrule does not count. The EU AI Act adds a right to an explanation of certain decisions and requires meaningful human oversight of high-risk systems. Protections in other jurisdictions vary."
  - q: "What is the difference between a tamper-proof record and a trustworthy one?"
    a: "A tamper-proof record proves it was not altered after it was written. It does not prove it was true or complete when it was written. Integrity is not fidelity: a wrong fact, sealed perfectly, is still wrong, and it looks more authoritative every time it is retrieved. That is why a record has to be readable and contestable by the person it concerns, not only verifiable."
---

On a Tuesday, your account is gone.

You sign in and there is a gray banner where your work used to be: "Your account has been suspended for violating our Community Guidelines." It does not say which guideline. It does not say which post, which message, which of the ten thousand things you have done on the platform tripped it. There is a button that says Appeal. It opens a form. The form produces, four days later, an email: "After careful review, we have confirmed our original decision."

Somewhere inside that company is a record of what actually happened. The signal that flagged you, the rule it matched, the score the model assigned you, the threshold it cleared. Every step, logged and timestamped, kept to a standard, ready for an auditor or a regulator.

You will never see it. It was never built for you to read.

Audit trails are having a moment, and they should. As AI makes more of the decisions that land on real people, "keep a complete, verifiable record of what the system decided" is exactly the right instinct. But there is a question hiding under the enthusiasm, and it decides whether an audit trail is accountability or just very tidy paperwork: who is the record for?

Here is a test you can carry to any system that makes a decision about you. It comes down to three things: whether you can verify the record, read it, and reach a person who can change it. This piece is about those three, because most audit trails give you the first at best and call it accountability.

The pitch is impressive, and mostly sincere. A modern system logs every input, every rule, every step, into a record no one can quietly alter after the fact. When a regulator asks, or something goes wrong at three in the morning, there is a real artefact instead of a shrug. A system trained to behave well is one thing; a system that can prove what it did is another, and the audit trail is how you get the second.

Now look at who reads it. The regulator, sometimes. The company that deployed the system, when it needs to defend a decision. An auditor, if it comes to that. Notice who is not on the list: you. The person the decision was made about is the subject of the record, not a reader of it. That is the quiet default across almost every system that logs its choices - the trail runs toward the people with power over you, and away from you.

So try to fix it. Give the subject access.

Two real problems show up at once. The record is internal by construction - to see it, you have to ask the operator, who decides what to hand you, which is the same trust problem one level up. And the record usually holds other people's data, so you cannot just be handed a raw copy.

There is a genuinely elegant way around both. You do not need the contents to check the record is honest. You need to confirm it was not quietly rewritten after you complained. A system can let you verify that the record of your case is the original, unaltered one, without being shown anyone else's private data to do it. No begging the operator. No leak.

That feels like the win. Integrity: solved.

It is a win. It is also a false summit. Because a record that actually serves the person has to do three things, not one, and verifying it is only the first. Take them one at a time.

**Verify.** Confirming the record is unchanged is not the same as confirming it was true. A wrong fact, sealed perfectly, is a wrong fact forever - and it looks more authoritative every time it is retrieved, because now it is the cryptographically certified wrong fact. Proving nothing was altered afterward is not the same as proving anything was right at the time. Integrity is not fidelity.

**Read.** Confirming a record is authentic is not the same as understanding what it says - what was actually decided about you, and on what basis, in language you can follow rather than a code you can only match. A record you can verify but cannot read is tamper-evident and still uncontestable. It tells you the sealed thing is genuine. It does not tell you whether the sealed thing is fair, because you cannot follow it well enough to know.

**Reach.** Say you get both. You verify the record, you read it, and you see the error, plain as day. Now what? If there is no channel that obliges a human to look again, you are holding proof of your own harm with nowhere to take it. You will have the injustice, documented, notarized, and permanent. Legible is not the same as actionable.

Verify without fidelity certifies a decision that might be wrong. Read without reach hands you a grievance with no door. Each of the three without the next is a courtesy, not a right.

This is not hypothetical, and the stakes are not always an account. Consider the lawsuit brought against UnitedHealth over an AI tool called nH Predict. Plaintiffs allege the insurer used it to estimate how long elderly patients "should" need care after a hospital stay, then cut off coverage based on that estimate rather than their own doctors' judgment. According to the complaint and the reporting around it, when patients appealed, the denials were overturned the vast majority of the time - by some accounts, nine in ten. One writer summed up the design in a single line: the algorithm counted on no one appealing.

Sit with that. The recourse worked, when people reached it. The system's efficiency depended on the fact that most never would. And the record of how the tool decided was opaque enough that a federal court had to order the company to hand it over. That is verify, read, and reach failing in sequence, at the scale of people's health: you could not confirm how the decision was made, could not follow it, and were counted on not to fight it. These are allegations in active litigation - but the shape is the argument, and the shape is real.

So the honest version of an audit trail is not the one that satisfies a regulator. It is the one that reaches the person the decision was about, on all three counts and not only the first: they can verify the record is the real one, read it well enough to judge it, and reach someone with the authority to change it.

The law is starting to agree. In Europe, a person subject to a solely automated decision already has the right to contest it and to obtain a human who can intervene - and courts have held that a rubber-stamp review, a human with no real power to overrule, does not count. Europe's AI rules add a right to an explanation of decisions that affect you, and require meaningful human oversight of the high-stakes ones. The direction is set: the person acted on is being written back into the record as someone with standing, not just as its subject.

Some of that has to be built before the system ever acts - you decide, up front, what a person is entitled to see and to contest. But part of it can only happen after, because you cannot pre-resolve a dispute that has not occurred yet. The channel has to stay open past the decision, or the right exists on paper and nowhere else.

There is a reason to want this even if you care nothing for fairness. The person a decision was made about is the cheapest reliable check on whether it was right. They are the one party with both the motive and the knowledge to catch the wrong fact in the record. Those appeal reversals, if the numbers hold, are that point in data: the people the system acted on were right and the system was wrong, again and again, and only the ones who reached a human ever found out. A system that locks the rest out is not only unjust to them. It is worse at being correct.

So here is the question to carry, the one from the top, with its three parts.

When a system makes a decision about you, can you verify the record of it, read what it actually decided and why, and reach someone who can still change it?

Verify, read, reach. Ask it of your bank, your insurer, the platform that suspended you, the tool your employer just bought. If the honest answer to any of the three is no, the record that system keeps of your life was built for everyone except you.

That is not accountability. It is just very good paperwork.
