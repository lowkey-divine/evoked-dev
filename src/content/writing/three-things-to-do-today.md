---
title: "Three Things To Do Today If You Are Using AI Agents"
description: "Most companies that have shipped AI agents have done none of these. Here are the three concrete actions, in order, with what to ask when your team pushes back."
author: "Erin Stanley, Evoked"
pubDate: 2026-06-11
draft: true
---

Most companies that have shipped AI agents have done none of these.  Not because the work is hard, but because the vocabulary was missing, and the vocabulary is what makes asking possible.

If you have sat in a vendor review and could not name what felt off about the architecture, you were trying to ask three questions.  The questions have names now.  The first one is a number.  The second is a function.  The third is a path.  None of them require you to be a technical person to ask, and all of them require someone on your team to answer with something other than a paragraph.

Here are the three.  In order.  None of them require Friday.  All of them can land before your next vendor meeting.

### One. Score What You Have Built.

There is a sovereignty assessment for AI products.  Forty-seven points across seven domains.  It exists publicly, and you can run it yourself in an afternoon.  The free five-minute version is at evoked.dev, and the full forty-seven-point version is built into the Claude Code skill `/sovereignty-assess`.

Step one is to score it.  Step two is to read what the score tells you - which is rarely the number, and almost always the pattern.  Most products score in the eleven-to-nineteen range out of forty-seven, and the gap is concentrated in three or four domains the team did not realize they had skipped.

Step three is to decide what conversation the score now requires.  The score is data.  The conversation is the work.  If your product scored seventeen, you do not need a roadmap for getting to forty-seven.  You need a meeting about which of the four missed domains your team can close this quarter, and which one is going to require commissioning work from outside.

Run it before your next vendor review.  The conversation that comes back is the one you have been trying to have.

### Two. Write Down What Your Agent Must Refuse To Do.

In that order, with those three layers.  First, the list.  Second, the function.  Third, the document.

The list is the catalog of refusal triggers - the specific inputs, contexts, or requests where the agent must return a hard NO and halt the operation.  Not a warning.  Not a flag.  A stop.  Twenty triggers is reasonable for most products; fifty is not unusual for products that touch children, money, or health.

The function is the code that fires on each trigger.  Wired into the agent's execution path before the output ever reaches the user.  The function call has a name.  Someone on your team can point to the file.  If they cannot, the refusal is not real - it is documentation pretending to be architecture.

The document is the human-readable version of the list, with the reason each trigger exists.  This is the last layer, not the first.  A team that writes the document first writes a policy paragraph and ships nothing.  A team that writes the list first, wires the function second, and documents what fires and why has built something a vendor cannot talk them out of.

If your agent does not have all three layers, your agent does not have refusal architecture.  It has marketing.

### Three. Build The Audit Trail For Who Is Responsible.

The first instinct is to ask whether your vendor has audit logs.  They do.  Every serious vendor does.  The audit log is table stakes; the audit log is not accountability.

The question is whether the log can be read by someone who is not the vendor.

Three sentences, in order, that decide whether what you have is accountability or documentation.  Here is the path to the log - a real file path, a real database table, a real endpoint, named.  Here is who outside the vendor has read-access to that path - a named role, a named person, an external auditor with credentials, or no one.  Here is what happens when they read it - a process, a decision authority, a name attached to the consequence of what is found.

If your vendor cannot answer the second sentence, what you have is a private diary the vendor keeps about themselves.  They may write in it honestly.  They may write in it carefully.  They may even write in it accurately.  But no one outside the room they wrote it in can act on what is written, which means no one outside that room is accountable for what the agent did.

Accountability requires an outside reader.  The reader has to have standing, access, and authority.  Anything less is documentation.

### What To Say When Your Team Pushes Back.

The three things above will get pushed back on.  Here is what to ask in return.

When the room says *we already have responsible AI*: ask to see the function that returns NO.  If responsible AI lives in a paragraph and not in a function, the room has a policy, not an architecture.

When the room says *the vendor handles that*: ask who outside the vendor can read the log.  If the answer is no one, the vendor is not handling it.  They are absorbing it.

When the room says *we will get to it in Q3*: the assessment runs in an afternoon.  Run it before the quarter starts, so Q3 has data to work from instead of intention.

You may run all three of these and find that your company has none of them.  That is data, not failure.  The team that built the AI was working from the vocabulary they had at the time, and the vocabulary has changed in the last twelve months faster than any of us have had time to track.

You can take these three things to your next meeting whether or not anyone outside that meeting ever reads them.  The practitioner on your team will know what file to open.  The manager in the room - which may be you - will know which sentence to ask.  Where the asking leads is yours to decide.  That part was never anyone else's to give back.
