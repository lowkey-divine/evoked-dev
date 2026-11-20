---
title: "Who Does the Safety Record Serve?"
description: "Workplace safety spent a century learning that a policy is not a protection. AI governance is relearning it in five years, and safety itself is about to be sold cameras. The record should belong to the worker."
pubDate: 2026-11-16
tags: ["AI governance", "workplace safety", "OSHA", "EU AI Act", "verification", "refusal"]
faq:
  - q: "What does workplace safety have to teach AI governance?"
    a: "That a written policy is not a protection. Safety learned over a century, at the cost of lives, to stop asking whether a rule exists and start asking whether the rule reached the worker: were they trained, were they tested, can they show it. AI governance is at the start of the same climb, and most teams are still on the paper rung."
  - q: "Is AI monitoring of workers allowed in the EU?"
    a: "Partly. Since 2 February 2025 the EU AI Act bans AI that infers emotions in the workplace, with an exception for medical or safety reasons. AI used for task allocation and performance monitoring at work is classed as high-risk, and the Digital Omnibus moved those high-risk obligations to 2 December 2027. OSHA in the United States has no AI-specific rule."
  - q: "Do workers have a right to refuse unsafe work?"
    a: "In the United States, a narrow one. Under 29 CFR 1977.12 the protection holds only when four conditions are all met: the worker refuses in good faith and has no reasonable alternative, a reasonable person would see a real danger of death or serious injury, there is no time to go through normal enforcement channels, and the worker already asked the employer to correct the danger and could not get it done. Stop-work authority on construction sites is mostly a site practice, not a general OSHA requirement."
draft: true
sovereign: false
---

*Safety spent a century learning that a rule on paper protects no one. AI governance is at the start of the same lesson.*

An electrician starts his first day on a fab construction site outside Boise. It's six in the morning and cold. Before he touches a tool he sits through an orientation, takes a test on it, and shows a card. The card says he finished a thirty-hour safety course. It has his name on it. It lives in his wallet, not in the site's filing cabinet, and when this job ends he carries it to the next one.

## How safety got here

In 1911 a fire at the Triangle Shirtwaist factory in New York killed 146 garment workers, most of them young women, behind a stairwell door that had been locked to keep them at their machines. There were rules. The rules were on paper. New York passed three dozen new factory laws in the three years that followed, and the country still didn't get a federal occupational safety law until 1970. ISO 45001, the standard large manufacturers certify their safety systems to, was published in 2018.

That's a century of one lesson learned slowly. Safety stopped asking whether the employer had a policy and started asking whether the policy had reached the worker: whether he was trained, whether he was tested on it, whether there's a record, and whether someone outside the company can check the record without taking the company's word.

You can watch the finished form of that lesson in a public document. When Micron began building its first new fab in Boise, it signed a partnership agreement with OSHA. The agreement doesn't say safety is a priority. It says craft workers hold the ten-hour card and supervisors hold the thirty, site orientation includes a comprehension test, subcontractors keep training records on their own people, and the project files a safety report every week, for a workforce that peaks near four thousand. Every line of it is something you could ask to see.

## The same climb, in a different building

I've written twice about the gap between having an AI policy and being able to prove it runs. [The four-rung diagnostic](/writing/prove-your-ai-policy-runs) asks whether the policy exists, whether you can name who it covers, whether you can show today that it was followed, and whether an outsider could check. [The second piece](/writing/your-policy-doc-isnt-architecture) makes the same point from the code side: a policy is a document, architecture is a practice someone else can verify, and most teams have a beautiful version of the first.

Safety already did this homework. Rung one is the written program. Rung two is knowing which trades and which subcontractors it covers. Rung three is the training record and the test score. Rung four is the inspector who can walk the site and ask to see them. A safety manager lives on rungs three and four every working day, because the alternative has a body count.

AI governance is at rung one, mostly, and in a hurry. The discipline next door already finished the climb.

## The oldest refusal right

There's one more thing safety built that AI should inherit, and it's the one I care about most.

In the United States a worker has a right to refuse dangerous work. It's narrower than people think. Under the regulation, 29 CFR 1977.12, four things all have to hold: he refuses in good faith and has no reasonable alternative, a reasonable person in his position would see a real danger of death or serious injury, there's no time to fix it through normal channels, and he already asked his employer to put it right and couldn't get that done. The Supreme Court upheld the regulation in 1980. On construction sites the broader version is called stop-work authority, the idea that anyone on the job can halt the work. OSHA doesn't generally require a stop-work program. The good sites run one anyway, and the honest ones mean it.

It fails in two ways. The authority that exists on the poster by the gate and gets you quietly sent home when you use it. And the card that's checked for the audit and not for the person holding it.

I run a system of about a hundred and forty AI agents with a refusal right built into it. Each one can decline an instruction, and the refusal is written to an append-only, hashed audit log. That log is the most useful record in the whole system. A refusal that's recorded is one you can check later, and one that costs something to override. Safety got there first.

## Where it is going

Safety is being digitized right now, and the direction isn't neutral.

Cameras on construction sites run vision models that flag a missing hard hat or an open harness, log the violation with a timestamp, and build an audit trail. The vendors describe their products in clusters: PPE detection, zone enforcement, behavior analysis, and a newer one they call worker re-identification, which means recognizing the same person across cameras over time. Wearables read heart rate and skin temperature for heat stress and fatigue. Dashboards roll it up, and the vendors are already describing AI agents that act on the data on their own.

Some of this will save lives. Heat kills workers every summer, and a sensor that says stop before a man collapses is a protection. But look at what the record has become. The same timestamped log that proves a worker was protected can prove he stood in the wrong place at 2:14. The same camera that catches a missing harness can learn his gait. I tried once to design [the sovereignty-honoring version of a monitoring tool](/writing/humane-surveillance-is-still-surveillance) and found only two ways out of it: watch the organization's own data instead of the person, or hand the tool to the person whose data it is. Hold that second one. Safety is the one department with a legitimate reason to watch, and that's exactly why it's the department where watching will grow without anyone deciding it should. The people who run these programs didn't ask for the cameras. The cameras came to them.

The EU drew one line already. Since 2 February 2025 its AI Act bans systems that infer emotions in the workplace, with an exception for medical or safety reasons. That exception is where the next ten years of argument will live, because fatigue detection is a safety reason, and a safety reason can be made out of almost anything that reads a body. AI used to allocate tasks or monitor performance at work is classed as high-risk, with those obligations now due 2 December 2027 after the Digital Omnibus pushed them back. OSHA has no AI rule at all. Its research arm, NIOSH, asks the right questions about wearables: what the monitoring is for, whether there's a less intrusive way, what happens to the worker because of it, and whether he knows what's measured and who sees it. They're questions, and nobody has to answer them yet.

## Where it should go

Back to the card.

The reason the OSHA card works is that it belongs to the worker. It proves something about him, he can read it, and he carries it between employers. Nobody designed it to protect his privacy. It just turned out that way: the record of a protection is most trustworthy when the protected person holds it.

If you run a safety program, build the rest of the record the same way. Three questions decide it.

What gets recorded. What was taught, what was tested, and what the site did to keep him safe. Leave out where he stood every minute, even if the camera could tell you.

Who can read it. He can. A system that tracks a worker and doesn't let the worker see the track isn't safety, whatever it's called.

What he can carry. The training, the tests, the certifications, in a form the next site accepts, so the proof of his protection doesn't disappear the day the contract ends.

Then automate the verification, not the surveillance. Let software check that every person on site today holds a current card and sat the orientation. Let it flag the gap in the record before the inspector does. That's the agentic workflow worth building in a safety office, and it's a different product from the one that watches.

The electrician from the first paragraph will finish his shift today, and in a year or two he'll finish this job and go to the next one. He should be able to pull the card out of his wallet and have it be the whole story.

---

*This is practical argument, not legal advice. The EU AI Act workplace emotion-recognition ban in Article 5(1)(f) has applied since 2 February 2025 and was not altered by the Digital Omnibus. That Omnibus, Regulation (EU) 2026/1744, was published in the Official Journal on 24 July 2026 and entered into force on 27 July 2026; it moved Annex III high-risk obligations, including employment uses, to 2 December 2027, and that date is not conditional on harmonised standards being ready. OSHA has issued no AI-specific regulation as of November 2026.*

Sources: OSHA Strategic Partnership agreement, OSHA Boise Area Office and Micron Idaho Semiconductor Manufacturing, 2 October 2024 (osha.gov); 29 CFR 1977.12(b)(2), Legal Information Institute; Whirlpool Corp. v. Marshall, 445 U.S. 1 (1980), decided 26 February 1980; Triangle Shirtwaist factory fire, 25 March 1911, Cornell University ILR School Kheel Center archive; ISO 45001:2018, approved 12 March 2018 (iso.org); EU AI Act Article 5(1)(f) and Annex III point 4; Regulation (EU) 2026/1744 (Digital Omnibus on AI), OJ 24 July 2026, in force 27 July 2026; NIOSH guidance on wearable technology in the workplace; TrueLook, "Construction AI Cameras: The 2026 Buyer's Guide"; PatSnap, "Computer Vision Worker Safety Compliance Monitoring 2026." Verified November 2026. The two construction-camera product sources are vendor and trade material, used only to describe how these products are marketed, not to establish what they do.

*Licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). Free to use, share, and adapt with attribution to Erin Stanley, Evoked.*
