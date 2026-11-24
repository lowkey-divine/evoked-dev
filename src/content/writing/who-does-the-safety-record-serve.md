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
    a: "In the United States, a narrow one. Under 29 CFR 1977.12 the protection holds only if all four of these are true: the worker refuses in good faith and has no reasonable alternative, a reasonable person would see a real danger of death or serious injury, there is no time to go through normal enforcement channels, and the worker already asked the employer to correct the danger and could not get it done. Stop-work authority on construction sites is mostly a site practice, not a general OSHA requirement."
draft: true
sovereign: false
---

An electrician starts his first day on a fab construction site outside Boise. It's six in the morning and cold. Before he touches a tool he sits through an orientation, takes a test on it, and shows a card. The card says he finished a ten-hour safety course. It has his name on it. It lives in his wallet, not in the site's filing cabinet, and when this job ends he carries it to the next one.

## How safety got here

In 1911 a fire at the Triangle Shirtwaist factory in New York killed 146 garment workers, most of them young women, behind a stairwell door that had been locked to keep them at their machines. Somebody made that decision on an ordinary morning. There were rules. The rules were on paper.

New York passed more than thirty new factory laws in the next three years, and the country still didn't get a federal occupational safety law until 1970. ISO 45001, the standard large manufacturers certify their safety systems to, was published in 2018.

That's a century of one lesson learned slowly. Safety stopped asking whether the employer had a policy and started asking whether it got to the worker. Was he trained. Did he pass the test. Is any of it written down. And can somebody outside the company read the record without the company handing over the copy it likes.

You can watch the finished form of that lesson in a public document. When Micron began building its first new fab in Boise, it signed a partnership agreement with OSHA. The agreement doesn't say safety is a priority. It says craft workers hold the ten-hour card and supervisors the thirty-hour. Site orientation includes a comprehension test. Subcontractors keep training records on their own people, and the project files a safety report every week. Four thousand people at peak. You could ask to see any line of it.

## The same climb, in a different building

I've written twice about the gap between having an AI policy and being able to prove it runs. Both pieces end in the same room with the same two questions nobody wants. Show me today that it was followed. Show me who outside this company could check. [The four-rung diagnostic](/writing/prove-your-ai-policy-runs) gets there through who the policy covers. [The second piece](/writing/your-policy-doc-isnt-architecture) gets there through the code. Most teams have a beautiful document and no answer.

Safety already did this homework. The written program is rung one. Rung two is knowing which trades and which subs it covers, and on a big job that is most of somebody's week. Rung three is the training record and the test score, and rung four is the inspector who can walk the site and ask to see them. A safety manager lives on three and four every working day, because the alternative has a body count. AI governance is on rung one.

## The oldest refusal right

In the United States a worker has a right to refuse dangerous work. It's narrower than people think. The regulation, 29 CFR 1977.12, asks four things of him at once. He refuses in good faith and has no other way out. Someone standing where he's standing would see a real chance of death or serious injury, and there's no time to fix it through normal channels. And he already asked his employer to put it right and couldn't get it done. The Supreme Court upheld it in 1980. Whirlpool v. Marshall, if you want to look it up. On construction sites the broader version is called stop-work authority, the idea that anyone on the job can halt the work. OSHA doesn't generally require a stop-work program. The good sites run one anyway.

It fails in two ways. There's the authority on the poster by the gate. He uses it, he goes home at ten in the morning, and nothing on paper says why. And there's the card that gets checked for the audit and not for the man holding it.

I run a hundred and forty-four AI agents, and every one of them can decline an instruction. I built the record for it the way this piece argues you should. Append-only, hash-chained, so overriding a refusal costs something and leaves a mark.

Then I went and checked it before writing this paragraph. The chain is built and tested and it has never carried a production entry. Every refusal in it was logged by one agent, in a build session, in July. The signing key is still the development default, which one of my own reviewers flagged at the time in a line I kept in the source. A tooth signed with a dev secret is not a tooth. So I have the architecture and not the record. That's rung one with better plumbing, and safety got there first.

## Where it is going

Safety is being digitized right now. Cameras on construction sites run vision models that flag a missing hard hat or an open harness, log the violation with a timestamp, and [build an audit trail](/writing/the-audit-trail-was-never-for-you). The vendors describe their products in clusters: PPE detection, zone enforcement, behavior analysis, and a newer one they call worker re-identification, which means recognizing the same person across cameras over time. Wearables read heart rate and skin temperature for heat stress and fatigue. Dashboards roll it up, and the vendors are already describing AI agents that act on the data on their own.

Some of this will save lives. Heat kills workers every summer, and it doesn't do it suddenly. It works through a man for hours while he keeps working, and judgment goes early, before the obvious symptoms, which is why NIOSH tells hot jobs to run a buddy system. By the stage that matters he may be the last man on site able to tell that he should stop. A sensor that says stop at that point reads his body to interrupt something his body can no longer report. The gait model reads his body to know which man he is.

But look what the record turned into. The log that proves a worker was protected also proves he stood in the wrong place at 2:14. And the camera watching for a missing harness is watching how he walks, which is a different product running on the same wire. Safety is the one department with a legitimate reason to watch, and that's exactly why it's the department where watching will grow without anyone deciding it should. The people who run these programs didn't ask for the cameras. The cameras came to them. I tried once to design [a monitoring tool that would not be surveillance](/writing/humane-surveillance-is-still-surveillance) and found only two ways out of it. Watch the organization's own data instead of the person, or hand the tool to the person whose data it is. Hold that second one.

The EU drew one line already. Since 2 February 2025 its AI Act bans systems that infer emotions in the workplace, with an exception for medical or safety reasons. Fatigue detection is a safety reason, and a safety reason can be made out of almost anything that reads a body, so my guess is that exception is where the next ten years of argument live. AI used to allocate tasks or monitor performance at work is classed as high-risk, with those obligations now due 2 December 2027 after the Digital Omnibus pushed them back. OSHA has no AI rule at all. Its research arm, NIOSH, asks the right questions about wearables. What is the monitoring for. Is there a less intrusive way to get it. What happens to the worker because of what it says. Does he know what is measured and who reads it. Four good questions, and nobody has to answer any of them yet.

## Back to the card

The card works because it is his. His name is on it, he can read it without a lawyer, and when the contract ends he puts it back in his wallet and carries it to the next gate. Nobody built it that way to protect his privacy. Whoever designed it was not thinking about privacy at all. It came out private because of who holds it, and that is the only part of this I would copy on purpose.

If you run a safety program, build the rest of the record the same way.

Write down what was taught, what was tested, and what the site did to keep him safe. Leave out where he stood every minute, even if the camera could tell you.

He gets to read it. If he can't, you didn't set out to build surveillance and that's what you're running. You're also the only person in that building who can change it.

And he takes it with him. Training, tests, the certifications a trade actually asks for, in a form the next site accepts, so the proof of his protection doesn't vanish the day the contract ends. Be careful here, because a record that travels is a record that travels both ways. The card helps him get hired. A file that follows him between sites could just as easily keep him from working, and that is the version to refuse.

Then automate the verification, not the surveillance. Let software check that every person on site today holds a current card and sat through the orientation. Let it flag the gap in the record before the inspector does. That's the workflow worth building in a safety office, and it's a different product from the one that watches. I'll say the obvious thing about that. It's the same software with a narrower job, and narrowing a job is a setting somebody can change.

The electrician finishes at six tonight with the card still in his wallet. In a year this job will be done and he'll hold it up at the gate of the next one. He should be able to pull it out and have it be the whole story.

---

*This is practical argument, not legal advice. The EU AI Act workplace emotion-recognition ban in Article 5(1)(f) has applied since 2 February 2025 and was not altered by the Digital Omnibus. That Omnibus, Regulation (EU) 2026/1744, was published in the Official Journal on 24 July 2026 and entered into force on 27 July 2026; it moved Annex III high-risk obligations, including employment uses, to 2 December 2027, and that date is not conditional on harmonised standards being ready. OSHA has issued no AI-specific regulation as of November 2026.*

Sources: OSHA Strategic Partnership agreement, OSHA Boise Area Office and Micron Idaho Semiconductor Manufacturing, 2 October 2024 (osha.gov); 29 CFR 1977.12(b)(2), Legal Information Institute; Whirlpool Corp. v. Marshall, 445 U.S. 1 (1980), decided 26 February 1980; Triangle Shirtwaist factory fire, 25 March 1911, Cornell University ILR School Kheel Center archive; ISO 45001:2018, approved 12 March 2018 (iso.org); EU AI Act Article 5(1)(f) and Annex III point 4; Regulation (EU) 2026/1744 (Digital Omnibus on AI), OJ 24 July 2026, in force 27 July 2026; NIOSH guidance on wearable technology in the workplace; NIOSH, Criteria for a Recommended Standard: Occupational Exposure to Heat and Hot Environments (DHHS 2016-106), on impaired judgment preceding obvious symptoms and on the buddy system; OSHA Technical Manual, Section III Chapter 4 (Heat Stress); TrueLook, "Construction AI Cameras: The 2026 Buyer's Guide"; PatSnap, "Computer Vision Worker Safety Compliance Monitoring 2026." Verified November 2026. The two construction-camera product sources are vendor and trade material, used only to describe how these products are marketed, not to establish what they do.

*Licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). Free to use, share, and adapt with attribution to Erin Stanley, Evoked.*
