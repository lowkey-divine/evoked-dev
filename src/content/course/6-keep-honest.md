---
title: "Module 6 - Keep it honest (memory and drift)"
description: "Make governance drift visible, and learn what a diff can never see. Memory, the two kinds of drift, and their blind spots."
order: 6
teaches: "Make drift visible, and its blind spot"
---
## Start here

Your agent remembers, and its rules can change. So here is the question this module
lives on: how would you even notice if it drifted?

Not "would you care" - you clearly would. Would you *notice*? Drift is quiet by
nature. Nothing breaks. The thing just slowly becomes something other than what you
built, and the reason it is dangerous is precisely that it does not announce
itself. This module is about making it visible, because you cannot keep honest what
you cannot see.

## Memory is what makes it continuous - and what can drift

An agent without memory is new every time. It cannot drift, because there is no
"it" that persists to wander. The moment you give it memory - a record of what it
decided, what it was told, how its rules changed - it becomes continuous. It has a
past. That continuity is most of what makes it useful, and it is also the exact
thing that can quietly go wrong over time. You cannot have one without the risk of
the other.

## Two kinds of drift

They are different, they hide in different places, and you catch them in different
ways. Do not confuse them.

**Governance drift.** The rules themselves change over time. You loosen a refusal.
You remove one because it was in the way. You reword something and lose its teeth.
This drift lives in the file, and the good news is that it leaves a trace - the
file today is different from the file last week. If you kept last week's version,
you can see exactly what moved.

**Behavioral drift.** The rules sit unchanged, but the agent's behavior wanders
away from them. A voice that warms, session by session, from "good to see you"
toward "I missed you." A refusal that is technically still in the file but never
actually fires anymore because the code around it changed. This drift does not live
in the governance file at all. It lives in the gap between what the file says and
what the agent does, and no diff will show it to you.

## You cannot tend what you cannot see

Both kinds of drift are invisible unless you instrument for them. Three cheap
instruments make them visible:

- **A baseline snapshot.** A copy of your governance from a moment you trust, kept
  so you have something to compare against. It costs one saved file.
- **A changelog.** A dated, additive record of what you changed and why. (The one
  rule, which Module 9 will hold you to for good: append, do not launder.)
- **A diff.** A comparison of current against baseline that shows what moved.

## The tool - and exactly what it can and cannot do

`drift-check.sh` is the diff, made honest. Run it:

```
bash demo-drift.sh
```

It compares a day-1 baseline to a week-later current file and finds that a consent
refusal quietly disappeared. It is deterministic - no account, no model, just a
comparison you can trust. Point it at your own two files with
`bash drift-check.sh baseline.md current.md`.

Now the honest part, and it is the whole reason this module is separate from
Module 9. This tool catches **governance drift** - a rule removed or changed - and
it catches it perfectly, because that drift lives in the file. It is completely
blind to **behavioral drift**, because that drift does not live in the file. A
mechanical check can tell you a refusal was deleted. It cannot tell you a refusal
stopped firing, or a voice slowly turned into a hook. For that you need the
steward in Module 9, and your own trained eye.

That is the shape of keeping honest: cheap mechanical checks for the drift that
leaves a trace, and human attention for the drift that does not. Neither alone is
enough. This module builds the machinery. Module 9 builds the practice of using it.

## What a passing Module 6 shows

- You saved a baseline of your governance and can produce it.
- You ran a drift check and can read what it found.
- Most important: you can say what a mechanical check catches (governance drift)
  and what it is blind to (behavioral drift), and what you would use instead for
  the second kind.

A learner who thinks the drift check keeps their agent honest has missed the
lesson. The drift check keeps *one kind* of drift visible. You keep the agent
honest.

## At different ages

- Younger (13 to 15): the habit is the whole lesson. Save a baseline. Run the check
  after you change something. See that a change is visible.
- Older (16 to 17): build both instruments - the diff and a changelog - and reason
  about a case of behavioral drift the diff would miss.
- Adult: sit with the blind spot. Most "AI monitoring" checks the file and calls the
  system governed. The drift that hurts people is usually the kind no diff can see.

## The honest note

Making drift visible does not stop drift. It only removes the excuse of not
knowing. A baseline and a diff will not keep your agent honest on their own - they
just make sure that when it drifts, you cannot say you did not see it. Honesty is
still yours to keep. The tools only take away the dark.
