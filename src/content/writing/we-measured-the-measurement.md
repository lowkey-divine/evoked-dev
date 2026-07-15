---
title: "We Built the Tool That Judges AI Sovereignty. It Judged Us at 77."
description: "A month ago we promised to score our own sovereignty instrument against itself. Here is the score - including the delivery layer that only reaches Progressing, and the promise we keep."
author: "Evoked"
pubDate: 2026-07-15
tags: ["AI governance", "sovereignty assessment", "transparency", "self-assessment"]
draft: false
sovereign: false
---

A month ago we scored two of the most-used AI products in the world against our own 47-point sovereignty instrument, published the numbers, and made a promise in the last paragraph: next, we would turn the instrument on ourselves. This piece is a month late, and the lateness is the first thing worth being honest about. The words were "we will be measured by it ourselves," followed by a line I still stand behind: the willingness to be measured is the whole point. Grading other people's homework is easy. An instrument only means anything if it survives being turned back on the hand that holds it.

So here is what happened when we turned it back.

## The hard part, which we did

We scored the Sovereignty Assessment Toolkit against its own 47 items, twice, using two different methods, and the score found things. Then we changed the product the same night.

Specifically. We had buried our own consulting offer at the very end of a free 90-minute assessment.

Read that back: a person picks up a free methodology, does an hour and a half of honest work, and only then meets the sales pitch. That is a value-stack-then-pitch pattern, and we had built it into our own document without noticing.

Fixed: the business model now sits in the opening line, before you invest anything.

We had no version history, so no reader could see what had changed or when. Fixed: there is a changelog now. We had 90 minutes of work with no pause. Fixed: a break partway through. And we had nothing for the person doing this on a hard day. Fixed: a line that says the assessment keeps, come back when you can.

All four shipped as version 1.1 the night we scored ourselves. The score was not decoration. It moved the product forward - and that is always something to be proud of.

## The number, before you are impressed by it

As a written methodology, the Toolkit falls within the Sovereignty-Honoring band, in the high 80s to low 90s, depending on the method used. I want to deflate that number for you before it does any work. A document has almost no attack surface. It collects nothing. It cannot leak what it does not hold. Scoring above 90 on a static file is easy in a way that scoring above 90 on a live, data-collecting product never is. The mirror is not a trophy, and a high score on the safe surface is not the interesting result.

The interesting results are the 0s.

## Where it drops

The Toolkit is not only a document. It is also a working instrument you can run as a Claude skill, and a skill does not run in a vacuum. It runs on Anthropic's consumer infrastructure. Score the same instrument as a delivered product rather than a static file, and it falls out of the Sovereignty-Honoring band into Progressing. Around 77.

Here is why, and every item is still live as of this week. The skill inherits the exact four failures we scored Anthropic zero on last month:

- Your conversations train the model by default, unless you find the setting and turn it off.
- A new Verification Data category, in effect since July 8, can request from flagged users a government ID, a photo of their face, and facial-geometry templates.
- The data scope widened to match.
- Anthropic can disclose user data to law enforcement on its own "good-faith belief" that it is reasonably necessary, without a court order.

The skill itself collects nothing extra. It rides a channel that does, and riding a leaking channel is enough to move the score. That 77 is the consumer-plan case - a reader running the skill on a Free, Pro, or Max account, which is where most people are. On a business or API plan, Anthropic exempts the traffic and the score climbs; we scored the surface most people actually use, which is also the worst one. Our methodology is Sovereignty-Honoring. Our delivery, on the consumer infrastructure most readers run it on, is only Progressing. The distance between those two words is not a rounding error. It is the entire lesson: you can author the most principled instrument in the world and still hand it to people through a leaking pipe. Naming an architecture and standing all the way inside it are different rungs on the same ladder.

Which is exactly the ladder we just published. Our four-rung diagnostic asks one question at the top: could you show your governance to someone outside who does not take your word for it? This article is us answering that about ourselves, out loud, at the one rung we have not fully reached. We are honest-in-house. On the surface an outsider actually touches, we inherit failures we did not choose and cannot yet fix. That is a real place to be standing, and it is not the top.

## The easy part, which we missed

So we did the hard, invisible thing. We scored ourselves without flinching, found where we fall short, and moved the product that night. And then we failed the easy, visible thing. We did not publish.

For a month, our own product changelog pointed to an article called "We Measured the Measurement," marked forthcoming, and the article did not exist. The measurement was done. The showing was not. That is not a failure of substance, and it is not one of nerve. It is the most ordinary thing in the world: a small team lost its structure for a season. Life came in - the way it does, all at once and without asking - and the quiet forcing function that pushes a finished thing out the door was gone. The measurement waited for us to find our feet again. We have.

If your own unfinished draft has been waiting through a hard season, you already know exactly how this happens. You are not behind. You were living. And the showing still matters, which is why we are doing it now: the score is never the point. Showing it is.

## The measurement, on time now that it is late

An instrument that will measure everyone except itself is not an instrument. It is a claim. The only thing that turns the claim back into an instrument is doing the measurement in the open, including the parts that do not flatter you, and not a month after you said you would.

We were not on time. We are in the open now, which is the part we control from here.

If you are sitting on your own unfinished draft right now - the policy you meant to publish, the record you meant to show someone, the audit you keep meaning to run - you are in company. We know the exact shape of that drawer. The document is not the practice until someone outside can see it. That is true for your governance. We just spent a month proving it is true for ours.

---

*The instrument is public three ways: the same 47 items run free as the /sovereignty-assess Claude skill, free as a [printable checklist](/products/sovereignty-checklist) you score by hand with nothing leaving your desk, and paid as a [PDF of the Toolkit](/products/sovereignty-toolkit) for offline and team use. Naming the price up front is the point - it is the exact fix we made in version 1.1. Run it on your own product, or on ours. We would rather you checked us than took our word.*

Sources: Anthropic, "Updates to Consumer Terms and Privacy Policy" and Privacy Center articles on model training, identity verification, and government requests, privacy.claude.com and anthropic.com; TechCrunch, "Anthropic says Claude may want to see your ID" (2026-06-22); prior Evoked scoring, "Both Are Progressing. Both Failed the Same Three Items." Anthropic policy points verified current July 2026.

*Licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). Free to use, share, and adapt with attribution to Erin Stanley, Evoked.*
