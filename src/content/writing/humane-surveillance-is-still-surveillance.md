---
title: "Humane Surveillance Is Still Surveillance"
description: "Employee-monitoring and data-loss-prevention tools are getting cleaner interfaces and an AI-governance glow-up. A nicer interface is not a nicer ethics. Here is what happened when I tried to design the sovereignty-honoring version of one, and why the honest version stops being surveillance at all."
pubDate: 2026-08-29
tags: ["sovereignty", "surveillance", "dlp", "ai-governance", "workplace-monitoring", "design", "refusal", "privacy"]
draft: false
sovereign: true
faq:
  - q: "Can employee monitoring or DLP software be made ethical?"
    a: "You can make it more humane - transparent to the person watched, respectful in tone, careful with data. But if the person being monitored still cannot say no to being monitored, you have built humane mandatory surveillance, and that is still surveillance. The improvements are real and worth making; they do not change what kind of tool it is. The only versions that stop being surveillance are the ones that either watch the organization's own registered data instead of the person, or put the tool in the hands of the individual whose data it is."
  - q: "What is data loss prevention (DLP)?"
    a: "DLP is software that watches how data moves across a company's laptops, network, and cloud services, and blocks or flags movements that break policy - for example, a file of customer records being emailed outside the company or pasted into a public AI tool. It is a large security category, and in 2025 and 2026 many vendors added AI-governance features aimed at data leaking into tools like ChatGPT."
  - q: "Who is the user of employee-monitoring software?"
    a: "The buyer is the organization; the software's real user is whoever configures and reads it - usually an administrator. The person being monitored, typically an employee, is not the user. They are the subject. That single fact is what separates a security tool from a sovereignty tool: in a sovereignty tool, the person whose data it is has a seat."
  - q: "Does a better user interface make monitoring software more ethical?"
    a: "No. A calm, confident, well-designed interface makes monitoring feel neutral and administrative, which can make it easier to deploy without asking hard questions. The interface is a craft question. Whether the monitored person consented, can see what is watched, and can contest it is an ethics question. They are not the same question, and good design on the first can quietly disguise a bad answer on the second."
---

*Employee-monitoring and data-loss-prevention tools are getting cleaner interfaces and an AI-governance glow-up. I went looking at one, admired the design, and then tried to build the version that would honor the person being watched. The honest version kept shrinking until it stopped being surveillance. That is the whole finding.*

I was looking at a data-loss-prevention product recently - GTB Technologies, one of the long-running vendors in the category - and my first reaction was that the interface was good. Calm, confident, one clear promise per screen. The kind of surface that makes you trust the thing behind it.

That reaction is the reason I am writing this.

Data-loss-prevention software, DLP for short, watches how information moves inside a company. It sits on the laptops, the network, and the cloud, and it blocks or flags data that tries to leave in ways policy forbids. A file of client records emailed to a personal address. A block of source code pasted into a public chatbot. The category has been around for two decades, and in the last couple of years it has grown a new limb: governing what employees hand to AI tools.

It is useful software. It is also, structurally, a way to watch people. And a well-made interface on a watching tool does not make the watching kinder. It makes it easier to look at without flinching.

## Who the tool is actually for

Here is the thing the clean design tends to hide. The buyer of monitoring software is the organization. The user - the one who configures it and reads what it produces - is an administrator. The person being monitored is neither. They are the subject.

That is the line between a security tool and a sovereignty tool. In a sovereignty tool, the person whose data is involved has a seat in the room. In a monitoring tool, they are the thing on the table.

So I set myself an exercise. Take the category seriously, assume good intent, and design the sovereignty-honoring version. Not a hit piece on one vendor - a genuine attempt to build the humane one.

## Trying to build the humane version

It went further than I expected. You can make real improvements:

- **Notify the person first.** Before anything reaches a manager, the person sees what was flagged and why. No silent reports.
- **Keep the content on the person's device.** Detection runs locally; only the fact of a policy match leaves, never the readable text. If an administrator cannot see what someone typed, neither can an attacker who breaches the console.
- **Frame events as observations, not verdicts.** "A file matching the client-records policy was blocked at 2:02 pm," not "this person is a data-exfiltration risk."
- **Report in aggregate, never singling out one individual.** The moment a view can be filtered down to one named person under scrutiny, it has become surveillance again.
- **Make every block teach.** Instead of a dead end, the block explains why the thing is sensitive and offers the safe way to do what the person was trying to do. Enforcement that builds judgment instead of resentment.

Every one of those is a genuine improvement. I would rather be monitored by a tool that did all of them than one that did none. And here is where the exercise fell apart.

## The wall

After all of it, the person still cannot say no.

They can see more. They are treated with more respect. Their content is better protected. But the monitoring itself is not something they opted into and cannot opt out of. I had built a more transparent, more dignified, better-mannered version of exactly the same thing.

That is the finding, and it is worth saying plainly: **humane mandatory surveillance is still surveillance.** A better-mannered monitoring tool is a better monitoring tool. It is not a different kind of tool. Transparency softens the experience; it does not change the consent. Person-first notification is real care; it does not remove the fact that no one asked.

## Where the honest version actually lands

Take the consent problem seriously and the design starts to shrink, on its own, until it stops being surveillance:

- **Guard the organization's own data, not the person.** Watch the company's registered sensitive files wherever they travel, and let a person appear only when they move the company's own data somewhere it should not go. The subject of monitoring becomes a document the company already owns, never a human being.
- **Or give the tool to the individual.** Put the same detection in the hands of the person whose data it is, pointed outward at what apps and AI tools try to extract from them. There is no third party watching, because the only actor with authority over the data is the person it belongs to.

Both are buildable. Both are honest. Neither is "employee surveillance with a nicer face." And getting there required giving up most of the features that make the original category attractive to a buyer who wants control.

## The part I want to keep

I did not end up building either version. I decided not to build the product at all - not because the idea is wrong, but because I could not yet do it safely or sustainably, and because the more useful thing to ship was the finding.

That decision is the point, not a footnote to it. The most sovereignty-honoring move available was to decline to build the better-looking product and say why out loud. Restraint, practiced in public, is worth more than another clean interface.

So if you are evaluating a monitoring tool, or building one, here is the test I came away with. Look at the person the tool watches, and ask: **if they could see exactly how this works, would they feel valued or used?** A calm interface will not answer that question for you. It is designed not to.

A nicer interface is not a nicer ethics. The first is a craft. The second is a choice about whether the person in the room gets to stay a person.

---

*Erin Stanley writes about AI sovereignty and governance at Evoked. This piece is a worked example, not legal or security advice.*
