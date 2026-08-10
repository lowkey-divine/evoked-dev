---
title: "Who Can Actually Read Your Audit Logs?"
description: "If only your vendor can read your AI agent's audit logs, you do not have accountability. You have a private diary the vendor keeps about themselves. Four questions to find out today."
pubDate: 2026-08-08
tags: ["ai", "agents", "audit", "accountability", "governance"]
faq:
  - q: "What is the difference between having logs and being accountable?"
    a: "Logging is a technical fact. Accountability is a structural one. Having logs means the events are recorded somewhere. Accountability means a person outside the vendor can read that record directly, without the vendor deciding what they see or when. They feel similar until something goes wrong, and then they are nothing alike."
  - q: "Why is a log only the vendor can read a problem?"
    a: "If the only path to the logs runs through the vendor, the vendor controls what you see, controls when you see it, and is the party with the strongest reason to want the record to read a certain way. None of that requires bad faith. It only requires that the party being reviewed also holds the only copy of the review."
  - q: "Who counts as someone outside the vendor?"
    a: "A specific person with a name who has the standing and access to read the logs without asking the vendor's permission: your security lead, an external auditor, a regulator if it comes to that. It does not mean the vendor's compliance page or a support ticket. If you cannot name that person, that is the finding."
  - q: "What is a cryptographic chain of custody for logs?"
    a: "A record with a cryptographic chain of custody can show it has not been altered since it was written, which means even the party holding it cannot quietly change it. It is the difference between trust us, this is what happened and here is what happened, and here is the math that says no one touched it."
draft: false
---

*A log only the vendor can read is not accountability. It is a private diary the vendor keeps about themselves. Here is how to tell the difference in ten minutes.*

The first question I ask a team is where their agent's refusal lives. The second is quieter, and it catches more people:

**Who outside our vendor can actually read the audit logs?**

Most teams have logs. That is not the question. The question is who can read them without the vendor's permission, without the vendor's dashboard, and without the vendor deciding what you get to see. If the honest answer is "no one," then you do not have accountability. You have a private diary the vendor keeps about themselves, and you are trusting them to read it back to you accurately on the worst day of your year.

## Having logs is not the same as being accountable

Logging is a technical fact. Accountability is a structural one. They feel similar right up until the moment you need them, and then they are nothing alike.

Here is the moment. Something goes wrong. An agent did a thing it should not have, and a person was affected. You need to know what happened, in what order, and why the system allowed it. So you ask your vendor for the logs.

If the only path to those logs runs through the vendor, three things are now true at once. The vendor controls what you see. The vendor controls when you see it. And the vendor is the party with the strongest reason to want the record to read a certain way. None of that requires bad faith. It only requires that the party being reviewed is also the party holding the only copy of the review.

Accountability is what you have when that is not the case. When a person outside the vendor can read the record directly, the record stops being a story someone tells you and starts being a fact you can check.

## "Outside the vendor" means a named person with standing

This is the part worth being precise about. "Outside the vendor" does not mean the vendor's compliance page. It does not mean a support ticket. It means a specific person, with a name, who has the standing and the access to read the logs without asking the vendor's permission. Your security lead. An external auditor. A regulator, if it comes to that. Someone whose read access does not depend on the goodwill of the party being audited.

If you cannot name that person, that is the finding. Not a failure. A finding. You now know something you did not know this morning.

There is a stronger version, and it is where this is all heading: logs that carry their own proof. A record with a cryptographic chain of custody can show that it has not been altered since it was written, which means even the party that holds it cannot quietly change it. That is the difference between "trust us, this is what happened" and "here is what happened, and here is the math that says no one touched it." You do not need that today. You need to know whether you are on the road to it or not.

## Do this today

Ten minutes, no rebuild required. Answer four questions about your own system:

1. **Where are the logs?** Name the actual place your agent's decisions and refusals are recorded. If you cannot find it, that is your answer.
2. **Who can read them without the vendor?** Name the person. If the only path runs through the vendor's dashboard or a support request, write that down.
3. **Can the record be changed after the fact?** If the party that holds the logs can also edit them, the logs prove less than you think.
4. **Would they survive a model change?** When your provider updates the model under you, does the record of what the old one refused, and why, still exist and still make sense?

At the end you will have either a name or a silence. Both are useful. The name tells you your accountability is real. The silence tells you exactly what to build next, before an incident builds it for you.

Worst case, you can answer all four and you get data that proves you are okay. That is a good day. It is also rarer than most teams expect.

If you want the structured version of this check, the free five-minute test walks the same ground and hands you the result. No signup, nothing to install.

**[Run the free 5-minute sovereignty check](/products/sovereignty-checklist?utm_source=writing&utm_medium=writing&utm_campaign=audit-logs).**

---

*Licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). Free to use, share, and adapt with attribution to Erin Stanley, Evoked.*

**Related reading:**
- [The Function That Returns a Hard "NO."](/writing/the-function-that-returns-a-hard-no/)
- [Your Policy Doc Isn't Architecture](/writing/your-policy-doc-isnt-architecture/)
- [What Should Your Agent Refuse?](/writing/what-should-your-agent-refuse/)
